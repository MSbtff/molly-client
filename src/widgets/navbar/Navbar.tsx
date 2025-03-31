"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileModal from "./ProfileModal";
import SearchModal from "./SearchModal";
import NotificationSidebar from "./NotificationSidebar";
import { Search, UserRound, ShoppingCart } from "lucide-react";

export default function Navbar({ nickname }: { nickname: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isProfileOpen, setProfileIsOpen] = useState(false); //프로필 모달
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);

    const params = new URLSearchParams();
    if (category === "랭킹") {
      params.append("rank", "");
      params.set("orderBy", "PURCHASE_COUNT");
    } else {
      params.set("categories", category);
    }
    router.push(`/product?${params.toString()}`);
  };

  useEffect(() => {
    if (nickname) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (pathname !== "/product") {
      setSelectedCategory(null);
    }
  }, [pathname]);

  return (
    <>
      <nav className="w-dvw hidden md:grid grid-cols-3 px-8 py-5 items-center">
        {/* 로고 - 왼쪽 영역 */}
        <div className="justify-self-start">
          <Link href="/">
            <h1 className="text-3xl font-bold italic">MOLLY</h1>
          </Link>
        </div>

        {/* 남성 여성 랭킹 - 중앙 영역 */}
        <div className="justify-self-center flex gap-6">
          {["남성", "여성", "랭킹"].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`hover:text-gray-600 ${selectedCategory === category ? "font-bold underline" : ""
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 우측 아이콘들 */}
        <div className="justify-self-end flex items-center gap-2">
          {/* 검색 */}
          <div
            className="flex items-center w-[150px] bg-[#F5F5F5] rounded-full px-3 py-1 border-none hover:bg-gray-200"
            role="button"
            tabIndex={0}
            aria-label="검색 열기"
            onClick={() => {
              setIsSearchOpen(true);
            }}
          >
            <Search size={20} className="text-black" />
            <span className="ml-2 text-[#707072]">검색</span>
          </div>

          {/* 프로필 */}
          <button
            aria-label="사용자 페이지 열기"
            onClick={() => {
              setProfileIsOpen(!isProfileOpen);
            }}
            className="relative p-2 rounded-[10px] hover:bg-gray-200 transition flex items-center justify-center"
          >
            {nickname ? (
              <div className="rounded-full overflow-hidden truncate max-w-28">
                {nickname} 님
              </div>
            ) : (
              <UserRound size={21} className="rounded-full overflow-hidden" />
            )}
          </button>

          {/* 장바구니 */}
          <Link
            href="/cart"
            className="p-2 rounded-[10px] hover:bg-gray-200 transition flex items-center justify-center"
            aria-label="장바구니 페이지로 이동"
          >
            <ShoppingCart size={21} />
          </Link>
        </div>
      </nav>

      {/* 모바일 네비게이션 */}
      <nav className="w-dvw md:hidden flex flex-col px-4 py-3 gap-2">
        {/* 상단 행: 로고와 아이콘들 */}
        <div className="flex justify-between items-center">
          {/* 로고 */}
          <Link href="/">
            <h1 className="text-2xl font-bold italic">MOLLY</h1>
          </Link>

          {["남성", "여성", "랭킹"].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`hover:text-gray-600 ${selectedCategory === category ? "font-bold underline" : ""
                }`}
            >
              {category}
            </button>
          ))}

          {/* 아이콘들 */}
          <div className="flex items-center gap-1">
            {/* 검색 (모바일에서는 아이콘만) */}
            <button
              className="p-2 rounded-[10px] hover:bg-gray-200 transition"
              aria-label="검색 열기"
              onClick={() => {
                setIsSearchOpen(true);
              }}
            >
              <Search size={20} className="text-black" />
            </button>

            {/* 프로필 */}
            <button
              onClick={() => {
                setProfileIsOpen(!isProfileOpen);
              }}
              className="p-2 rounded-[10px] hover:bg-gray-200 transition"
              aria-label="사용자 페이지 열기"
            >
              {nickname ? (
                <div className="rounded-full overflow-hidden text-sm truncate max-w-16">
                  {nickname.length > 4
                    ? `${nickname.substring(0, 4)}...`
                    : nickname}
                </div>
              ) : (
                <UserRound size={20} />
              )}
            </button>

            {/* 장바구니 */}
            <Link
              href="/cart"
              className="p-2 rounded-[10px] hover:bg-gray-200 transition"
              aria-label="장바구니 페이지로 이동"
            >
              <ShoppingCart size={20} />
            </Link>
          </div>
        </div>
      </nav>

      {/* 모달 */}
      {isProfileOpen && (
        <ProfileModal
          setIsOpen={setProfileIsOpen}
          setIsNotificationOpen={setIsNotificationOpen}
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
        />
      )}
      {isSearchOpen && <SearchModal setIsOpen={setIsSearchOpen} />}
      {isNotificationOpen && (
        <NotificationSidebar setIsOpen={setIsNotificationOpen} />
      )}
    </>
  );
}
