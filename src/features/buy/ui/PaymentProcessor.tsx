'use client';

import {useSearchParams} from 'next/navigation';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import TossRequest from '@/features/buy/api/tossRequest';
import {useOrderStore} from '@/app/provider/OrderStore';

export default function PaymentProcessor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {orders, setOrders} = useOrderStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      const storedOrders = localStorage.getItem('order-storage');
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        console.log('현재 로컬스토리지 데이터:', parsedOrders); // 디버깅용

        // 스토어 상태 복원
        if (
          parsedOrders.state &&
          parsedOrders.state.orders &&
          parsedOrders.state.orders.length > 0
        ) {
          setOrders(parsedOrders.state.orders); // Zustand 스토어 상태 복원
        }
      }
    }
  }, [isHydrated, setOrders]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    const paymentKey = searchParams.get('paymentKey') ?? '';
    const amount = searchParams.get('amount') ?? '0';
    const tossOrderId = searchParams.get('orderId') ?? '';
    const paymentType = searchParams.get('paymentType') ?? '';

    // orders가 없거나 필수 파라미터가 없는 경우 처리
    if (!orders || orders.length === 0) {
      console.log('주문 정보가 없습니다.');
      return;
    }

    const orderNumber = orders.length - 1;

    const {orderId, userPoint: point} = orders[orderNumber];
    const {
      roadAddress,
      numberAddress,
      addrDetail,
      recipient,
      recipientCellPhone,
    } = orders[orderNumber].defaultAddress;

    async function processPayment() {
      try {
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

        console.log(data.message);

        if (data.success) {
          setOrders([]);
          localStorage.removeItem('order-storage');
          router.push('/buy/success');
        } else {
          router.push(`/fail?message=${data.message}`);
          setOrders([]);
          localStorage.removeItem('order-storage');
        }
      } catch (error) {
        console.error('Payment confirmation failed:', error);
        router.push('/fail?message=결제 처리 중 오류가 발생했습니다');
      }
    }

    if (paymentKey && amount && tossOrderId) {
      processPayment();
    }
  }, [router, searchParams, orders]);

  // 로딩 상태 표시
  if (!orders || orders.length === 0) {
    return (
      <div className="result wrapper">
        <div className="box_section">
          <h2>주문 정보를 불러오는 중...</h2>
          <p>잠시만 기다려주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>결제 진행 중...</h2>
        <p>잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
