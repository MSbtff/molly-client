'use client';

import {useRouter} from 'next/navigation';
import LoginPage from './LoginPage';

export const LoginFormPage = () => {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await fetch('api/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
        // credentials: 'include', 이 처리를 해야 쿠키 조회 가능 도메인이 같아야 이게 필요 없음
      });

      if (res.ok) {
        console.log('로그인 성공');
        router.push('/');

        router.refresh();
      } else {
        console.log('로그인 실패');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <LoginPage handleLogin={handleLogin}></LoginPage>;
};
