'use client';

import Image from 'next/image';
import {X} from 'lucide-react';
import {Button} from '../../../shared/ui/Button';
import {CartItem} from '@/features/cart/api/cartRead';
import {useState, useEffect} from 'react';
import {cartUpdate} from '@/features/cart/api/cartUpdate';
import {OptionDropbox} from './OptionDropbox';

interface SizeDetail {
  id: number;
  size: string;
  quantity: number;
}

// 색상 상세 정보에 대한 인터페이스
interface ColorDetail {
  color: string;
  sizeDetails: SizeDetail[];
}
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
  const {
    cartId,
    color: initialColor,
    url,
    productName,
    brandName,
    size: initialSize,
    quantity: initialQuantity,
  } = cartItem.cartInfoDto;

  const [color, setColor] = useState(initialColor);
  const [size, setSize] = useState(initialSize);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [maxQuantity, setMaxQuantity] = useState<number>(0);

  // 초기 선택된 아이템 ID와 최대 수량 설정
  useEffect(() => {
    const selectedColorDetail = cartItem.colorDetails.find(
      (detail) => detail.color === initialColor
    );

    if (selectedColorDetail) {
      const selectedSizeDetail = selectedColorDetail.sizeDetails.find(
        (detail) => detail.size === initialSize
      );

      if (selectedSizeDetail) {
        setSelectedItemId(selectedSizeDetail.id);
        setMaxQuantity(selectedSizeDetail.quantity);
      }
    }
  }, [cartItem, initialColor, initialSize]);

  // 수량 변경 처리
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  // OptionDropbox에서 옵션 변경 시 호출될 함수
  const handleOptionChange = (
    newColor: string,
    newSize: string,
    itemId: number,
    newMaxQuantity: number
  ) => {
    setColor(newColor);
    setSize(newSize);
    setSelectedItemId(itemId);
    setMaxQuantity(newMaxQuantity);

    // 옵션이 변경되면 수량 조정
    if (newMaxQuantity < quantity) {
      setQuantity(newMaxQuantity);
    } else if (quantity === 0) {
      setQuantity(1);
    }
  };

  // 확인 버튼 클릭 시 호출될 함수
  const handleConfirm = async () => {
    if (selectedItemId !== null) {
      try {
        await cartUpdate(cartId, selectedItemId, quantity);
        await onUpdate();
        onClose();
      } catch (error) {
        console.error('옵션 업데이트 실패:', error);
      }
    }
  };

  // 버튼 비활성화 조건
  const isButtonDisabled =
    selectedItemId === null || quantity <= 0 || maxQuantity <= 0;

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-40 z-50">
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
          <div className="h-full flex flex-col justify-between">
            <div className="mt-8">
              <div className="w-full font-bold mb-4">옵션 선택</div>

              {/* 별도의 OptionDropbox 컴포넌트 사용 */}
              <div className="mb-6">
                <OptionDropbox
                  cartId={cartId}
                  onOptionChange={handleOptionChange}
                  selectedColor={color}
                  selectedSize={size}
                />
              </div>

              <div className="w-full border-t pt-4">
                <div className="font-bold mb-2">선택된 옵션</div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">{color}</span> /{' '}
                    <span>{size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="w-8 h-8 border rounded flex items-center justify-center bg-white"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-8 h-8 border rounded flex items-center justify-center bg-white"
                      disabled={quantity >= maxQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                {maxQuantity > 0 ? (
                  <div className="text-xs text-right mt-1 text-gray-500">
                    최대 주문 가능 수량: {maxQuantity}개
                  </div>
                ) : (
                  <div className="text-xs text-right mt-1 text-red-500">
                    재고가 없습니다.
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <Button
                width="460px"
                height="52px"
                bg={isButtonDisabled ? 'gray' : 'black'}
                color="white"
                radius="10px"
                onClick={isButtonDisabled ? () => {} : handleConfirm}
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
