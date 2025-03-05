'use client';

import {useState} from 'react';
import {CartItem, cartRead} from '../api/cartRead';
import {useCartStore} from '@/app/provider/CartStore';

export const useCartItems = async () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const {setCartState} = useCartStore();
  try {
    const data = await cartRead();
    if (data) {
      setCartItems(data);
      setCartState(data);
    }
  } catch (error) {
    console.error('카트 데이터 조회 중 오류', error);
  }

  return cartItems;
};
