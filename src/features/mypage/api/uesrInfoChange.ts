'use server';

import {EditableUserInfo} from '@/views/mypage/ui/MypageContainer';
import {cookies} from 'next/headers';

export default async function userInfoChange(newValue: EditableUserInfo) {
  const authToken = (await cookies()).get('Authorization')?.value;

  if (!authToken) {
    throw new Error('인증되지 않은 요청입니다.');
  }

  try {
    const res = fetch(`${process.env.NEXT_SERVER_URL}/user`, {
      method: 'PUT',
      headers: {
        Authorization: `${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newValue),
    });
    console.log(newValue);
    console.log((await res).status);
  } catch (error) {
    console.error(error);
  }
}
