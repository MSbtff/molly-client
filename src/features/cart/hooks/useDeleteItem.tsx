import {deleteRequest} from '@/shared/util/lib/fetchAPI';
import {useState} from 'react';

export const useDeleteItem = async (cartId: number) => {
  const [selectedItem, setSelectedItem] = useState<Set<number>>(new Set());
  try {
    await deleteRequest('/cart');
    const newSelectedItem = new Set(selectedItem);
    newSelectedItem.delete(cartId);
    setSelectedItem(newSelectedItem);
  } catch (error) {
    console.error('카트 데이터 조회 중 오류', error);
  }
  return selectedItem;
};
