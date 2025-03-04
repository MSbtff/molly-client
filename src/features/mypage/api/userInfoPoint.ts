import {cookies} from 'next/headers';

export default async function userInfoPoint() {
  const authToken = (await cookies()).get('Authorization')?.value;

  if (!authToken) {
    throw new Error('인증되지 않은 요청입니다.');
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_SERVER_URL}/user/info/summary?include-point=true`,
      {
        method: 'GET',
        headers: {
          Authorization: `${authToken}`,
        },
      }
    );

    console.log(res.status);

    if (!res.ok) {
      throw new Error('유저 정보를 가져오는데 실패했습니다.');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
