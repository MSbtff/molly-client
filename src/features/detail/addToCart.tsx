'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function addToCart(itemId: number, quantity: number) {
  const authToken = (await cookies()).get('Authorization');

  if (!authToken) {
    // throw new Error('로그인이 필요합니다.');
    redirect('/login');

  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authToken.value}`,  // 쿠키에서 가져온 토큰 사용
      },
      body: JSON.stringify({ itemId, quantity }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "장바구니 추가 실패");
    }

    return "장바구니에 추가되었습니다.";
  } catch (error) {
    throw new Error("장바구니 추가 중 오류 발생", error as Error);
  }
}
