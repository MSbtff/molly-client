import ProductDetail from "../../../src/views/detail/ui/detail";
import { fetchReviews } from "@/features/detail/api/action";

//next가 params.productId를 미리 알 수 있게
export async function generateStaticParams() {
  return [{ productId: "1" }, { productId: "113102" }]; // 실제 데이터베이스에서 가져오는 로직으로 변경 가능
}

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const resolvedParams = await params;
  console.log("전체 params 값:", resolvedParams);
  // export default async function Page({ params }: PageProps) {
  // console.log("params.productId 값", params.productId); //undefined
  const productId = Number(resolvedParams.productId); // URL에서 productId 가져오기
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
