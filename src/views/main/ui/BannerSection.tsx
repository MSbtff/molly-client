'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import banner1 from "../../../../public/images/banner/optimize1.avif";
import banner2 from "../../../../public/images/banner/optimize11.avif";
import banner3 from "../../../../public/images/banner/optimize2.avif";
import banner4 from "../../../../public/images/banner/optimize3.avif";
import banner5 from "../../../../public/images/banner/optimize4.avif";
import banner6 from "../../../../public/images/banner/optimize5.avif";
import banner7 from "../../../../public/images/banner/optimize6.avif";
import banner8 from "../../../../public/images/banner/optimize7.avif";
import banner9 from "../../../../public/images/banner/optimize8.avif";
import banner10 from "../../../../public/images/banner/optimize9.avif";

const banners = [
    { image: banner1, title: "가족의 발견", subtitle: "5% 추가적립 + 신세계 3만원권" },
    { image: banner2, title: "새로운 시작", subtitle: "신상 컬렉션을 만나보세요" },
    { image: banner3, title: "편안한 스타일", subtitle: "트렌디한 디자인과 함께" },
    { image: banner4, title: "겨울 감성", subtitle: "따뜻한 겨울을 준비하세요" },
    { image: banner5, title: "모던 클래식", subtitle: "어디서든 빛나는 스타일" },
    { image: banner6, title: "내추럴 라이프", subtitle: "자연스러운 멋을 즐기세요" },
    { image: banner7, title: "감성적인 하루", subtitle: "일상 속 특별한 순간" },
    { image: banner8, title: "모던 캐주얼", subtitle: "편안함과 스타일을 동시에" },
    { image: banner9, title: "", subtitle: "" },
    { image: banner10, title: "트렌디한 선택", subtitle: "올해의 추천 아이템" },
];

export default function BannerSection() {
    return (
        <section className="relative w-screen h-[600px]">
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
                        <Image src={banner.image}
                            alt={`banner-${index}`}
                            layout="fill"
                            // objectFit="contain" 
                            // width={350}
                            // height={1000}
                            // className="object-cover w-full h-full"
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