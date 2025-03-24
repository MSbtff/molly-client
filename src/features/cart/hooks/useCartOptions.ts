import { useState } from "react";
import { CartItem } from "@/features/cart/api/cartRead";
import { cartUpdate } from "@/features/cart/api/cartUpdate";
import cartDelete from "@/features/cart/api/cartDelete";

interface UseCartOptionsProps {
  cartItems: CartItem[];
  refreshCartItems: () => Promise<void>;
}

export function useCartOptions({
  cartItems,
  refreshCartItems,
}: UseCartOptionsProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCartItem, setSelectedCartItem] = useState<CartItem | null>(
    null
  );
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const [duplicateCartId, setDuplicateCartId] = useState<number | null>(null);
  const [pendingUpdate, setPendingUpdate] = useState<{
    cartId: number;
    itemId: number;
    quantity: number;
  } | null>(null);

  // 옵션 모달 열기
  const openOptionModal = (item: CartItem) => {
    setSelectedCartItem(item);
    setIsModalOpen(true);
  };

  // 옵션 모달 닫기
  const closeOptionModal = () => {
    setIsModalOpen(false);
    setSelectedCartItem(null);
    setShowDuplicateWarning(false);
    setDuplicateCartId(null);
    setPendingUpdate(null);
  };

  // 중복 아이템 체크
  const checkDuplicateItem = (
    cartId: number,
    productId: number,
    color: string,
    size: string
  ): number | null => {
    const duplicateItem = cartItems.find(
      (item) =>
        item.cartInfoDto.cartId !== cartId &&
        item.cartInfoDto.productId === productId &&
        item.cartInfoDto.color === color &&
        item.cartInfoDto.size === size
    );

    return duplicateItem ? duplicateItem.cartInfoDto.cartId : null;
  };

  // 옵션 변경 시도
  const tryUpdateOption = async (
    cartId: number,
    productId: number,
    itemId: number,
    color: string,
    size: string,
    quantity: number
  ) => {
    // 중복 아이템 체크
    const duplicateId = checkDuplicateItem(cartId, productId, color, size);

    if (duplicateId) {
      // 중복 아이템이 있으면 경고 표시 및 업데이트 보류
      setDuplicateCartId(duplicateId);
      setShowDuplicateWarning(true);
      setPendingUpdate({ cartId, itemId, quantity });
      return false;
    }

    // 중복이 없으면 바로 업데이트 진행
    await updateCartItem(cartId, itemId, quantity);
    return true;
  };

  // 장바구니 아이템 업데이트
  const updateCartItem = async (
    cartId: number,
    itemId: number,
    quantity: number
  ) => {
    try {
      await cartUpdate(cartId, itemId, quantity);
      await refreshCartItems();
      closeOptionModal();
      return true;
    } catch (error) {
      console.error("옵션 업데이트 실패:", error);
      alert("옵션 업데이트에 실패했습니다.");
      return false;
    }
  };

  // 중복 아이템 처리 (삭제 후 업데이트)
  const handleDuplicateConfirm = async (): Promise<void> => {
    if (duplicateCartId && pendingUpdate) {
      try {
        // 1. 중복된 아이템 삭제
        await cartDelete(duplicateCartId);

        // 2. 현재 아이템 업데이트
        const { cartId, itemId, quantity } = pendingUpdate;
        await updateCartItem(cartId, itemId, quantity);

        // 3. 상태 초기화
        setShowDuplicateWarning(false);
        setDuplicateCartId(null);
        setPendingUpdate(null);
      } catch (error) {
        console.error("중복 아이템 처리 실패:", error);
        alert("중복 아이템 처리에 실패했습니다.");
      }
    }
  };

  // 중복 경고 취소
  const cancelDuplicateWarning = () => {
    setShowDuplicateWarning(false);
    setDuplicateCartId(null);
    setPendingUpdate(null);
  };

  return {
    isModalOpen,
    selectedCartItem,
    showDuplicateWarning,
    openOptionModal,
    closeOptionModal,
    tryUpdateOption,
    handleDuplicateConfirm,
    cancelDuplicateWarning,
  };
}
