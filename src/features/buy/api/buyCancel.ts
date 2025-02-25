'use server';

import {cookies} from 'next/headers';

// 주문취소
export default async function buyCancel(orderId: number) {
  const authToken = (await cookies()).get('Authorization')?.value;

  if (!authToken) {
    throw new Error('인증되지 않은 요청입니다.');
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_SERVER_URL}/order/${orderId}/cancel`,
      {
        method: 'POST',
        headers: {
          Authorization: `${authToken}`,
        },
      }
    );
    console.log(res.status);
  } catch (error) {
    console.error('결제 취소 실패:', error);
    throw error;
  }
}
