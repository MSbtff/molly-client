'use server';

import {cookies} from 'next/headers';

export interface AddressData {
  recipient: string;
  recipientCellPhone: string;
  roadAddress: string;
  numberAddress: string;
  addrDetail: string;
  defaultAddr: boolean;
}

export default async function AddressAdd(form: AddressData) {
  const authToken = (await cookies()).get('Authorization')?.value;
  if (!authToken) {
    throw new Error('인증되지 않은 요청입니다.');
  }
  try {
    const res = await fetch(`${process.env.NEXT_SERVER_URL}/addresses`, {
      method: 'POST',
      headers: {
        Authorization: `${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    console.log('주소추가:', res.status);
    console.log(form);
    if (!res.ok) {
      throw new Error('주소 정보를 추가하는데 실패했습니다.');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
