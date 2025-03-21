"use server";

import { cookies } from "next/headers";

export async function logout() {
  (await cookies()).delete("Authorization");

  const res = {
    message: "로그아웃 됐습니다.",
    status: 200,
  };

  return res;
}
