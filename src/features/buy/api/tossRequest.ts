'use server';

import {cookies} from 'next/headers';

interface DeliveryInfo {
  receiver_name: string;
  receiver_phone: string;
  road_address: string;
  number_address: string;
  addr_detail: string;
}

export default async function TossRequest(
  userOrderId: number,
  tossOrderId: string,
  amount: string,
  point: number,
  paymentKey: string,
  paymentType: string,
  receiver_phone: string,
  receiver_name: string,
  addr_detail: string,
  number_address: string,
  road_address: string
) {
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
        orderId: userOrderId,
        tossOrderId,
        paymentKey,
        amount,
        paymentType,
        point,
        delivery: {
          receiver_name,
          receiver_phone,
          road_address,
          number_address,
          addr_detail,
        },
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        message: errorData.message || '결제 실패',
      };
    }

    const data = await res.json();
    return {
      success: true,
      data,
      message: '결제가 성공적으로 완료되었습니다.',
    };
  } catch (error) {
    console.error('결제 실패:', error);
    throw error;
  }
}
