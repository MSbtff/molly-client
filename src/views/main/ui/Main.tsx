// 'use client'

// import BannerSection from "./BannerSection";
// import { lazy, Suspense } from "react";

// const BrandSection = lazy(() => import("./BrandSection"));
// const PopularItemsSection = lazy(() => import("./PopularItemsSection"));
// const StyleClipSection = lazy(() => import("./StyleClipSection"));
// const HotItemsSection = lazy(() => import("./HotItemsSection"));
// const FeaturedBrandSection = lazy(() => import("./FeaturedBrandSection"));
// const RecommendedItemsSection = lazy(() => import("./RecommendedItemsSection"));

// const SectionFallback = () =>
//   <>
//     {Array.from({ length: 24 }).map((_, index) => (
//       <div key={index} className="flex flex-col items-left mt-10 animate-pulse">
//         <div className="w-full aspect-[5/6] bg-gray-300 animate-pulse" />
//         <div className="w-32 h-4 bg-gray-300 mt-2" />
//         <div className="w-28 h-4 bg-gray-200 mt-1" />
//         <div className="w-24 h-4 bg-gray-200 mt-1" />
//       </div>
//     ))}
//   </>;

// export default function Main() {

//   return (
//     <div className="space-y-16">
//       {/* 배너 */}
//       <BannerSection />

//       {/* 브랜드 */}
//       <Suspense fallback={<SectionFallback />}>
//         <BrandSection />
//       </Suspense>

//       {/* 지금 인기있는 상품 */}
//       <Suspense fallback={<SectionFallback />}>
//         <PopularItemsSection />
//       </Suspense>

//       {/* 스타일 클립 */}
//       <Suspense fallback={<SectionFallback />}>
//         <StyleClipSection />
//       </Suspense>

//       {/* 지금 핫한 신상템 */}
//       <Suspense fallback={<SectionFallback />}>
//         <HotItemsSection />
//       </Suspense>

//       {/* 주목할 브랜드 */}
//       <Suspense fallback={<SectionFallback />}>
//         <FeaturedBrandSection />
//       </Suspense>

//       {/* 고객님이 좋아할 만한 상품 */}
//       <Suspense fallback={<SectionFallback />}>
//         <RecommendedItemsSection />
//       </Suspense>
//     </div>


//   );
// }

'use client'

// import Image from "next/image";
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

      {/* 고객님이 좋아할 만한 상품 */}
      <RecommendedItemsSection/>
    </div>


  );
}