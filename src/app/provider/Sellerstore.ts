import { create } from "zustand";

type ViewType =
  | "상품 등록"
  | "상품 조회"
  | "상품 삭제"
  | "상품 수정"
  | "기본"
  | "상품 일괄 등록";

type SellerStore = {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
};

//판매자 사이드바 메뉴 관리
export const useSellerStore = create<SellerStore>((set) => ({
  currentView: "기본",
  setCurrentView: (view) => set({ currentView: view }),
}));
