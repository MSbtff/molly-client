import Image from 'next/image';
import {X} from 'lucide-react';
import {ChevronDown} from 'lucide-react';
import {Button} from '../../../shared/ui/Button';
import {CartItem} from '@/features/cart/api/cartRead';
import {useState, useEffect} from 'react';
import {cartUpdate} from '@/features/cart/api/cartUpdate';

interface OptionModalProps {
  onClose: () => void;
  cartItem: CartItem;
  onUpdate: () => Promise<void>;
}

export const OptionModal = ({
  onClose,
  cartItem,
  onUpdate,
}: OptionModalProps) => {
  const [quantity, setQuantity] = useState(cartItem.cartInfoDto.quantity);

  const {
    cartId,
    color,
    url,
    productName,
    brandName,
    size: cartSize,
  } = cartItem.cartInfoDto;

  // 현재 선택된 colorDetail 찾기
  const selectedColorDetail = cartItem.colorDetails.find(
    (detail) => detail.color === color
  );

  // 현재 선택된 sizeDetail 찾기
  const selectedSizeDetail = selectedColorDetail?.sizeDetails.find(
    (detail) => detail.size === cartSize
  );

  const handleQuantityChange = (newQuantity: number) => {
    if (
      newQuantity > 0 &&
      selectedSizeDetail &&
      newQuantity <= selectedSizeDetail.quantity
    ) {
      setQuantity(newQuantity);
    }
  };

  const handleConfirm = async () => {
    if (selectedSizeDetail) {
      try {
        await cartUpdate(cartId, selectedSizeDetail.id, quantity);
        await onUpdate(); // 추가된 부분
        onClose();
      } catch (error) {
        console.error('수량 업데이트 실패:', error);
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-40 z-1000">
        <div className="w-[490px] h-[730px] border flex flex-col bg-white rounded-[10px] p-4 shadow-md">
          <div className="flex justify-between">
            <div className="font-bold text-2xl">옵션 변경</div>
            <div onClick={onClose} className="cursor-pointer">
              <X />
            </div>
          </div>
          <div className="w-full flex items-center gap-8 border-b-2 mt-12">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${url}`}
              alt="product"
              width={80}
              height={80}
              loading="eager"
            />
            <div className="flex flex-col">
              <strong>{productName}</strong>
              <p className="text-gray2">{brandName}</p>
            </div>
          </div>
          <div className="h-full flex flex-col justify-between gap-8">
            <div className="mt-8">
              <div className="w-full font-bold flex gap-4 justify-between">
                <div className="flex gap-8">
                  <div>색상</div>
                  <div>사이즈</div>
                </div>

                <div className="">수량</div>
              </div>
              <div className="w-full flex justify-between items-center border-b-2">
                <div className="w-40 flex gap-8">
                  <div>{color}</div>
                  <div>{cartSize}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-2 border rounded"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-24">
              <Button
                width="460px"
                height="52px"
                bg="black"
                color="white"
                radius="10px"
                onClick={handleConfirm}
              >
                확인
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
