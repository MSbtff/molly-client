'use client';

import Image from 'next/image';
import product from '../../../../public/product.png';
import {useState} from 'react';

export const ProductList = () => {
  const [isTrue, setIsTrue] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            src={product}
            alt="product"
            width={80}
            height={80}
            loading="eager"
          />
          <div className="flex flex-col">
            <strong>상품명</strong>
            <p>사이즈</p>
          </div>
        </div>
        <div>400,000원</div>
        <div>02/07</div>
        <div
          className="flex flex-col cursor-pointer"
          onClick={(item) => setIsTrue(!isTrue)}
        >
          <strong>배송중</strong>
          {isTrue ? (
            <p className="text-gray2">주문 취소</p>
          ) : (
            <p className="text-gray-400">리뷰</p>
          )}
        </div>
      </div>
    </>
  );
};
