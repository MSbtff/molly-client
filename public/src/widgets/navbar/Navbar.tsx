'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import ProfileModal from "./ProfileModal";
import SearchModal from "./SearchModal";
import NotificationSidebar from "./NotificationSidebar";


export default function Navbar() {
    const [isProfileOpen, setProfileIsOpen] = useState(false); //프로필 모달
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <nav className="flex items-center justify-between px-4 py-4">
                {/* 로고 */}
                <Link href="/" className="text-xl">
                    <Image
                        src="/src/assets/molly.svg"
                        // src={Logo}
                        alt="MOLLY"
                        width={67} // 실제 로고 크기에 맞게 조정
                        height={27} // 실제 로고 크기에 맞게 조정
                    />
                </Link>

                {/* 메인 메뉴 */}
                <div className="flex gap-6">
                    <Link href="/mens" className="hover:text-gray-600">남성</Link>
                    <Link href="/womens" className="hover:text-gray-600">여성</Link>
                    <Link href="/kids" className="hover:text-gray-600">키즈</Link>
                    <Link href="/sale" className="hover:text-gray-600">할인</Link>
                    <Link href="/brand" className="hover:text-gray-600">브랜드</Link>
                </div>

                {/* 우측 아이콘들 */}
                <div className="flex items-center gap-2">
                    {/* 검색 */}
                    <div className="flex items-center w-[150px] bg-[#F5F5F5] rounded-full px-3 py-1 border-none hover:bg-gray-200"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Image
                            src="/src/assets/icons/search.svg"
                            alt="search"
                            width={20}
                            height={20}
                            className="text-gray-400"
                        />
                        <span className="ml-2 text-[#707072]">검색</span>
                    </div>

                    {/* 프로필 */}
                    <button onClick={() => { setProfileIsOpen(!isProfileOpen); }}
                        className="relative p-2 rounded-[10px] hover:bg-gray-200 transition flex items-center justify-center">
                        <div className="rounded-full overflow-hidden">
                            <Image
                                src="/src/assets/icons/profile.svg"
                                alt="Profile"
                                width={27}
                                height={27}
                            />
                        </div>
                    </button>

                   
                    {/* 장바구니 */}
                    <button
                        onClick={() => router.push("/cart")} // 버튼 클릭 시 /cart로 이동
                        className="p-2 rounded-[10px] hover:bg-gray-200 transition flex items-center justify-center"
                    >
                        <Image
                            src="/src/assets/icons/cart.svg"
                            alt="cart"
                            width={36}
                            height={36}
                        />
                    </button>
                </div>
            </nav>

            {/* 모달 */}
            {isProfileOpen && <ProfileModal setIsOpen={setProfileIsOpen} setIsNotificationOpen={setIsNotificationOpen}/>}
            {isSearchOpen && <SearchModal setIsOpen={setIsSearchOpen} />}
            {isNotificationOpen && <NotificationSidebar setIsOpen={setIsNotificationOpen} />}
        </>


    );
}