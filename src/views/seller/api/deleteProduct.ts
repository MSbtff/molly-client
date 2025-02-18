'use server';

import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';

export async function deleteProduct(productId: number) {
  const authToken = (await cookies()).get('Authorization');

  if (!authToken) {
    throw new Error('인증되지 않은 요청입니다.');
  }

  try {
    const response = await fetch(
      `http://3.35.175.203:8080/product/${productId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: authToken.value,
        },
        credentials: 'include',
      }
    );
    if (response.ok) {
      console.log('상품이 성공적으로 삭제되었습니다.');
    }
    revalidatePath('/seller');
    return {success: true};
  } catch (error) {
    console.error('상품 삭제에 실패했습니다:', error);
    throw new Error('상품 삭제에 실패했습니다.');
  }
}
