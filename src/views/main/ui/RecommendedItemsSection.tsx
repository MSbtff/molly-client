import Image from "next/image";
// import Default from '../../../../public/images/default.webp';
import noImage from "../../../../public/images/noImage.svg";
import image1 from "../../../../public/images/suggestion/추천.jpg";
import image2 from "../../../../public/images/suggestion/추천2.jpg";
import image3 from "../../../../public/images/suggestion/추천3.jpg";
import image4 from "../../../../public/images/suggestion/추천4.jpg";
import image5 from "../../../../public/images/suggestion/추천5.jpg";
import image6 from "../../../../public/images/suggestion/추천6.jpg";
import image7 from "../../../../public/images/suggestion/추천7.jpg";
import image8 from "../../../../public/images/suggestion/추천8.jpg";
import image9 from "../../../../public/images/suggestion/추천9.jpg";
import image10 from "../../../../public/images/suggestion/추천10.jpg";
import image11 from "../../../../public/images/suggestion/추천11.jpg";
import image12 from "../../../../public/images/suggestion/추천12.jpg";

const dummyProducts = [
  { id: 1, brand: "지비에이치 어패럴", name: "HIGH-NECK TOGGLE COAT_CHARCOAL", price: "35% 48,655원", image: image1 },
  { id: 2, brand: "더니트컴퍼니", name: "TURTLE NECK KNIT", price: "25% 32,000원", image: image2 },
  { id: 3, brand: "아더에러", name: "OVERSIZED HOODIE", price: "30% 78,900원", image: image3 },
  { id: 4, brand: "커버낫", name: "DOWN PUFFER JACKET", price: "20% 105,000원", image: image4 },
  { id: 5, brand: "디스이즈네버댓", name: "LOGO SWEATSHIRT", price: "40% 49,000원", image: image5 },
  { id: 6, brand: "마뗑킴", name: "CROSSBODY BAG", price: "15% 89,000원", image: image6 },
  { id: 7, brand: "스투시", name: "GRAPHIC PRINT TEE", price: "10% 39,000원", image: image7 },
  { id: 8, brand: "뉴발란스", name: "574 SNEAKERS", price: "30% 78,000원", image: image8 },
  { id: 9, brand: "나이키", name: "AIR MAX 270", price: "25% 129,000원", image: image9 },
  { id: 10, brand: "아디다스", name: "ULTRABOOST 21", price: "35% 99,000원", image: image10 },
  { id: 11, brand: "챔피온", name: "REVERSE WEAVE HOODIE", price: "30% 79,000원", image: image11 },
  { id: 12, brand: "칼하트", name: "WORK JACKET", price: "20% 149,000원", image: image12 },
];


export default function RecommendedItemsSection() {
  return (
    <section className="px-20 mt-16">
      <h3 className="text-xl font-semibold mb-4">고객님이 좋아할 만한 상품</h3>

      {/* 상품 리스트 (2줄, 5개씩) */}
      {/* <div className="grid grid-cols-6 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-2">
                  {[...Array(10)].map((_, index) => (
                    <div key={index} className="flex flex-col items-center w-full overflow-hiddens">
                      <Image
                        src={Default}
                        alt={`추천 상품 ${index + 1}`}
                        width={250}
                        height={250}
                      />
                      <button className="flex flex-col items-start w-full overflow-hidden">
                        <span className="text-left mt-2 font-semibold text-sm">지비에이치 어패럴</span>
                        <span className="text-left text-xs text-gray-500 truncate w-full">HIGH-NECK TOGGLE COAT_CHARCOAL</span>
                        <span className="text-left text-black-500 font-semibold text-sm">35% 48,655원</span>
                      </button>
                    </div>
                  ))}
                </div> */}
      {/* 상품 리스트 (2줄, 5개씩) */}
      <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-2  gap-2 mt-1">
        {dummyProducts.map((item) => (
          <div key={item.id} className="flex flex-col items-center mt-10">
            <Image
              src={item.image || noImage} // 이미지가 없으면 기본 이미지 사용
              alt={item.name}
              width={250}
              height={250}
              className="w-full h-auto object-contain cursor-pointer"
            />
            <button className="flex flex-col items-start w-full overflow-hidden">
              <span className="text-left mt-1 text-sm font-semibold">{item.brand}</span>
              <span className="text-left text-sm text-gray-500 truncate w-full">{item.name}</span>
              <span className="text-left text-black-500 font-semibold">{item.price}</span>
            </button>
          </div>
        ))}
      </div>

      {/* "다른 상품 더보기" 버튼 */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 border border-gray-400 text-base font-medium hover:bg-gray-100 transition">
          다른 상품 더보기
        </button>
      </div>
    </section>
  );
}