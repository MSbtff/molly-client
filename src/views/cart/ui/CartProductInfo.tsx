import Image from 'next/image';
import product from '../../../assets/product.png';

export const CartProductInfo = () => {
  return (
    <>
      <div className="w-full h-full">
        <div className="w-full h-20 flex gap-x-6">
          <Image
            src={product}
            alt="product"
            width={80}
            height={80}
            loading="eager"
          />
          <div className="w-full flex flex-col">
            <strong>상품명</strong>
            <div className="flex justify-between">
              <p>컬러/사이즈</p>
              <strong>black/XL</strong>
            </div>
            <div className="flex justify-between">
              <div>수량</div>
              <div>1</div>
            </div>
            <div className="flex justify-between">
              <div>상품 금액</div>
              <strong>400,000원</strong>
            </div>
            <div className="flex justify-between">
              <div>배송일</div>
              <div className="text-gray2">
                <p className="text-end">무료배송</p>
                <p className="underline">배송 예정일 3-5일</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
