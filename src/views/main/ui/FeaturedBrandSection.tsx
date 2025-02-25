import Image from "next/image";
import { useState, useEffect } from "react";
interface Brand {
  brandThumbnailUrl: string;
  brandName: string;
}
interface Product {
  id: number;
  brandName: string;
  productName: string;
  price: number;
  thumbnail: { path: string };
}

export default function FeaturedBrandSection() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; //api 서버 주소
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL; //이미지 서버 주소
  const brandApiUrl = `${baseUrl}/product/popular-brand`; //API 엔드포인트
  const productApiUrl = `${baseUrl}/product`; //API 엔드포인트

  const [brands, setBrands] = useState<Brand[]>([]); // 인기 브랜드 리스트
  const [brandProducts, setBrandProducts] = useState<Product[]>([]); // 특정 브랜드의 상품 리스트
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null); // 선택된 브랜드명
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({}); // 이미지 에러 처리


  //인기 브랜드 조회
  const fetchPopularBrands = async () => {
    try {
      const response = await fetch(`${brandApiUrl}?page=0&size=5`);
      const data = await response.json();
      console.log("인기 브랜드 API 성공:", data);

      if (data.data.length > 0) {
        setBrands(data.data);
        setSelectedBrand(data.data[0].brandName); // 첫 번째 브랜드 선택
      }
    } catch (error) {
      console.error("인기 브랜드 API 요청 실패:", error);
    }
  };

  //인기 브랜드의 특정 상품 조회
  const fetchBrandProducts = async (brandName: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${productApiUrl}?brandName=${encodeURIComponent(brandName)}&orderBy=CREATED_AT&page=0&size=3`
      );
      const data = await response.json();
      console.log("인기 브랜드의 특정 상품 API 성공:", data);

      setBrandProducts(data.data || []);
    } catch (error) {
      console.error("인기 브랜드의 특정 상품 API 요청 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularBrands();
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      fetchBrandProducts(selectedBrand);
    }
  }, [selectedBrand]);

  return (
    <section className="px-6 mt-16">
      <h3 className="text-xl font-semibold mb-4">주목할 브랜드</h3>

      {/* 메인 배너 */}
      <div className="grid grid-cols-2 gap-2">
        {/* 왼쪽 큰 배너 */}
        {/* <div className="relative w-full h-fit"> 부모를 자식에게 맞춤
            <Image
              src={Slider2}
              alt="J.ESTINA 브랜드"
              width={611}
              height={350}
              className="object-cover w-full h-auto rounded"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center p-6">
              <div className="text-white">
                <h4 className="text-2xl font-bold">J.ESTINA</h4>
                <p>로맨틱한 무드를 느낄 시간</p>
                <button className="mt-2 px-4 py-2 border border-white text-white rounded-lg text-sm">
                  바로가기
                </button>
              </div>
            </div>
          </div> */}
        {brands.length > 0 && (
          <div className="relative w-full h-fit">
            <Image
              src={`${imageUrl}${brands[0].brandThumbnailUrl}`}
          
              alt={brands[0].brandName}
              width={611}
              height={350}
              className="object-cover w-full h-auto rounded"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center p-6">
              <div className="text-white">
                <h4 className="text-2xl font-bold">{brands[0].brandName}</h4>
                <p>{`${brands[0].brandName} 느낄 시간`}</p>
                <button className="mt-2 px-4 py-2 border border-white text-white rounded-lg text-sm">
                  바로가기
                </button>
              </div>
            </div>
          </div>
        )}



        {/* 오른쪽 상품 리스트 (2개) */}
        <div className="grid grid-cols-3">
          {/* {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col items-center text-center mt-auto">
              
              <Image
                src={Default}
                alt={`추천 브랜드 ${index + 1}`}
                width={170}
                height={200}
                className="object-cover mt-4"
              />
              <button className="flex flex-col items-start items-center w-full overflow-hidden mt-2">
                <span className="text-left text-sm text-gray-700">[선택된PICK] 브랜드명</span>
                <span className="text-xs text-gray-500">상품명 {index + 1}</span>
                <span className="text-black-500 font-semibold text-sm">180,880원</span>

              </button>
            </div>
          ))} */}
          {brandProducts.map((product) => (
            <div key={product.id} className="flex flex-col items-center text-center mt-auto">
              {imageUrl &&
              <Image
                src={
                  imageError[product.id]
                    ? "/images/noImage.svg"
                    : `${imageUrl}${product.thumbnail.path}`
                }
                alt={product.brandName}
                width={170}
                height={200}
                className="object-cover mt-4"
                onError={() => setImageError((prev) => ({ ...prev, [product.id]: true }))}
              />}
              <button className="flex flex-col items-start items-center w-full overflow-hidden mt-2">
                <span className="text-left text-sm text-gray-700">{product.brandName}</span>
                <span className="text-xs text-gray-500">{product.productName}</span>
                <span className="text-black-500 font-semibold text-sm">
                  {product.price.toLocaleString()}원
                </span>
              </button>
            </div>
          ))}
        </div>


      </div>

      {/* 브랜드 상품 리스트 (5개) */}
      <div className="grid grid-cols-4 gap-2 mt-6">
        {/* {[...Array(4)].map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              src={Default}
              alt={`브랜드 상품 ${index + 1}`}
              width={300}
              height={350}
            />
            <p className="text-left mt-2 font-semibold text-sm">파사드 패턴</p>
          </div>
        ))} */}

        {brands.slice(1).map((brand, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              // src={`${imageUrl}${brand.brandThumbnailUrl}`}
              src={
                imageError[index]
                  ? "/images/noImage.svg"
                  : `${imageUrl}${brand.brandThumbnailUrl}`
              }
              alt={brand.brandName}
              width={300}
              height={350}
              className="object-cover rounded"
            />
            <p className="text-left mt-2 font-semibold text-sm">{brand.brandName}</p>
          </div>
        ))}
      </div>




      {/* "다른 상품 더보기" 버튼 */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 border border-gray-400 rounded-lg text-base font-medium hover:bg-gray-100 transition">
          다른 상품 더보기
        </button>
      </div>
    </section >
  );
}