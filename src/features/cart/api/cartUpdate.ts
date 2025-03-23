"use server";

import { getValidAuthToken } from "@/shared/util/lib/authTokenValue";

export async function cartUpdate(
  cartId: number,
  itemId: number,
  quantity: number
) {
  const authToken = await getValidAuthToken();

  if (!authToken) {
    throw new Error("인증되지 않은 요청입니다.");
  }

  try {
    const res = await fetch(`${process.env.NEXT_SERVER_URL}/cart`, {
      method: "PUT",
      headers: {
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId,
        itemId,
        quantity,
      }),
    });

    console.log(res.status);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`장바구니 수정 실패: ${errorData.message || res.status}`);
    }

    return;
  } catch (error) {
    console.error("장바구니 수정 실패:", error);
    throw error;
  }
}
