import { create } from "zustand";
import { useSearchParams, useRouter } from "next/navigation";

// URL 상태 타입 정의
interface UrlStoreState {
  searchParams: string; // 현재 URL 쿼리 스트링
  setSearchParams: (params: string) => void; // URL 업데이트 함수
  updateSearchParams: (key: string, value: string | null) => void; // 특정 쿼리 변경
}

// zustand 스토어 생성
export const useUrlStore = create<UrlStoreState>((set) => ({
  searchParams: "", // 초기 상태
  setSearchParams: (params) => set({ searchParams: params }),
  
  // 특정 쿼리 파라미터 추가/삭제 후 상태 업데이트
  updateSearchParams: (key, value) => {
    set((state) => {
      const urlParams = new URLSearchParams(state.searchParams);
      if (value === null) {
        urlParams.delete(key); // 값이 null이면 삭제
      } else {
        urlParams.set(key, value);
      }
      return { searchParams: urlParams.toString() };
    });
  }
}));
