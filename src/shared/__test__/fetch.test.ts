import { fetchAPI, get, post } from "../util/lib/fetchAPI";

// authTokenValue 모듈 모킹
jest.mock('../util/lib/authTokenValue', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue('test-token'),
  AuthTokenValue: jest.fn().mockResolvedValue('test-token'),
  getValidAuthToken: jest.fn().mockResolvedValue('test-token'),
}));

// fetchAPI 타입 정의
interface FetchOptions {
  method: string;
  path: string;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
  [key: string]: unknown;
}

// 래퍼 함수 직접 모킹 타입
type MockFetchAPI = jest.Mock<Promise<unknown>, [FetchOptions]>;

// fetchAPI 모듈에 대한 모킹 설정
jest.mock('../util/lib/fetchAPI', () => {
  // 원본 모듈을 가져와서 확장
  const originalModule = jest.requireActual('../util/lib/fetchAPI');
  
  // 실제 fetchAPI, get, post 함수를 사용
  return {
    ...originalModule,
    // baseUrl 오버라이드 (필요한 경우)
    _baseUrl: 'https://api.example.com',
    _getBaseUrl: jest.fn().mockReturnValue('https://api.example.com'),
  };
});

// fetch 함수 전역 모킹
global.fetch = jest.fn();

describe('API 유틸리티 테스트', () => {
  beforeEach(() => {
    // 각 테스트 전에 모킹 초기화
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();

    // 기본 성공 응답 설정
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      headers: {
        get: jest.fn().mockReturnValue('application/json'),
      },
      json: jest.fn().mockResolvedValue({ success: true }),
      text: jest.fn().mockResolvedValue('텍스트 응답'),
      blob: jest.fn().mockResolvedValue(new Blob()),
    });
  });

  // 환경 변수 설정
  const originalEnv = process.env;
  beforeEach(() => {
    process.env = { ...originalEnv, NEXT_SERVER_URL: 'https://api.example.com' };
  });
  afterEach(() => {
    process.env = originalEnv;
  });

  describe('fetchAPI 함수', () => {
    it('기본 GET 요청 테스트', async () => {
      const result = await fetchAPI({
        method: 'GET',
        path: '/test',
      });

      // fetch가 올바른 URL과 옵션으로 호출되었는지 확인
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            Authorization: 'test-token',
          }),
        })
      );

      // 결과가 예상대로인지 확인
      expect(result).toEqual({ success: true });
    });

    it('오류 응답 처리 테스트', async () => {
      // 오류 응답 모킹
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: '서버 오류',
        json: jest.fn().mockResolvedValue({ error: '서버 오류' }),
      });

      await expect(
        fetchAPI({
          method: 'GET',
          path: '/error',
        })
      ).rejects.toThrow('요청에 실패했습니다.');
    });

    it('JSON 요청 본문 처리 테스트', async () => {
      const body = { test: 'data' };
      await fetchAPI({
        method: 'POST',
        path: '/test',
        body,
      });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(body),
        })
      );
    });

    it('다른 응답 타입 처리 테스트', async () => {
      // text 응답 모킹
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        headers: {
          get: jest.fn().mockReturnValue('text/plain'),
        },
        text: jest.fn().mockResolvedValue('텍스트 응답'),
      });

      const result = await fetchAPI({
        method: 'GET',
        path: '/text',
      });

      expect(result).toBe('텍스트 응답');
    });
  });

  describe('래퍼 함수', () => {
    // fetchAPI 모킹 직접 설정
    beforeEach(() => {
      // 기존 모킹 제거하고 새로운 모킹 설정
      jest.resetModules();
      jest.mock('../util/lib/fetchAPI', () => {
        const fetchAPIMock = jest.fn().mockImplementation((options: FetchOptions) => ({ success: true, options }));
        
        return {
          fetchAPI: fetchAPIMock,
          get: (path: string, options?: Record<string, unknown>) => fetchAPIMock({...options, method: 'GET', path}),
          post: (path: string, body?: Record<string, unknown>, options?: Record<string, unknown>) => 
            fetchAPIMock({method: 'POST', path, body, ...options}),
        };
      });
    });
    
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('get 함수 테스트', async () => {
      // ESLint 규칙 일시적 비활성화
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { get, fetchAPI } = require('../util/lib/fetchAPI');
      const fetchAPIMock = fetchAPI as MockFetchAPI;
      
      await get('/test');
      
      // 모킹된 함수가 호출되었는지 확인
      expect(fetchAPIMock).toHaveBeenCalledWith({
        method: 'GET',
        path: '/test',
      });
    });

    it('post 함수 테스트', async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { post, fetchAPI } = require('../util/lib/fetchAPI');
      const fetchAPIMock = fetchAPI as MockFetchAPI;
      
      const body = { test: 'data' };
      await post('/test', body);
      
      expect(fetchAPIMock).toHaveBeenCalledWith({
        method: 'POST',
        path: '/test',
        body,
      });
    });
  });

  // fetchAPI를 직접 사용하지 않고 래퍼 함수 통합 테스트
  describe('래퍼 함수 통합 테스트', () => {
    it('get 함수로 직접 fetch 호출 테스트', async () => {
      const result = await get('/direct-test');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/direct-test',
        expect.objectContaining({
          method: 'GET',
        })
      );

      expect(result).toEqual({ success: true });
    });

    it('post 함수로 직접 fetch 호출 테스트', async () => {
      const body = { test: 'direct-data' };
      const result = await post('/direct-test', body);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/direct-test',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(body),
        })
      );

      expect(result).toEqual({ success: true });
    });
  });
});