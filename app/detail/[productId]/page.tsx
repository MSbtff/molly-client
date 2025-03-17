import ProductDetail from '../../../src/views/detail/ui/detail';
import { fetchReviews } from "@/features/detail/action";

export default async function Page({ params }: { params: { productId: string } }) {

  console.log("params.productId 값", params.productId); //undefined
  const productId = Number(params.productId); // URL에서 productId 가져오기
  console.log("변환된 productId 값", productId); //NaN

  // 서버에서 리뷰 데이터를 가져옴
  const reviewData = await fetchReviews(productId);

  if (!reviewData) {
    console.log("reviewData:", reviewData);
    return <p>리뷰 데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }

  console.log("reviewData.reviews:", reviewData.reviews);

  return (
    <ProductDetail productId={productId} initialReviews={reviewData.reviews} />
  );
}
