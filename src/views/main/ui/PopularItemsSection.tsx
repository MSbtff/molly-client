"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import getProduct from "@/shared/api/getProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
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

const popularCategories = [ "아우터","상의","바지","원피스/스커트","패션소품",];

export default function PopularItemsSection() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; 
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL; 
  const productApiUrl = `${baseUrl}/product`; 
  
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("아우터"); //현재 선택된 카테고리
  // const [products, setProducts] = useState<Product[]>([]); //api로 가져온 상품 리스트
  const [allProducts, setAllProducts] = useState<Product[]>([]); // API로 가져온 36개 상품 전체
  // const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 (0, 1, 2)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  // const [loading, setLoading] = useState(false);///데이터 로딩 상태
  const [imageError, setImageError] = useState(false);

  const fetchProducts = async (category: string) => {
    // setLoading(true);
    try {
      // const response = await fetch(`${productApiUrl}?categories=${encodeURIComponent(category)}&orderBy=CREATED_AT&page=0&size=12`);
      const paramsString = `${productApiUrl}?categories=${encodeURIComponent(category)}&orderBy=CREATED_AT&page=0&size=36`;
      const response = await getProduct(paramsString);
      const data = await response;
      console.log("지금 인기있는 상품 api 성공", data);
      setAllProducts(data.data || []); // 받아온 데이터 저장
      if (swiperRef.current) {
        swiperRef.current.slideTo(0);
      }
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
    // fetchProducts(category); 이거 없어도 될거 같은데
  };

  // "다른 추천 상품 보기" 버튼 클릭 핸들러
  const handleNextPage = () => {
    // 페이지 순환 (0→1→2→0→1→...)
    // setCurrentPage((prev) => (prev + 1) % 3);
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  // 현재 페이지에 표시할 상품 계산
  const getProductGroups = () => {
  // const getCurrentPageProducts = () => {
    // const startIndex = currentPage * 12;
    // const endIndex = startIndex + 12;
    // return allProducts.slice(startIndex, endIndex);
    const groups = [];
    for (let i = 0; i < 3; i++) {
      const startIndex = i * 12;
      const endIndex = startIndex + 12;
      const group = allProducts.slice(startIndex, endIndex);
      if (group.length > 0) {
        groups.push(group);
      }
    }
    return groups;
  };

  //특정 상품 클릭 시 url 변경
  const handleProductClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
    <section className="px-20">
      <h3 className="text-xl font-semibold mb-4">지금 인기있는 상품</h3>

      {/* 카테고리 버튼 */}
      <div className="flex gap-4 mb-4">
        {popularCategories.map((category, index) => (
          <button key={index}
            className={`px-4 py-2 rounded-full border border-gray-600 ${selectedCategory === category ? "bg-black text-white" : "bg-gray"}`}
            onClick={() => handleCategoryChange(category)}
          > {category}
          </button>
        ))}
      </div>

      {/* 상품 리스트 */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-2  gap-2 mt-1">
        {getCurrentPageProducts().map((product) => (
          <div key={product.id} className="flex flex-col items-center mt-10">
            {imageUrl && (
              <Image
                src={ imageError ? "/images/noImage.svg" : `${imageUrl}${product.thumbnail.path}`}
                alt={product.brandName}
                width={200}
                height={250}
                className="w-full h-auto object-contain cursor-pointer"
                onError={() => setImageError(true)}
                onClick={() => handleProductClick(product.id)}
              />
            )}
            <button className="flex flex-col items-start w-full overflow-hidden"
                    onClick={() => handleProductClick(product.id)}>
              <span className="text-left mt-1 text-sm font-semibold"> {product.brandName}</span>
              <span className="text-left text-sm text-gray-500 truncate w-full"> {product.productName}</span>
              <span className="text-left text-black-500 font-semibold"> {product.price.toLocaleString()}원</span>
            </button>
          </div>
        ))}
      </div> */}
      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        onSlideChange={(swiper) => setCurrentSlideIndex(swiper.realIndex)}
        className="w-full"
      >
        {getProductGroups().map((group, groupIndex) => (
          <SwiperSlide key={groupIndex}>
            <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-2 gap-2 mt-1">
              {group.map((product) => (
                <div key={product.id} className="flex flex-col items-center mt-10">
                  {imageUrl && (
                    <Image
                      src={imageError ? "/images/noImage.svg" : `${imageUrl}${product.thumbnail.path}`}
                      alt={product.brandName}
                      width={200}
                      height={250}
                      className="w-full h-auto object-contain cursor-pointer"
                      // onError={() => handleImageError(product.id)}
                      onClick={() => handleProductClick(product.id)}
                    />
                  )}
                  <button
                    className="flex flex-col items-start w-full overflow-hidden"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <span className="text-left mt-1 text-sm font-semibold">{product.brandName}</span>
                    <span className="text-left text-sm text-gray-500 truncate w-full">{product.productName}</span>
                    <span className="text-left text-black-500 font-semibold">{product.price.toLocaleString()}원</span>
                  </button>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>


      {/* "다른 추천 상품 보기" 버튼 */}
      <div className="flex justify-center mt-8">
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-400 text-base font-medium hover:bg-gray-100 transition"
                onClick={handleNextPage}
                disabled={allProducts.length <= 12}>
          <RotateCcw size={20} /> 다른 추천 상품 보기
        </button>
      </div>
    </section>
  );
}
