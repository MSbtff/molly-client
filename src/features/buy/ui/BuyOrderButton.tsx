'use client';

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
  const handlePayment = async () => {
    try {
      if (!widgets || !currentOrder) {
        return;
      }

      await widgets.requestPayment({
        orderId: currentOrder.tossOrderId,
        orderName: currentOrder.orderDetails[0].productName,
        successUrl: window.location.origin + '/buy/success',
        failUrl: window.location.origin + '/fail',
      });
    } catch (error) {
      console.error('Payment request failed:', error);
    }
  };

  return (
    <div className="w-full h-20 flex justify-center items-center cursor-pointe">
      <button
        onClick={handlePayment}
        disabled={!ready}
        className="w-[705px] h-14 flex justify-center items-center gap-2 border bg-[#EB6455] rounded-[10px] text-white font-semibold disabled:bg-gray-400 hover:bg-red-400"
      >
        <div>{currentOrder?.totalAmount?.toLocaleString() || 0}원</div>
        <p>/</p>
        <div>결제하기</div>
      </button>
    </div>
  );
};
