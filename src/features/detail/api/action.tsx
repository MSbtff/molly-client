"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getValidAuthToken } from "@/shared/util/lib/authTokenValue";
interface ReviewApiResponse {
  reviewInfo: {
    reviewId: number;
    content: string;
    nickname: string;
    profileImage?: string;
    isLike: boolean;
    createdAt: string;
  };
  images: string[];
}
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
interface Pageable {
  size: number;
  hasNext: boolean;
  isFirst: boolean;
  isLast: boolean;
}

const baseUrl = process.env.NEXT_SERVER_URL;

//바로 구매
export async function buyNow(
  productId: number,
  itemId: number,
  quantity: number
) {
  const authToken = await getValidAuthToken();

  if (!authToken) {
    // throw new Error('로그인이 필요합니다.');
    redirect("/login");
  }

  try {
    // 요청할 바디 데이터
    const bodyData = JSON.stringify({
      cartOrderRequests: [], // 장바구니 주문이 아니라면 빈 배열
      directOrderRequest: {
        itemId,
        quantity,
      },
    });

    console.log("바로 구매 주문 요청 본문:", bodyData);

    // API 요청
    const response = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authToken}`,
      },
      body: bodyData,
    });

    console.log(`바로 구매 요청 Status: ${response.status}`); // 응답 상태 출력

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        `바로 구매 실패 Status: ${response.status}, Message: ${errorData.message}`
      );
      throw new Error(errorData.message || "구매 요청 실패");
    }

    // 성공 응답 데이터
    const data = await response.json();
    console.log("바로 구매 api 성공", data);

    return data; // 주문 결과 반환
  } catch (error) {
    console.error("order api 요청 중 오류 발생:", error);
    throw new Error(
      error instanceof Error ? error.message : "알 수 없는 오류 발생"
    );
  }
}

//장바구니 담기
export async function addToCart(itemId: number, quantity: number) {
  console.log("서버 액션 addToCart 함수 진입");
  const authToken = await getValidAuthToken();

  if (!authToken) {
    redirect("/login");
  }

  try {
    const bodyData = JSON.stringify({ itemId, quantity });
    console.log("장바구니 API 요청 본문:", bodyData);

    const response = await fetch(`${baseUrl}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authToken}`,
      },
      body: bodyData,
    });
    console.log(bodyData);
    console.log(`장바구니 api 응답: ${response.status}`);

    if (!response.ok) {
      // 실패 응답 처리 (400, 500)
      console.log(`[장바구니 api 실패] Status: ${response.status}`);
      const errorData = await response.json();
      throw new Error(errorData.message || "api 요청 실패");
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "알 수 없는 오류");
  }
}

//리뷰 리스트
export async function fetchReviews(
  productId: number,
  page: number = 0,
  size: number = 15
): Promise<{ reviews: Review[]; pageable: Pageable } | undefined> {
  console.log("프로덕트 id:", productId);
  const authToken = (await cookies()).get("Authorization"); // 쿠키에서 토큰 가져오기
  console.log("Authorization 토큰:", authToken);

  // const endpoint = authToken
  //   ? `${baseUrl}/review/${productId}`
  //   : `${baseUrl}/review/${productId}/new`;
  const endpoint = `${baseUrl}/review/${productId}/new`;
  const url = `${endpoint}?page=${page}&size=${size}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: authToken ? { Authorization: authToken.value } : {},
    });

    console.log("API 응답 상태 코드:", response.status); // API 응답 상태 확인

    if (response.status === 204) {
      return {
        reviews: [],
        pageable: { size: size, hasNext: false, isFirst: true, isLast: true },
      }; // 정상적으로 빈 배열 반환
    }

    const responseData = await response.json();
    console.log("리뷰 api응답 데이터:", responseData); //출력이 안된다면 api 요청 실패햇거나 response.json 호출 전에 에러가 발생했기때문에

    if (!response.ok) {
      console.log("API 요청 실패. 응답 데이터:", responseData);
      console.log(response.status);
    }

    // 데이터 매핑
    const formattedReviews: Review[] = responseData.data.map(
      (review: ReviewApiResponse) => ({
        reviewId: review.reviewInfo.reviewId,
        comment: review.reviewInfo.content,
        user: {
          name: review.reviewInfo.nickname,
          profileImage:
            review.reviewInfo.profileImage || "/images/default-profile.svg", // 기본 프로필 이미지 설정
        },
        images:
          review.images && review.images.length > 0
            ? review.images
            : ["/images/noImage.svg"], // 이미지 없으면 기본 이미지
        date: review.reviewInfo.createdAt,
        isLike: review.reviewInfo.isLike,
      })
    );

    console.log("리뷰 매핑 데이터:", formattedReviews);

    // `pageable` 정보 포함하여 반환
    return { reviews: formattedReviews, pageable: responseData.pageable };
  } catch (error) {
    console.error("리뷰 조회 중 오류 발생:", error);
  }
}
