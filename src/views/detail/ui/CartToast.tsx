"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface CartToastProps {
    productImage: string;
    onClose: () => void; // 모달 닫기 함수 추가
  }

export default function CartToast({ productImage, onClose }: CartToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000); // 3초 후 자동 사라짐
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white flex items-center p-4 rounded-lg shadow-lg min-w-[280px] max-w-[350px]">
      {/* 제품 이미지 */}
      <div className="w-10 h-10 flex items-center justify-center rounded-md mr-3">
        <Image
          src={productImage || "/images/noImage.svg"}
          alt="상품 이미지"
          width={30}
          height={30}
          className="rounded-md"
        />
      </div>

      {/* 메시지 */}
      <span className="flex-grow text-sm">장바구니에 담겼습니다</span>

      {/* 보러가기 버튼 */}
      <button
        onClick={() => router.push("/cart")}
        className="text-sm font-semibold hover:underline ml-4"
      >
        보러가기
      </button>
    </div>
  );
}
