'use server';

import {get} from '@/shared/util/lib/fetchAPI';


interface SizeDetail {
  id: number;
  size: string;
  quantity: number;
}

interface ColorDetail {
  color: string;
  colorCode: string;
  sizeDetails: SizeDetail[];
}

export interface CartItemDto {
  cartId: number;
  itemId: number;
  color: string;
  size: string;
  productId: number;
  productName: string;
  brandName: string;
  price: number;
  url: string;
  quantity: number;
}

// 각 카트 아이템의 구조
export interface CartItem {
  cartInfoDto: CartItemDto;
  colorDetails: ColorDetail[];
}

// 전체 응답 타입
export type CartResponse = CartItem[];

export async function cartRead(): Promise<CartResponse | undefined> {
  try {
    const data = await get<CartResponse>('/cart');

    console.log(JSON.stringify(data, null, 2));
    console.log('cartRead 응답:', data); // 로그 추가
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
