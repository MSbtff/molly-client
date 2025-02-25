import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware'; // persist 미들웨어 추가

export interface OrderItem {
  orderId: number;
  tossOrderId: string;
  userId: number;
  totalAmount: number;
  userPoint: number;
  pointUsage: number | null; // 추가
  pointSave: number | null; // 추가
  status: string;
  cancelStatus: string;
  orderedAt: string;
  payment: null | string[]; // 타입 수정
  delivery: null | string[]; // 타입 수정
  defaultAddress: DefaultAddress; // 대문자로 시작하는 것이 컨벤션
  orderDetails: OrderDetails[]; // 배열로 수정
}

export interface DefaultAddress {
  addressId: number;
  recipient: string;
  recipientCellPhone: string;
  roadAddress: string;
  numberAddress: string;
  addrDetail: string;
  defaultAddr: boolean;
  userId: number;
  userName: string;
}

export interface OrderDetails {
  orderId: number;
  productId: number;
  itemId: number;
  brandName: string;
  productName: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
}

// export interface OrderDelivery {

//     addrDetail: string;
//     numberAddress: string;
//     receiverName: string;
//     receiverPhone: string;
//     roadAddress: string;
//     status: string;
// }

export interface OrderImage {
  url: string;
}

export interface OrderStore {
  orders: OrderItem[];
  orderImages: OrderImage[];
  setOrders: (orders: OrderItem[]) => void;
  setOrderImages: (orderImages: OrderImage[]) => void;
}

export const useOrderStore = create(
  persist<OrderStore>(
    (set) => ({
      orders: [],
      orderImages: [],
      setOrders: (orders) => set({orders}),
      setOrderImages: (orderImages) => set({orderImages}),
    }),
    {
      name: 'order-storage', // 로컬 스토리지에 저장될 키 이름
      storage: createJSONStorage(() => localStorage),
    }
  )
);
