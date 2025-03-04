'use server';

import {AddressData} from './addrssAdd';
import {getValidAuthToken} from '@/shared/util/lib/authTokenValue';

export default async function addressUpdate(
  addressId: number,
  form: AddressData
) {
  const authToken = getValidAuthToken();

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
