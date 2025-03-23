import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getProduct from "@/shared/api/getProduct";
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const brandApiUrl = `${baseUrl}/product/popular-brand`;
  const productApiUrl = `${baseUrl}/product`;

  const router = useRouter();

  const [brands, setBrands] = useState<Brand[]>([]); // 인기 브랜드 리스트
  const [brandProducts, setBrandProducts] = useState<Product[]>([]); // 특정 브랜드의 상품 리스트
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null); // 선택된 브랜드명
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({}); // 이미지 에러 처리

  //인기 브랜드 조회 api 요청
  const fetchPopularBrands = async () => {
    // try {
    // const paramsString = `${brandApiUrl}?page=0&size=5`;
    //   const response = await getProduct(paramsString);
    //   const data = await response;

    //   console.log("인기 브랜드 API 성공:", data);

    //   if (data.data.length > 0) {
    //     setBrands(data.data);
    //     setSelectedBrand(data.data[0].brandName); // 첫 번째 브랜드 선택
    //   }
    // } catch (error) {
    //   console.error("인기 브랜드 API 요청 실패:", error);
    // }

    const paramsString = `${brandApiUrl}?page=0&size=5`;

    getProduct(paramsString)
      .then((response) => {
        console.log("인기 브랜드 API 성공:", response);

        if (response.data.length > 0) {
          setBrands(response.data);
          setSelectedBrand(response.data[0].brandName); // 첫 번째 브랜드 선택
        }
      })
      .catch((error) => {
        console.error("인기 브랜드 API 요청 실패:", error);
      });
  };

  //인기 브랜드의 특정 상품 조회 api 요청
  const fetchBrandProducts = async (brandName: string) => {
    // try {
    //   const paramsString = `${productApiUrl}?brandName=${encodeURIComponent(brandName)}&orderBy=CREATED_AT&page=0&size=3`;
    //   const response = await getProduct(paramsString);
    //   const data = await response;
    //   console.log("인기 브랜드의 특정 상품 API 성공:", data);
    //   setBrandProducts(data.data || []);
    // } catch (error) {
    //   console.error("인기 브랜드의 특정 상품 API 요청 실패:", error);
    // }
    const paramsString = `${productApiUrl}?brandName=${encodeURIComponent(brandName)}&orderBy=CREATED_AT&page=0&size=3`;

    getProduct(paramsString)
      .then((response) => {
        console.log("인기 브랜드의 특정 상품 API 성공:", response);
        setBrandProducts(response.data || []);
      })
      .catch((error) => {
        console.error("인기 브랜드의 특정 상품 API 요청 실패:", error);
      });
  };

  useEffect(() => {
    fetchPopularBrands();
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      fetchBrandProducts(selectedBrand);
    }
  }, [selectedBrand]);

  //메인 배너 클릭 시 url 변경
  const handleBrandClick = (barndName: string) => {
    router.push(`/product?brandName=${barndName}`);
  };

  //특정 상품 클릭 시 url 변경
  const handleProductClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
    <section className="px-20 mt-16">
      <h3 className="text-xl font-semibold mb-4">주목할 브랜드</h3>
      {/* 메인 배너 */}
      <div className="grid grid-cols-2 gap-2">
        {brands.length > 0 && (
          <div className="relative w-full h-fit">
            <Image
              src={imageError[0] ? "/images/noImage.svg" : `${imageUrl}${brands[0].brandThumbnailUrl}`}
              alt={brands[0].brandName}
              width={611}
              height={350}
              className="object-cover w-full h-auto rounded"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center p-6">
              <div className="text-white">
                <h4 className="text-2xl font-bold">{`새로워진 ${brands[0].brandName}`}</h4>
                <button className="mt-2 px-4 py-2 border border-white text-white text-sm"
                  onClick={() => { handleBrandClick(brands[0].brandName) }}>
                  바로가기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 오른쪽 상품 리스트 (2개) */}
        <div className="grid grid-cols-3">
          {brandProducts.map((product) => (
            <div key={product.id} className="flex flex-col items-center text-center mt-auto">
              {imageUrl && (
                <Image
                  src={imageError[product.id] ? "/images/noImage.svg" : `${imageUrl}${product.thumbnail.path}`}
                  alt={product.brandName}
                  width={170}
                  height={200}
                  className="object-cover mt-4 cursor-pointer"
                  onError={() => setImageError((prev) => ({ ...prev, [product.id]: true }))}
                  onClick={() => handleProductClick(product.id)}
                />
              )}
              <button className="flex flex-col items-start w-full overflow-hidden">
                <span className="text-left text-sm text-gray-500 truncate w-full">{product.productName}</span>
                <span className="text-left text-black-500 font-semibold">{product.price.toLocaleString()}원</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* 브랜드 상품 리스트 (5개) */}
      <div className="grid grid-cols-4 gap-2 mt-6">
        {brands.slice(1).map((brand, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              src={imageError[index] ? "/images/noImage.svg" : `${imageUrl}${brand.brandThumbnailUrl}`}
              alt={brand.brandName}
              width={300}
              height={350}
              className="object-cover rounded cursor-pointer"
              onClick={() => handleBrandClick(brand.brandName)}
            />
            <p className="text-left mt-2 font-semibold text-sm cursor-pointer"
              onClick={() => handleBrandClick(brand.brandName)}> {brand.brandName} </p>
          </div>
        ))}
      </div>
      {/* "다른 상품 더보기" 버튼 */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 border border-gray-400 text-base font-medium hover:bg-gray-100 transition ">
          다른 상품 더보기
        </button>
      </div>
    </section>
  );
}
