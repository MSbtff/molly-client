"use client";

import { BuyOrderButton } from "@/features/buy/ui/BuyOrderButton";
import { ChevronRight } from "lucide-react";
import { TestCheckoutPage } from "@/features/buy/api/TestCheckoutPage";
import { CartProductInfo } from "@/views/cart/ui/CartProductInfo";
import { BuyAddress } from "./BuyAddress";
import { useEffect, useState, useMemo } from "react";
import buyCancel from "@/features/buy/api/buyCancel";
import { useRouter } from "next/navigation";
import { useEncryptStore } from "@/app/provider/EncryptStore";
import { TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";
import { PointUse } from "@/features/buy/ui/PointUse";
import { BuySkeleton } from "./BuySkeleton";

// 결제페이지
export default function BuyContainer() {
  const router = useRouter();
  const { orders, getDecryptedOrders, setOrders } = useEncryptStore();
  const decryptedOrders = getDecryptedOrders();
  const orderNumber = decryptedOrders?.length - 1;
  const orderId = orders?.[orderNumber]?.orderId;

  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [usedPoint, setUsedPoint] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    // 타이머 없이 바로 로딩 완료 처리
    setIsLoading(false);
  }, []);

  const handleWidgetsReady = ({
    widgets,
    ready,
  }: {
    widgets: TossPaymentsWidgets;
    ready: boolean;
  }) => {
    setWidgets(widgets);
    setReady(ready);
  };

  // 주문이 없을 때 카트로 리다이렉트
  useEffect(() => {
    if (!orders?.length) {
      router.replace("/");
      return;
    }
  }, [orders, router]);

  // 뒤로가기 처리
  useEffect(() => {
    window.history.pushState({ fromBuy: true }, "", window.location.href);

    const handlePopState = async () => {
      // history.state를 체크하여 뒤로가기인 경우에만 처리
      const confirmed = window.confirm("결제를 취소하겠습니까?");

      // 뒤로가기로 인한 popstate 이벤트인 경우
      if (confirmed && orderId) {
        try {
          await buyCancel(orderId);
          setOrders([]);
          window.location.href = "/cart";
        } catch (error) {
          console.error("결제 취소 실패:", error);
        }
      } else {
        // 취소 시 현재 페이지 유지
        window.history.pushState({ fromBuy: true }, "", window.location.href);
      }
    };

    // 초기 진입 시 state 설정
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [orderId, setOrders, router]);

  // 총 주문 건수 계산
  const totalItems = decryptedOrders?.[orderNumber]?.orderDetails?.length || 0;

  // 주문 정보 계산
  const currentOrder = decryptedOrders?.[orderNumber];
  const totalPrice =
    currentOrder?.orderDetails?.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) || 0;

  const handlePointChange = (point: number) => {
    setUsedPoint(point);
  };

  // 컨텐츠 높이 미리 계산 (CLS 감소)
  const contentHeight = useMemo(() => {
    const itemCount = decryptedOrders?.[orderNumber]?.orderDetails?.length || 0;
    return 80 + Math.min(itemCount, 3) * 100;
  }, [decryptedOrders, orderNumber]);

  return (
    <div className="w-full flex items-center flex-col">
      <div className="w-full h-[75px] flex justify-center items-center font-bold text-2xl border">
        배송/결제
      </div>

      {!isClient || isLoading ? (
        <BuySkeleton />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center bg-[#EFF2F1] pb-20"
          // 사전에 계산된 높이로 콘텐츠 공간 확보 - CLS 방지
          style={{ minHeight: `${contentHeight}px` }}
        >
          {/* 배송 주소 */}
          <BuyAddress userInfo={decryptedOrders[orderNumber]} />

          {/* 주문 상품 섹션 - 스크롤 없이 모든 상품 표시 */}
          <div className="mt-4 xs:w-[480px] sm:w-[700px] flex flex-col bg-white rounded-[10px] border p-4">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">주문 상품 및 쿠폰</h2>
              <div>총 {totalItems}건</div>
            </div>

            {/* 상품 목록 - 스크롤 없이 모두 표시 */}
            <div className="flex flex-col divide-y">
              {decryptedOrders?.length > 0 &&
                decryptedOrders[orderNumber].orderDetails?.map(
                  (item, index) => (
                    <CartProductInfo
                      key={item.itemId}
                      cartId={0}
                      itemId={item.itemId}
                      productId={item.productId}
                      brandName={item.brandName}
                      productName={item.productName}
                      price={item.price}
                      quantity={item.quantity}
                      size={item.size}
                      color={item.color}
                      url={item.image}
                      priority={index < 1} // 처음 2개 이미지만 빠르게 로드
                      hideShippingInfo={true}
                    />
                  )
                )}
            </div>

            <div className="mt-4 w-full h-9 rounded-[10px] border flex justify-between items-center p-2">
              <div>요청사항 없음</div>
              <ChevronRight size={20} />
            </div>
          </div>

          <PointUse
            userPoint={currentOrder?.userPoint || 0}
            totalAmount={totalPrice}
            onPointChange={handlePointChange}
            ready={ready}
          />

          <div className="mt-4 xs:w-[480px] sm:w-[700px] min-h-64 flex flex-col bg-white rounded-[10px] border p-2">
            <TestCheckoutPage onWidgetsReady={handleWidgetsReady} />
          </div>

          <div className="mt-4 xs:w-[480px] sm:w-[700px] flex flex-col bg-white rounded-t-[10px] border p-4">
            <div className="font-bold mb-2">최종 주문 정보</div>
            <div className="w-full flex justify-between py-1">
              <div>구매가</div>
              <div>{totalPrice.toLocaleString()}원</div>
            </div>
            <div className="w-full flex justify-between py-1">
              <div>배송비</div>
              <div>무료</div>
            </div>
            <div className="w-full flex justify-between py-1">
              <div>쿠폰 사용</div>
              <div>-</div>
            </div>
            <div className="w-full flex justify-between py-1">
              <div>포인트 사용</div>
              <div>
                {usedPoint > 0 ? `-${usedPoint.toLocaleString()}원` : "-"}
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-gray-300 xs:w-[480px] sm:w-[700px] rounded-b-[10px] px-4 py-2">
            <div className="font-bold text-lg">총 결제금액</div>
            <div className="text-right font-bold">
              {(totalPrice - (currentOrder?.pointUsage || 0)).toLocaleString()}
              원
            </div>
          </div>

          <div className="xs:w-[480px] sm:w-full mt-4">
            <BuyOrderButton
              widgets={widgets}
              ready={ready}
              currentOrder={currentOrder}
            />
          </div>
        </div>
      )}
    </div>
  );
}
