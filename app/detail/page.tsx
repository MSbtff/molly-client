'use client';

import { useState } from 'react';
import Image from 'next/image';

// 샘플 이미지 데이터 (백엔드 연동 시 API 요청으로 변경)
const product = {
    id: 1,
    name: 'ovbeige',
    description: '[Drama Signature] Sweater',
    originalPrice: 139000,
    discountedPrice: 104584,
    discountPercent: 24,
    point: 1251,
    images: [
        '/src/assets/images/product.svg',
        '/src/assets/images/thumb.svg',
        '/src/assets/images/thumb.svg',
        '/src/assets/images/thumb.svg',
    ],
    options: [
        { id: 1, label: '그린올리브/S', price: 125100 },
    ],
    detailImages: [
        "/src/assets/images/product.svg",
        "/src/assets/images/product.svg",
        "/src/assets/images/product.svg",
        "/src/assets/images/product.svg"
    ],
    detailDescription: [
        { label: "소재", value: "코튼 100%" },
        { label: "제조국", value: "대한민국" },
        { label: "세탁방법", value: "드라이클리닝 권장" }
    ],

};

export default function ProductDetail() {
    // const [selectedOption, setSelectedOption] = useState(product.options[0]);
    const selectedOption = product.options[0];
    const [quantity, setQuantity] = useState(1);
    const [showDetails, setShowDetails] = useState(false); // 상품 정보 더보기

    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    return (
        <>
            {/* 구매 섹션 */}
            <div className="max-w-screen-xl mx-auto p-6 flex gap-12">
                {/* 왼쪽: 상품 이미지 */}
                <div className="w-1/2">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="rounded-lg"
                    />
                    <div className="flex mt-4 gap-2">
                        {product.images.slice(1).map((img, index) => (
                            <Image
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                width={80}
                                height={80}
                                className="rounded-md cursor-pointer"
                            />
                        ))}
                    </div>
                </div>

                {/* 세로 구분선 */}
                <div className="border-l border-gray-300 h-auto"></div>

                {/* 오른쪽: 상품 정보 */}
                <div className="w-1/2 space-y-4">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-gray-500">{product.description}</p>

                    {/* 가격 정보 */}
                    <div className="text-lg">
                        <span className="text-gray-400 line-through block">{product.originalPrice.toLocaleString()}원</span>
                        <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-red-500 font-bold text-2xl">
                                {product.discountedPrice.toLocaleString()}원
                            </span>
                            <span className="text-red-500 text-lg">{product.discountPercent}%</span>
                        </div>
                    </div>

                    {/* 포인트 및 혜택 */}
                    <div className="text-sm text-gray-600">
                        포인트 적립: <span className="font-semibold">{product.point} P 적립</span>
                    </div>

                    {/* 구분선 */}
                    <hr className="my-6 border-gray-300" />

                    {/* 옵션 선택 */}
                    <div className="mt-4">
                        <p className="font-semibold">옵션 선택</p>
                        <button className="w-full border px-4 py-3 mt-2 text-left rounded-md">
                            색상/사이즈
                        </button>
                    </div>

                    {/* 선택된 옵션 표시 */}
                    <div className="border p-4 rounded-md flex flex-col justify-between items-start mt-2 bg-[#F6F6F6]">
                        <div><p>{selectedOption.label}</p></div>


                        <div className="flex justify-between items-center w-full mt-2">
                            {/* 수량 조절 버튼 */}
                            <div className="flex items-center border rounded-md overflow-hidden bg-white">
                                <button className="px-4 py-2 border-r bg-white" onClick={handleDecrease}>-</button>
                                <span className="px-6 py-2 text-center bg-white">{quantity}</span>
                                <button className="px-4 py-2 border-l bg-white" onClick={handleIncrease}>+</button>
                            </div>
                            {/* 가격 정보 */}
                            <p className="text-red-500 font-semibold">
                                {(selectedOption.price * quantity).toLocaleString()} 원
                            </p>
                        </div>
                    </div>

                    {/* 구매 버튼 */}
                    <div className="flex gap-4 mt-4">
                        <button className="w-1/2 border border-black py-3 rounded-md text-lg font-semibold">
                            바로 구매
                        </button>
                        <button className="w-1/2 bg-black text-white py-3 rounded-md text-lg font-semibold">
                            장바구니 담기
                        </button>
                    </div>
                </div>
            </div>

            {/* 구분선 */}
            <hr className="my-8 border-gray-300" />
            <p className="text-lg font-semibold pl-4">상품 정보</p>

            {/* 상세 섹션 */}
            <section className="max-w-screen-lg mx-auto mt-16 px-4">
                {/* 상품 이미지 및 그라데이션 */}
                <div className={`${showDetails ? "h-auto" : "h-[300px] overflow-hidden"} relative`}>
                    <div className="flex flex-col gap-6">
                        {product.detailImages.map((img: string, index: number) => (
                            <Image
                                key={index}
                                src={img}
                                alt={`Detail Image ${index + 1}`}
                                width={800}
                                height={600}
                                className="w-full object-cover"
                            />
                        ))}
                    </div>

                    {/* 그라데이션 효과 추가 (showDetails가 false일 때만 보이도록) */}
                    {!showDetails && (
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
                    )}
                </div>

                {/* 상품 정보 더보기 버튼을 그라데이션 끝에 배치 */}
                {!showDetails && (
                    // <div className="text-center mt-4">
                    <div className="text-center mt-[-2rem] relative z-10">
                        <button
                            className="px-6 py-3 border border-gray-400 rounded-lg text-lg font-medium hover:bg-gray-100 transition"
                            onClick={() => setShowDetails(true)}
                        >
                            상품 정보 더보기
                        </button>
                    </div>
                )}

                {/* 상세 설명 */}
                {showDetails && (
                    <>
                        <div className="mt-12">
                            <h2 className="text-xl font-bold mb-4">PRODUCT GUIDE</h2>
                            <table className="w-full border-collapse border border-gray-300">
                                <tbody>
                                    {product.detailDescription.map((row, index) => (
                                        <tr key={index} className="border border-gray-300">
                                            <td className="p-3 font-semibold border-r border-gray-300">{row.label}</td>
                                            <td className="p-3">{row.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 접기 버튼 */}
                        <div className="text-center mt-6">
                            <button
                                className="px-6 py-3 border border-gray-400 rounded-lg text-lg font-medium hover:bg-gray-100 transition"
                                onClick={() => setShowDetails(false)}
                            >
                                접기
                            </button>
                        </div>
                    </>
                )}
            </section>

            {/* 구분선 */}
            <hr className="my-8 mt-20 border-gray-300" />
            <p className="text-lg font-semibold pl-4">리뷰 440</p>

            {/* 리뷰 섹션 */}

            {/* 이 브랜드의 다른 상품 섹션 */}
        </>

    );
}
