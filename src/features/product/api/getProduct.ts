"use server";

import { getValidAuthToken } from "@/shared/util/lib/authTokenValue";

export default async function getProduct(paramsString: string) {
  const authToken = getValidAuthToken();
  if (!authToken) {
    throw new Error("인증되지 않은 요청입니다.");
  }

  try {
    const res = await fetch(`${paramsString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("상품 정보 요청 실패");
    }

    return res.json();
  } catch (error) {
    console.error("상품 정보 요청 실패:", error);
  }
}
