'use client'

import BannerSection from "./BannerSection";
import BrandSection from './BrandSection';
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

      {/* 브랜드 */}
      <BrandSection/>

      {/* 지금 인기있는 상품 */}
      <PopularItemsSection/>

      {/*스타일 클립 */}
      <StyleClipSection/>

      {/* 지금 핫한 신상템 */}
      <HotItemsSection/>

      {/* 주목할 브랜드 */}
      <FeaturedBrandSection/>

      {/* 랭킹 상품 */}
      <RecommendedItemsSection/>
    </div>


  );
}