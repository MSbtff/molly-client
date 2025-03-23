import { useRouter } from "next/navigation";
import { Bell, Heart, UserRound, LogOut, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { loginStatus } from "@/features/login/api/loginStatus";
import { logout } from "@/features/login/api/logout";

interface ProfileModalProps {
  setIsOpen: (value: boolean) => void;
  setIsNotificationOpen: (value: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export default function ProfileModal({
  setIsOpen,
  setIsNotificationOpen,
  isLoggedIn,
  setIsLoggedIn,
}: ProfileModalProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleLoginCheck();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res.status === 200) {
        setIsLoggedIn(false);
        alert("로그아웃 되었습니다.");
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginCheck = async () => {
    try {
      setIsLoading(true);
      const res = await loginStatus();
      setIsLoggedIn(res.isLoggedIn || false);
      console.log("로그인 상태:", res.isLoggedIn);
    } catch (error) {
      console.error("로그인 상태 확인 실패:", error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    setIsOpen(false);
    router.push("/login");
  };

  return (
    <>
      {/* 모달창 외부 */}
      <div
        className="fixed inset-0 z-40"
        onClick={() => setIsOpen(false)} // 배경 클릭 시 모달 닫기
      ></div>

      {/* 모달 */}
      <div
        className="absolute right-[60px] top-[60px] w-[200px] bg-white p-6 rounded-2xl shadow-lg z-50"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 막음
      >
        {/* 메뉴 리스트 */}
        {/* <div className="mt-2 mb-2 px-1 space-y-6 text-gray-700"> */}
        <div
          className={`mt-2 mb-2 px-1 space-y-6 text-gray-700 transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          {isLoggedIn ? (
            <>
              <button
                className="flex items-center w-full text-left hover:bg-gray-200 transition rounded-lg px-6"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/mypage");
                }}
              >
                <UserRound size={24} className="rounded-full" />
                <span className="ml-3">마이</span>
              </button>

              <button
                className="flex items-center w-full text-left hover:bg-gray-200 transition rounded-lg px-6"
                onClick={() => setIsOpen(false)}
              >
                <Heart size={24} />
                <span className="ml-3">찜하기</span>
              </button>

              <button
                className="flex items-center w-full text-left hover:bg-gray-200 transition rounded-lg px-6"
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => setIsNotificationOpen(true), 200);
                }}
              >
                <Bell size={24} />
                <span className="ml-3">알림</span>
              </button>

              <button
                className="flex items-center w-full text-left hover:bg-gray-200 transition rounded-lg px-6"
                onClick={handleLogout}
              >
                <LogOut size={24} />
                <span className="ml-3">로그아웃</span>
              </button>
            </>
          ) : (
            <button
              className="flex items-center w-full text-left hover:bg-gray-200 transition rounded-lg px-6"
              onClick={handleLoginClick} // 로그인 페이지로 이동
            >
              <LogIn size={24} />
              <span className="ml-3">로그인</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
