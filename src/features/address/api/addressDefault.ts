'use server';

import {getValidAuthToken} from '@/shared/util/lib/authTokenValue';

export default async function addressDefault(id: number) {
  const authToken = getValidAuthToken();

  try {
    const res = fetch(
      `${process.env.NEXT_SERVER_URL}/addresses/${id}/default`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `${authToken}`,
        },
      }
    );

    console.log((await res).status);
    if (!res) {
      throw new Error('기본 배송지 설정에 실패했습니다.');
    }
    return (await res).json();
  } catch (error) {
    console.error(error);
  }
}
