import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import type { StaticImageData } from 'next/image';
import getProduct from "@/shared/api/getProduct";
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper 기본 import
import { Navigation } from "swiper/modules"; // Navigation 모듈 사용
import "swiper/css"; // Swiper 기본 스타일
import "swiper/css/navigation"; // Navigation 스타일 추가
import "@/shared/ui/style/style.css";
interface TrendReview {
  images: string[];
  reviewResDto: {
    nickname: string;
  };
}

export default function StyleClipSection() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const trendReviews = `${baseUrl}/trending`;

  const router = useRouter();

  const [reviews, setReviews] = useState<
    { id: number; image: string; nickname: string }[]
  >([]);

  const fetchTrendingReviews = async () => {
    try {
      const paramsString = `${trendReviews}`;
      const response = await getProduct(paramsString);
      const data = await response;
      console.log("트렌드 리뷰 api 성공", data);
      // API 응답을 Swiper에 맞는 형식으로 변환
      const formattedData = data.map((item: TrendReview, index: number) => ({
        id: index, // 고유한 ID 할당
        image: item.images?.[0] || "/images/noImage.svg", // 이미지 배열의 첫 번째 이미지 사용 (없으면 기본 이미지)
        nickname: item.reviewResDto.nickname, // 닉네임
      }));
      setReviews(formattedData);
    } catch (error) {
      console.error("인기 있는 리뷰 api 요청 실패:", error);
    }
  };

  //초기 데이터 불러오기 -캐싱처리 필요
  useEffect(() => {
    fetchTrendingReviews();
  }, []);

  const handleTrend = (id?: number) => {
    if (id) {
      router.push(`/trend?id=${id}`);
    } else {
      router.push(`/trend`);
    }
  };


  return (
    <section
      className="relative bg-black bg-opacity-90 text-white py-12 px-6 flex flex-col items-center"
      role="region"
      aria-label="스타일 클립"
    >
      <div className="w-full flex justify-between items-center mt-5">
        <h2 className="text-left text-xl font-semibold ml-12">스타일클립</h2>
        <button
          className="text-gray-400 text-sm hover:text-white mr-10"
          onClick={() => {
            handleTrend();
          }}
        >
          더보기
        </button>
      </div>

      {/* 스타일 클립 리스트 */}
      <div className="relative w-full px-11 mt-6 mb-10 swiper-container-group">
        <Swiper
          modules={[Navigation]} // swiper에서 Navigation 모듈 사용
          spaceBetween={35} // 카드 간격
          slidesPerView={4} // 한 번에 보이는 카드 개수
          simulateTouch={true} //터츠 드래그 가능
          grabCursor={true} //손 모양 커서 표시
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          slidesPerGroup={4} // 버튼 클릭 시 4개씩 이동
          className="relative"
        >
          {reviews.map((item, index) => {
            // const roundedClass = index % 3 === 0 ? "rounded-full" : "rounded-lg";
            const roundedClass = [2, 6, 10].includes(index)
              ? "rounded-full"
              : "rounded-lg";
            return (
              <SwiperSlide
                key={item.id}
                className={`relative w-[400px] h-[420px] ${roundedClass} shadow-lg`}
              >
                <div
                  className={`relative w-full h-[420px] overflow-hidden ${roundedClass} shadow-lg cursor-pointer`}
                  onClick={() => {
                    handleTrend(item.id);
                  }}
                >
                  <Image
                    src={`${imageUrl}${item.image}?`}
                    alt={item.nickname}
                    layout="fill" //부모 div 크기에 맞게 조정
                    objectFit="cover" //비율을 유지하면서 채우기
                    unoptimized={true}
                  />
                  <div className="absolute bottom-0 w-full text-center py-3">
                    <p className="text-lg font-semibold">{item.nickname}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button className="swiper-button-prev"></button>
        <button className="swiper-button-next"></button>
      </div>
    </section>
  );
}
