import React from 'react';

export const CartNotice = () => {
  return (
    <>
      <div className="bg-[#FAFAFA]  xs:w-[480px] sm:w-[600px] md:w-[680px] rounded-[10px] p-8 mt-4 ">
        <ul className="list-disc">
          <li>
            배송 방법 및 쿠폰/포인트 적용 여부는 결제 시 선택할 수 있습니다.
          </li>
          <li>
            총 결제금액은 배송 방법 및 쿠폰/포인트 적용 여부에 따라 달라질 수
            있습니다.
          </li>
          <li>
            장바구니에는 각각 최대 30개까지 담을 수 있으며, 상품은 최대
            365일까지 보관됩니다.
          </li>
        </ul>
      </div>
    </>
  );
};
