'use client';

import {  useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from "react";
import CategoryButtons from "./CategoryButtons";
import SortButtons from "./SortButtons";
import ProductList from "./ProductList";
import FilterSidebar from "../FilterSidebar";
import SortModal from "../SortModal";
import type { Product } from "@/shared/types/product";
import LoadingSkeleton from "./LoadingSkeleton";

export default function Product() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isFilterOpen, setIsFilterOpen] = useState(false); // 필터 모달 상태
  const [selectedSort, setSelectedSort] = useState("조회순"); // 현재 선택된 정렬 기준
  const [isSortModalOpen, setIsSortModalOpen] = useState(false); // 정렬 모달 열림 상태

  //정렬 옵션 매핑 (한글 → API 값)
  const sortOptions: Record<string, string> = {
    "조회순": "VIEW_COUNT", "신상품순": "CREATED_AT", "판매순": "PURCHASE_COUNT", "낮은가격순": "PRICE_ASC", "높은가격순": "PRICE_DESC"
  };

  //품절 체크박스 핸들러 -> url에 반영
  const handleExcludeSoldOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const params = new URLSearchParams(window.location.search);

    if (checked) {
      params.set("excludeSoldOut", "true");
    } else {
      params.delete("excludeSoldOut");
    }
    router.push(`/product?${params.toString()}`); // URL 변경
  };

  //정렬 핸들러 -> url에 반영
  const handleSortChange = (sortLabel: string) => {
    const orderBy = sortOptions[sortLabel];

    if (!orderBy) return;//변환이 실패되면 실행하지 않음

    const params = new URLSearchParams(window.location.search);

    params.set("orderBy", orderBy);
    params.set("page", "0");

    setSelectedSort(sortLabel);
    router.push(`/product?${params.toString()}`); // URL 변경
  };

  //상품 클릭 시 상세 페이지 이동
  const handleProductClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
    <>
      <div className="px-20 mt-10">
        <CategoryButtons isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />
        <SortButtons
          selectedSort={selectedSort}
          handleExcludeSoldOutChange={handleExcludeSoldOutChange}
          handleSortChange={handleSortChange}
          isSortModalOpen={isSortModalOpen}
          setIsSortModalOpen={setIsSortModalOpen}
          sortOptions={sortOptions}
          searchParams={searchParams}
        />
        <Suspense fallback={<LoadingSkeleton />}>
          <ProductList
            handleProductClick={handleProductClick}
          />
        </Suspense>
        {isFilterOpen && <FilterSidebar setIsOpen={setIsFilterOpen} />}
        {isSortModalOpen && <SortModal isOpen={isSortModalOpen} onClose={() => setIsSortModalOpen(false)} onSortSelect={handleSortChange}
                                       selectedSort={selectedSort} />}
      </div>
    </>
  );
}
