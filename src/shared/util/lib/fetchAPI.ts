'use server';

import {getValidAuthToken} from './authTokenValue';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type BodyType = object | string | FormData | undefined | null;

interface FetchAPIOptions<B extends BodyType = object> {
  method: HttpMethod;
  path: string;
  body?: B;
  headers?: Record<string, string>;
}

export async function fetchAPI<T, B extends BodyType = object>({
  method,
  path,
  body,
  headers = {},
}: FetchAPIOptions<B>): Promise<T> {
  const authToken = await getValidAuthToken();
  const url = `${process.env.NEXT_SERVER_URL}${path}`;
  const defaultHeaders: HeadersInit = {
    Authorization: `${authToken}`,
    ...headers,
  };

  //BodyInit 타입은 Request의 body 속성에 들어갈 수 있는 값들의 타입을 나타냄
  let processedBody: BodyInit | undefined = undefined;
  if (body !== undefined && body !== null) {
    if (body instanceof FormData) {
      processedBody = body;
    } else if (typeof body === 'string') {
      defaultHeaders['Content-Type'] = 'application/json';
      processedBody = JSON.stringify(body);
    } else {
      defaultHeaders['Content-Type'] = 'application/json';
      processedBody = JSON.stringify(body);
    }
  }

  try {
    const res = await fetch(url, {
      method,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      body: processedBody,
    });

    if (!res.ok) {
      throw new Error('요청에 실패했습니다.');
    }
    const contentType = res.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return (await res.json()) as T;
    } else if (contentType?.includes('text/')) {
      return (await res.text()) as unknown as T;
    } else {
      // 바이너리 데이터 등 다른 형식의 응답 처리
      return (await res.blob()) as unknown as T;
    }
  } catch (error) {
    console.error(`API 에러 (${method} ${path}):`, error);
    throw error;
  }
}

/**
 * GET 요청 간편 래퍼
 */
export async function get<T>(
  path: string,
  options?: Omit<FetchAPIOptions, 'method' | 'path'>
): Promise<T> {
  return fetchAPI<T>({...options, method: 'GET', path});
}

/**
 * POST 요청 간편 래퍼
 */
export async function post<T, B extends BodyType = object>(
  path: string,
  body?: B,
  options?: Omit<FetchAPIOptions<B>, 'method' | 'path' | 'body'>
): Promise<T> {
  return fetchAPI<T, B>({method: 'POST', path, body, ...options});
}
