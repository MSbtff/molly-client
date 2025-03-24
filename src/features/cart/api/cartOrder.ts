"use server";

import { decryptToken } from "@/shared/util/lib/encrypteToken";
import { cookies } from "next/headers";

interface OrderItem {
  cartId: number;
}

export default async function cartOrder(orderItems: OrderItem[]) {
  const enToken = (await cookies()).get("Authorization")?.value as string;
  const authToken = decryptToken(enToken);
  if (!authToken) {
    throw new Error("인증되지 않은 요청입니다.");
  }

  try {
    const res = await fetch(`${process.env.NEXT_SERVER_URL}/orders`, {
      method: "POST",
      headers: {
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderRequests: orderItems,
      }),
    });

    console.log("주문 요청:", orderItems);
    console.log(res.status);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`주문 실패: ${errorData.message || res.status}`);
    }
    const data = await res.json();
    console.log("주문 응답:", data);

    return data;
  } catch (error) {
    console.error("주문 실패:", error);
    throw error;
  }
}
