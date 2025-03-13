import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/shared/types/product";

export default function useProductList(productApiUrl: string) {
  const searchParams = useSearchParams();

  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [filters, setFilters] = useState({
    keyword: "", categories: "", colorCode: "", productSize: "",
    brandName: "", priceGoe: "", priceLt: "", excludeSoldOut: "",
  });

  // url 상태 업데이트 (searchParams 변경 감지)
  useEffect(() => {
    const updatedFilters: Partial<typeof filters> = {};
    searchParams.forEach((value, key) => {
      if (value) {
        updatedFilters[key as keyof typeof filters] = value;
      }
    });

    setFilters(updatedFilters as typeof filters);
    setPage(0);
    setIsLast(false);
    setProductList([]);
  }, [searchParams]);

  // 상품 목록 API 요청
  const fetchProductList = useCallback(async (nextPage: number) => {
    if (isLast) return;

    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("page", nextPage.toString());
      params.append("size", "48");

      // Object.entries(filters).forEach(([key, value]) => {
      //   if (value) params.append(key, value);
      // });
      setFilters((prevFilters) => {
        Object.entries(prevFilters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });
        return prevFilters;
      });

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

      setPage(nextPage);
      setIsLast(data.pageable.isLast);
    } catch (error) {
      console.error("상품 목록 API 요청 에러:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLast, productApiUrl]);

  // filters 변경 시 API 요청 실행
  useEffect(() => {
    if(productList.length === 0){
      fetchProductList(0);
    }
  }, [filters]);

  return {
    productList,
    isLast,
    isLoading,
    fetchProductList,
  };
}
