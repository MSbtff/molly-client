'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from "react";
import CategoryButtons from "./CategoryButtons";
import ProductFilters from "./ProductFilters";
import ProductList from "./ProductList";
import FilterSidebar from "../FilterSidebar";
import SortModal from "../SortModal";
import type { Product } from "@/shared/types/product";
import useProductList from '@/features/product/hooks/useProductList';
import LoadingSkeleton from "./LoadingSkeleton";

export default function Product() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; //api 서버 주소
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL; //이미지 서버 주소
  const productApiUrl = `${baseUrl}/product`; // 상품 목록 API 엔드포인트

  const [isFilterOpen, setIsFilterOpen] = useState(false); // 필터 모달 상태

  const [selectedSort, setSelectedSort] = useState("조회순"); // 현재 선택된 정렬 기준
  const [isSortModalOpen, setIsSortModalOpen] = useState(false); // 정렬 모달 열림 상태

  //정렬 옵션 매핑 (한글 → API 값)
  const sortOptions: Record<string, string> = {
    "조회순": "VIEW_COUNT",
    "신상품순": "CREATED_AT",
    "판매순": "PURCHASE_COUNT",
    "낮은가격순": "PRICE_ASC",
    "높은가격순": "PRICE_DESC"
  };

  //품절 제외 체크박스 핸들러 -> url에 반영
  const handleExcludeSoldOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const params = new URLSearchParams(window.location.search);

    if (checked) {
      params.set("excludeSoldOut", "true");
    } else {
      params.delete("excludeSoldOut");
    }
    router.push(`/product?${params.toString()}`);
  };

  //정렬 핸들러 -> url에 반영
  const handleSortChange = (sortLabel: string) => {
    const orderBy = sortOptions[sortLabel];

    if (!orderBy) return;//변환이 실패되면 실행하지 않음

    const params = new URLSearchParams(window.location.search);

    params.set("orderBy", orderBy);
    params.set("page", "0");

    setSelectedSort(sortLabel);
    router.push(`/product?${params.toString()}`);
  };

  //상품 클릭 시 상세 페이지 이동
  const handleProductClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  // API 관련 상태를 useProductList 훅에서 가져옴
  const { productList, fetchProductList, isLoading, isLast } = useProductList(productApiUrl);


  return (
    <>
      <div className="px-20 mt-10">
        <CategoryButtons isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />
        <ProductFilters
          selectedSort={selectedSort}
          sortOptions={sortOptions}
          handleExcludeSoldOutChange={handleExcludeSoldOutChange}
          handleSortChange={handleSortChange}
          isSortModalOpen={isSortModalOpen}
          setIsSortModalOpen={setIsSortModalOpen}
          searchParams={searchParams}
        />
        <Suspense fallback={<LoadingSkeleton />}>
          <ProductList
            productList={productList}
            isLoading={isLoading}
            isLast={isLast}
            fetchProductList={fetchProductList}
            imageUrl={imageUrl ?? ""}
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
