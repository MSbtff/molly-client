"use client";

import { Button } from "../../../shared/ui/Button";
import React, { useEffect, useMemo, useState } from "react";
import { OptionModal } from "./OptionModal";
import { CartNotice } from "./CartNotice";
import { CartOrderButton } from "./CartOrderButton";
import { CartProductInfo } from "./CartProductInfo";
import { CartItem, cartRead } from "@/features/cart/api/cartRead";
import cartDelete from "@/features/cart/api/cartDelete";
import cartOrder from "@/features/cart/api/cartOrder";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/provider/CartStore";
import { OrderItem } from "@/app/provider/OrderStore";
import { useEncryptStore } from "@/app/provider/EncryptStore";
import { CartSkelton } from "./CartSkelton";
import { useCartOptions } from "../hooks/useCartOptions";

export const CartComponent = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const { orders, setOrders } = useEncryptStore();
  const { setCartState } = useCartStore();

  // refreshCartItems 함수를 먼저 정의
  const refreshCartItems = async () => {
    try {
      const data = await cartRead();
      console.log("새로운 데이터:", data);
      if (data) {
        setCartItems(data);
      }
    } catch (error) {
      console.error("카트 데이터 조회 중 오류", error);
    }
  };

  // 옵션 관련 커스텀 훅 사용 (refreshCartItems가 정의된 후)
  const {
    isModalOpen,
    selectedCartItem,
    showDuplicateWarning,
    openOptionModal,
    closeOptionModal,
    tryUpdateOption,
    handleDuplicateConfirm,
    cancelDuplicateWarning,
  } = useCartOptions({
    cartItems,
    refreshCartItems,
  });

  const selectedItemsInfo = useMemo(() => {
    const selectedItemsList = cartItems.filter((item) =>
      selectedItems.has(item.cartInfoDto.cartId)
    );

    const totalAmount = selectedItemsList.reduce(
      (sum, item) => sum + item.cartInfoDto.price * item.cartInfoDto.quantity,
      0
    );

    return {
      totalAmount,
      totalItems: selectedItemsList.length,
    };
  }, [cartItems, selectedItems]);

  useEffect(() => {
    async function fetchCartItems() {
      setIsLoading(true);
      try {
        const data = await cartRead();
        if (data) {
          setCartItems(data);
          setCartState(data);
        }
      } catch (error) {
        console.error("카트 데이터 조회 중 오류", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCartItems();
  }, [setCartState]);

  useEffect(() => {
    console.log("orders 상태 업데이트 됨:", orders);
  }, [orders]);

  useEffect(() => {
    console.log("cartItems 상태 업데이트 됨:", cartItems);
  }, [cartItems]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(
        new Set(cartItems.map((item) => item.cartInfoDto.cartId))
      );
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleItemSelect = (cartId: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(cartId)) {
      newSelected.delete(cartId);
    } else {
      newSelected.add(cartId);
    }
    setSelectedItems(newSelected);
  };

  const handleDeleteItem = async (cartId: number) => {
    try {
      await cartDelete(cartId);
      await refreshCartItems();
      const newSelected = new Set(selectedItems);
      newSelected.delete(cartId);
      setSelectedItems(newSelected);
    } catch (error) {
      console.error("상품 삭제 중 오류:", error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const selectedIds = Array.from(selectedItems);
      await cartDelete(selectedIds);
      await refreshCartItems();
      setSelectedItems(new Set());
    } catch (error) {
      console.error("선택 삭제 중 오류:", error);
    }
  };

  const handleOrder = async () => {
    if (selectedItems.size === 0) {
      alert("주문할 상품을 선택해주세요.");
      return;
    }
    try {
      const selectedList = cartItems.filter((item) =>
        selectedItems.has(item.cartInfoDto.cartId)
      );

      const orderItems = selectedList.map((item) => ({
        cartId: item.cartInfoDto.cartId,
      }));

      console.log("주문 요청:", orderItems); // 주문 요청 데이터 확인

      const orderResponse = await cartOrder(orderItems);
      console.log("서버 응답:", orderResponse); // 서버 응답 확인

      // OrderItem 타입에 맞게 변환
      const formattedOrder: OrderItem = {
        ...orderResponse,
        pointUsage: orderResponse.pointUsage || null,
        pointSave: orderResponse.pointSave || null,
        payment: orderResponse.payment || [],
        delivery: orderResponse.delivery || [],
      };

      console.log("변환된 주문:", formattedOrder); // 변환된 데이터 확인

      // store 업데이트
      setOrders([...orders, formattedOrder]);

      console.log("업데이트된 orders:", orders); // store 업데이트 확인

      await refreshCartItems();
      setSelectedItems(new Set());
      router.push("/buy");
    } catch (error) {
      console.error("주문 처리 중 에러:", error);
      alert("주문 처리 중 오류가 발생했습니다.");
    }
  };

  console.log(orders);

  return (
    <>
      {isModalOpen && selectedCartItem && (
        <OptionModal.Root
          onClose={closeOptionModal}
          cartItem={selectedCartItem}
          onUpdate={refreshCartItems}
          allCartItems={cartItems}
          showDuplicateWarning={showDuplicateWarning}
          onDuplicateConfirm={handleDuplicateConfirm}
          onDuplicateCancel={cancelDuplicateWarning}
          tryUpdateOption={tryUpdateOption}
        />
      )}
      <div className={`w-screen flex flex-col justify-center`}>
        <div className="w-full h-full bg-[#EFF2F1] flex flex-col items-center">
          <header className="text-2xl mt-2">쇼핑 정보</header>
          <div className="xs:w-[480px] sm:w-[600px] md:w-[680px]">
            <div className="w-full flex items-center justify-between">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  checked={selectedItems.size === cartItems.length}
                  onChange={handleSelectAll}
                  className="cursor-pointer"
                />
                <div>전체 선택</div>
              </div>
              <div
                className="w-20 h-8 border bg-white  rounded-[10px] flex justify-center items-center cursor-pointer hover:text-gray-500"
                onClick={handleDeleteSelected}
              >
                선택 삭제
              </div>
            </div>
          </div>

          {isLoading || cartItems.length === 0
            ? // 일반적인 장바구니 아이템 평균 개수만큼 스켈레톤 표시 (2-3개)
              Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="mt-4 xs:w-[480px] sm:w-[600px] md:w-[680px] h-[400px] bg-white flex flex-col gap-4 p-8 rounded-[10px]"
                  style={{ contain: "layout paint" }}
                  // 레이아웃 시프트 방지
                  // contain: 'strict' // 레이아웃 시프트 방지
                  // contain: 'content' // 레이아웃 시프트 방지
                >
                  <div className="flex justify-between">
                    <div className="w-5 h-5 rounded-sm bg-gray-200"></div>
                    <div className="w-12 h-8 rounded-[10px] bg-gray-200"></div>
                  </div>
                  <CartSkelton />
                  <div className="flex gap-8">
                    <div className="h-[36px] w-[330px] bg-gray-200 rounded-[10px]"></div>
                    <div className="h-[36px] w-[330px] bg-gray-200 rounded-[10px]"></div>
                  </div>
                </div>
              ))
            : cartItems.map((item) => (
                <div
                  key={item.cartInfoDto.cartId}
                  className="mt-4 xs:w-[480px] sm:w-[600px] md:w-[680px] h-[400px] bg-white flex flex-col gap-4 p-8 rounded-[10px]"
                >
                  <div className="flex justify-between">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.cartInfoDto.cartId)}
                      onChange={() => handleItemSelect(item.cartInfoDto.cartId)}
                      className="cursor-pointer"
                    />
                    <Button
                      className="w-12 h-8 border rounded-[10px] flex justify-center items-center hover:text-gray-500"
                      onClick={() => handleDeleteItem(item.cartInfoDto.cartId)}
                    >
                      삭제
                    </Button>
                  </div>
                  <CartProductInfo {...item.cartInfoDto} />
                  <div className="flex gap-8">
                    <Button
                      width="330px"
                      height="36px"
                      radius="10px"
                      border="2px solid #000"
                      className="hover:text-slate-400"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        openOptionModal(item);
                      }}
                    >
                      옵션 변경
                    </Button>
                    <Button
                      width="330px"
                      height="36px"
                      radius="10px"
                      className="hover:text-gray-500 text-white bg-black"
                      totalAmount={selectedItemsInfo.totalAmount}
                      totalItems={selectedItemsInfo.totalItems}
                      handleOrder={handleOrder}
                    >
                      주문 하기
                    </Button>
                  </div>
                </div>
              ))}

          <div className="mb-4">
            <CartNotice />
          </div>
        </div>

        {/* 주문 버튼 고정 위치 (레이아웃 시프트 방지) */}
        <div className="sticky bottom-0 w-full">
          <CartOrderButton
            totalAmount={selectedItemsInfo.totalAmount}
            totalItems={selectedItemsInfo.totalItems}
            handleOrder={handleOrder}
          />
        </div>
      </div>
    </>
  );
};
