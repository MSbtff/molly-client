'use server';

import {getValidAuthToken} from '@/shared/util/lib/authTokenValue';
import {post} from '@/shared/util/lib/fetchAPI';

export interface AddressData {
  recipient: string;
  recipientCellPhone: string;
  roadAddress: string;
  numberAddress: string;
  addrDetail: string;
  defaultAddr: boolean;
}

export default async function AddressAdd(form: AddressData) {
  // const authToken = await getValidAuthToken();

  // try {
  //   const res = await fetch(`${process.env.NEXT_SERVER_URL}/addresses`, {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `${authToken}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(form),
  //   });
  //   console.log('주소추가:', res.status);
  //   console.log(form);
  //   if (!res.ok) {
  //     throw new Error('주소 정보를 추가하는데 실패했습니다.');
  //   }
  //   const data = await res.json();
  //   return data;
  // } catch (error) {
  //   console.error(error);
  // }

  try {
    const products = await post<AddressData>('/addresses', form);
    return products;
  } catch (error) {
    console.error(error);
  }
}
