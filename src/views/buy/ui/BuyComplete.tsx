"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { useEncryptStore } from "@/app/provider/EncryptStore";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const BuyComplete = () => {
  const { orders } = useEncryptStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState<{
    orderNumber: string;
    totalAmount: string;
    items: number;
    quantity: number[];
  } | null>(null);

  useEffect(() => {
    // 1. orders 배열 확인
    if (!orders || orders.length === 0) {
      console.log("orders 배열이 비어 있습니다");

      // 2. URL 파라미터에서 정보 추출 시도
      const orderId = searchParams.get("orderId");
      const amount = searchParams.get("amount");

      if (orderId && amount) {
        // URL 파라미터로 정보 구성
        setOrderInfo({
          orderNumber: orderId,
          totalAmount: Number(amount).toLocaleString(),
          items: 1, // 기본값
          quantity: [1], // 기본값
        });
      } else {
        // 3초 후 홈페이지로 리다이렉트
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
      return;
    }

    try {
      // 3. orders 배열이 있는 경우 정보 추출
      const latestOrder = orders[orders.length - 1];

      if (!latestOrder || !latestOrder.orderId || !latestOrder.orderDetails) {
        throw new Error("주문 정보가 불완전합니다");
      }

      // 주문 정보 설정
      setOrderInfo({
        orderNumber: String(latestOrder.orderId),
        totalAmount: latestOrder.totalAmount.toLocaleString(),
        items: latestOrder.orderDetails.length,
        quantity: latestOrder.orderDetails.map((item) => item.quantity),
      });
    } catch (error) {
      console.error("주문 정보 처리 중 오류:", error);
    }
  }, [orders, router, searchParams]);

  // 4. 주문 정보가 없는 경우 대체 UI 표시
  if (!orderInfo) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            주문 정보를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-6">곧 홈페이지로 이동합니다...</p>
          <Link href="/" className="inline-block">
            <Button>홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

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

            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">결제 시간</span>
              <span className="font-medium">
                {new Date().toLocaleString("ko-KR", {
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
                {orderInfo.totalAmount}원
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
