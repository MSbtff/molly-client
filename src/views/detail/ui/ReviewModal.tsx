import { useState } from "react";
import Image from "next/image";
interface ReviewModalProps {
  review: {
    images: string[];
    user: { name: string; profileImage: string };
    comment: string;
    date: string;
  };
  onClose: () => void;
}

const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

export default function ReviewModal({ review, onClose }: ReviewModalProps) {

  const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 슬라이드 인덱스
  // 이전 이미지 보기
  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? review.images.length - 1 : prev - 1
    );
  };
  // 다음 이미지 보기
  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === review.images.length - 1 ? 0 : prev + 1
    );
  };

  if (!review) return null;

  console.log("받은 리뷰 데이터:",review);

  console.log("imageUrl", imageUrl);
  console.log("review.images", review.images);
  console.log("currentIndex", currentIndex);
  console.log("review.images?.[currentIndex]", review.images?.[currentIndex]);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* 모달 박스 */}
      <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-4 relative z-50">
        {/* 닫기 버튼 */}
        <button className="absolute top-4 right-4 text-gray-500 text-xl z-50" onClick={onClose}>
          ✕
        </button>

        {/* 리뷰 이미지 */}
        {/* <div className="rounded-lg overflow-hidden">
          <Image
            src={review.image}
            alt="리뷰 이미지"
            width={500}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div> */}
        {/* 리뷰 이미지 캐러셀 */}
        <div className="relative">
          {/* 이전 버튼 (이미지가 하나 이상일 때만 표시) */}
          {review.images.length > 1 && (
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 opacity-70 hover:opacity-100 transition"
              onClick={prevImage}
            >
              ◀
            </button>
          )}

          <div className="rounded-lg overflow-hidden">
            <Image
              src={`${imageUrl}${review.images[currentIndex]}`} // 현재 인덱스의 이미지 표시
              alt="리뷰 이미지"
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* 다음 버튼 (이미지가 하나 이상일 때만 표시) */}
          {review.images.length > 1 && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 opacity-70 hover:opacity-100 transition"
              onClick={nextImage}
            >
              ▶
            </button>
          )}
        </div>

        {/* 날짜 */}
        <p className="text-gray-500 text-sm mt-3">{review.date}</p>

        {/* 사용자 정보 */}
        <div className="flex items-center mt-2">
          <Image
            // src={review.user.profileImage}
            src={"/icons/profile.svg"}
            alt="User Profile"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="ml-2 font-semibold">{review.user.name}</span>
        </div>

        {/* 리뷰 내용 */}
        <p className="text-gray-700 text-sm mt-2">{review.comment}</p>
      </div>
    </div>
  );
}
