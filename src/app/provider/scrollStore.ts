import { create } from "zustand";

interface ScrollStore {
    page: number;
    setPage: (page: number) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  page: 0,
  setPage: (page: number) => set({ page }),
}));