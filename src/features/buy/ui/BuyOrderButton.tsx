"use client";

import React, { useState } from "react";

interface OrderDetail {
  productName: string;
}

interface Order {
  tossOrderId: string;
  orderDetails: OrderDetail[];
  totalAmount: number;
}

interface TossPaymentsWidget {
  requestPayment: (params: {
    orderId: string;
    orderName: string;
    successUrl: string;
    failUrl: string;
  }) => Promise<void>;
}

interface BuyOrderButtonProps {
  widgets: TossPaymentsWidget | null;
  ready: boolean;
  currentOrder: Order | null;
}

export const BuyOrderButton = ({
  widgets,
  ready,
  currentOrder,
}: BuyOrderButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      if (!widgets || !currentOrder) {
        return;
      }

      await widgets.requestPayment({
        orderId: currentOrder.tossOrderId,
        orderName: currentOrder.orderDetails[0].productName,
        successUrl: window.location.origin + "/buy/success",
        failUrl: window.location.origin + "/fail",
      });
    } catch (error) {
      console.error("Payment request failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 가격 형식화 함수
  const formatPrice = (price: number): string => {
    return price.toLocaleString("ko-KR");
  };

  const totalAmount = currentOrder?.totalAmount || 0;
  const totalItems = currentOrder?.orderDetails?.length || 0;

  return (
    <div className="w-full bg-white border-t border-gray-200 py-4 px-4 sm:px-6 md:px-8 shadow-md sticky bottom-0 z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* 금액 정보 */}
        <div className="flex flex-col xs:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-1 xs:gap-2 text-sm sm:text-base">
            <span className="font-medium">총 결제금액</span>
            <span className="font-bold text-lg sm:text-xl">
              {formatPrice(totalAmount)}원
            </span>
          </div>
          <div className="text-sm text-gray-500 hidden xs:block">
            ({totalItems}개 상품)
          </div>
        </div>

        {/* 모바일에서 상품 갯수 별도 표시 */}
        <div className="text-sm text-gray-500 xs:hidden w-full text-center">
          ({totalItems}개 상품)
        </div>

        {/* 결제 버튼 */}
        <button
          onClick={handlePayment}
          disabled={!ready || isLoading || totalAmount === 0}
          className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white text-sm sm:text-base md:text-lg font-medium transition-colors
          ${
            !ready || isLoading || totalAmount === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#EB6455] hover:bg-red-400"
          }`}
        >
          {isLoading
            ? "처리 중..."
            : !ready
            ? "결제 준비 중..."
            : totalAmount === 0
            ? "결제할 상품이 없습니다"
            : `${formatPrice(totalAmount)}원 결제하기`}
        </button>
      </div>
    </div>
  );
};
