import Image from "next/image";
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

export default function HotItemsSection() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; //api 서버 주소
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL; //이미지 서버 주소
  const productApiUrl = `${baseUrl}/product`; //API 엔드포인트

  const [products, setProducts] = useState<Product[]>([]); // 상품 데이터
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({}); //이미지 에러 처리

  // API 요청
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${productApiUrl}?orderBy=CREATED_AT&page=0&size=8`);
      const data = await response.json();
      console.log("지금 핫한 신상템 API 성공", data);
      setProducts(data.data || []);
    } catch (error) {
      console.error("지금 핫한 신상템 API 요청 실패:", error);
    } finally {
      setLoading(false);
    }
  };
  // 이미지 로딩 실패 시 기본 이미지로 대체
  const handleImageError = (id: number) => {
    setImageError((prev) => ({ ...prev, [id]: true }));
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="px-6">
      <h3 className="text-xl font-semibold mb-4">지금 핫한 신상템</h3>

      {/* 메인 배너 map으로 돌릴거임*/}
      <div className="grid grid-cols-2 gap-2">


        {/* <div className="relative w-full h-auto">
          <Image
            src={Slider2}
            alt="JINDO 코트"
            width={611}
            height={350}
            className="object-cover w-full h-auto rounded"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center p-6">
            <div className="text-white">
              <h4 className="text-2xl font-bold">JINDO</h4>
              <p>코트-브라운, 스타일링 팁</p>
              <button className="mt-2 px-4 py-2 border border-white text-white rounded-lg text-sm">
                바로가기
              </button>
            </div>
          </div>
        </div>
        <div className="relative w-full h-auto">
          <Image
            src={Slider2}
            alt="ANNE KLEIN 코트"
            // fill <- 부모 크기에 맞춰 자동 조정. 부모 높이가 없다면 메인배너1 크기에 맞춰짐
            width={611}
            height={350}
            className="object-cover w-full h-auto rounded"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center p-6">
            <div className="text-white">
              <h4 className="text-2xl font-bold">ANNE KLEIN</h4>
              <p>기다리지 마세요, 코트 컬렉션</p>
              <button className="mt-2 px-4 py-2 border border-white text-white rounded-lg text-sm">
                바로가기
              </button>
            </div>
          </div>
        </div> */}

        {products.slice(0, 2).map((product) => (
          <div key={product.id} className="relative w-full h-auto">
            {imageUrl &&
              <Image
                src={
                  imageError[product.id]
                    ? "/images/noImage.svg"
                    : `${imageUrl}${product.thumbnail.path}`
                }
                alt={product.brandName}
                width={611}
                height={350}
                className="object-cover w-full h-auto rounded"
                onError={() => handleImageError(product.id)}
              />
            }
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center p-6">
              <div className="text-white">
                <h4 className="text-2xl font-bold">{product.brandName}</h4>
                <p>{product.productName}</p>
                <button className="mt-2 px-4 py-2 border border-white text-white rounded-lg text-sm">
                  바로가기
                </button>
              </div>
            </div>
          </div>
        ))}




      </div>
      {/* 신상템 상품 리스트 */}
      <div className="grid grid-cols-6 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-2 mt-4">
        {/* {[...Array(6)].map((_, index) => (
          <div key={index} className="flex flex-col w-full overflow-hidden">
            <Image
              src={Default}
              alt={`드메리얼`}
              width={200}
              height={250}
            />
            <button className="flex flex-col items-start w-full overflow-hidden">
              <span className="text-sm mt-1 font-semibold">루에브르</span>
              <span className="text-left text-sm text-gray-500 truncate w-full">BOA FLEECE PADDING JACKET_2COLOR</span>
              <span className="text-left text-black-500 font-semibold">150,000원</span>
            </button>
          </div>
        ))} */}
        {products.slice(2).map((product) => (
          <div key={product.id} className="flex flex-col w-full overflow-hidden">
            <Image
              src={
                imageError[product.id]
                  ? "/images/noImage.svg"
                  : `${imageUrl}${product.thumbnail.path}`
              }
              alt={product.brandName}
              width={200}
              height={250}
              onError={() => handleImageError(product.id)}
            />
            <button className="flex flex-col items-start w-full overflow-hidden">
              <span className="text-sm mt-1 font-semibold">{product.brandName}</span>
              <span className="text-left text-sm text-gray-500 truncate w-full">
                {product.productName}
              </span>
              <span className="text-left text-black-500 font-semibold">
                {product.price.toLocaleString()}원
              </span>
            </button>
          </div>
        ))}
      </div>
      {/* "다른 상품 더보기" 버튼 */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 border border-gray-400 rounded-lg text-base font-medium hover:bg-gray-100 transition">
          다른 상품 더보기
        </button>
      </div>
    </section>
  );
}