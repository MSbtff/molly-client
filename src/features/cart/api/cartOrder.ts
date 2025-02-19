'use server';

import {cookies} from 'next/headers';

export default async function cartOrder() {
  const authToken = (await cookies()).get('Authorization')?.value;

  if (!authToken) {
    throw new Error('인증되지 않은 요청입니다.');
  }

  try {
    const res = await fetch(`${process.env.NEXT_SERVER_URL}/order`, {
      method: 'POST',
      headers: {
        Authorization: `${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 0,
        orderRequests: [
          {
            productId: 0,
            itemId: 0,
            quantity: 0,
          },
        ],
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`주문 실패: ${errorData.message || res.status}`);
    }
    const data = await res.json();
    console.log('주문 응답:', data);

    return data;
  } catch (error) {
    console.error('주문 실패:', error);
    throw error;
  }
}
