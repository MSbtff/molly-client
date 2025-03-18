import React, {useState} from 'react';
import {CartItem} from '../api/cartRead';

export const useSelectedAll = (
  e: React.ChangeEvent<HTMLInputElement>,
  cartItem: CartItem[]
) => {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  if (e.target.checked) {
    setSelectedItems(new Set(cartItem.map((item) => item.cartInfoDto.cartId)));
  } else {
    setSelectedItems(new Set());
  }
  return selectedItems;
};
