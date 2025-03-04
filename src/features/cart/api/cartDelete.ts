'use server';

import {cookies} from 'next/headers';

export default async function cartDelete(id: number[] | number) {
  const authToken = (await cookies()).get('Authorization')?.value;

  if (!authToken) {
    throw new Error('인증되지 않음 요청입니다.');
  }

  console.log(id);

  try {
    const res = await fetch(`${process.env.NEXT_SERVER_URL}/cart`, {
      method: 'DELETE',
      headers: {
        Authorization: `${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Array.isArray(id) ? id : [id]),
    });

    if (!res.ok) {
      throw new Error('장바구니 삭제 실패');
    }

    return;
  } catch (error) {
    console.error('장바구니 삭제 실패:', error);
    throw error;
  }
}
