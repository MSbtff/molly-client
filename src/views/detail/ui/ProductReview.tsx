"use client";
import Image from "next/image";
import { Heart } from "lucide-react";
interface Review {
    reviewId: number;
    comment: string;
    user: {
      name: string;
      profileImage: string;
    };
    isLike: boolean;
    date: string;
    images: string[];
}
interface ProductReviewProps {
    reviews: Review[];
    reviewExpanded: boolean;
    visibleReviews: number;
    toggleReviews: () => void;
    reviewOpenModal: (review: Review) => void;
}

export default function ProductReview({ reviews, reviewExpanded, visibleReviews, toggleReviews, reviewOpenModal }: ProductReviewProps) {
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

  return (
    <section className="max-w-screen-lg mx-auto mt-32 px-4">
            {/* 리뷰 헤더 */}
            <p className="text-2xl font-semibold mb-7">리뷰 {reviews.length}</p>
    
            {/* 리뷰 리스트 */}
            {reviews.length === 0 ? (
              <p className="text-center text-gray-600">작성된 리뷰가 없습니다.</p>
            ) : (
              <>
                <div className={`${reviewExpanded ? "h-auto" : "h-[600px] overflow-hidden relative"} grid grid-cols-3 gap-6`}>
                  {reviews.slice(0, visibleReviews).map((review, index) => (
                    <div key={index} className="flex flex-col items-center">
                      {review.images.length > 0 && (
                        <Image
                          // src={review.images[0]} // images 배열의 첫 번째 이미지 사용
                          src={ review.images[0] ? `${imageUrl}${review.images[0]}?w=300&h=300` : "/images/noImage.svg"}
                          // src={"/images/noImage.svg"}
                          alt={`리뷰 이미지 ${index + 1}`}
                          width={300}
                          height={300}
                          className="rounded-lg w-full h-full object-cover"
                          onClick={() => reviewOpenModal(review)}
                          unoptimized={true}
                        />
                      )}
    
                      {/* 사용자 정보 및 좋아요 버튼 */}
                      <div className="flex justify-between items-center w-full mt-2 text-sm text-gray-700">
                        <div  className="flex items-center" onClick={() => reviewOpenModal(review)}>
                          <Image
                            src={"/logo.webp"}
                            alt="User Profile"
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <span className="ml-2 font-semibold">
                            {review.user.name}
                          </span>
                        </div>
                        <button aria-label="좋아요" className="text-gray-600 hover:bg-gray-200 rounded-full transition px-1 py-1">
                          <Heart
                            className="w-5 h-5"
                            fill={review.isLike ? "red" : "none"}
                          />
                        </button>
                      </div>
    
                      {/* 리뷰 내용 */}
                      <span
                        className="text-gray-600 mt-1 text-left w-full"
                        onClick={() => reviewOpenModal(review)}
                      >
                        {review.comment}
                      </span>
                    </div>
                  ))}

                  {/* 그라데이션 효과 */}
                  {!reviewExpanded && (
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
                  )}
                </div>
    
                {/* 리뷰 더보기 버튼 */}
                <div className="text-center mt-8">
                  <button className="px-6 py-3 border border-gray-400 text-lg font-medium hover:bg-gray-100 transition"
                    onClick={toggleReviews}>
                    {reviewExpanded ? "접기" : "리뷰 더보기"}
                  </button>
                </div>
              </>
            )}
          </section>
  );
}
