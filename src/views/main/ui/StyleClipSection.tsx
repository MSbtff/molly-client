import Image from "next/image";
import type { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper 기본 import
import { Navigation } from "swiper/modules"; // Navigation 모듈 사용
import "swiper/css"; // Swiper 기본 스타일
import "swiper/css/navigation"; // Navigation 스타일 추가
import "@/shared/ui/style/style.css";

import Slider1 from "../../../../public/images/review/리뷰.jpeg";
import Slider3 from '../../../../public/images/review/리뷰2.jpg';
import Slider5 from '../../../../public/images/review/리뷰4.png';
import Slider7 from '../../../../public/images/review/리뷰8.jpg';

const styleClip: { id: number; src: StaticImageData; nickname: string; rounded?: boolean }[] = [
    { id: 1, src: Slider1, nickname: "rjft" },
    { id: 2, src: Slider3, nickname: "앙큼", rounded: true },
    { id: 3, src: Slider5, nickname: "@dk_xk" },
    { id: 4, src: Slider7, nickname: "타이" },
    { id: 5, src: Slider3, nickname: "rjft" },
    { id: 6, src: Slider7, nickname: "앙큼", rounded: true },
    { id: 7, src: Slider1, nickname: "@dk_xk" },
    { id: 8, src: Slider5, nickname: "타이" },
    { id: 9, src: Slider7, nickname: "rjft" },
    { id: 10, src: Slider3, nickname: "앙큼", rounded: true },
    { id: 11, src: Slider1, nickname: "@dk_xk" },
    { id: 12, src: Slider5, nickname: "타이" },
];

export default function StyleClipSection() {

    return (
        <section className="relative bg-black bg-opacity-90 text-white py-12 px-6 flex flex-col items-center" role="region">
            <div className="w-full flex justify-between items-center mt-5">
                <h2 className="text-left text-xl font-semibold ml-12">스타일클립</h2>
                <button className="text-gray-400 text-sm hover:text-white mr-10">더보기</button>
            </div>

            {/* 스타일 클립 리스트 */}

            <div className="relative w-full px-11 mt-6 mb-10 swiper-container-group">
                <Swiper
                    modules={[Navigation]} // swiper에서 Navigation 모듈 사용
                    spaceBetween={35} // 카드 간격
                    slidesPerView={4} // 한 번에 보이는 카드 개수
                    simulateTouch={true} //터츠 드래그 가능
                    grabCursor={true}//손 모양 커서 표시
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}

                    slidesPerGroup={4} // 버튼 클릭 시 4개씩 이동
                    
                    className="relative">

                    {styleClip.map((item) => {
                        const roundedClass = item.rounded ? "rounded-full" : "rounded-lg";
                        return (
                            <SwiperSlide key={item.id} className={`relative w-[400px] h-[420px] ${roundedClass} shadow-lg`}>
                                <div className={`relative w-full h-[420px] overflow-hidden ${roundedClass} shadow-lg`}>
                                    <Image
                                        src={item.src}
                                        alt={item.nickname}
                                        layout="fill" //부모 div 크기에 맞게 조정
                                        objectFit="cover" //비율을 유지하면서 채우기
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