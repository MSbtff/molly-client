'use client'

// import Image from "next/image";
import BannerSection from "./BannerSection";
import CategoriesSection from './CategoriesSection';
import PopularItemsSection from './PopularItemsSection';
import StyleClipSection from './StyleClipSection';
import HotItemsSection from './HotItemsSection';
import FeaturedBrandSection from './FeaturedBrandSection';
import RecommendedItemsSection from './RecommendedItemsSection';

export default function   Main() {


  return (
    <div className="space-y-16">

      {/* 배너 */}
      <BannerSection/>

      {/* 카테고리 */}
      <CategoriesSection/>


      {/* 지금 인기있는 상품 */}
      <PopularItemsSection/>

      {/*스타일 클립 */}
      <StyleClipSection/>


      {/* 지금 핫한 신상템 */}
      <HotItemsSection/>


      {/* 주목할 브랜드 */}
      <FeaturedBrandSection/>


      {/* 고객님이 좋아할 만한 상품 */}
      <RecommendedItemsSection/>

    </div>


  );
}
