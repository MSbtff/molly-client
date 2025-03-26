import React from "react";
import { formatPrice } from "../api/formatPrice";

interface CartOrderButtonProps {
  totalAmount: number;
  totalItems: number;
  handleOrder: () => void;
}

export const CartOrderButton: React.FC<CartOrderButtonProps> = ({
  totalAmount,
  totalItems,
  handleOrder,
}) => {
  return (
    <div className="w-full bg-white border-t border-gray-200 py-4 px-4 sm:px-6 md:px-8 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* 금액 정보 */}
        <div className="flex flex-col xs:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-1 xs:gap-2 text-sm sm:text-base">
            <span className="font-medium">총 상품금액</span>
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

        {/* 주문 버튼 */}
        <button
          onClick={handleOrder}
          disabled={totalItems === 0}
          className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white text-sm sm:text-base md:text-lg font-medium transition-colors
          ${
            totalItems === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#EB6455] hover:bg-red-400"
          }`}
        >
          {totalItems === 0
            ? "상품을 선택해주세요"
            : `${formatPrice(totalAmount)}원 주문하기`}
        </button>
      </div>
    </div>
  );
};
