import {post} from '@/shared/util/lib/fetchAPI';

export const useOrderCart = async (cartId: number) => {
  try {
    const data = await post('/order', {cartId: cartId});
    return data;
  } catch (error) {
    console.error('주문 요청 중 오류:', error);
  }
};
