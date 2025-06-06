"use server";

import { decryptToken } from "@/shared/util/lib/encrypteToken";
import { cookies } from "next/headers";

export default async function retrieverProduct() {
  const enToken = (await cookies()).get("Authorization")?.value as string;
  const authToken = await decryptToken(enToken);

  if (!authToken) {
    throw new Error("인증되지 않은 요청입니다.");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_SERVER_URL}/product/seller?offsetId=0&size=1000`,
      {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      }
    );

    if (response.status === 204) {
      console.log("성공적으로 처리됨 (반환 데이터 없음)");
      return null;
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.error("상품 조회 실패:", errorData);
      return {
        success: false,
        message: errorData.message || "상품 조회에 실패했습니다.",
      };
    }
    console.log(response.status);
    const data = response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
