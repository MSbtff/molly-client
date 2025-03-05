'use client';

import {deleteRequest} from '@/shared/util/lib/fetchAPI';
import {useState} from 'react';

// API 통신을 위한 순수 함수 - 테스트 용이성 향상
export async function deleteCartItems(itemIds: number[]): Promise<void> {
  if (itemIds.length === 0) return;

  try {
    await deleteRequest('/cart', {items: itemIds});
  } catch (error) {
    console.error('장바구니 항목 삭제 중 오류:', error);
    throw error; // 에러를 다시 던져서 호출자가 처리할 수 있도록 함
  }
}

interface UseSelectedItemsResult {
  selectedItems: number[];
  isSelected: (id: number) => boolean;
  toggleItem: (id: number) => void;
  selectItem: (id: number) => void;
  unselectItem: (id: number) => void;
  selectAll: (ids: number[]) => void;
  clearSelection: () => void;
  deleteSelected: () => Promise<void>;
  isDeleting: boolean;
  error: Error | null;
}

/**
 * 장바구니 항목 선택 및 일괄 삭제를 위한 훅
 */
export function useDeleteSelected(): UseSelectedItemsResult {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const isSelected = (id: number) => selectedItems.includes(id);

  const selectItem = (id: number) => {
    if (!isSelected(id)) {
      setSelectedItems((prev) => [...prev, id]);
    }
  };

  const unselectItem = (id: number) => {
    setSelectedItems((prev) => prev.filter((item) => item !== id));
  };

  const toggleItem = (id: number) => {
    if (isSelected(id)) {
      unselectItem(id);
    } else {
      selectItem(id);
    }
  };

  const selectAll = (ids: number[]) => {
    setSelectedItems(ids);
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  // 삭제 기능을 비동기 함수로 구현
  const deleteSelected = async () => {
    if (selectedItems.length === 0) return;

    setIsDeleting(true);
    setError(null);

    try {
      await deleteCartItems(selectedItems);
      clearSelection();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('선택 항목 삭제 실패'));
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    selectedItems,
    isSelected,
    toggleItem,
    selectItem,
    unselectItem,
    selectAll,
    clearSelection,
    deleteSelected,
    isDeleting,
    error,
  };
}
