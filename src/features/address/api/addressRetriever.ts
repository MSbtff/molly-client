'use server';

import {cookies} from 'next/headers';

export default async function addressRetriever() {
  const authToken = (await cookies()).get('Authorization')?.value;

  if (!authToken) {
    throw new Error('인증되지 않은 요청입니다.');
  }

  try {
    const res = await fetch(`${process.env.NEXT_SERVER_URL}/addresses`, {
      method: 'GET',
      headers: {
        Authorization: `${authToken}`,
      },
    });

    console.log(res.status);

    if (!res.ok) {
      throw new Error('주소 정보를 가져오는데 실패했습니다.');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
