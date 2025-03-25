"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import banner1 from "../../../../public/images/banner/optimize8.avif";
import banner2 from "../../../../public/images/banner/optimize9.avif";
import banner3 from "../../../../public/images/banner/optimize1.avif";
import banner4 from "../../../../public/images/banner/optimize11.avif";
import banner5 from "../../../../public/images/banner/optimize3.avif";
import banner6 from "../../../../public/images/banner/optimize2.avif";
import banner7 from "../../../../public/images/banner/optimize5.avif";
import banner8 from "../../../../public/images/banner/optimize6.avif";
import banner9 from "../../../../public/images/banner/optimize4.avif";
import banner10 from "../../../../public/images/banner/optimize7.avif";

const banners = [
  { image: banner1, title: "", subtitle: "" },
  { image: banner2, title: "트렌디한 선택", subtitle: "올해의 추천 아이템" },
  { image: banner3, title: "캐주얼하고 영한", subtitle: "WOMEN COLLECTION" },
  {
    image: banner4,
    title: "새로운 시작",
    subtitle: "신상 컬렉션을 만나보세요",
  },
  {
    image: banner5,
    title: "성큼 다가온 봄을 위한",
    subtitle: "봄맞이 아우터 10% 쿠폰",
  },
  {
    image: banner6,
    title: "편안한 스타일",
    subtitle: "트렌디한 디자인과 함께",
  },
  {
    image: banner7,
    title: "우리 아이 옷장 고민 끝",
    subtitle: "키즈 4대 브랜드 대전",
  },
  { image: banner8, title: "간절기에 꼭 필요한", subtitle: "신상 가디건" },
  { image: banner9, title: "모던 클래식", subtitle: "어디서든 빛나는 스타일" },
  {
    image: banner10,
    title: "설레는 봄, 3월 뷰티데이",
    subtitle: "3천원 특가+최대 10% 쿠폰",
  },
];

export default function BannerSection() {
  return (
    <section
      className="relative w-screen h-[600px]"
      role="region"
      aria-label="배너 섹션"
      data-testid="banner-section"
    >
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0} // 슬라이드 간격
        slidesPerView={1} // 화면 크기에 맞춰 자동 조절
        loop={true} // 무한 반복
        autoplay={{ delay: 3000, disableOnInteraction: false }} // 3초마다 자동 스와이프
        pagination={{ clickable: true }} // 하단 인디케이터 추가
        className="w-full h-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index} className="relative w-screen h-full">
            <Image
              src={banner.image}
              alt={`banner-${index}`}
              layout="fill"
              unoptimized={true}
              objectFit="cover"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center text-white text-left px-24">
              <h2 className="text-7xl">{banner.title}</h2>
              <p className="text-lg mt-2">{banner.subtitle}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
