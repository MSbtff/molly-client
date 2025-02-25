import {ChevronRight} from 'lucide-react';
import ContactInfo from './ContactInfo';
import Link from 'next/link';

export interface OrderDetail {
  itemId: number;
  productId: number;
  brandName: string;
  productName: string;
  price: number;
  quantity: number;
  size: string;
}

export interface Order {
  orderId: number; // string -> number로 변경
  tossOrderId: string; // 추가
  userPoint: number;
  pointUsage: number | null;
  orderDetails: OrderDetail[];
  defaultAddress: {
    // 주소 관련 필드를 defaultAddress 객체로 변경
    recipient: string;
    recipientCellPhone: string;
    roadAddress: string;
    addrDetail: string; // detailAddress -> addrDetail로 변경
    numberAddress: string; // 추가
  };
}

export interface BuyAddressProps {
  userInfo: Order;
}

export const BuyAddress = ({userInfo}: BuyAddressProps) => {
  return (
    <>
      <div className="mt-4 w-[700px] h-[205px] flex flex-col bg-white rounded-[10px] border p-4">
        <div className="flex justify-between">
          <h2 className="font-semibold">배송 주소</h2>
          <Link href="/mypage/address" className="hover:text-gray-500">
            주소 변경
          </Link>
        </div>
        <ContactInfo userInfo={userInfo} />
        <div className="mt-12 w-full h-9 rounded-[10px] border flex justify-between items-center p-2">
          <div>요청사항 없음</div>
          <ChevronRight size={20} />
        </div>
      </div>
    </>
  );
};
