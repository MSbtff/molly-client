'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function buyNow(productId: number, itemId: number, quantity: number) {
  const authToken = (await cookies()).get('Authorization');

  if (!authToken) {
    // throw new Error('로그인이 필요합니다.');
    redirect('/login');
  }

  try {
    const response = await fetch(`${process.env.NEXT_SERVER_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authToken.value}`, // 인증 토큰 추가
      },
      body: JSON.stringify({
        orderRequests: [
          {
            productId,
            itemId,
            quantity,
          },
        ],
      }),
    });

    console.log(`[구매 요청] Status: ${response.status}`); // 응답 상태 출력

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`[구매 실패] Status: ${response.status}, Message: ${errorData.message}`);
      throw new Error(errorData.message || "구매 요청 실패");
    }

    // API 응답 데이터
    const data = await response.json();
    console.log("[구매 성공]", data);

    return data; // 주문 결과 반환

  } catch (error) {
    console.error("order api 요청 중 오류 발생:", error);
    throw new Error(error instanceof Error ? error.message : "알 수 없는 오류 발생");
  }

}

export async function addToCart(itemId: number, quantity: number) {
  console.log("서버 액션 addToCart 함수 진입");
  const authToken = (await cookies()).get('Authorization');

  if (!authToken) {
    redirect('/login');
  }

  try {
    // const response = await fetch(`${process.env.NEXT_SERVER_URL}/cart/add`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `${authToken.value}`,  // 쿠키에서 가져온 토큰 사용
    //   },
    //   body: JSON.stringify({ itemId, quantity }),
    // });
    const bodyData = JSON.stringify({ itemId, quantity });
    console.log("장바구니 API 요청 본문:", bodyData);
    const response = await fetch(`${process.env.NEXT_SERVER_URL}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authToken.value}`,
      },
      body: bodyData,
    });
    console.log(`장바구니 api 응답: ${response.status}`);

    const data = await response.json();
    console.log("api 요청 성공", data);

    if (!response.ok) {
      // 실패 응답 처리 (400, 500)
      console.log(`[장바구니 api 실패] Status: ${response.status}`);
      const errorData = await response.json();
      throw new Error(errorData.message || "api 요청 실패");
    }
  } catch (error) {
    throw new Error("api 요청 중 오류 발생", error as Error);
  }
}
