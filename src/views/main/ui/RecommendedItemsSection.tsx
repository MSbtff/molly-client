import Image from "next/image";
import Default from '../../../../public/images/default.webp';

export default function RecommendedItemsSection () {
    return (
        <section className="px-6 mt-16">
                <h3 className="text-xl font-semibold mb-4">고객님이 좋아할 만한 상품</h3>
        
                {/* 상품 리스트 (2줄, 5개씩) */}
                <div className="grid grid-cols-6 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-2">
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