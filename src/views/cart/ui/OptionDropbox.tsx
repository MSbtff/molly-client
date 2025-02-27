'use client';

import {useCartStore} from '@/app/provider/CartStore';
import {useState, useRef, useEffect} from 'react';

interface SizeDetail {
  id: number;
  size: string;
  quantity: number;
}

interface OptionDropboxProps {
  cartId: number;
  onOptionChange?: (
    color: string,
    size: string,
    itemId: number,
    maxQuantity: number
  ) => void;
  selectedColor?: string;
  selectedSize?: string;
}

export const OptionDropbox = ({
  cartId,
  onOptionChange,
  selectedColor: initialColor,
  selectedSize: initialSize,
}: OptionDropboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {cartState} = useCartStore();

  const cartItem = cartState.find((item) => item.cartInfoDto.cartId === cartId);

  // useEffect로 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 옵션 선택 처리
  const handleOptionSelect = (
    color: string,
    size: string,
    sizeDetail: SizeDetail
  ) => {
    if (onOptionChange) {
      onOptionChange(color, size, sizeDetail.id, sizeDetail.quantity);
    }
    setIsOpen(false);
  };

  if (!cartItem) {
    console.log('CartItem not found for cartId:', cartId);
    return null;
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 border rounded-md bg-white"
      >
        <span className="text-sm">옵션 선택</span>
        <span className="text-xs ml-2">▼</span>
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {cartItem.colorDetails.map((colorDetail) => (
            <div key={colorDetail.color} className="px-2 py-1">
              <div className="font-medium text-sm text-gray-700 px-2 py-1">
                {colorDetail.color}
              </div>

              <div className="pl-4">
                {colorDetail.sizeDetails.map((sizeDetail) => (
                  <div
                    key={sizeDetail.id}
                    className={`mt-2 px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 rounded ${
                      initialColor === colorDetail.color &&
                      initialSize === sizeDetail.size
                        ? 'bg-gray-100 font-medium'
                        : ''
                    }`}
                    onClick={() =>
                      handleOptionSelect(
                        colorDetail.color,
                        sizeDetail.size,
                        sizeDetail
                      )
                    }
                  >
                    <div className="flex justify-between items-center">
                      <span>{sizeDetail.size}</span>
                      <span className="text-xs text-gray-500">
                        {sizeDetail.quantity > 0
                          ? `재고: ${sizeDetail.quantity}`
                          : '품절'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
