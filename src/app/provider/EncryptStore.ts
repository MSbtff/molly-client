import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import CryptoJS from 'crypto-js';
import {AES, enc} from 'crypto-js';
import {OrderImage, OrderItem} from './OrderStore';

const secret = process.env.NEXT_PUBLIC_SECRET_KEY as string;

interface EncryptedAddress {
  recipient: string;
  recipientCellPhone: string;
  roadAddress: string;
  numberAddress: string;
  addrDetail: string;
  addressId: number;
  defaultAddr: boolean;
  userId: number;
  userName: string;
}

interface EncryptedOrderItem
  extends Omit<OrderItem, 'defaultAddress' | 'userPoint'> {
  defaultAddress: EncryptedAddress;
  userPoint: string;
}

export interface OrderStore {
  orders: OrderItem[];
  orderImages: OrderImage[];
  setOrders: (orders: OrderItem[]) => void;
  setOrderImages: (orderImages: OrderImage[]) => void;
  getDecryptedOrders: () => OrderItem[];
}

// 주문 정보 암호화하여 상태 저장
export const useEncryptStore = create(
  persist<OrderStore>(
    (set, get) => ({
      orders: [],
      orderImages: [],
      setOrders: (orders: OrderItem[]) => {
        if (!secret) {
          console.error('Secret key is not defined');
          return;
        }

        try {
          const encryptedOrders: EncryptedOrderItem[] = orders.map((order) => ({
            ...order,
            userPoint: CryptoJS.AES.encrypt(String(order.userPoint), secret, {
              mode: CryptoJS.mode.ECB,
              padding: CryptoJS.pad.Pkcs7,
            }).toString(),
            defaultAddress: {
              ...order.defaultAddress,
              recipient: CryptoJS.AES.encrypt(
                order.defaultAddress.recipient,
                secret,
                {
                  mode: CryptoJS.mode.ECB,
                  padding: CryptoJS.pad.Pkcs7,
                }
              ).toString(),
              recipientCellPhone: CryptoJS.AES.encrypt(
                order.defaultAddress.recipientCellPhone,
                secret,
                {
                  mode: CryptoJS.mode.ECB,
                  padding: CryptoJS.pad.Pkcs7,
                }
              ).toString(),
              roadAddress: CryptoJS.AES.encrypt(
                order.defaultAddress.roadAddress,
                secret,
                {
                  mode: CryptoJS.mode.ECB,
                  padding: CryptoJS.pad.Pkcs7,
                }
              ).toString(),
              numberAddress: CryptoJS.AES.encrypt(
                order.defaultAddress.numberAddress,
                secret,
                {
                  mode: CryptoJS.mode.ECB,
                  padding: CryptoJS.pad.Pkcs7,
                }
              ).toString(),
              addrDetail: CryptoJS.AES.encrypt(
                order.defaultAddress.addrDetail,
                secret,
                {
                  mode: CryptoJS.mode.ECB,
                  padding: CryptoJS.pad.Pkcs7,
                }
              ).toString(),
            },
          }));

          // 기존 orders를 유지하지 않고 새로운 orders로 대체
          set({orders: encryptedOrders as unknown as OrderItem[]});
        } catch (error) {
          console.error('Encryption failed:', error);
          throw error;
        }
      },
      setOrderImages: (orderImages) => set({orderImages}),
      // 복호화된 orders를 가져오는 함수 추가
      getDecryptedOrders: () => {
        const orders = get().orders as unknown as EncryptedOrderItem[];
        if (!orders.length || !secret) return [];

        try {
          return orders.map((order) => ({
            ...order,
            userPoint: Number(
              CryptoJS.AES.decrypt(order.userPoint, secret, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
              }).toString(enc.Utf8)
            ),
            defaultAddress: {
              ...order.defaultAddress,
              recipient: CryptoJS.AES.decrypt(
                order.defaultAddress.recipient,
                secret,
                {
                  mode: CryptoJS.mode.ECB,
                  padding: CryptoJS.pad.Pkcs7,
                }
              ).toString(enc.Utf8),
              recipientCellPhone: CryptoJS.AES.decrypt(
                order.defaultAddress.recipientCellPhone,
                secret,
                {
                  mode: CryptoJS.mode.ECB,
                  padding: CryptoJS.pad.Pkcs7,
                }
              ).toString(enc.Utf8),
              roadAddress: AES.decrypt(
                order.defaultAddress.roadAddress,
                secret,
                {
                  mode: CryptoJS.mode.ECB,
                  padding: CryptoJS.pad.Pkcs7,
                }
              ).toString(enc.Utf8),
              numberAddress: AES.decrypt(
                order.defaultAddress.numberAddress,
                secret,
                {
                  mode: CryptoJS.mode.ECB,
                  padding: CryptoJS.pad.Pkcs7,
                }
              ).toString(enc.Utf8),
              addrDetail: AES.decrypt(order.defaultAddress.addrDetail, secret, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
              }).toString(enc.Utf8),
            },
          }));
        } catch (error) {
          console.error('Decryption failed:', error);
          return [];
        }
      },
    }),
    {
      name: 'orderEncrypt-storage',
      storage: createJSONStorage(() => localStorage),
      // onRehydrateStorage에서 복호화하지 않음
    }
  )
);
