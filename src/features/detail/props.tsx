// import ProductDetail from "../../../app/detail/[productId]/page";
// import { fetchReviews } from "@/features/detail/api/action"; // 서버 액션 가져오기

// export default async function ProductDetailPage({
//   params,
// }: {
//   params: { productId: string };
// }) {
//   const productId = Number(params.productId);

//   // 서버에서 리뷰 데이터를 가져옴
//   const reviewData = await fetchReviews(productId);

//   if (!reviewData) {
//     return <p>리뷰 데이터를 불러오는 중 오류가 발생했습니다.</p>; // 예외 처리 추가
//   }

//   return (
//     <ProductDetail productId={productId} initialReviews={reviewData.reviews} />
//   );
// }
