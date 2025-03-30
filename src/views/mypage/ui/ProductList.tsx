'use client';

import Image from 'next/image';
import {useState} from 'react';
import {PurchasePageProps} from './PurchasePage';

type DeliveryStatus = 'READY' | 'SHIPPING' | 'COMPLETED';

export const ProductList = ({orders}: PurchasePageProps) => {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const statusMap = {
    READY: '배송대기',
    SHIPPING: '배송중',
    COMPLETED: '배송완료',
  };

  return (
    <div className="w-[1000px] flex flex-col gap-4">
      <div className="grid grid-cols-6 gap-4 p-4 bg-gray-100 font-bold">
        <div>이미지</div>
        <div>상품명</div>
        <div>상품개수</div>
        <div>주문일자</div>
        <div>결제금액</div>
        <div>주문상태</div>
      </div>

      {orders.map((order, index) => {
        const day = new Date(order.orderedAt);
        const orderDay = `${day.getMonth() + 1}월 ${day.getDate()}일`;
        const status =
          statusMap[order.deliveryStatus as DeliveryStatus] || '결제완료';

        // orderDetails가 비어있는지 확인
        const hasOrderDetails =
          order.orderDetails && order.orderDetails.length > 0;
        // 첫 번째 상품 정보 (없는 경우 빈 객체로 대체)
        const mainProduct = hasOrderDetails ? order.orderDetails[0] : null;
        const otherProducts =
          hasOrderDetails && order.orderDetails.length > 1
            ? ` 외 ${order.orderDetails.length - 1}개`
            : '';

        return (
          <div key={order.tossOrderId}>
            <div
              className="grid grid-cols-6 gap-4 p-4 border-b cursor-pointer hover:bg-gray-50"
              onClick={() =>
                setSelectedOrder(selectedOrder === index ? null : index)
              }
            >
              <div className="w-16 h-16 relative">
                {mainProduct ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${mainProduct.image}?w=80&h=80&r=false`}
                    alt={mainProduct.productName}
                    fill
                    className="object-cover rounded-md"
                    loading="eager"
                    unoptimized={true}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-xs text-gray-500">이미지 없음</span>
                  </div>
                )}
              </div>
              <div className="truncate">
                {mainProduct
                  ? mainProduct.productName + otherProducts
                  : '상품 정보 없음'}
              </div>
              <div>{order.orderDetails.length}개</div>
              <div>{orderDay}</div>
              <div>{order.paymentAmount.toLocaleString()}원</div>
              <div>{status}</div>
            </div>

            {selectedOrder === index && hasOrderDetails && (
              <div className="p-4 bg-gray-50">
                {order.orderDetails.map((detail, detailIndex) => (
                  <div
                    key={`${order.tossOrderId}-${detailIndex}`}
                    className="flex justify-between items-center p-4 border-b"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${detail.image}?w=80&h=80&r=false`}
                        alt={detail.productName}
                        width={80}
                        height={80}
                        loading="eager"
                        unoptimized={true}
                      />
                      <div className="flex flex-col">
                        <strong>{detail.productName}</strong>
                        <p className="text-sm text-gray-600">
                          {detail.size} / {detail.color}
                        </p>
                        <p className="text-sm text-gray-600">
                          {detail.quantity}개 x {detail.price.toLocaleString()}
                          원
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-[18px] font-bold text-right">
                  총 {order.orderDetails.length}개 상품
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
