'use server';

import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';

export interface ProductUpdateData {
  categories: string[];
  brandName: string;
  productName: string;
  price: number;
  description: string;
  items: {
    id: number;
    color: string;
    colorCode: string;
    size: string;
    quantity: number;
  }[];
}

export async function updateProduct(
  productId: number,
  data: ProductUpdateData
) {
  const authToken = (await cookies()).get('Authorization');

  if (!authToken) {
    throw new Error('인증되지 않은 요청입니다.');
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_SERVER_URL}/product/${productId}`,
      {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      console.log('상품이 성공적으로 수정되었습니다.');
    }
    revalidatePath('/seller');
    return await response.json();
  } catch (error) {
    console.error('상품 수정에 실패했습니다:', error);
    throw new Error('상품 수정에 실패했습니다.');
  }
}

export async function getProduct(productId: number) {
  const authToken = (await cookies()).get('Authorization');

  if (!authToken) {
    throw new Error('인증되지 않은 요청입니다.');
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_SERVER_URL}/product/${productId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken.value}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('상품 조회에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('상품 조회 중 오류가 발생했습니다.');
  }
}
