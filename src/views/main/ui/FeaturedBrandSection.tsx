import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getProduct from "@/shared/api/getProduct";
interface Brand {
  brandThumbnailUrl: string;
  brandName: string;
}

export default function FeaturedBrandSection() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const brandApiUrl = `${baseUrl}/product/popular-brand`;

  const router = useRouter();

  const [brands, setBrands] = useState<Brand[]>([]); // 인기 브랜드 리스트
  // const [brandProducts, setBrandProducts] = useState<Product[]>([]); // 특정 브랜드의 상품 리스트
  // const [selectedBrand, setSelectedBrand] = useState<string | null>(null); // 선택된 브랜드명
  // const [imageError, setImageError] = useState<{ [key: number]: boolean }>({}); // 이미지 에러 처리

  //인기 브랜드 조회 api 요청
  const fetchPopularBrands = async () => {
    const paramsString = `${brandApiUrl}?page=0&size=6`;

    getProduct(paramsString)
      .then((response) => {
        console.log("인기 브랜드 API 성공:", response);

        if (response.data.length > 0) {
          setBrands(response.data);
        }
      })
      .catch((error) => {
        console.error("인기 브랜드 API 요청 실패:", error);
      });
  };

  useEffect(() => {
    fetchPopularBrands();
  }, []);

  //메인 배너 클릭 시 url 변경
  const handleBrandClick = (barndName: string) => {
    router.push(`/product?brandName=${barndName}`);
  };

  return (
    <section className="px-20 mt-16">
      <h3 className="text-xl font-semibold mb-4">주목할 브랜드</h3>
      {/* 메인 배너 */}
      <div className="grid grid-cols-2 gap-4">
        {brands.slice(0, 2).map((brand, index) => (
          <div key={index} className="relative w-full aspect-[3/2]">
            <Image
              src={
                !brand.brandThumbnailUrl
                  ? "/images/noImage.svg"
                  : `${imageUrl}${brand.brandThumbnailUrl}`
              }
              alt={brand.brandName}
              fill
              className="object-cover rounded"
              unoptimized={true}
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center p-6">
              <div className="text-white">
                <h4 className="text-2xl font-bold">{`새로워진 ${brand.brandName}`}</h4>
                <button
                  className="mt-2 px-4 py-2 border border-white text-white text-sm"
                  onClick={() => handleBrandClick(brand.brandName)}
                >
                  바로가기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 브랜드 상품 리스트 (5개) */}
      <div className="grid grid-cols-4 gap-2 mt-10">
        {brands.slice(2).map((brand, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              src={
                !brand.brandThumbnailUrl
                  ? "/images/noImage.svg"
                  : `${imageUrl}${brand.brandThumbnailUrl}`
              }
              alt={brand.brandName}
              width={300}
              height={350}
              className="object-cover rounded cursor-pointer"
              onClick={() => handleBrandClick(brand.brandName)}
              unoptimized={true}
            />
            <p
              className="text-left mt-2 font-semibold text-sm cursor-pointer"
              onClick={() => handleBrandClick(brand.brandName)}
            >
              {" "}
              {brand.brandName}{" "}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
