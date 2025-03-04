'use server';

import {cookies} from 'next/headers';

/**
 * 쿠키에서 인증 토큰을 검색
 * @returns {string | undefined} 인증 토큰
 */
export default async function authTokenValue(): Promise<string | undefined> {
  const authToken = (await cookies()).get('Authorization')?.value;
  return authToken;
}

/**
 * 인증 토큰을 검색하고 유효성을 검사
 * @throws 토큰이 없거나 유효하지 않을 경우 오류
 * @returns 유효한 인증 토큰
 */
export async function getValidAuthToken(): Promise<string> {
  const token = await authTokenValue();
  if (!token) {
    throw new Error('토큰이 유효하지 않습니다.');
  }
  return token;
}
