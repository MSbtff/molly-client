'use client';

import {useSearchParams} from 'next/navigation';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import TossRequest from './tossRequest';
import {useOrderStore} from '@/app/provider/OrderStore';

export function TestSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {orders, setOrders} = useOrderStore();

  // orders가 없는 경우 처리
  if (!orders || orders.length === 0) {
    return <div>주문 정보를 찾을 수 없습니다.</div>;
  }

  const {orderId, userPoint: point} = orders[0];
  const {
    roadAddress,
    numberAddress,
    addrDetail,
    recipient,
    recipientCellPhone,
  } = orders[0].defaultAddress;

  useEffect(() => {
    const paymentKey = searchParams.get('paymentKey') ?? '';
    const amount = searchParams.get('amount') ?? '0';
    const tossOrderId = searchParams.get('orderId') ?? '';
    const paymentType = searchParams.get('paymentType') ?? '';

    async function processPayment() {
      try {
        // TossRequest 직접 호출
        const data = await TossRequest(
          orderId,
          tossOrderId,
          amount,
          point,
          paymentKey,
          paymentType,
          recipientCellPhone,
          recipient,
          addrDetail,
          numberAddress,
          roadAddress
        );

        if (data.success) {
          // 성공 시 처리
          console.log(data);
          setOrders([]);
          localStorage.removeItem('order-storage');
          router.push('/');
        } else {
          // 실패 시 처리
          router.push(`/fail?message=${data.message}`);
        }
      } catch (error) {
        console.error('Payment confirmation failed:', error);
        router.push('/fail?message=결제 처리 중 오류가 발생했습니다');
      }
    }

    if (paymentKey && amount && tossOrderId) {
      processPayment();
    }
  }, [
    router,
    searchParams,
    orders,
    orderId,
    point,
    recipientCellPhone,
    recipient,
    addrDetail,
    numberAddress,
    roadAddress,
  ]);

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>결제 성공</h2>
        <p>{`주문번호: ${searchParams.get('orderId')}`}</p>
        <p>{`결제 금액: ${Number(
          searchParams.get('amount')
        ).toLocaleString()}원`}</p>
        <p>{`paymentKey: ${searchParams.get('paymentKey')}`}</p>
      </div>
    </div>
  );
}
