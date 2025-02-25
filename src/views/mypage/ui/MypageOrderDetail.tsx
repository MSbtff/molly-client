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
    <div className="flex flex-col gap-4">
      {orders.map((order, index) => {
        const day = new Date(order.orderedAt);
        const orderDay = `${day.getMonth() + 1}월 ${day.getDate()}일`;
        const status =
          statusMap[order.deliveryStatus as DeliveryStatus] || '결제완료';

        return (
          <div key={order.tossOrderId}>
            {/* 주문 기본 정보 */}
            <div className="mb-4 p-4 border-b">
              <div className="text-sm text-gray-500">
                주문번호: {order.tossOrderId}
              </div>
              <div className="text-sm text-gray-500">주문일자: {orderDay}</div>
            </div>

            {/* 주문 상품 목록 */}
            {order.orderDetails.map((detail, detailIndex) => (
              <div
                key={`${order.tossOrderId}-${detailIndex}`}
                className="flex justify-between items-center p-4 border-b"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${detail.image}`}
                    alt={detail.productName}
                    width={80}
                    height={80}
                    loading="eager"
                  />
                  <div className="flex flex-col">
                    <strong>{detail.productName}</strong>
                    <p className="text-sm text-gray-600">
                      {detail.size} / {detail.color}
                    </p>
                    <p className="text-sm text-gray-600">
                      {detail.quantity}개 x {detail.price.toLocaleString()}원
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* 주문 요약 정보 */}
            <div className="flex justify-between items-center p-4 bg-gray-50">
              <div className="font-bold">
                총 {order.orderDetails.length}개 상품
              </div>
              <div className="flex items-center gap-4">
                <div className="font-bold">
                  {order.paymentAmount.toLocaleString()}원
                </div>
                <div
                  className="flex flex-col cursor-pointer"
                  onClick={() =>
                    setSelectedOrder(selectedOrder === index ? null : index)
                  }
                >
                  <strong>{status}</strong>
                  <div>리뷰</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
