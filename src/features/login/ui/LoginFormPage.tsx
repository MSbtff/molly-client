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
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('로그인 성공', data);
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
