'use client';
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { Product } from "@/shared/types/product";
import { useScrollStore } from "@/app/provider/scrollStore";
// import fetchProductList from "@/features/product/hooks/useProductList";
interface ProductListProps {
  productList: Product[];
  isLoading: boolean;
  imageUrl: string;
  isLast: boolean
  handleProductClick: (id: number) => void;
  // fetchProductList: (nextPage: number) => void
  fetchProductList: (page:number) => void

}

const ProductList: React.FC<ProductListProps> = ({ productList, imageUrl, handleProductClick, fetchProductList, isLoading, isLast }) => {
  const isEmpty = !isLoading && productList.length === 0;
  
 
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const {page,setPage} = useScrollStore()


  useEffect(()=>{//컴포넌트 렌더링될 때 실행, triggerRef가 화면에 나타나는지 감지함
    const trgRef = triggerRef.current;
    if(!triggerRef.current || isLast) return;//ref가 연결된 dom 요소 없거나(triggerRef.currnet==null) isLast가 true이면 중단 

    const observer = new IntersectionObserver(//새로운 IntersectionObserver 객체 생성: 특정 요소(triggerRef.current)가 뷰토트에 진입했는지 감지하기 위해 사용
      (entries) => {//감지된 요소임. 하나의 triggerRef만 감지
        if (entries[0].isIntersecting && !isLoading) {//감지된 요소(triggerRef.current)가 뷰포트에 보이면 true, 데이터를 불러오고 있는 중이 아니라면 실행
                                                      //스크롤이 특정 요소에 도달했을 때만 데이터 불러오고 api 요청 중이면 호출 안함
          console.log("triggerRef 감지되고 api 호출 중이 아님");
          fetchProductList(page);
          setPage(page + 1);//페이지 증가
          console.log("무한스크롤로 상품 목록 api 요청");
        }
      },
      { threshold: 1.0 }//감지된 요소가 100% 화면에 나타날 때만 실행
    );
    observer.observe(triggerRef.current);//감지 대상 등록

    return ()=>{//useEffect 클린업 함수. 언마운트될때 실행됨
      if (trgRef) observer.unobserve(trgRef);
    };
  },[isLoading, isLast, fetchProductList, page,setPage])//isLoading, fetchproductList, isLast를 넣으라는데 

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-2 gap-2 mt-1">
      {isLoading ? (
        // 스켈레톤 UI (로딩 중)
        Array.from({ length: 24 }).map((_, index) => (
          <div key={index} className="flex flex-col items-left mt-10 animate-pulse">
            <div className="w-full aspect-[5/6] bg-gray-300 animate-pulse" />
            <div className="w-32 h-4 bg-gray-300 mt-2" />
            <div className="w-28 h-4 bg-gray-200 mt-1" />
            <div className="w-24 h-4 bg-gray-200 mt-1" />
          </div>
        ))
      ) : isEmpty ? (
        // 응답이 왔지만 상품이 없는 경우
        <p className="text-center text-gray-500 mt-10">검색된 상품이 없습니다.</p>
      ) : (
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
      {productList.length > 0 && <div ref={triggerRef} className="h-20 w-full"></div>}
    </div>
  );
};

export default ProductList;
