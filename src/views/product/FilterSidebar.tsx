"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { X } from "lucide-react"; // 닫기 버튼 아이콘
import clsx from "clsx"; // Tailwind 클래스 조건부 적용
interface FilterSidebarProps {
  setIsOpen: (value: boolean) => void;
}

const categories = ["아우터", "상의", "바지", "원피스/스커트", "패션소품"];
const genders = ["남성", "여성"];
const colors = [
  { name: "블랙", hex: "#000000", color: "bg-black" },
  { name: "블루", hex: "#1790C8", color: "bg-blue-500" },
  { name: "브라운", hex: "#825D41", color: "bg-yellow-700" },
  { name: "그린", hex: "#7BBA3C", color: "bg-green-500" },
  { name: "그레이", hex: "#808080", color: "bg-gray-500" },
  {
    name: "멀티컬러",
    hex: "multi",
    color:
      "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500",
  },
  { name: "오렌지", hex: "#F36B26", color: "bg-orange-500" },
  { name: "핑크", hex: "#F0728F", color: "bg-pink-500" },
  { name: "퍼플", hex: "#8D429F", color: "bg-purple-500" },
  { name: "레드", hex: "#E7352B", color: "bg-red-500" },
  { name: "화이트", hex: "#FFFFFF", color: "bg-white border" },
  { name: "옐로우", hex: "#FED533", color: "bg-yellow-500" },
];
const priceRanges = [
  "0 - 50,000 원",
  "50,000 - 100,000 원",
  "100,000 - 150,000 원",
  "150,000 - 200,000 원",
  "200,000 원 이상",
];
const sizes = ["XS", "S", "M", "L", "XL", "2XL", "FREE"];

export default function FilterSidebar({ setIsOpen }: FilterSidebarProps) {
  const router = useRouter();

  //상태 관리
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  //필터 선택 로직
  const toggleSelection = (
    selectedList: string[],
    setList: (value: string[]) => void,
    item: string
  ) => {
    if (selectedList.includes(item)) {
      setList(selectedList.filter((i) => i !== item)); // 이미 선택된 경우 제거
    } else {
      setList([...selectedList, item]); // 새로 선택된 경우 추가
    }
  };
  // 성별 버튼 클릭 핸들러 (하나만 선택 가능)
  const handleGenderSelect = (gender: string) => {
    setSelectedGender(selectedGender === gender ? null : gender); // 동일한 걸 클릭하면 취소
  };
  // 가격 선택 핸들러 (단일 선택 가능)
  const handlePriceSelect = (price: string) => {
    setSelectedPrice(selectedPrice === price ? null : price); // 선택한 값이 같으면 취소, 아니면 변경
  };
  // 카테고리 버튼 클릭 핸들러 (단일 선택)
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category); // 같은 걸 클릭하면 해제
  };

  //필터 적용 로직(쿼리 파라미터로 전환)
  const handleApplyFilters = () => {

    // 기존 URL의 검색 파라미터를 가져옴
    // const params = new URLSearchParams(window.location.search);
    // URL 파라미터를 빈 상태로 초기화
    const params = new URLSearchParams();

    // ✅ 카테고리(성별 + 옷) 필터 추가
    const selectedCategories = [
      ...(selectedGender ? [selectedGender] : []),
      ...(selectedCategory ? [selectedCategory] : []),
    ];
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    } else {
      params.delete("categories");
    }

    // ✅ 색상 필터 추가
    if (selectedColor.length > 0) {
      const colorHexValues = selectedColor.map((name) => {
        const colorObj = colors.find((c) => c.name === name);
        return colorObj ? colorObj.hex : name;
      });
      params.set("colorCode", colorHexValues.join(","));
    } else {
      params.delete("colorCode");
    }

    // ✅ 가격 필터 추가
    if (selectedPrice) {
      // const priceRange = selectedPrice.replace(/[^0-9~]/g, "");
      // const [min, max] = priceRange.split("~").map(Number);
      // if (!isNaN(min)) params.set("priceGoe", min.toString());
      // else params.delete("priceGoe");
      // if (!isNaN(max)) params.set("priceLt", max.toString());
      // else params.delete("priceLt");
      // 가격 범위에서 숫자만 추출
      const numbers = selectedPrice.match(/\d{1,3}(,\d{3})*(\.\d+)?/g);
      if (numbers && numbers.length >= 2) {
        // 첫 번째 숫자는 최소 가격
        const min = parseInt(numbers[0].replace(/,/g, ''));
        // 두 번째 숫자는 최대 가격
        const max = parseInt(numbers[1].replace(/,/g, ''));

        if (!isNaN(min)) params.set("priceGoe", min.toString());
        else params.delete("priceGoe");

        if (!isNaN(max)) params.set("priceLt", max.toString());
        else params.delete("priceLt");
      } else if (numbers && numbers.length === 1) {
        // "200,000 원 이상"과 같은 경우
        const price = parseInt(numbers[0].replace(/,/g, ''));
        if (selectedPrice.includes("이상")) {
          params.set("priceGoe", price.toString());
          params.delete("priceLt");
        } else {
          params.set("priceLt", price.toString());
          params.delete("priceGoe");
        }
      }
    } else {
      params.delete("priceGoe");
      params.delete("priceLt");
    }

    // ✅ 사이즈 필터 추가
    if (selectedSize.length > 0) {
      params.set("productSize", selectedSize.join(","));
    } else {
      params.delete("productSize");
    }

    // 🔹 필터 적용 후 URL 변경
    // const newSearchParams = params.toString(); // 파라미터를 문자열로 변환
    router.push(`/product?${params.toString()}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* 블러 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md"
        onClick={() => setIsOpen(false)}>
      </div>

      <div className="fixed top-0 left-0 w-[320px] h-full bg-white shadow-lg z-50 overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-4">
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
                selectedGender === gender
                  ? "bg-gray-200 text-black font-semibold"
                  : "text-gray-600"
              )}
              onClick={() => handleGenderSelect(gender)}
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
                selectedCategory === category
                  ? "bg-gray-200 rounded-lg font-bold text-black"
                  : "text-gray-700"
              )}
              onClick={() => handleCategorySelect(category)}
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
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  color,
                  {
                    "border-2 border-black": selectedColor.includes(name),
                  }
                )}
                onClick={() =>
                  toggleSelection(selectedColor, setSelectedColor, name)
                }
              >
                {selectedColor.includes(name) && (
                  <span className="text-xs text-white">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 가격 */}
        <div className="px-4 py-4 border-b">
          <h3 className="text-sm font-semibold mb-3">가격</h3>
          {priceRanges.map((price) => (
            <button
              key={price}
              className={clsx(
                "border px-3 py-2 rounded-md text-sm",
                selectedPrice === price
                  ? "bg-black text-white"
                  : "text-gray-700"
              )}
              onClick={() => handlePriceSelect(price)}
            >
              {price}
            </button>
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
                  selectedSize?.includes(size)
                    ? "bg-black text-white"
                    : "text-gray-700"
                )}
                onClick={() =>
                  toggleSelection(selectedSize, setSelectedSize, size)
                }
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* 브랜드 */}
        {/* <div className="px-4 py-4 border-b">
          <h3 className="text-sm font-semibold mb-3">브랜드</h3>
        </div> */}

        {/*선택한 옵션*/}
        {(selectedGender ||
          selectedCategory ||
          selectedColor.length > 0 ||
          selectedPrice ||
          selectedSize.length > 0) && (
            <div className="px-4 py-4 border-b">
              <h3 className="text-sm font-semibold mb-3">선택한 필터</h3>

              <div className="flex flex-wrap gap-2">
                {[
                  ...(selectedGender ? [selectedGender] : []),
                  ...(selectedCategory ? [selectedCategory] : []),
                  ...selectedColor,
                  ...(selectedPrice ? [selectedPrice] : []),
                  ...selectedSize,
                ].map((item) => (
                  <button
                    key={item}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-200 rounded-full"
                    onClick={() => {
                      if (selectedGender === item) {
                        setSelectedGender(null); // 성별 선택 해제
                      } else if (selectedCategory === item) {
                        setSelectedCategory(null);
                      } else if (selectedColor.includes(item)) {
                        setSelectedColor(selectedColor.filter((i) => i !== item));
                      } else if (selectedPrice === item) {
                        // setSelectedPrice(selectedPrice.filter((i) => i !== item));
                        setSelectedGender(null); // 성별 선택 해제
                      } else if (selectedSize.includes(item)) {
                        setSelectedSize(selectedSize.filter((i) => i !== item));
                      }
                    }}
                  >
                    {item} <X size={14} />
                  </button>
                ))}
              </div>
            </div>
          )}

        {/* 버튼 */}
        <div className="flex items-center justify-between p-4">
          <button
            className="border border-gray-500 px-10 py-2 rounded-md text-sm"
            onClick={() => { setSelectedCategory(null); setSelectedColor([]);
              setSelectedPrice(null); setSelectedSize([]); setSelectedGender(null);
            }}> 초기화 
          </button>
          <button
            className="bg-black text-white px-10 py-2 rounded-md text-sm"
            onClick={() => { handleApplyFilters(); setIsOpen(false); }} > 상품 보기
          </button>
        </div>
      </div>
    </div>
  );
}
