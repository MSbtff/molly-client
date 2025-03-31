import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import getProduct from "@/shared/api/getProduct";
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

export default function RecommendedItemsSection() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const productApiUrl = `${baseUrl}/product`;

  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]); // 상품 데이터
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({}); //이미지 에러 처리

  // API 요청
  const fetchProducts = async () => {
    try {
      const paramsString = `${productApiUrl}?orderBy=PURCHASE_COUNT&offsetId=0&size=19`;
      const response = await getProduct(paramsString);
      const data = await response;
      console.log("랭킹 API 성공", data);
      console.log("랭킹 상품 개수:", data.data.length);

      //productId가 중복 -> 오류 남 -> 일단 내가 중복 제거 코드 작성
      const uniqueProductsMap = new Map<number, Product>();
      data.data.forEach((item: Product) => {
        if (!uniqueProductsMap.has(item.id)) {
          uniqueProductsMap.set(item.id, item);
        }
      });
      const uniqueProducts = Array.from(uniqueProductsMap.values());

      // setProducts(data.data || []);
      setProducts(uniqueProducts);
    } catch (error) {
      console.error("랭킹 API 요청 실패:", error);
    }
  };
  // 이미지 로딩 실패 시 기본 이미지로 대체
  const handleImageError = (id: number) => {
    setImageError((prev) => ({ ...prev, [id]: true }));
    console.log("이미지 에러 상태 업데이트:", imageError);
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  //랭킹 바로가기
  const handleOtherProductClick = () => {
    router.push(`/product?rank=&orderBy=PURCHASE_COUNT`);
  };

  //특정 상품 클릭 시 url 변경
  const handleProductClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
    <section className="px-20 mt-16">
      <h3 className="text-xl font-semibold">랭킹</h3>
      {/* 상품 리스트 (2줄, 5개씩) */}
      <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-2  gap-2">

        {products.map((item, index) => (
          <div key={item.id} className="relative flex flex-col items-center mt-10">
            {/* 숫자 배지 */}
            <span className="absolute top-0 left-0 bg-black text-white text-sm px-2 py-1 w-[30px] text-center z-10">
              {index + 1}
            </span>

            <Image
              src={imageError[item.id] ? "/images/noImage.svg" : `${imageUrl}${item.thumbnail.path}?w=200&h=250&r=true`}
              alt={item.brandName}
              width={250}
              height={250}
              className="w-full h-auto object-contain cursor-pointer"
              unoptimized={true}
              onClick={()=>{handleProductClick(item.id);}}
            />

            <button className="flex flex-col items-start w-full overflow-hidden"
                    onClick={()=>{handleProductClick(item.id);}}>
              <span className="text-left mt-1 text-sm font-semibold">
                {item.brandName}
              </span>
              <span className="text-left text-sm text-gray-500 truncate w-full">
                {item.productName}
              </span>
              <span className="text-left text-black-500 font-semibold">
                {item.price}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* "다른 상품 더보기" 버튼 */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 border border-gray-400 text-base font-medium hover:bg-gray-100 transition"
          onClick={() => { handleOtherProductClick(); }}>
          랭킹 바로가기
        </button>
      </div>
    </section>
  );
}
