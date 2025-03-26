"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getProduct from "@/shared/api/getProduct";
interface TrendReview {
  images: string[];
  reviewResDto: {
    nickname: string;
    content: string;
    productId: number;
  };
}
interface Product {
  id: number;
  productName: string;
  price: number;
  thumbnail: {
    path: string;
  };
}

export default function Trend() {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const trendReviews = `${baseUrl}/trending`;

  const searchParams = useSearchParams();
  const scrollToId = searchParams.get("id");

  const [reviews, setReviews] = useState<
    {
      id: number;
      image: string;
      nickname: string;
      content: string;
      product?: Product;
    }[] >([]);

  const fetchTrendingReviews = async () => {
    try {
      const response = await getProduct(trendReviews);
      const data = await response;
      console.log("트렌드 리뷰 api 성공", data);

      const reviewData = data.map((item: TrendReview, index: number) => ({
        id: index,
        image: item.images?.[0] || "/images/noImage.svg",
        nickname: item.reviewResDto.nickname,
        content: item.reviewResDto.content,
        productId: item.reviewResDto.productId,
      }));

      const productPromises = reviewData.map(
        (review: (typeof reviewData)[number]) =>
          getProduct(`${baseUrl}/product/${review.productId}`).catch(() => null)
      );

      console.log(productPromises);
      const products = await Promise.all(productPromises);

      // 리뷰와 상품 데이터를 결합
      const combinedData = reviewData.map(
        (review: (typeof reviewData)[number], idx: number) => ({
          ...review,
          product: products[idx] || null, // 상품 데이터가 없을 경우 null
        })
      );
      setReviews(combinedData);
    } catch (error) {
      console.error("인기 있는 리뷰 api 요청 실패:", error);
    }
  };

  useEffect(() => {
    fetchTrendingReviews();
  }, []); //[]안 썻다가 무한 요청 일어났음. 의존성 배열 없으면 컴포넌트 렌더링될 때마다 실행된다.

  useEffect(() => {
    if (scrollToId) {
      const element = document.getElementById(`review-${scrollToId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [reviews]);

  const handleProductClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
    <section className="max-w-3xl mx-auto p-4">
      {/* 리뷰 카드 */}
      <div className="grid grid-cols-1 gap-8 mt-6">
        {reviews.map((item) => (
          <div key={item.id} id={`review-${item.id}`} className="pb-6">
            {/* 유저 정보 */}
            <div className="flex items-center mb-4">
              <Image
                src="/logo.webp"
                alt="profile"
                width={40}
                height={40}
                className="rounded-full"
                unoptimized={true}
              />
              <p className="ml-2 font-semibold">{item.nickname}</p>
            </div>
            {/* 리뷰 이미지 */}
            <Image
              src={`${imageUrl}${item.image}`}
              alt="리뷰 이미지"
              width={400}
              height={500}
              className="w-full h-auto object-cover"
              unoptimized={true}
            />
            {/* 상품 정보 */}
            {item.product && (
              <div
                className="flex items-center mt-4 cursor-pointer"
                onClick={() => handleProductClick(item.product!.id)}
              >
                <Image
                  src={`${imageUrl}${item.product.thumbnail.path}`}
                  alt="상품 이미지"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-md"
                  unoptimized={true}
                />
                <div className="ml-3">
                  <p className="text-sm font-semibold">
                    {item.product.productName}
                  </p>
                  <p className="text-gray-500">
                    {item.product.price.toLocaleString()}원
                  </p>
                </div>
              </div>
            )}
            {/* 리뷰 내용 */}
            <p className="mt-2 text-sm">{item.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
