"use server";

import { cookies } from "next/headers";
import { decryptToken, encryptToken } from "./encrypteToken";

// 서버 컴포넌트에서 인증 토큰 설정
export async function setServerSideToken(token: string) {
  if (token) {
    const encryptedToken = encryptToken(token);
    (await cookies()).set("Authorization", encryptedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });
    return true;
  }
  return false;
}

export async function getServerSideToken() {
  const encryptedToken = await (await cookies()).get("Authorization")?.value;
  if (!encryptedToken) return null;

  try {
    // 암호화된 토큰 복호화
    return decryptToken(encryptedToken);
  } catch (error) {
    console.error("토큰 복호화 실패:", error);
    return null;
  }
}

// 로그인 API 호출 및 토큰 설정
export async function loginAndSetToken(email: string, password: string) {
  try {
    const response = await fetch(`${process.env.NEXT_SERVER_URL}/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        lastLoginAt: "",
      }),
    });

    if (!response.ok) {
      return { success: false, message: "로그인 실패" };
    }

    const data = await response.json();
    const authToken = response.headers.get("Authorization") || data.token;

    if (authToken) {
      await setServerSideToken(authToken);
      return { success: true, data };
    } else {
      return { success: false, message: "인증 토큰을 찾을 수 없습니다" };
    }
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);
    return { success: false, message: "로그인 중 오류 발생" };
  }
}
