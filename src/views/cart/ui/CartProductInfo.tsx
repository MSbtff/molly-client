import Image from 'next/image';
import {CartItemDto} from '@/features/cart/api/cartRead';
import { memo } from 'react';

export const CartProductInfo = memo((props: CartItemDto & {priority? : boolean}) => {
  const {productName, brandName, price, size, quantity, color, url , priority} = props;
  const won = Number(price) * Number(quantity);
  const sumWon = won.toLocaleString();

  return (
    <>
      <div className="w-full h-full min-h-[1.5rem]">
        <div className="w-full h-20 flex gap-x-4 items-start">
        <div className="relative w-20 h-20 flex-shrink-0 bg-gray-50">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${url}`}
            alt={productName}
            width={80}
            height={80}
            loading={priority ? "eager" : "lazy"}
            className='object-cover'
          />
        </div>
          <div className="w-full flex flex-col gap-2">
            <p className="font-semibold">
              {productName} / {brandName}
            </p>
            <div className="flex justify-between min-h-[1.25rem]">
              <p className="text-gray-600">color:{color}</p>
            </div>
            <div className='min-h-[1.2rem]'>
              <strong>사이즈: {size}</strong>
            </div>
            <div className="flex gap-2 min-h-[1.2rem]">
              <div className="font-bold">수량 : {quantity} 개</div>
            </div>
            <div className="flex justify-between min-h-[1.2rem] line-clamp-2">
              <div>상품 금액</div>
              <strong>{sumWon}원</strong>
            </div>
            <div className="flex justify-between">
              <div>배송 비용</div>
              <div className="text-gray2">
                <p className="text-end text-gray-800">무료배송</p>
                <p className="underline">배송 예정일 3-5일</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
