import { getValidAuthToken } from "@/shared/util/lib/authTokenValue";

export default async function orderRetriever() {
  const authToken = await getValidAuthToken();

  try {
    const res = await fetch(`${process.env.NEXT_SERVER_URL}/orders/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken?.slice(6)}`,
        "Content-Type": "application/json",
      },
    });

    console.log("응답 상태:", res.status);
    console.log("인증 토큰:", authToken?.slice(6));

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `주문 정보를 가져오는데 실패했습니다: ${
          errorData.message || res.status
        }`
      );
    }

    const data = await res.json();

    // 응답 데이터 구조 로깅
    console.log("API 응답 데이터 구조:", JSON.stringify(data, null, 2));

    // 일단 빈 데이터로 초기화하여 오류 방지
    if (!data.orders) {
      data.orders = [];
    }

    return data;
  } catch (error) {
    console.error("주문 정보 가져오기 오류:", error);
    // 에러가 발생해도 빈 객체를 반환하여 화면이 깨지지 않도록 함
    return { orders: [] };
  }
}
