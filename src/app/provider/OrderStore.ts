import {create} from 'zustand';

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
}

export interface OrderImage {
  url: string;
}

export interface OrderStore {
  orders: OrderItem[];
  orderImages: OrderImage[];
  setOrders: (orders: OrderItem[]) => void;
  setOrderImages: (orderImages: OrderImage[]) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  orderImages: [],
  setOrders: (orders: OrderItem[]) => set({orders}),
  setOrderImages: (orderImages: OrderImage[]) => set({orderImages}),
}));
