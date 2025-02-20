import {create} from 'zustand';
import {CartItem, CartResponse} from '@/features/cart/api/cartRead';

interface CartStore {
  cartState: CartItem[];
  setCartState: (items: CartItem[]) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartState: [],
  setCartState: (items) => set({cartState: items}),
}));
