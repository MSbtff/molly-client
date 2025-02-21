'use client';

import { useState, useEffect, useTransition } from 'react';
import { useSearchParams } from "next/navigation";
import Image from 'next/image';
// import ReviewModal from '../../public/images/review.jpg';
import { buyNow, addToCart } from '@/features/detail/action';
import ReviewModal from '@/views/detail/ui/ReviewModal';
import { Heart } from 'lucide-react';
interface Product {
  id: number;
  categories: string[];
  brandName: string;
  productName: string;
  price: number;
  description: string;
  thumbnail: { path: string; filename: string };
  productImages: { path: string; filename: string }[];
  productDescriptionImages: { path: string; filename: string }[];
  items: {
    id: number;
    color: string;
    colorCode: string;
    size: string;
    quantity: number;
  }[];
}
interface Review {
  image: string;
  user: { name: string; profileImage: string };
  comment: string;
  date: string;
}

//리뷰 데이터 (백엔드 연동 시 API 요청으로 변경)
const reviews: Review[] = [
  {
    image: '/images/review.jpg',
    user: { name: 'S_w_g01', profileImage: '/icons/profile.svg' },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: { name: 'sd896', profileImage: '/icons/profile.svg' },
    comment:
      '예쁜데 간지 나요~ 엄청 고민하다가 샀는데 당장 사세요!! 모두에게 잘 어울릴 핏이입니다. 이거 입고 나간 날은 살 5키로 빠졌냐고 듣는 날입니다:)',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: { name: '기요미', profileImage: '/icons/profile.svg' },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: {
      name: '성동구 불주먹',
      profileImage: '/icons/profile.svg',
    },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: { name: 'slvkx09_09', profileImage: '/icons/profile.svg' },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: { name: '핵사곤ck90', profileImage: '/icons/profile.svg' },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: { name: '핵사곤ck90', profileImage: '/icons/profile.svg' },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: { name: '핵사곤ck90', profileImage: '/icons/profile.svg' },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: { name: '핵사곤ck90', profileImage: '/icons/profile.svg' },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: { name: '핵사곤ck90', profileImage: '/icons/profile.svg' },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: { name: '핵사곤ck90', profileImage: '/icons/profile.svg' },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: { name: '핵사곤ck90', profileImage: '/icons/profile.svg' },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: { name: '핵사곤ck90', profileImage: '/icons/profile.svg' },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: { name: '핵사곤ck90', profileImage: '/icons/profile.svg' },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: { name: '핵사곤ck90', profileImage: '/icons/profile.svg' },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: { name: '핵사곤ck90', profileImage: '/icons/profile.svg' },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: { name: '핵사곤ck90', profileImage: '/icons/profile.svg' },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: { name: '핵사곤ck90', profileImage: '/icons/profile.svg' },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: { name: '핵사곤ck90', profileImage: '/icons/profile.svg' },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
  {
    image: '/src/assets/images/review.jpg',
    user: { name: '핵사곤ck90', profileImage: '/icons/profile.svg' },
    comment: '예쁜데 간지 나요~',
    date: '2025.1.26',
  },
];

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

export default function ProductDetail() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ 초기값을 true로 설정 (초기 렌더링 시 무조건 로딩 UI 보장)
  const [selectedOption, setSelectedOption] = useState<Product["items"][0] | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const selectedOption = product.options[0];
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false); // 상품 정보 더보기
  const [visibleReviews, setVisibleReviews] = useState(6); // 처음엔 리뷰 6개만 표시
  const [reviewExpanded, setreviewExpanded] = useState(false); // 리뷰 펼침 여부
  const [selectedReview, setSelectedReview] = useState<Review | null>(null); // 선택한 리뷰 정보 저장
  const [isreviewModalOpen, setIsreviewModalOpen] = useState(false); // 모달 열림 상태

  const [isPending, startTransition] = useTransition();

  //바로 구매
  const handleBuyNow = () => {
    if (!selectedOption) {
      alert("상품 옵션을 선택해주세요.");
      return;
    }
    if (!productId) {
      alert("상품 ID가 없습니다.");
      return;
    }
    const parsedProductId = parseInt(productId, 10); // 문자열을 숫자로 변환

    startTransition(async () => {
      try {
        await buyNow(parsedProductId, selectedOption.id, quantity);
        console.log("order api 요청 성공");
      } catch (error) {
        console.error("order api 요청 중 오류 발생:", error);
      }
    });
  }

  //장바구니 담기
  const handleCartButton = () => {
    if (!selectedOption) {
      alert("상품 옵션을 선택해주세요.");
      return;
    }

    console.log("장바구니 요청 시작");
    console.log("선택한 옵션 id", selectedOption.id);
    console.log("수량", quantity);

    startTransition(async () => {
      try {
        const message = await addToCart(selectedOption.id, quantity);
        alert(message);
      } catch (error) {
        console.error("장바구니 api 오류 발생:", error);
      }
    });
  };


  //api 요청
  useEffect(() => {
    if (!productId) return;
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    // setLoading(true);
    // setError(null);

    try {
      const response = await fetch(`${baseUrl}/product/${productId}`);
      if (!response.ok) {
        // throw new Error("상품 정보를 불러오지 못했습니다.");
        throw new Error(`API요청 실패: ${response.status}`);
      }
      const data = await response.json();
      console.log("API 요청 성공:", data);
      setProduct(data);
    } catch (error) {
      // setError(error instanceof Error ? error.message : "알 수 없는 에러 발생");
      console.error("API 요청 에러:", error);
    } finally {
      setIsLoading(false); // ✅ API 응답 완료 후 isLoading = false
    }
  };

  // 로딩 중일 때 스켈레톤 UI 표시 (isLoading이 true면 무조건 표시됨)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  // product가 null이면 오류 메시지 표시
  if (!product) {
    return <p className="text-center text-gray-500">상품 정보를 불러오지 못했습니다.</p>;
  }

  //수량 추가
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };
  //리뷰 더보기 클릭 토글 함수
  const toggleReviews = () => {
    if (reviewExpanded) {
      setVisibleReviews(6); // 다시 6개만 보이도록 설정
    } else {
      setVisibleReviews(reviews.length); // 모든 리뷰 보이도록 설정
    }
    setreviewExpanded(!reviewExpanded); // 상태 반전
  };
  //리뷰 모달창 상태
  const reviewOopenModal = (review: Review) => {
    setSelectedReview(review); // 선택한 리뷰 데이터 저장
    setIsreviewModalOpen(true); // 모달 열기
  };
  const reviewCloseModal = () => {
    setIsreviewModalOpen(false); // 모달 닫기
    setSelectedReview(null); // 선택한 리뷰 데이터 초기화
  };
  //선택한 옵션이 렌더링 
  const handleOptionSelect = (option: Product["items"][0]) => {
    console.log("옵션 아이디", option.id)
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };


  return (
    <>
      {/* 구매 섹션 */}
      <div className="max-w-screen-xl mx-auto p-6 flex gap-12">
        {/* 썸네일 이미지 */}
        <div className="w-1/2">
          <Image
            src={`${imageUrl}${product.thumbnail.path}`}
            alt={product?.productName || "상품 이미지"}
            width={500}
            height={500}
          />
          {/*프로덕트 이미지 여러 개*/}
          <div className="flex mt-4 gap-2">
            {product?.productImages?.map((img, index) => (
              <Image
                key={index}
                src={`${imageUrl}${img.path}`}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="rounded-md cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* 세로 구분선 */}
        <div className="border-l border-gray-300 h-auto"></div>

        {/* 오른쪽: 상품 정보 */}
        <div className="w-1/2 space-y-4">
          <h1 className="text-2xl font-bold">{product?.brandName}</h1>
          <p className="text-gray-500">{product.productName}</p>

          {/* 가격 정보 */}
          <div className="text-lg">
            <span className="text-gray-400 line-through block">
              {product.price.toLocaleString()}원
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-red-500 font-bold text-2xl">
                {product.price.toLocaleString()}원
              </span>
              <span className="text-red-500 text-lg">
                30%
              </span>
              {/* <span className="text-black-500 font-bold text-2xl">
                {product.price}원
              </span> */}
            </div>
          </div>

          {/* 포인트 및 혜택 */}
          <div className="text-sm text-gray-600">
            포인트 적립:{' '}
            <span className="font-semibold">1450P 적립</span>
          </div>

          {/* 옵션 선택 */}
          <div className="mt-4 relative border-t"> {/*relative 추가*/}
            <p className="font-semibold mt-4">옵션 선택</p>
            <button className="w-full border px-4 py-3 mt-2 text-left rounded-md"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              {selectedOption ? `${selectedOption.color} / ${selectedOption.size}` : "색상/사이즈 선택"}
            </button>
            {/* 드롭다운 메뉴 */}
            {isDropdownOpen && (
              <ul className="absolute left-0 w-full border rounded-md mt-2 bg-white shadow-md z-10">
                {product.items.map((item) => (
                  <li
                    key={item.id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleOptionSelect(item)}

                  >
                    {item.color} / {item.size}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedOption && (
            <div className="border p-4 rounded-md flex flex-col justify-between items-start mt-2 bg-[#F6F6F6]">
              <div>
                <p>{`${selectedOption.color} / ${selectedOption.size}`}</p>
              </div>

              <div className="flex justify-between items-center w-full mt-2">
                <div className="flex items-center border rounded-md overflow-hidden bg-white">
                  <button className="px-4 py-2 border-r bg-white" onClick={handleDecrease}>
                    -
                  </button>
                  <span className="px-6 py-2 text-center bg-white">{quantity}</span>
                  <button className="px-4 py-2 border-l bg-white" onClick={handleIncrease}>
                    +
                  </button>
                </div>

                <p className="text-red-500 font-semibold">
                  {(product.price * quantity).toLocaleString()} 원
                </p>
              </div>
            </div>
          )}

          {/* 구매 버튼 */}
          <div className="flex gap-4 mt-4">
            <button className="w-1/2 border border-black py-3 rounded-md text-lg font-semibold"
              onClick={handleBuyNow}> 바로 구매
            </button>
            <button className="w-1/2 bg-black text-white py-3 rounded-md text-lg font-semibold"
              onClick={handleCartButton}
              disabled={isPending}> 장바구니 담기
            </button>
          </div>
        </div>
      </div>

      {/* 상세 섹션 */}
      <section className="max-w-screen-lg mx-auto mt-16 px-4 border-t">
        {/* 상품 이미지 및 그라데이션 */}
        {/* <div className={`${showDetails ? 'h-auto' : 'h-[300px] overflow-hidden'} relative`}>
          <div className="flex flex-col gap-6">
            {product?.productDescriptionImages.map((img, index) => (
              <Image
                key={index}
                src={`${imageUrl}${img.path}`}
                // src="/images/noImage.svg"
                alt={`Product Description Image ${index + 1}`}
                width={800}
                height={600}
                className="w-full object-cover"
              />
            ))}
          </div> */}

        {/* 그라데이션 효과 추가 (showDetails가 false일 때만 보이도록) */}
        {/* {!showDetails && (
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
          )}
        </div> */}

        {/* 상품 정보 더보기 버튼 */}
        {/* {!showDetails && (
          // <div className="text-center mt-4">
          <div className="text-center mt-8 relative z-10">
            <button
              className="px-6 py-3 border border-gray-400 rounded-lg text-lg font-medium hover:bg-gray-100 transition"
              onClick={() => setShowDetails(true)}
            >
              상품 정보 더보기
            </button>
          </div>
        )} */}

        {/* 상세 설명 */}
        {/* {showDetails && (
          <>
            <div className="mt-12">
              {product?.description && (
                <div className="max-w-screen-lg mx-auto text-center mt-8 px-4">
                  {product.description.split("\n").map((line, index) => (
                    <p key={index} className="mb-4">
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div> */}

        {/* 접기 버튼 */}
        {/* <div className="text-center mt-6">
              <button
                className="px-6 py-3 border border-gray-400 rounded-lg text-lg font-medium hover:bg-gray-100 transition"
                onClick={() => setShowDetails(false)}
              >
                접기
              </button>
            </div>
          </>
        )} */}

        {/* 상세 설명 (이미지보다 위에 위치) */}
        {showDetails && (
          <div className="mt-12">
            {product?.description && (
              <div className="max-w-screen-lg mx-auto text-center mt-8 px-4">
                {product.description.split("\n").map((line, index) => (
                  <p key={index} className="mb-4">
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 상품 이미지 및 그라데이션 */}
        <div className={`${showDetails ? 'h-auto' : 'h-[300px] overflow-hidden'} relative`}>
          <div className="flex flex-col gap-6">
            {product?.productDescriptionImages.map((img, index) => (
              <Image
                key={index}
                src={`${imageUrl}${img.path}`}
                alt={`Product Description Image ${index + 1}`}
                width={800}
                height={600}
                className="w-full object-cover"
              />
            ))}
          </div>

          {/* 그라데이션 효과 추가 (showDetails가 false일 때만 보이도록) */}
          {!showDetails && (
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
          )}
        </div>

        {/* 상품 정보 더보기 버튼 */}
        {!showDetails && (
          <div className="text-center mt-8 relative z-10">
            <button
              className="px-6 py-3 border border-gray-400 rounded-lg text-lg font-medium hover:bg-gray-100 transition"
              onClick={() => setShowDetails(true)}
            >
              상품 정보 더보기
            </button>
          </div>
        )}

        {/* 접기 버튼 */}
        {showDetails && (
          <div className="text-center mt-6">
            <button
              className="px-6 py-3 border border-gray-400 rounded-lg text-lg font-medium hover:bg-gray-100 transition"
              onClick={() => setShowDetails(false)}
            >
              접기
            </button>
          </div>
        )}

      </section>

      {/* 리뷰 섹션 */}
      <section className="max-w-screen-xl mx-auto mt-16 px-4 border-t">
        {/* 리뷰 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">리뷰 {reviews.length}</h2>
        </div>

        {/* 리뷰 리스트 */}
        <div
          className={`${reviewExpanded ? 'h-auto' : 'h-[600px] overflow-hidden relative'
            } grid grid-cols-3 gap-6`}
        >
          {reviews.slice(0, visibleReviews).map((review, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* 리뷰 이미지 */}
              <Image
                src={review.image}
                alt={`리뷰 이미지 ${index + 1}`}
                width={300}
                height={300}
                className="rounded-lg w-full h-full object-cover"
                onClick={() => reviewOopenModal(review)}
              />
              {/* 사용자 정보 및 좋아요 버튼 */}
              <div className="flex justify-between items-center w-full mt-2 text-sm text-gray-700">
                <div
                  className="flex items-center"
                  onClick={() => reviewOopenModal(review)}
                >
                  <Image
                    src={review.user.profileImage}
                    alt="User Profile"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="ml-2 font-semibold">{review.user.name}</span>
                </div>
                <button className="text-gray-500 hover:bg-gray-200 rounded-full transition px-1 py-1">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* 리뷰 내용 */}
              <span
                className="text-gray-600 mt-1 text-left w-full"
                onClick={() => reviewOopenModal(review)}
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
          <button
            className="px-6 py-3 border border-gray-400 rounded-lg text-lg font-medium hover:bg-gray-100 transition"
            onClick={toggleReviews}
          >
            {reviewExpanded ? '접기' : '리뷰 더보기'}
          </button>
        </div>
      </section>

      {/* 리뷰 모달 창 */}
      {isreviewModalOpen && selectedReview && (
        <ReviewModal review={selectedReview} onClose={reviewCloseModal} />
      )}

      {/* 이 브랜드의 다른 상품 섹션 */}
    </>
  );
}
