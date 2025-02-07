'use client';

import Image from 'next/image';
import product from '../../../assets/product.png';
import {Button} from '../../../shared/ui/Button';
import React, {useState} from 'react';
import {OptionModal} from './OptionModal';
import {CartNotice} from './CartNotice';
import {CartOrderButton} from './CartOrderButton';
import {CartProductInfo} from './CartProductInfo';

export const CartComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && <OptionModal onClose={() => setIsOpen(false)} />}
      <div className={`w-[1440px] h-screen flex flex-col justify-center`}>
        <div className="w-full h-full bg-[#EFF2F1] flex flex-col  items-center">
          <div className="text-2xl">쇼핑 정보</div>
          <div className="w-[680px]">
            <div className="w-full flex items-center justify-between ">
              <div className="flex gap-2">
                <div>✅</div>
                <div>전체 선택</div>
              </div>
              <div>선택 삭제</div>
            </div>
          </div>

          <div className="mt-4 w-[680px] h-[370px] bg-white flex flex-col gap-4 p-8 rounded-[10px]">
            <div className="flex justify-between">
              <div>✅</div>
              <div>삭제</div>
            </div>
            <div className="flex gap-x-6">
              <div>
                <Image
                  src={product}
                  alt="product"
                  width={80}
                  height={80}
                  loading="eager"
                />
              </div>
              <CartProductInfo />
            </div>
            <div className="flex gap-8">
              <Button
                width="330px"
                height="36px"
                radius="10px"
                border="2px solid #000"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  setIsOpen((state) => !state);
                }}
              >
                옵션 변경
              </Button>

              <Button
                width="330px"
                height="36px"
                radius="10px"
                bg="black"
                color="white"
              >
                주문 하기
              </Button>
            </div>
          </div>
          <CartNotice />
        </div>
        <CartOrderButton />
      </div>
    </>
  );
};
