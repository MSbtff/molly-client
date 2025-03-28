import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

export default function HotItemsSection() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const productApiUrl = `${baseUrl}/product`;

  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]); // 상품 데이터
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({}); //이미지 에러 처리

  // API 요청
  const fetchProducts = async () => {
    try {
      const paramsString = `${productApiUrl}?orderBy=CREATED_AT&offsetId=0&size=8`;
      const response = await getProduct(paramsString);
      const data = await response;
      console.log("지금 핫한 신상템 API 성공", data);
      setProducts(data.data || []);
    } catch (error) {
      console.error("지금 핫한 신상템 API 요청 실패:", error);
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

  const handleOtherProductClick = () => {
    router.push(`/product?orderBy=CREATED_AT`);
  };

  //특정 상품 클릭 시 url 변경
  const handleProductClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
    <section className="px-20">
      <h3 className="text-xl font-semibold mb-4">지금 핫한 신상템</h3>

      {/* 메인 배너 map으로 돌릴거임*/}
      <div className="grid grid-cols-2 gap-2">
        {products.slice(0, 2).map((product) => (
          <div key={product.id} className="relative w-full aspect-[3/2]">
            {imageUrl && (
              <Image
                src={imageError[product.id] ? "/images/noImage.svg" : `${imageUrl}${product.thumbnail.path}` }
                alt={product.brandName}
                // width={611}
                // height={350}
                fill
                className="object-cover w-full h-auto rounded"
                onError={() => handleImageError(product.id)}
                unoptimized={true}
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center p-6">
              <div className="text-white">
                <h4 className="text-2xl font-bold">{product.brandName}</h4>
                <p>{product.productName}</p>
                <button
                  className="mt-2 px-4 py-2 border border-white text-white text-sm"
                  onClick={() => handleProductClick(product.id)}
                >
                  {" "}
                  바로가기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* 신상템 상품 리스트 */}
      <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-2  gap-2 mt-1">
        {products.slice(2).map((product) => (
          <div key={product.id} className="flex flex-col items-center mt-10">
            <Image
              src={
                imageError[product.id] ? "/images/noImage.svg" : `${imageUrl}${product.thumbnail.path}?w=200&h=250&r=true`
              }
              alt={product.brandName}
              width={200}
              height={250}
              className="w-full h-auto object-contain cursor-pointer"
              onError={() => handleImageError(product.id)}
              onClick={() => handleProductClick(product.id)}
              unoptimized={true}
            />
            <button
              className="flex flex-col items-start w-full overflow-hidden"
              onClick={() => handleProductClick(product.id)}
            >
              <span className="text-left mt-1 text-sm font-semibold">
                {product.brandName}
              </span>
              <span className="text-left text-sm text-gray-500 truncate w-full">
                {product.productName}{" "}
              </span>
              <span className="text-left text-black-500 font-semibold">
                {product.price.toLocaleString()}원{" "}
              </span>
            </button>
          </div>
        ))}
      </div>
      
      {/* "다른 상품 더보기" 버튼 */}
      <div className="flex justify-center mt-8">
        <button
          className="px-6 py-3 border border-gray-400 hover:bg-gray-100 transition"
          onClick={() => {
            handleOtherProductClick();
          }}
        >
          다른 상품 더보기
        </button>
      </div>
    </section>
  );
}
