import {cookies} from 'next/headers';

export default async function orderRetriever() {
  const authToken = (await cookies()).get('Authorization')?.value;

  if (!authToken) {
    throw new Error('인증되지 않은 요청입니다.');
  }

  try {
    const res = await fetch(`${process.env.NEXT_SERVER_URL}/orders/user`, {
      method: 'GET',
      headers: {
        Authorization: `${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('응답 상태:', res.status);
    console.log('응답 상태 텍스트:', res.statusText);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `주문 정보를 가져오는데 실패했습니다: ${
          errorData.message || res.status
        }`
      );
    }

    const data = await res.json();

    // 응답 데이터 구조 로깅
    console.log('API 응답 데이터 구조:', JSON.stringify(data, null, 2));

    // 첫 번째 주문이 있는 경우, 구조 자세히 확인
    if (data.orders && data.orders.length > 0) {
      console.log('첫 번째 주문:', JSON.stringify(data.orders[0], null, 2));

      // 첫 번째 주문의 상세 정보가 있는지 확인
      if (
        data.orders[0].orderDetails &&
        data.orders[0].orderDetails.length > 0
      ) {
        console.log(
          '첫 번째 상세 주문:',
          JSON.stringify(data.orders[0].orderDetails[0], null, 2)
        );
      } else {
        console.log('주문 상세 정보가 없거나 빈 배열입니다.');
      }
    } else {
      console.log('주문 데이터가 없거나 빈 배열입니다.');
    }

    // image 필드가 있는지 확인
    if (
      data.orders &&
      data.orders.length > 0 &&
      data.orders[0].orderDetails &&
      data.orders[0].orderDetails.length > 0
    ) {
      console.log(
        '이미지 필드 존재 여부:',
        'image' in data.orders[0].orderDetails[0]
      );
      console.log('이미지 필드 값:', data.orders[0].orderDetails[0].image);
    }

    // 일단 빈 데이터로 초기화하여 오류 방지
    if (!data.orders) {
      data.orders = [];
    }

    return data;
  } catch (error) {
    console.error('주문 정보 가져오기 오류:', error);
    // 에러가 발생해도 빈 객체를 반환하여 화면이 깨지지 않도록 함
    return {orders: []};
  }
}
