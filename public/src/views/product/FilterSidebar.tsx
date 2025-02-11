'use client';

import { useState } from 'react';
import { X } from 'lucide-react'; // 닫기 버튼 아이콘
import clsx from 'clsx'; // Tailwind 클래스 조건부 적용

interface FilterSidebarProps {
  setIsOpen: (value: boolean) => void;
}

const categories = ['아우터', '상의', '바지', '원피스/스커트', '패션소품'];
const genders = ['남성', '여성', '키즈'];
const colors = [
  { name: '블랙', color: 'bg-black' },
  { name: '블루', color: 'bg-blue-500' },
  { name: '브라운', color: 'bg-yellow-700' },
  { name: '그린', color: 'bg-green-500' },
  { name: '그레이', color: 'bg-gray-500' },
  { name: '멀티컬러', color: 'bg-black border-2 border-white' },
  { name: '오렌지', color: 'bg-orange-500' },
  { name: '핑크', color: 'bg-pink-500' },
  { name: '퍼플', color: 'bg-purple-500' },
  { name: '레드', color: 'bg-red-500' },
  { name: '화이트', color: 'bg-white border' },
  { name: '옐로우', color: 'bg-yellow-500' },
];
const priceRanges = [
  '0 - 50,000 원',
  '50,000 - 100,000 원',
  '100,000 - 150,000 원',
  '150,000 - 200,000 원',
  '200,000 원 이상',
];
const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', 'F'];


export default function FilterSidebar({ setIsOpen }: FilterSidebarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  return (
    <div className="fixed top-0 left-0 w-[320px] h-full bg-white shadow-lg z-50 overflow-y-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <h2 className="text-lg font-semibold">필터</h2>
        <button onClick={() => setIsOpen(false)} className="text-gray-500 text-xl">
          <X />
        </button>
      </div>

      {/* 성별 */}
      <div className="flex gap-4 px-4 py-3 border-b">
        {genders.map((gender) => (
          <button
            key={gender}
            className={clsx(
              "text-sm px-3 py-2 rounded-md transition",
              selectedGender === gender ? "bg-gray-200 text-black font-semibold" : "text-gray-600"
            )}
            onClick={() => setSelectedGender(selectedGender === gender ? null : gender)}
          >
            {gender}
          </button>
        ))}
      </div>

      {/* 카테고리 */}
      <div className="px-4 py-4 border-b">
        {categories.map((category) => (
          <button
            key={category}
            className={clsx(
              "block text-left w-full py-2",
              selectedCategory === category ? "bg-gray-200 rounded-lg font-bold text-black" : "text-gray-700"
            )}
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 색상 */}
      <div className="px-4 py-4 border-b">
        <h3 className="text-sm font-semibold mb-3">색상</h3>
        <div className="grid grid-cols-4 gap-2">
          {colors.map(({ name, color }) => (
            <button
              key={name}
              className={clsx("w-8 h-8 rounded-full flex items-center justify-center", color, {
                "border-2 border-black": selectedColor === name,
              })}
              onClick={() => setSelectedColor(selectedColor === name ? null : name)}
            >
              {selectedColor === name && <span className="text-xs text-white">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* 가격 */}
      <div className="px-4 py-4 border-b">
        <h3 className="text-sm font-semibold mb-3">가격</h3>
        {priceRanges.map((price) => (
          <label key={price} className="flex items-center space-x-2 text-gray-700">
            <input
              type="radio"
              name="price"
              className="w-4 h-4"
              checked={selectedPrice === price}
              onChange={() => setSelectedPrice(price)}
            />
            <span>{price}</span>
          </label>
        ))}
      </div>

      {/* 사이즈 */}
      <div className="px-4 py-4 border-b">
        <h3 className="text-sm font-semibold mb-3">사이즈</h3>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={clsx(
                "border px-3 py-2 rounded-md text-sm",
                selectedSize === size ? "bg-black text-white" : "text-gray-700"
              )}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex items-center justify-between p-4">
        <button className="border border-gray-500 px-4 py-2 rounded-md text-sm" onClick={() => {
          setSelectedCategory(null);
          setSelectedColor(null);
          setSelectedPrice(null);
          setSelectedSize(null);
        }}>
          초기화
        </button>
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
          465개 상품 보기
        </button>
      </div>
    </div>
  );
}
