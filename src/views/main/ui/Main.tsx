'use client'

import Image from "next/image";
import Banner from "../../../../public/images/banner.webp";
import Slider1 from "../../../../public/images/slider1.webp";
import Slider11 from '../../../../public/images/slider1-2.jpg';
import Slider111 from '../../../../public/images/slider1-3.jpg';
import Default from '../../../../public/images/default.webp';
import Slider2 from '../../../../public/images/slider2.webp';
// import Slider2 from '../public/src/assets/images/slider1-1.svg';
import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
const categories = [
  { id: 1, title: "에션셜 코드", imgSrc: "images/coat.svg" },
  { id: 2, title: "무스탕", imgSrc: "images/mustang.svg" },
  { id: 3, title: "숏패딩", imgSrc: "images/shortPadding.svg" },
  { id: 4, title: "가방", imgSrc: "images/bag.svg" },
  { id: 5, title: "슈즈", imgSrc: "images/shoes.svg" },
  { id: 6, title: "나일론재킷", imgSrc: "images/nylonJacket.svg" },
  { id: 7, title: "지갑", imgSrc: "images/shortPadding.svg" },
  { id: 8, title: "키즈", imgSrc: "images/kids.svg" },
  { id: 9, title: "뷰티", imgSrc: "images/fashion.svg" },
  { id: 10, title: "악세사리", imgSrc: "images/accessories.svg" },
];
const styleClip = [
  { id: 1, src: Slider1, title: "까르띠에 전 품목 가격 6% 인상" },
  { id: 2, src: Slider1, title: "루이비통 신상 공개" },
  { id: 3, src: Slider1, title: "Nike x Tiffany" },
  { id: 4, src: Slider1, title: "@183.h.g" },
  { id: 5, src: Slider1, title: "Dior" },
  { id: 6, src: Slider1, title: "아미" },
  { id: 7, src: Slider11, title: "롤렉스 설날 세일 전격 90%" },
  { id: 8, src: Slider11, title: "랜덤박스 오픈" },
  { id: 9, src: Slider11, title: "뉴발란스 잡스 신발 팔아요" },
  { id: 10, src: Slider111, title: "@sw_g_48" },
  { id: 11, src: Slider111, title: "루이비통 짭 팝니다" },
  { id: 12, src: Slider111, title: "룰루레몬 파격 세일" },
];

export default function Main() {
  
  // const items_per_slider1 = 6;//슬라이드1 이미지 개수
  const popularCategories = ["아우터", "상의", "바지", "원피스/스커트", "패션소품"];
  const [itemsPerSlide, setItemsPerSlide] = useState(6); // 기본 6개
  const [activeIndex, setActiveIndex] = useState(0);//슬라이드1 인덱스 그룹
  // const totalSlides = Math.ceil(trendingItems.length / items_per_slider1);
  const totalSlides = Math.ceil(styleClip.length / itemsPerSlide);

  //동적으로 슬라이드1 이미지 개수 조정 
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerSlide(6); // 1024px 이상 → 6개
      } else if (window.innerWidth >= 768) {
        setItemsPerSlide(4); // 768px 이상 → 4개
      } else {
        setItemsPerSlide(2); // 768px 미만 → 2개
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);

    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  //현재 슬라이드 아이템 6개
  const currentItems = styleClip.slice(
    activeIndex * itemsPerSlide,
    (activeIndex + 1) * itemsPerSlide
  );

  // 자동 슬라이드1
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


      {/* 카테고리 */}
      <section className="px-20 mt-10">
        <div className="grid grid-cols-5 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col items-center rounded-xl p-4">
              <Image src={category.imgSrc} alt={category.title} width={160} height={120} className="rounded-lg" />
              <p className="text-sm font-semibold mt-2">{category.title}</p>
            </div>
          ))}
        </div>
      </section>


      {/* 지금 인기있는 상품 */}
      <section className="px-20">
        <h3 className="text-xl font-semibold mb-4">지금 인기있는 상품</h3>

        {/* 카테고리 버튼 */}
        <div className="flex gap-4 mb-4">
          {popularCategories.map((category, index) => (
            <button key={index} className={`px-4 py-2 rounded-full border border-gray-600 ${index === 0 ? "bg-black text-white" : "bg-gray"}`}>
              {category}
            </button>
          ))}
        </div>
        {/* 상품 리스트 */}
        <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-2">
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
                <span className="text-left text-sm text-gray-500 truncate w-full">[단독]HILDA BOOTS_5color</span>
                <span className="text-left text-black-500 font-semibold">150,000</span>
              </button>
            </div>
          ))}
        </div>
        {/* "다른 추천 상품 보기" 버튼 */}
        <div className="flex justify-center mt-8">
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-400 rounded-lg text-base font-medium hover:bg-gray-100 transition">
            <RotateCcw size={20} /> 다른 추천 상품 보기
          </button>
        </div>
      </section>

      {/*스타일 클립 */}
      <section className="text-center px-6 scale-90">
        <h2 className="text-left text-xl font-semibold mb-4">금주 인기 스타일</h2>

        {/* <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-2 overflow-hidden transition-all"> */}
        <div className="flex justify-center gap-2 overflow-hidden transition-all">
          {currentItems.map((item) => (
            <div key={item.id} >
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
              className={`w-3 h-3 rounded-full transition ${activeIndex === index ? "bg-[hsl(var(--muted-foreground))]" : "bg-gray-300"
                // bg-[hsl(var(--foreground))]
                }`}
            />
          ))}
        </div>
      </section>


      {/* 지금 핫한 신상템 */}
      <section className="px-6">
        <h3 className="text-xl font-semibold mb-4">지금 핫한 신상템</h3>

        {/* 메인 배너 map으로 돌릴거임*/}
        <div className="grid grid-cols-2 gap-2">
          {/* 메인 배너 1 */}
          <div className="relative w-full h-auto">
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
          {/* 메인 배너 2 */}
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
          </div>
        </div>
        {/* 신상템 상품 리스트 */}
        <div className="grid grid-cols-6 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-2 mt-4">
          {[...Array(6)].map((_, index) => (
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
          ))}
        </div>
        {/* "다른 상품 더보기" 버튼 */}
        <div className="flex justify-center mt-8">
          <button className="px-6 py-3 border border-gray-400 rounded-lg text-base font-medium hover:bg-gray-100 transition">
            다른 상품 더보기
          </button>
        </div>
      </section>


      {/* 주목할 브랜드 */}
      <section className="px-6 mt-16">
        <h3 className="text-xl font-semibold mb-4">주목할 브랜드</h3>

        {/* 메인 배너 */}
        <div className="grid grid-cols-2 gap-2">
          {/* 왼쪽 큰 배너 */}
          <div className="relative w-full h-fit"> {/* 부모를 자식에게 맞춤 */}
            <Image
              src={Slider2}
              alt="J.ESTINA 브랜드"
              width={611}
              height={350}
              className="object-cover w-full h-auto rounded"
            />
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
          {/* 오른쪽 상품 리스트 (2개) */}
          <div className="grid grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col items-center text-center mt-auto">
                {/* <div key={index} className="relative"> */}
                <Image
                  src={Default}
                  alt={`추천 브랜드 ${index + 1}`}
                  width={170}
                  height={200}
                  className="object-cover mt-4"
                />
                <button className="flex flex-col items-start items-center w-full overflow-hidden mt-2">
                  <span className="text-left text-sm text-gray-700">[선택된PICK] 브랜드명</span>
                  <span className="text-xs text-gray-500">상품명 {index + 1}</span>
                  {/* <span className="text-red-500 font-semibold text-sm">24%</span>  */}
                  <span className="text-black-500 font-semibold text-sm">180,880원</span>

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
                src={Default}
                alt={`브랜드 상품 ${index + 1}`}
                width={300}
                height={350}
              />
              <p className="text-left mt-2 font-semibold text-sm">파사드 패턴</p>
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

    </div>


  );
}
