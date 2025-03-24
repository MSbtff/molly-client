"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "../../../shared/ui/Button";
import { CartItem } from "@/features/cart/api/cartRead";
import { useState, useEffect } from "react";
import { OptionDropbox } from "./OptionDropbox";

interface OptionModalProps {
  onClose: () => void;
  cartItem: CartItem;
  onUpdate: () => Promise<void>;
  allCartItems: CartItem[];
  showDuplicateWarning: boolean;
  onDuplicateConfirm: () => Promise<void>; // void 반환 타입
  onDuplicateCancel: () => void;
  tryUpdateOption: (
    cartId: number,
    productId: number,
    itemId: number,
    color: string,
    size: string,
    quantity: number
  ) => Promise<boolean>; // boolean 반환 타입은 유지
}

// 컴포넌트 서브타입 정의
type WarningProps = {
  onCancel: () => void;
  onConfirm: () => Promise<void>;
};

type ContentProps = {
  cartItem: CartItem;
  onClose: () => void;
  color: string;
  size: string;
  quantity: number;
  maxQuantity: number;
  handleQuantityChange: (newQuantity: number) => void;
  handleOptionChange: (
    newColor: string,
    newSize: string,
    itemId: number,
    newMaxQuantity: number
  ) => void;
  isButtonDisabled: boolean;
  handleConfirm: () => Promise<void>;
};

type QuantityControlProps = {
  quantity: number;
  maxQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
};

// 객체 리터럴 방식의 컴포넌트 모음
const OptionModal = {
  // 루트 컴포넌트
  Root: ({
    onClose,
    cartItem,
    showDuplicateWarning,
    onDuplicateConfirm,
    onDuplicateCancel,
    tryUpdateOption,
  }: OptionModalProps) => {
    const {
      cartId,
      color: initialColor,
      productId,
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
        await tryUpdateOption(
          cartId,
          productId,
          selectedItemId,
          color,
          size,
          quantity
        );
      }
    };

    // 버튼 비활성화 조건
    const isButtonDisabled =
      selectedItemId === null || quantity <= 0 || maxQuantity <= 0;

    // 렌더링
    return (
      <div className="fixed inset-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-40 z-50">
        {showDuplicateWarning ? (
          <OptionModal.Warning
            onCancel={onDuplicateCancel}
            onConfirm={onDuplicateConfirm}
          />
        ) : (
          <OptionModal.Content
            cartItem={cartItem}
            onClose={onClose}
            color={color}
            size={size}
            quantity={quantity}
            maxQuantity={maxQuantity}
            handleQuantityChange={handleQuantityChange}
            handleOptionChange={handleOptionChange}
            isButtonDisabled={isButtonDisabled}
            handleConfirm={handleConfirm}
          />
        )}
      </div>
    );
  },

  // 경고 모달 컴포넌트
  Warning: ({ onCancel, onConfirm }: WarningProps) => (
    // 기존 구현 유지
    <div className="w-[400px] bg-white rounded-[10px] p-6 shadow-md">
      <h3 className="text-xl font-bold mb-4">중복된 상품 발견</h3>
      <p className="mb-6">
        장바구니에 동일한 옵션을 가진 상품이 이미 존재합니다. 중복된 상품을
        삭제하고 현재 상품의 옵션을 변경하시겠습니까?
      </p>
      <div className="flex justify-end gap-2">
        <Button
          onClick={onCancel}
          width="120px"
          height="40px"
          className="border hover:bg-gray-100"
        >
          취소
        </Button>
        <Button
          onClick={onConfirm}
          width="120px"
          height="40px"
          bg="black"
          className="text-white hover:bg-gray-800 hover:text-gray-500"
        >
          확인
        </Button>
      </div>
    </div>
  ),

  // 메인 컨텐츠 컴포넌트
  Content: ({
    cartItem,
    onClose,
    color,
    size,
    quantity,
    maxQuantity,
    handleQuantityChange,
    handleOptionChange,
    isButtonDisabled,
    handleConfirm,
  }: ContentProps) => (
    // 기존 구현 유지
    <div className="w-[490px] h-[730px] border flex flex-col bg-white rounded-[10px] p-4 shadow-md">
      <div className="flex justify-between">
        <div className="font-bold text-2xl">옵션 변경</div>
        <div onClick={onClose} className="cursor-pointer hover:text-gray-500">
          <X />
        </div>
      </div>
      <div className="w-full flex items-center gap-8 border-b-2 mt-12">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${cartItem.cartInfoDto.url}`}
          alt="product"
          width={80}
          height={80}
          loading="eager"
        />
        <div className="flex flex-col">
          <strong>{cartItem.cartInfoDto.productName}</strong>
          <p className="text-gray2">{cartItem.cartInfoDto.brandName}</p>
        </div>
      </div>
      <div className="h-full flex flex-col justify-between">
        <div className="mt-8">
          <div className="w-full font-bold mb-4">옵션 선택</div>

          {/* 별도의 OptionDropbox 컴포넌트 사용 */}
          <div className="mb-6">
            <OptionDropbox
              cartId={cartItem.cartInfoDto.cartId}
              onOptionChange={handleOptionChange}
              selectedColor={color}
              selectedSize={size}
            />
          </div>

          <div className="w-full border-t pt-4">
            <div className="font-bold mb-2">선택된 옵션</div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <span className="font-medium">{color}</span> /{" "}
                <span>{size}</span>
              </div>
              <OptionModal.QuantityControl
                quantity={quantity}
                maxQuantity={maxQuantity}
                onQuantityChange={handleQuantityChange}
              />
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
            bg={isButtonDisabled ? "gray" : "black"}
            radius="10px"
            onClick={isButtonDisabled ? () => {} : handleConfirm}
            className="hover:text-gray-500 text-white"
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  ),

  // 수량 조절 컴포넌트
  QuantityControl: ({
    quantity,
    maxQuantity,
    onQuantityChange,
  }: QuantityControlProps) => (
    // 기존 구현 유지
    <div className="flex items-center gap-2">
      <button
        onClick={() => onQuantityChange(quantity - 1)}
        className="w-8 h-8 border rounded flex items-center justify-center bg-white cursor-pointer"
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className="w-8 text-center">{quantity}</span>
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className="w-8 h-8 border rounded flex items-center justify-center bg-white"
        disabled={quantity >= maxQuantity}
      >
        +
      </button>
    </div>
  ),
};

// 외부로 내보내기
export { OptionModal };
