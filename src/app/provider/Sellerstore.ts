import {create} from 'zustand';

type ViewType = '상품 등록' | '판매 조회' | '상품 삭제' | '상품 수정' | '기본';

type SellerStore = {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
};

export const useSellerStore = create<SellerStore>((set) => ({
  currentView: '기본',
  setCurrentView: (view) => set({currentView: view}),
}));
