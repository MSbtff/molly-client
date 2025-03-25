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
      params.set("orderBy", "PURCHASE_COUNT");
    } else {
      params.set("categories", category);
    }
    router.push(`/product?${params.toString()}`);
    // const newSearchParams = `categories=${encodeURIComponent(category)}`;
    // router.push(`/product?${newSearchParams}`);
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
      <nav className="w-dvw flex justify-between px-8 py-5 items-center">
        {/* <nav className="flex flex-col px-24 py-5"> */}

        {/* 로고 */}
        <Link href="/">
          {/* <h1 className="text-3xl font-bold italic ml-8">MOLLY</h1> */}
          <h1 className="min-w-60 text-3xl font-bold italic">MOLLY</h1>
        </Link>

        {/* ${
            isLoggedIn ? "translate-x-36" : "translate-x-[4rem]"
          } */}
        {/* 여성 남성 랭킹 */}
        <div className={`flex gap-6 `}>
          {["남성", "여성", "랭킹"].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`hover:text-gray-600 ${
                selectedCategory === category ? "font-bold underline" : ""
              }`}
            >
              {" "}
              {category}
            </button>
          ))}
        </div>

        {/* 우측 아이콘들 */}
        <div className={`max-w-65 flex items-center`}>
          {/* 검색 */}
          <div
            className="flex items-center w-[150px] bg-[#F5F5F5] rounded-full px-3 py-1 border-none hover:bg-gray-200 mr-1"
            onClick={() => {
              setIsSearchOpen(true);
            }}
          >
            <Search size={20} className="text-black" />
            <span className="ml-2 text-[#707072]">검색</span>
          </div>
          {/* 프로필 */}
          <button
            onClick={() => {
              setProfileIsOpen(!isProfileOpen);
            }}
            className="relative p-2 rounded-[10px] hover:bg-gray-200 transition flex items-center justify-center"
          >
            {nickname ? (
              <div className="rounded-full overflow-hidden">{nickname} 님</div>
            ) : (
              <UserRound size={21} className="rounded-full overflow-hidden" />
            )}
          </button>
          {/* 장바구니 -> 링크? 버튼? */}
          <Link
            href="/cart"
            className="p-2 rounded-[10px] hover:bg-gray-200 transition flex items-center justify-center"
          >
            <ShoppingCart size={21} />
          </Link>
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
