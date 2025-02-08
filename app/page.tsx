'use client'

import Image from "next/image";
import Banner from "../public/src/assets/images/banner.webp";
import Slider1 from "../public/src/assets/images/slider1.webp";
import Default from "../public/src/assets/images/default.webp";
import { useState, useEffect } from 'react';

export default function Main() {
  const trendingItems = [
    { id: 1, src: Slider1, title: "까르띠에 전 품목 가격 6% 인상" },
    { id: 2, src: Slider1, title: "루이비통 신상 공개" },
    { id: 3, src: Slider1, title: "Nike x Tiffany" },
    { id: 4, src: Slider1, title: "@183.h.g" },
    { id: 5, src: Slider1, title: "Dior" },
    { id: 6, src: Slider1, title: "아미" },
    { id: 7, src: Slider1, title: "롤렉스 설날 세일 전격 90%" },
    { id: 8, src: Slider1, title: "랜덤박스 오픈" },
    { id: 9, src: Slider1, title: "뉴발란스 잡스 신발 팔아요" },
    { id: 10, src: Slider1, title: "@sw_g_48" },
    { id: 11, src: Slider1, title: "루이비통 짭 팝니다" },
    { id: 12, src: Slider1, title: "룰루레몬 파격 세일" },
  ];
  const items_per_slider1 = 6;//슬라이드1 이미지 개수
  const categories = ["아우터", "상의", "바지", "원피스/스커트", "패션소품"];
  const [activeIndex, setActiveIndex] = useState(0);//슬라이드1 인덱스 그룹
  const totalSlides = Math.ceil(trendingItems.length / items_per_slider1);
  //현재 슬라이드 아이템 6개
  const currentItems = trendingItems.slice(
    activeIndex * items_per_slider1,
    (activeIndex + 1) * items_per_slider1
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 클리어
  }, [activeIndex, totalSlides]);


  return (
    <div className="space-y-16">

      {/* 배너 */}
      <section className="relative w-screen h-[500px]">
        {/* <div className="absolute inset-0"> */}
        <Image src={Banner} alt="banner" fill className="absolute inset-0 object-cover w-screen h-full" />
        <div className="absolute top-1/4 left-10 text-white">
          <h2 className="text-4xl font-bold leading-tight">
            봄 아우터를 <br /> 즐기는 방법
          </h2>
          <p className="mt-2 text-lg">인플루언서가 입은 신상 아우터</p>
          {/* </div> */}
        </div>
      </section>


      {/* 슬라이드1 */}
      <section className="text-center px-6">
        <h2 className="text-left text-xl font-semibold mb-4">연휴 다 갔다. 열일하고 싶게 만드는 럭셔리 위시템</h2>
        <div className="flex justify-center gap-2">
          {currentItems.map((item) => (
            <div key={item.id}>
              <Image src={item.src} alt={item.title} width={250} height={300} className="rounded-lg" />
              <p className="text-sm mt-2">{item.title}</p>
            </div>
          ))}
        </div>
        {/* Dot Pagination */}
        <div className="flex justify-center mt-4 gap-2">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition ${activeIndex === index ? "bg-[hsl(var(--muted-foreground))]" : "bg-red-400"
                // bg-[hsl(var(--foreground))]
                }`}
            />
          ))}
        </div>
      </section>


      {/* 카테고리 */}
      <section className="px-6">
        {/* 카테고리 버튼 */}
        <div className="flex gap-4 mb-4">
          {categories.map((category, index) => (
            <button key={index} className={`px-4 py-2 rounded-full border border-gray-600${index === 0 ? "bg-black text-white" : "bg-gray"}`}>
              {category}
            </button>
          ))}
        </div>
        {/* 상품 리스트 */}
        <div className="grid grid-cols-6 gap-2">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="flex flex-col w-full overflow-hidden">
              <Image
                src={Default}
                alt={`상품 ${index + 1}`}
                width={200}
                height={250}
              />
              <button className="flex flex-col items-start w-full overflow-hidden">
                <span className="text-left mt-1 text-sm font-semibold">더라우스트</span>
                <span className="text-left text-sm text-gray-300 truncate w-full">[단독]HILDA BOOTS_5color</span>
                <span className="text-left text-black-500 font-semibold">10% 150,000</span>
              </button>
            </div>
          ))}
        </div>
        {/* "다른 추천 상품 보기" 버튼 */}
        <div className="flex justify-center mt-8">
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-400 rounded-lg text-base font-medium hover:bg-gray-100 transition">
            <Image src={"/src/assets/icons/refresh.svg"} alt="새로고침 아이콘" width={20} height={20} />
            다른 추천 상품 보기
          </button>
        </div>
      </section>


      {/* 핫한 신상템 섹션 */}
      <section className="px-6">
        <h3 className="text-xl font-semibold mb-4">지금 핫한 신상템</h3>
        {/* 메인 배너 map으로 돌릴거임*/}
        <div className="grid grid-cols-2 gap-2">
          <div className="relative w-full h-[300px]">
            <Image
              src="/src/assets/images/slider2.webp"
              alt="JINDO 코트"
              // fill
              width={611}
              height={350}
            // className="object-cover rounded-lg" 
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
          <div className="relative w-full h-[300px]">
            <Image
              src="/src/assets/images/slider2.webp"
              alt="ANNE KLEIN 코트"
              fill
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
          </div>
        </div>
        {/* 상품 리스트 */}
        <div className="grid grid-cols-6 gap-2 mt-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col w-full overflow-hidden">
              <Image
                src="/src/assets/images/default.webp"
                alt={`드메리얼`}
                width={200}
                height={250}
              />
              <button className="flex flex-col items-start w-full overflow-hidden">
                <span className="text-sm mt-1 font-semibold">루에브르</span>
                <span className="text-left text-sm text-gray-500 truncate w-full">BOA FLEECE PADDING JACKET_2COLOR</span>
                <span className="text-left text-black-500 font-semibold"><span>10%</span> <span>150,000원</span></span>
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


      {/* 주목할 브랜드 섹션 */}
      <section className="px-6 mt-16">
        <h3 className="text-xl font-semibold mb-4">주목할 브랜드</h3>

        {/* 메인 배너 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 왼쪽 큰 배너 */}
          <div className="relative w-full h-[300px]">
            <Image
              src="/src/assets/images/slider2.webp"
              alt="J.ESTINA 브랜드"
              fill
              className="object-cover rounded-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center p-6">
              <div className="text-white">
                <h4 className="text-2xl font-bold">J.ESTINA</h4>
                <p>로맨틱한 무드를 느낄 시간</p>
                <button className="mt-2 px-4 py-2 border border-white text-white rounded-lg text-sm">
                  바로가기
                </button>
              </div>
            </div>
          </div>

          {/* 오른쪽 상품 리스트 (3개) */}
          <div className="grid grid-cols-2 gap-2">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image
                  src={`/src/assets/images/default.webp`}
                  alt={`추천 브랜드 ${index + 1}`}
                  width={220}
                  height={250}
                />
                <button className="flex flex-col items-start w-full overflow-hidden">
                  <span className="text-xs text-gray-500">[선택된PICK] 브랜드명</span>
                  <span className="text-sm text-gray-700">상품명 {index + 1}</span>
                  <span >
                    <span className="text-red-500 font-semibold text-sm">24%</span> 
                    <span className="text-black-500 font-semibold text-sm">180,880원</span>
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 브랜드 상품 리스트 (5개) */}
        <div className="grid grid-cols-4 gap-2 mt-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={`/src/assets/images/brand.webp`}
                alt={`브랜드 상품 ${index + 1}`}
                width={300}
                height={350}
              />
              <p className="mt-2 font-semibold text-sm">파사드 패턴</p>
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


      {/* 고객님이 좋아할 만한 상품 */}
      <section className="px-6 mt-16">
        <h3 className="text-xl font-semibold mb-4">고객님이 좋아할 만한 상품</h3>

        {/* 상품 리스트 (2줄, 5개씩) */}
        <div className="grid grid-cols-6 gap-2">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="flex flex-col items-center w-full overflow-hiddens">
              <Image
                src={`/src/assets/images/default.webp`}
                alt={`추천 상품 ${index + 1}`}
                width={200}
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

    </div>


  );
}
