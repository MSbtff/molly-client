'use server';

import {cookies} from 'next/headers';

export default async function orderComplete() {
  const authToken = (await cookies()).get('Authorization');

  if (!authToken) {
    throw new Error('유효하지 않은 토큰 입니다.');
  }

  try {
    const res = await fetch(`${process.env.NEXT_SERVER_URL}/orders/user`, {
      method: 'GET',
      headers: {
        Authorization: `${authToken}`,
      },
    });
    console.log(res.status);
    if (!res.ok) {
      throw new Error('주문 정보를 가져오지 못했습니다.');
    }

    return res.json();
  } catch (error) {
    console.error(error);
  }
}
