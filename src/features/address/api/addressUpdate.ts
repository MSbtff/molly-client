'use server';

import {cookies} from 'next/headers';
import {AddressData} from './addrssAdd';

export default async function addressUpdate(
  addressId: number,
  form: AddressData
) {
  const authToken = (await cookies()).get('Authorization')?.value;

  if (!authToken) {
    throw new Error('인증되지 않은 요청입니다.');
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_SERVER_URL}/addresses/${addressId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      }
    );

    console.log('주소업데이트:', res.status);

    if (!res.ok) {
      throw new Error('주소 정보를 업데이트하는데 실패했습니다.');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
