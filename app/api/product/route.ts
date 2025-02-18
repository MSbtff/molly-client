import {NextRequest, NextResponse} from 'next/server';

export async function POST(req: NextRequest) {
  const authToken = req.cookies.get('Authorization');

  if (!authToken) {
    return NextResponse.json({message: 'Not authorized'}, {status: 401});
  }

  try {
    const formData = await req.formData();

    const response = await fetch('http://3.35.175.203:8080/product', {
      method: 'POST',
      headers: {
        Authorization: authToken.value,
      },
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      console.error('Error:', response);
      console.log('상품 등록에 실패했습니다.', response.statusText);
      return NextResponse.json(
        {message: '상품 등록에 실패했습니다.'},
        {status: 400}
      );
    }

    const data = await response.json();
    console.log('성공했습니다.', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    console.log('서버 에러가 발생했습니다.');
    return NextResponse.json(
      {message: '서버 에러가 발생했습니다.'},
      {status: 500}
    );
  }
}
