import {create} from 'zustand';
import {CartItem} from '@/features/cart/api/cartRead';

// 장바구니 아이템 상태 관리
interface CartStore {
  cartState: CartItem[];
  setCartState: (items: CartItem[]) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartState: [],
  setCartState: (items) => set({cartState: items}),
}));
