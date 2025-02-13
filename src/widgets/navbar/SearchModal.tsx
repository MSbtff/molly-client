// import { useState } from "react";
// import Image from "next/image";
import { Search } from 'lucide-react';


export default function SearchModal({ setIsOpen }: { setIsOpen: (value: boolean) => void }) {
    return (
        <>
            {/* 전체 모달 화면 */}
            <div className="fixed inset-0 z-50 bg-white px-4 md:px-8 lg:px-12">
                {/* 상단 검색 바 */}
                <div className="flex items-center justify-between px-6 py-4 ">
                    {/* 로고 */}
                    <h1 className="text-xl font-bold">MOLLY</h1>

                    {/* 검색 입력 필드 */}
                    <div className="flex items-center flex-1 mx-4">
                        <div className="relative w-full">
                            <Search size={23} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"/>
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

                {/* 검색 결과 영역 (비어 있음) */}
                <div className="p-6"></div>
            </div>
        </>
    );
}
