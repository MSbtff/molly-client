'use server';

import {cookies} from 'next/headers';

export default async function searchProduct() {
  const authToken = (await cookies()).get('Authorization')?.value;

  if (!authToken) {
    throw new Error('인증되지 않은 요청입니다.');
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_SERVER_URL}/product/seller?page=0&size=9&colorCode=0&sizeCode=0&categories=0&priceGoe=0&priceLt=0&orderBy=0&brandName=0&excludeSoldOut`,
      {
        method: 'GET',
        headers: {
          Authorization: authToken,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('상품 조회 실패:', errorData);
      return {
        success: false,
        message: errorData.message || '상품 조회에 실패했습니다.',
      };
    }
    console.log(response.status);
    const data = response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
