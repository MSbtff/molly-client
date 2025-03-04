// import {create} from 'zustand';

// //로그인 정보 상태 관리
// interface AuthStore {
//   user: any;
//   setUser: (user: any) => void;
//   logOut: () => void;
//   token: boolean;
//   setToken: (token: boolean) => void;
// }

// export const useAuthStore = create<AuthStore>((set) => {
//   return {
//     user: null,
//     setUser: (user) => set({user}),
//     logOut: () => set({user: null}),
//     token: false,
//     setToken: (token) => set({token}),
//   };
// });
