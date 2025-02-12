import {create} from 'zustand';

type ViewType = 'products' | 'register' | 'default';

type SellerStore = {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
};

export const useSellerStore = create<SellerStore>((set) => ({
  currentView: 'default',
  setCurrentView: (view) => set({currentView: view}),
}));
