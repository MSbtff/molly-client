'use client'

import Image from "next/image";
import { RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
interface Thumbnail {
  path: string;
  filename: string;
}
interface Product {
  id: number;
  url: string;
  brandName: string;
  productName: string;
  price: number;
  thumbnail: Thumbnail;
}

const popularCategories = ["아우터", "상의", "바지", "원피스/스커트", "패션소품"];

export default function PopularItemsSection() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; //api 서버 주소
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL; //이미지 서버 주소
  const productApiUrl = `${baseUrl}/product`; //API 엔드포인트

  const [selectedCategory, setSelectedCategory] = useState("아우터");//현재 선택된 카테고리
  const [products, setProducts] = useState<Product[]>([]);//api로 가져온 상품 리스트
  // const [loading, setLoading] = useState(false);///데이터 로딩 상태
  const [imageError, setImageError] = useState(false);


  //데이터를 products 상태에 저장
  const fetchProducts = async (category: string) => {
    // setLoading(true);
    try {
      const response = await fetch(
        `${productApiUrl}?categories=${encodeURIComponent(category)}&orderBy=CREATED_AT&page=0&size=12`
      );
      const data = await response.json();
      console.log("지금 인기있는 상품 api 성공", data);
      setProducts(data.data || []); // 받아온 데이터 저장
    } catch (error) {
      console.error("지금 인기있는 상품 api 요청 실패:", error);
    } finally {
      // setLoading(false);
    }
  };

  //초기 데이터 불러오기 -캐싱처리 필요
  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  //카테고리 선택 핸들러 추가
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    fetchProducts(category);
  };


  return (
    <section className="px-20">
      <h3 className="text-xl font-semibold mb-4">지금 인기있는 상품</h3>

      {/* 카테고리 버튼 */}
      <div className="flex gap-4 mb-4">
        {popularCategories.map((category, index) => (
          <button key={index}
            className={`px-4 py-2 rounded-full border border-gray-600 ${selectedCategory === category ? "bg-black text-white" : "bg-gray"}`}
            onClick={() => handleCategoryChange(category)}>
              {category}
          </button>
        ))}
      </div>

      {/* 상품 리스트 */}
      <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-2  gap-2 mt-1">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col items-center mt-10">
            {imageUrl &&
            <Image
              src={imageError ? "/images/noImage.svg" : `${imageUrl}${product.thumbnail.path}`}
              alt={product.brandName}
              width={200}
              height={250}
              className="w-full h-auto object-contain cursor-pointer"
              onError={() => setImageError(true)} // 에러 발생 시 상태 변경하여 기본 이미지 표시
            />}
            <button className="flex flex-col items-start w-full overflow-hidden">
              <span className="text-left mt-1 text-sm font-semibold">{product.brandName}</span>
              <span className="text-left text-sm text-gray-500 truncate w-full">{product.productName}</span>
              <span className="text-left text-black-500 font-semibold">{product.price.toLocaleString()}원</span>
            </button>
          </div>
        ))}
      </div>
      {/* "다른 추천 상품 보기" 버튼 */}
      <div className="flex justify-center mt-8">
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-400 text-base font-medium hover:bg-gray-100 transition">
          <RotateCcw size={20} /> 다른 추천 상품 보기
        </button>
      </div>
    </section>
  );
}