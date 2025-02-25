'use client';

import {loadTossPayments} from '@tosspayments/tosspayments-sdk';
import {TossPaymentsWidgets} from '@tosspayments/tosspayments-sdk';
import {useEffect, useState} from 'react';
import {useEncryptStore} from '@/app/provider/EncryptStore';

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT as string;
const customerKey = process.env.NEXT_PUBLIC_TOSS_CUSTOMER as string;

interface TestCheckoutPageProps {
  onWidgetsReady: (params: {
    widgets: TossPaymentsWidgets;
    ready: boolean;
  }) => void;
}
// 토스 결제 위젯 테스트 페이지
export function TestCheckoutPage({onWidgetsReady}: TestCheckoutPageProps) {
  const {orders} = useEncryptStore();
  const [amount, setAmount] = useState({
    currency: 'KRW',
    value: 0,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 현재 주문 정보 가져오기
  const currentOrder =
    orders && orders.length > 0 ? orders[orders.length - 1] : null;

  useEffect(() => {
    // 주문 정보가 로드될 때까지 대기
    if (currentOrder) {
      setIsLoading(false);
    }
  }, [currentOrder]);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const widgets = tossPayments.widgets({
          customerKey,
        });
        setWidgets(widgets);
      } catch (error) {
        console.error('Payment widgets initialization failed:', error);
      }
    }

    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (!widgets || !currentOrder) {
        return;
      }

      try {
        const totalAmount = currentOrder.totalAmount;
        setAmount({
          currency: 'KRW',
          value: totalAmount,
        });

        await widgets.setAmount({
          currency: 'KRW',
          value: totalAmount,
        });

        await Promise.all([
          widgets.renderPaymentMethods({
            selector: '#payment-method',
            variantKey: 'DEFAULT',
          }),
          widgets.renderAgreement({
            selector: '#agreement',
            variantKey: 'AGREEMENT',
          }),
        ]);

        setReady(true);
      } catch (error) {
        console.error('Payment widgets rendering failed:', error);
      }
    }

    renderPaymentWidgets();
  }, [widgets, currentOrder]);

  useEffect(() => {
    if (widgets) {
      widgets.setAmount(amount);
    }
  }, [widgets, amount]);

  useEffect(() => {
    if (widgets && ready) {
      onWidgetsReady({widgets, ready});
    }
  }, [widgets, ready, onWidgetsReady]);

  if (isLoading) {
    return <div>주문 정보를 불러오는 중...</div>;
  }

  if (!currentOrder) {
    return <div>주문 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="wrapper">
      <div className="box_section">
        <div id="payment-method" />
        <div id="agreement" />
        {/* <div className="w-full flex justify-between">
          <div className="">
            <label htmlFor="coupon-box">
              <input
                id="coupon-box"
                type="checkbox"
                aria-checked="true"
                disabled={!ready}
                onChange={(event) => {
                  setAmount((prev) => ({
                    ...prev,
                    value: event.target.checked
                      ? prev.value - 5_000
                      : prev.value + 5_000,
                  }));
                }}
              />
              <span>포인트 사용</span>
            </label>
          </div>
        </div> */}
      </div>
    </div>
  );
}
