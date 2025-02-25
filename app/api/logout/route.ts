import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';

export async function POST() {
  const cookiesStore = cookies();

  (await cookiesStore).delete('Authorization');

  const res = NextResponse.json({message: '로그아웃 됐습니다.'}, {status: 200});
  res.cookies.set('Authorization', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(0),
  });

  return res;
}
