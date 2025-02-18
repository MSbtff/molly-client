import {NextRequest, NextResponse} from 'next/server';

export async function DELETE(
  req: NextRequest,
  {params}: {params: {id: string}}
) {
  const authToken = req.cookies.get('Authorization');
  const authorization = req.headers.get('Authorization');

  console.log(authorization);

  if (!authToken) {
    return NextResponse.json({message: 'Not authorized'}, {status: 401});
  }

  const token = authToken.value.startsWith('Bearer ')
    ? authToken.value
    : `Bearer ${authToken.value}`;

  try {
    const response = await fetch(
      `http://3.35.175.203:8080/product/${params.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {message: '상품 삭제에 실패했습니다.'},
        {status: 400}
      );
    }

    return NextResponse.json({message: '삭제 성공'});
  } catch (error) {
    console.error('Error:', error);
    console.log('상품 삭제에 실패했습니다.');
    return NextResponse.json(
      {message: '상품 삭제에 실패했습니다.'},
      {status: 400}
    );
  }
}
