'use server';

import {getValidAuthToken} from '@/shared/util/lib/authTokenValue';

export default async function addressRetriever() {
  const authToken = getValidAuthToken();

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
