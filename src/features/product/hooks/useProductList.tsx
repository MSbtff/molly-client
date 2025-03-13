import { useState, useEffect, useCallback, useDeferredValue } from "react";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/shared/types/product";

export default function useProductList(productApiUrl: string) {
  const searchParams = useSearchParams();
  const deferredParams = useDeferredValue(searchParams);

  const [productList, setProductList] = useState<Product[]>([]); //필터가 변경될 때만 초기화하고 아닐 때는 기존 데이터를 유지하면서 새로운 데이터를 추가해 저장하는 방식으로
  const [isLoading, setIsLoading] = useState(false);
  
  const [isLast, setIsLast] = useState(false);
  const [filters, setFilters] = useState({
    keyword: "", categories: "", colorCode: "", productSize: "",
    brandName: "", priceGoe: "", priceLt: "", excludeSoldOut: "",
  });

  // url 상태 업데이트 (searchParams 변경 감지)
  useEffect(() => {
    const updatedFilters: Partial<typeof filters> = {};
    deferredParams.forEach((value, key) => {
      if (value) {
        updatedFilters[key as keyof typeof filters] = value;
      }
    });

    setFilters(updatedFilters as typeof filters);
    
    setIsLast(false);
    setProductList([]);
  }, [deferredParams]);

  console.log(deferredParams);
  console.log(filters);
  
  
  
  // 상품 목록 API 요청 _ 기존 데이터 유지하면서 새로운 데이터 추가하도록 수정
  // const fetchProductList = useCallback(async (nextPage: number) => {
    const fetchProductList = useCallback(async () => {
    // if (isLast) return;
    if (isLast || isLoading) return;


    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      // params.append("page", nextPage.toString());
      params.append("page", page.toString());
      console.log("api 호출 시 현재 페이지:", page);
      params.append("size", "48");

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      // setFilters((prevFilters) => {
      //   Object.entries(prevFilters).forEach(([key, value]) => {
      //     if (value) params.append(key, value);
      //   });
      //   return prevFilters;
      // });

      const response = await fetch(`${productApiUrl}?${params.toString()}`);
      if (!response.ok) throw new Error(`API 요청 실패: ${response.status}`);

      if (response.status === 204) {
        console.log("상품 목록이 없습니다.");
        return;
      }

      const data = await response.json();
      console.log("상품 목록 api 응답 성공:", data)

      const formattedData = data.data.map((item: Product) => ({
        id: item.id,
        url: item.thumbnail?.path,
        brandName: item.brandName,
        productName: item.productName,
        price: item.price,
      }));

      setProductList((prev) => [
        ...prev,
        ...formattedData.filter((newItem: Product) => !prev.some((item) => item.id === newItem.id)),
      ]);

      // setPage(nextPage);
      // console.log("+1 하기전:",page);
      // setPage((prev) => prev + 1);
      // console.log("+1 한 후:",page);

      setIsLast(data.pageable.isLast);
    } catch (error) {
      console.error("상품 목록 API 요청 에러:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLast, productApiUrl]); //isLoading, page, isLast, productApiUrl,deferredParams 넣으라는데
  //원래 isLast, productApiUrl만 있었음

  // filters 변경 시 API 요청 실행
  useEffect(() => {
       
      // fetchProductList(0);
      fetchProductList();

  
  }, [deferredParams, fetchProductList]);

  return {
    productList,
    isLast,
    isLoading,
    fetchProductList,
  };
}