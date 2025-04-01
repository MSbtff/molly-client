"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {DetailProduct} from "@/shared/types/product";
interface ProductRecommendProps {
  products: DetailProduct[];
}

export default function ProductRecommend({ products }: ProductRecommendProps) {
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const router = useRouter();

  return (
    <section className="max-w-screen-lg mx-auto mt-40 px-4">
            <p className="text-2xl font-semibold mb-3">추천 상품</p>
    
            {/* 가로 스크롤 가능한 상품 리스트 */}
            <div className="flex overflow-x-auto space-x-6 scrollbar-hide">
              {products.length > 0 ? (
                products.map((item) => (
                  <div key={item.id} className="w-[200px] flex flex-col items-center">
                    {/* 이미지 고정 크기 지정 */}
                    {/* <div className="w-[200px] h-[240px] flex items-center justify-center overflow-hidden"> */}
                    <div className="aspect-[5/6] relative w-full">
                      <Image
                        src={`${imageUrl}${item.thumbnail.path}?w=200&h=240&r=true`}
                        alt={item.productName}
                        // width={200}
                        // height={240}
                        fill
                        className="object-cover"
                        onClick={() => router.push(`/detail/${item.id}`)}
                        unoptimized={true}
                      />
                    </div>
    
                    {/* 텍스트 영역 */}
                    <button
                      className="flex flex-col items-start w-full overflow-hidden "
                      onClick={() => router.push(`/product/${item.id}`)}
                    >
                      {/* 브랜드명 */}
                      <p className="text-left text-sm font-semibold truncate w-full">
                        {item.brandName}
                      </p>
    
                      {/* 상품명 (최대 2줄) */}
                      <p className="text-left text-sm text-gray-600 truncate w-full line-clamp-2">
                        {item.productName}
                      </p>
    
                      {/* 가격 */}
                      <p className="text-left text-black font-semibold">
                        {item.price.toLocaleString()}원
                      </p>
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">추천 상품이 없습니다.</p>
              )}
            </div>
          </section>
  );
}