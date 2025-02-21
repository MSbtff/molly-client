'use client';

import { useState } from "react";
import Image from 'next/image';
import { SideMyPage } from '../../../src/views/mypage/ui/SideMyPage';
import PostModal from '../../../src/views/review/ui/postModal';

interface ProductItem {
    id: number;
    name: string;
    size: string;
    date: string;
    imageUrl: string;
    status: '작성하기' | '수정'; // 작성 상태 (작성 전/후)
}

const products: ProductItem[] = [
    {
        id: 1,
        name: '라이트웨이트 크루 삭스',
        size: 'S',
        date: '02/03',
        imageUrl: '/images/sample-image.png',
        status: '수정',
    },
    {
        id: 2,
        name: '상품 이름 이요~',
        size: '사이즈요',
        date: '02/03',
        imageUrl: '/images/sample-image.png',
        status: '작성하기',
    },
    {
        id: 3,
        name: '상품 이름 이요~',
        size: '사이즈요',
        date: '02/03',
        imageUrl: '/images/sample-image.png',
        status: '작성하기',
    },
    {
        id: 4,
        name: '상품 이름 이요~',
        size: '사이즈요',
        date: '02/03',
        imageUrl: '/images/sample-image.png',
        status: '작성하기',
    },
];

export default function ProductList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        // <>
        //     <div className="flex p-8">
        //         <div className="w-[180px] h-full flex flex-col gap-4">
        //             <SideMyPage />
        //         </div>
        //     </div>
        //     <div className="max-w-4xl mx-auto space-y-6">
        //         {products.map((product) => (
        //             <div key={product.id} className="flex items-center justify-between border-b pb-4">
        //                 {/* 상품 이미지 */}
        //                 <div className="flex items-center gap-4">
        //                     <Image
        //                         src={product.imageUrl}
        //                         alt={product.name}
        //                         width={60}
        //                         height={60}
        //                         className="w-16 h-16 object-cover rounded-md"
        //                     />
        //                     {/* 상품 정보 */}
        //                     <div>
        //                         <p className="text-sm font-medium">{product.name}</p>
        //                         <p className="text-xs text-gray-500">{product.size}</p>
        //                     </div>
        //                 </div>

        //                 {/* 날짜 */}
        //                 <p className="text-sm text-gray-500">{product.date}</p>

        //                 {/* 작성 상태 버튼 */}
        //                 <div className="text-sm font-medium text-gray-400 flex items-center gap-4">
        //                     {product.status === '작성하기' ? (
        //                         <button className="text-gray-400">작성하기</button>
        //                     ) : (
        //                         <>
        //                             <button className="text-gray-500">수정</button>
        //                             <span className="text-gray-300">|</span>
        //                             <button className="text-gray-500">삭제</button>
        //                         </>
        //                     )}
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        // </>
        <div className="flex p-8 gap-8"> {/* ✅ 부모 div에 flex 추가 */}
            {/* 사이드바 */}
            <div className="w-[180px] h-full flex flex-col gap-4">
                <SideMyPage />
            </div>

            {/* 상품 리스트 */}
            <div className="flex-1 max-w-4xl space-y-6"> {/* ✅ flex-1 추가해서 가변 너비 적용 */}
                {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between border-b pb-4">
                        {/* 상품 이미지 */}
                        <div className="flex items-center gap-4">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={60}
                                height={60}
                                className="w-16 h-16 object-cover rounded-md"
                            />
                            {/* 상품 정보 */}
                            <div>
                                <p className="text-sm font-medium">{product.name}</p>
                                <p className="text-xs text-gray-500">{product.size}</p>
                            </div>
                        </div>

                        {/* 날짜 */}
                        <p className="text-sm text-gray-500">{product.date}</p>

                        {/* 작성 상태 버튼 */}
                        <div className="text-sm font-medium text-gray-400 flex items-center gap-4">
                            {product.status === '작성하기' ? (
                                <button className="text-gray-400"
                                    onClick={() => setIsModalOpen(true)}> 작성하기 </button>
                            ) : (
                                <>
                                    <button className="text-gray-500">수정</button>
                                    <span className="text-gray-300">|</span>
                                    <button className="text-gray-500">삭제</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {/* 모달 렌더링 */}
            <PostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>

    );
}
