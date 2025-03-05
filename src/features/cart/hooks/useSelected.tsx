import {useState} from 'react';

export const useSelected = (cartId: number) => {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const newSelectedItems = new Set(selectedItems);
  if (newSelectedItems.has(cartId)) {
    newSelectedItems.delete(cartId);
  } else {
    newSelectedItems.add(cartId);
  }
  setSelectedItems(newSelectedItems);
  return selectedItems;
};
