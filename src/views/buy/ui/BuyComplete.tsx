'use client';

import Link from 'next/link';
import {CheckCircle} from 'lucide-react';
import {Button} from '@/shared/ui/Button';
import {useEncryptStore} from '@/app/provider/EncryptStore';

export const BuyComplete = () => {
  const {orders, setOrders} = useEncryptStore();
  const {orderId, totalAmount, orderedAt} = orders[orders.length - 1];
  const item = orders[orders.length - 1].orderDetails.length;
  // 실제 구현 시 이 데이터는 API에서 받아오거나 파라미터로 전달받아야 함
  const orderInfo = {
    orderNumber: orderId,
    totalAmount: totalAmount.toLocaleString(),
    paymentTime: orderedAt.slice(0, 16),
    items: item,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
        {/* 상단 섹션 - 성공 메시지 */}
        <div className="flex flex-col items-center justify-center py-8 border-b border-gray-200">
          <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">
            결제가 완료되었습니다
          </h1>
          <p className="text-gray-600 mt-2">
            주문이 성공적으로 접수되었습니다. 아래 주문 내역을 확인해 주세요.
          </p>
        </div>

        {/* 주문 정보 섹션 */}
        <div className="py-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            주문 정보
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">주문번호</span>
              <span className="font-medium">{orderInfo.orderNumber}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">주문 상품</span>
              <span className="font-medium">{orderInfo.items}개 상품</span>
            </div>

            {/* <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">결제 수단</span>
              <span className="font-medium">{orderInfo.paymentMethod}</span>
            </div> */}

            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">결제 시간</span>
              <span className="font-medium">{orderInfo.paymentTime}</span>
            </div>

            <div className="flex justify-between py-3">
              <span className="text-gray-600">결제 금액</span>
              <span className="text-xl font-bold text-primary">
                {orderInfo.totalAmount.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>

        {/* 버튼 섹션 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/mypage" className="w-full sm:w-auto">
            <Button className="w-full hover:text-gray-500">
              주문내역 보기
            </Button>
          </Link>

          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full hover:text-gray-500">
              쇼핑 계속하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
