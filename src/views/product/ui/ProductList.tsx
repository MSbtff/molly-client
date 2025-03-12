'use client';

import React from "react";
import Image from "next/image";
import type {Product} from "@/shared/types/product";
interface ProductListProps {
  productList: Product[];
  isLoading: boolean;
  imageUrl: string;
  handleProductClick: (id: number) => void;
  // triggerRef: React.RefObject<HTMLDivElement>;
  fetchProductList: (nextPage: number) => void
}

const ProductList: React.FC<ProductListProps> = ({ productList, imageUrl, handleProductClick, triggerRef, fetchProductList,isLoading }) => {
  const isEmpty = !isLoading && productList.length === 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-2 gap-2 mt-1">
      {isLoading ? (
        // 스켈레톤 UI (로딩 중)
        Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col items-left mt-10 animate-pulse">
            <div className="w-40 h-40 bg-gray-300 rounded-md" />
            <div className="w-32 h-4 bg-gray-300 rounded mt-2" />
            <div className="w-28 h-4 bg-gray-200 rounded mt-1" />
            <div className="w-24 h-4 bg-gray-200 rounded mt-1" />
          </div>
        ))
      ) : isEmpty ? (
        // 응답이 왔지만 상품이 없는 경우
        <p className="text-center text-gray-500 mt-10">검색된 상품이 없습니다.</p>
      ) : (
        // 상품 데이터 렌더링
        productList.map((item) => (
          <div key={item.id} className="flex flex-col items-center mt-10">
            <Image
              // src={`${imageUrl}${item.url}`}
              src={item.url ? `${imageUrl}${item.url}` : "/images/noImage.svg"}
              alt={item.productName}
              width={250}
              height={300}
              className="w-full h-auto object-contain cursor-pointer"
              onClick={() => handleProductClick(item.id)}
            />
            <button className="flex flex-col items-start w-full overflow-hidden" onClick={() => handleProductClick(item.id)}>
              <p className="text-left mt-1 text-sm font-semibold">{item.brandName}</p>
              <p className="text-left text-sm text-gray-500 truncate w-full">{item.productName}</p>
              <p className="text-left text-black-500 font-semibold">{item.price.toLocaleString()}원</p>
            </button>
          </div>
        ))
      )}
      
      {/* 무한스크롤 트리거 */}
      {/* <div ref={triggerRef} className="h-20 w-full"></div> */}
    </div>
  );
};

export default ProductList;
