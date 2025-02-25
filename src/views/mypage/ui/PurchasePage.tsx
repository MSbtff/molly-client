import {BorderBox} from './BorderBox';

interface OrderDetail {
  brandName: string;
  color: string;
  image: string;
  price: number;
  productName: string;
  quantity: number;
  size: string;
}

interface Order {
  tossOrderId: string;
  orderStatus: string;
  orderedAt: string;
  paymentAmount: number;
  deliveryStatus: string;
  orderDetails: OrderDetail[];
}

export interface PurchasePageProps {
  orders: Order[];
}

export const PurchasePage = ({orders}: PurchasePageProps) => {
  return (
    <>
      <div className="text-2xl font-bold">구매내역</div>
      <div className="w-full h-full">
        <div className="flex">
          <BorderBox title="전체" count={orders.length} />
          <BorderBox
            title="결제대기"
            count={
              orders.filter((order) => order.orderStatus === 'PENDING').length
            }
          />
          <BorderBox
            title="배송중"
            count={
              orders.filter((order) => order.deliveryStatus === 'SHIPPING')
                .length
            }
          />
          <BorderBox
            title="배송완료"
            count={
              orders.filter((order) => order.deliveryStatus === 'COMPLETED')
                .length
            }
          />
        </div>
      </div>
    </>
  );
};
