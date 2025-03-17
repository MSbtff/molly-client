'use client';

import Link from 'next/link';
import {Button} from '../../../shared/ui/Button';
import Logo from '../../../../public/moollyLogo.svg';
import { useRef, useState} from 'react';


interface Input {
  username: string;
  password: string;
}
interface LoginPageProps {
  handleLogin: (username: string, password: string) => Promise<void>;
}


//server action으로 변경 및 환경변수 오류 찾아야함
export default function LoginPage({handleLogin}: LoginPageProps) {
  const ref = useRef<HTMLInputElement | null>(null);

  const [input, setInput] = useState<Input>({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(input.username, input.password);
    setInput({username: '', password: ''});
  };


  return (
    <div className="min-w-full h-full flex flex-col items-center justify-center">
      <div className="h-full flex flex-col items-center">
        <Logo />
        <h1 className="text-xl font-bold">로그인</h1>
      </div>
      <form
        className="mt-12 w-full h-[260px] flex flex-col items-center justify-between cursor-text"
        onSubmit={handleSubmit}
      >
        <label className="w-[435px] flex flex-col items-start ">
          <span className="text-md">이메일주소</span>
          <input
            type="text"
            name="username"
            placeholder="Molly@gmail.com"
            className="w-[435px] border-b-2 text-md "
            value={input.username}
            required={true}
            ref={ref}
            onChange={(e) =>
              setInput((state) => ({...state, username: e.target.value}))
            }
          />
        </label>
        <label className="w-[435px] flex flex-col items-start">
          <span className="text-md">비밀번호</span>
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            className="w-[435px] border-b-2 text-md"
            value={input.password}
            required={true}
            ref={ref}
            onChange={(e) =>
              setInput((state) => ({...state, password: e.target.value}))
            }
          />
        </label>

        <Button
          color="white"
          width="435px"
          height="52px"
          radius="10px"
          border="1px solid #ccc"
          
          className='hover:bg-black bg-gray2'
        >
          로그인
        </Button>
      </form>
      <div className="mt-10 w-[435px] h-9  flex justify-between text-sm ">
        <Link href={'/register'} className="hover:text-gray-500">
          회원가입
        </Link>
        <Link href={''} className="hover:text-gray-500 translate-x-3">이메일 찾기</Link>
        <Link href={''} className="hover:text-gray-500">비밀번호 찾기</Link>
      </div>
    </div>
  );
}
