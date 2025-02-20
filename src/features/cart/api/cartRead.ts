'use server';

import {cookies} from 'next/headers';

type SizeDetail = {
  id: number;
  size: string;
  quantity: number;
};

type ColorDetail = {
  color: string;
  colorCode: string;
  sizeDetails: SizeDetail[];
};

export type CartItemDto = {
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
};

// 각 카트 아이템의 구조
export type CartItem = {
  cartInfoDto: CartItemDto;
  colorDetails: ColorDetail[];
};

// 전체 응답 타입
export type CartResponse = CartItem[];

export async function cartRead(): Promise<CartResponse | undefined> {
  const authToken = (await cookies()).get('Authorization')?.value;

  if (!authToken) {
    new Error('인증되지 않은 요청입니다.');
  }

  try {
    const res = await fetch(`${process.env.NEXT_SERVER_URL}/cart`, {
      method: 'GET',
      headers: {
        Authorization: `${authToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`장바구니 조회 실패: ${res.status}`);
    }

    const data = await res.json();
    // console.log(JSON.stringify(data, null, 2));
    console.log('cartRead 응답:', data); // 로그 추가
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
