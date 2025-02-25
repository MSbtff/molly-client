'use server';

import {cookies} from 'next/headers';

export default async function registerProduct(formData: FormData) {
  const authToken = (await cookies()).get('Authorization')?.value;

  if (!authToken) {
    throw new Error('인증되지 않은 요청입니다.');
  }

  try {
    const response = await fetch(`${process.env.NEXT_SERVER_URL}/product`, {
      method: 'POST',
      headers: {
        Authorization: authToken,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('상품 등록 실패:', errorData);
      return {
        success: false,
        message: errorData.message || '상품 등록에 실패했습니다.',
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('API 요청 실패:', error);
    return {
      success: false,
      message: '서버 요청 중 오류가 발생했습니다.',
    };
  }
}
