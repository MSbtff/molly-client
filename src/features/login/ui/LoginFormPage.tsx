"use client";

import { useRouter, useSearchParams } from "next/navigation";
import LoginPage from "./LoginPage";
import { loginAndSetToken } from "@/shared/util/lib/setCookie";

export const LoginFormPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/";

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await loginAndSetToken(email, password);

      if (res.data) {
        console.log("로그인 성공", res.data);
        router.push(decodeURIComponent(returnUrl));
        router.refresh();
      } else {
        console.log("로그인 실패");
        alert("로그인 실패하였습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <LoginPage handleLogin={handleLogin}></LoginPage>;
};
