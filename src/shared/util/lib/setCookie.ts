'use server'

import { cookies } from "next/headers";

// 서버 컴포넌트에서 인증 토큰 설정
export async function setServerSideToken(token: string) {
  if (token) {
    (await cookies()).set('Authorization', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });
    return true;
  }
  return false;
}


// 로그인 API 호출 및 토큰 설정
export async function loginAndSetToken(email: string, password: string) {
  try {
    const response = await fetch(`${process.env.NEXT_SERVER_URL}/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        lastLoginAt: '',
      }),
    });
    
    if (!response.ok) {
      return { success: false, message: '로그인 실패' };
    }
    
    const data = await response.json();
    const authToken = response.headers.get('Authorization') || data.token;
    
    if (authToken) {
      await setServerSideToken(authToken);
      return { success: true, data };
    } else {
      return { success: false, message: '인증 토큰을 찾을 수 없습니다' };
    }
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    return { success: false, message: '로그인 중 오류 발생' };
  }
}