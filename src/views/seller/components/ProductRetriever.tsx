"use client";

import { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

import Image from "next/image";

export interface ProductData {
  id: number;
  categories: string[];
  brandName: string;
  productName: string;
  price: number;
  description: string;
  thumbnail?: {
    path: string;
    filename: string;
  };
}

export interface SellerContainerProps {
  productRes: {
    pageable: {
      size: number;
      hasNext: boolean;
      isFirst: boolean;
      isLast: boolean;
    };
    data: ProductData[];
  };
}

export const ProductRetriever = ({ productRes }: SellerContainerProps) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(productRes);

  useEffect(() => {
    // 초기 데이터 설정
    if (productRes?.data) {
      setProducts(productRes.data);
    }
  }, [productRes]);

  // 상품 목록 조회
  const fetchProducts = async () => {
    setLoading(true);
    try {
    } catch (error) {
      console.error("상품 조회 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  // 검색어 변경 시 API 호출
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return (
    <div className="space-y-4">
      {/* 검색 입력창 */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="상품명 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-64"
        />
        <button
          onClick={() => fetchProducts()}
          className="px-4 py-2 bg-black text-white rounded-md"
        >
          검색
        </button>
      </div>

      {/* 상품 목록 테이블 */}
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <Table>
          <TableCaption>상품 목록</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">상품 ID</TableHead>
              <TableHead>상품명</TableHead>
              <TableHead>브랜드</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>설명</TableHead>
              <TableHead>가격</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  로딩 중...
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  등록된 상품이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>
                    <div className="aspect-[1/1.2] relative w-[50px] h-[50px] flex-shrink-0">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.thumbnail?.path}?w=50&h=50&r=false`}
                        alt={product.productName}
                        fill
                        className="object-cover"
                        unoptimized={true}
                        fetchPriority="high"
                        priority={true}
                        sizes="50px"
                      />
                    </div>
                    {product.productName}
                  </TableCell>
                  <TableCell>{product.brandName}</TableCell>
                  <TableCell>{product.categories[1]}</TableCell>
                  <TableCell>{product.price.toLocaleString()}원</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
