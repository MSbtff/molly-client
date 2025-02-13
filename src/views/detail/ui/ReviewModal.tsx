import Image from "next/image";

interface ReviewModalProps {
  review: {
    image: string;
    user: { name: string; profileImage: string };
    comment: string;
    date: string;
  };
  onClose: () => void;
}

export default function ReviewModal({ review, onClose }: ReviewModalProps) {
  if (!review) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* 모달 박스 */}
      <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-4 relative">
        {/* 닫기 버튼 */}
        <button className="absolute top-4 right-4 text-gray-500 text-xl" onClick={onClose}>
          ✕
        </button>

        {/* 리뷰 이미지 */}
        <div className="rounded-lg overflow-hidden">
          <Image
            src={review.image}
            alt="리뷰 이미지"
            width={500}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* 날짜 */}
        <p className="text-gray-500 text-sm mt-3">{review.date}</p>

        {/* 사용자 정보 */}
        <div className="flex items-center mt-2">
          <Image
            src={review.user.profileImage}
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
