"use server";

import { RegisterFormData } from "../hook/useRegisterForm";

export async function registerPost(register: RegisterFormData) {
  try {
    const res = fetch(`${process.env.NEXT_SERVER_URL}/sing-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        register,
      }),
    });

    const data = (await res).json();
    if (!data) {
      throw new Error("회원가입에 실패했습니다.");
    }

    return data;
  } catch (error) {
    console.error("회원가입 실패:", error);
  }
}
