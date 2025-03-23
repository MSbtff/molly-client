import { create } from "zustand";

// URL 상태 타입 정의
interface UrlStoreState {
  searchParams: string; // 현재 URL 쿼리 스트링
  setSearchParams: (params: string) => void; // 전체 쿼리 문자열을 변경하는 함수
  updateSearchParams: (key: string, value: string | null) => void; //특정 쿼리 파라미터만 추가, 삭제, 수정, 삭제하는 함수
}

// zustand 스토어 생성
export const useUrlStore = create<UrlStoreState>((set) => ({
  searchParams: "", // 초기 상태
  setSearchParams: (params) => set({ searchParams: params }),

  // 특정 쿼리 파라미터 추가/삭제 후 상태 업데이트
  updateSearchParams: (key, value) => {
    set((state) => {
      const urlParams = new URLSearchParams(state.searchParams);//기존 쿼리스트링을 URLSearchParams 객체로 변환
      if (value === null) {
        urlParams.delete(key); // 값이 null이면 삭제
      } else {
        urlParams.set(key, value);
      }
      return { searchParams: urlParams.toString() };//문자열로 저장
    });
  },
}));

/*
1. searchParams는 쿼리 파라미터 값만 저장한다(url 자체 저장 x)
   즉 ?이후 쿼리 문자열만 저장된다
2. setSearchParams는 기존 쿼리 값이 남아 있지 않고 클릭할 때마다 새로운 값으로 덮어쓴다. 
3. updateSearchParams는 기존 쿼리 값이 유지되고 
                        새로운 key=value 쌍이 추가되거나 같은 key가 있으면 덮어씌운다
                        value가 null이면 해당 key를 삭제한다

기존에 없는 키 추가
useUrlStore.getState().setSearchParams("brandName=구호플러스&sort=가격순");
useUrlStore.getState().updateSearchParams("color", "blue");

기존 키 덮어쓰기
useUrlStore.getState().setSearchParams("brandName=구호플러스&sort=가격순");
useUrlStore.getState().updateSearchParams("sort", "조회순");


메인 -> 무조건 set
프로덕트 필터 -> set
       정렬 -> update

*/