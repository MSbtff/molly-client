"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/shared/ui/Button";

export interface CompletedOrderInfo {
  orderNumber: string;
  totalAmount: number;
  items: number;
  confirmedAt: string;
}

interface BuyCompleteProps {
  orderInfo: CompletedOrderInfo;
}

export const BuyComplete = ({ orderInfo }: BuyCompleteProps) => {
  return (
    <div className="min-h-screen w-full bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center border-b border-gray-200 py-8">
          <CheckCircle className="mb-4 h-20 w-20 text-green-500" />
          <h1 className="text-3xl font-bold text-gray-800">
            결제가 완료되었습니다
          </h1>
          <p className="mt-2 text-gray-600">
            결제 승인이 완료되어 주문이 정상적으로 접수되었습니다.
          </p>
        </div>

        <div className="py-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">주문 정보</h2>

          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-100 py-3">
              <span className="text-gray-600">주문번호</span>
              <span className="font-medium">{orderInfo.orderNumber}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-3">
              <span className="text-gray-600">주문 상품</span>
              <span className="font-medium">{orderInfo.items}개 상품</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-3">
              <span className="text-gray-600">결제 시간</span>
              <span className="font-medium">
                {new Date(orderInfo.confirmedAt).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-gray-600">결제 금액</span>
              <span className="text-xl font-bold text-primary">
                {orderInfo.totalAmount.toLocaleString("ko-KR")}원
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/mypage" className="w-full sm:w-auto">
            <Button className="w-full hover:text-gray-500">주문내역 보기</Button>
          </Link>
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full hover:text-gray-500">쇼핑 계속하기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
