'use client';
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useScrollStore } from "@/app/provider/scrollStore";
import useProductList from '@/features/product/hooks/useProductList';
interface ProductListProps {
  handleProductClick: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ handleProductClick, }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const productApiUrl = `${baseUrl}/product`;
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const { page, setPage } = useScrollStore()

  const { productList, fetchProductList, isLast, isLoading } = useProductList(productApiUrl);

  useEffect(() => {
    const trgRef = triggerRef.current;
    // if (!triggerRef.current || isLast) return;
    if (!trgRef || isLast || isLoading) return; //로딩 중일 때 중복 호출 방지

    const observer = new IntersectionObserver(//새로운 IntersectionObserver 객체 생성: 특정 요소(triggerRef.current)가 뷰토트에 진입했는지 감지하기 위해 사용
      (entries) => {//감지된 요소임. 하나의 triggerRef만 감지
        if (entries[0].isIntersecting && !isLoading) {
          fetchProductList(page);
          console.log("페이지 증가 전", page);
          setPage(page + 1);//페이지 증가
          console.log("무한스크롤로 상품 목록 api 요청");
        }
      },
      { threshold: 1.0 }//감지된 요소가 100% 화면에 나타날 때만 실행
    );
    observer.observe(trgRef);//감지 대상 등록

    return () => {//useEffect 클린업 함수. 언마운트될때 실행됨
      if (trgRef) observer.unobserve(trgRef);
    };
  }, [page, isLoading, isLast])//isLoading, fetchproductList, isLast를 넣으라는데 
  //왜 의존성 배열에 이렇게 넣어야 무한스크롤 트리거 되는지 모르겠음. 

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-2 gap-2 mt-1">
      {/* {isLoading ? (
        Array.from({ length: 24 }).map((_, index) => (
          <div key={index} className="flex flex-col items-left mt-10 animate-pulse">
            <div className="w-full aspect-[5/6] bg-gray-300 animate-pulse" />
            <div className="w-32 h-4 bg-gray-300 mt-2" />
            <div className="w-28 h-4 bg-gray-200 mt-1" />
            <div className="w-24 h-4 bg-gray-200 mt-1" />
          </div>
        ))
      ) :

      productList.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">검색된 상품이 없습니다.</p>
        ) : (
          <>
            {productList.map((item) => (
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
            ))}

            {productList.length > 0 && <div ref={triggerRef} className="h-20 w-full"></div>}
          </>
        )} */}

      {productList && productList.length === 0 && !isLoading ? (
        // 응답이 왔지만 상품이 없는 경우
        <p className="text-center text-gray-500 mt-10">검색된 상품이 없습니다.</p>
      ) : (
        <>
          {/* 기존 상품 UI */}
          {productList && productList.map((item) => (
            <div key={item.id} className="flex flex-col items-center mt-10">
              <Image
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
          ))}

          {/* 무한스크롤 트리거 */}
          {!isLast && <div ref={triggerRef} className="h-20 w-full"></div>}

          {/* 추가 로딩 중인 경우: 기존 UI는 그대로 유지하면서 하단에 스켈레톤 UI 추가 */}
          {isLoading && (
            Array.from({ length: 24 }).map((_, index) => (
              <div key={index} className="flex flex-col items-left mt-10 animate-pulse">
                <div className="w-full aspect-[5/6] bg-gray-300 animate-pulse" />
                <div className="w-32 h-4 bg-gray-300 mt-2" />
                <div className="w-28 h-4 bg-gray-200 mt-1" />
                <div className="w-24 h-4 bg-gray-200 mt-1" />
              </div>
            ))
          )}
        </>
      )}


    </div>
  );
};

export default ProductList;
