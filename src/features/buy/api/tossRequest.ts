import {cookies} from 'next/headers';

export default async function TossRequest() {
  const authToken = (await cookies()).get('Authorization')?.value;

  if (!authToken) {
    throw new Error('인증되지 않음 요청입니다.');
  }

  try {
    const res = await fetch(`${process.env.NEXT_SERVER_URL}/payment/confirm`, {
      method: 'POST',
      headers: {
        Authorization: `${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: 10,
        tossOrderId: 'ORD-20250213132349-6572',
        paymentKey: 'ORD-20250218131035-3409',
        amount: 112242,
        paymentType: 'NORMAL',
        point: 5000,
        delivery: {
          receiver_name: 'momo',
          receiver_phone: '010-5134-1111',
          road_address: '판교판교',
          number_address: '12345',
          addr_detail: '배송 조심히 해주세요',
        },
      }),
    });

    if (!res.ok) {
      throw new Error('결제 실패');
    }

    return await res.json();
  } catch (error) {
    console.error('결제 실패:', error);
    throw error;
  }
}
