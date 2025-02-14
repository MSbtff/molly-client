// import { useState } from "react";
// import Image from "next/image";
import { Search } from 'lucide-react';


export default function SearchModal({ setIsOpen }: { setIsOpen: (value: boolean) => void }) {
    return (
        <>
            {/* 전체 모달 화면 */}
            {/* <div className="fixed inset-0 z-50 bg-gray-100 bg-opacity-90"> */}

            <div className="fixed inset-0 z-50">
                {/* 블러 배경 오버레이 */}
                <div
                    className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md"
                    onClick={() => setIsOpen(false)}
                ></div>

                {/* 상단 검색 바 (하얀색 배경) */}
                <div className="relative w-full bg-white px-4 md:px-8 lg:px-12 shadow-md h-1/2"> {/*relative 추가안하면 원하는대로 안나옴*/}
                    <div className="flex items-center justify-between px-6 py-4">
                        {/* 로고 */}
                        <h1 className="text-xl font-bold">MOLLY</h1>

                        {/* 검색 입력 필드 */}
                        <div className="flex items-center flex-1 mx-4">
                            <div className="relative w-full">
                                <Search size={23} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="검색"
                                    className="text-[#707072] w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* 취소 버튼 */}
                        <button className="text-black text-sm font-medium" onClick={() => setIsOpen(false)}>
                            취소
                        </button>
                    </div>
                </div>

                {/* 검색 추천 키워드 영역 */}
                {/* <div className="bg-white px-6 py-4 shadow-md">
                    <h2 className="text-gray-600 text-sm font-semibold">인기 검색어</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {["jordan 1", "에어포스", "코르테즈", "에어맥스", "acg", "보메로", "v2k", "삭스"].map((keyword) => (
                            <button key={keyword} className="px-4 py-1 text-sm bg-gray-200 rounded-full">
                                {keyword}
                            </button>
                        ))}
                    </div>
                </div> */}

                {/* 나머지 배경 회색 */}
                {/* <div className="absolute bg-black bg-opacity-30 backdrop-blur-md"></div> */}
            </div>
        </>
    );
}