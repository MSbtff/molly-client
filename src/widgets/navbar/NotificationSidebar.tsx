// import { useState } from "react";
import Image from "next/image";
interface NotificationSidebarProps {
  setIsOpen: (value: boolean) => void;
}

export default function NotificationSidebar({
  setIsOpen,
}: NotificationSidebarProps) {
  return (
    <div className="fixed top-0 right-0 w-[350px] h-full bg-white shadow-lg z-50">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <h2 className="text-lg font-semibold">알림</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 text-xl"
        >
          ✕
        </button>
      </div>

      {/* 내용 영역 */}
      <div className="p-4 space-y-6">
        {/* 오늘 받은 알림 */}
        <div>
          <h3 className="text-md font-bold mb-2">오늘 받은 알림</h3>
          <NotificationItem
            name="아디다스 코리아"
            time="오전 10:22"
            message="고객님의 택배가 발송되었습니다."
          />
        </div>

        {/* 이전 알림 */}
        <div>
          <h3 className="text-md font-bold mb-2">이전 알림</h3>
          <NotificationItem
            name="나이키 코리아"
            time="오전 10:22"
            message="주문이 완료되었습니다."
          />
          <NotificationItem
            name="메종키츠네"
            time="오전 10:22"
            message="주문이 취소되었습니다."
          />
        </div>
      </div>
    </div>
  );
}

/* 알림 아이템 컴포넌트 */
function NotificationItem({
  name,
  time,
  message,
}: {
  name: string;
  time: string;
  message: string;
}) {
  return (
    <div className="flex items-start p-4 bg-gray-100 rounded-xl shadow-sm space-x-3 mt-3">
      {/* 프로필 이미지 */}
      <Image
        src="/src/assets/icons/profile.svg"
        alt="profile"
        width={40}
        height={40}
        unoptimized={true}
        className="rounded-full"
      />

      {/* 텍스트 내용 */}
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="font-bold">{name}</span>
          <span className="text-sm text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-700">{message}</p>
      </div>

      {/* 옵션 아이콘 (예: 점 3개) */}
      <button className="text-gray-500">⋮</button>
    </div>
  );
}
