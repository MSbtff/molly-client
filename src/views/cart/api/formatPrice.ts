/**
 * 숫자를 통화 형식으로 변환합니다. (예: 1000 -> 1,000)
 * @param price 포맷팅할 가격 숫자
 * @returns 콤마가 포함된 포맷팅된 가격 문자열
 */
export const formatPrice = (price: number): string => {
  return price.toLocaleString("ko-KR");
};
