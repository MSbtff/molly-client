'use client';

import {Button} from '../../../shared/ui/Button';
import React, {useEffect, useMemo, useState} from 'react';
import {OptionModal} from './OptionModal';
import {CartNotice} from './CartNotice';
import {CartOrderButton} from './CartOrderButton';
import {CartProductInfo} from './CartProductInfo';
import {CartItem, CartItemDto, cartRead} from '@/features/cart/api/cartRead';
import cartDelete from '@/features/cart/api/cartDelete';
import cartOrder from '@/features/cart/api/cartOrder';

import {useRouter} from 'next/navigation';
import {useCartStore} from '@/app/provider/CartStore';
import {OrderItem, useOrderStore} from '@/app/provider/OrderStore';

export const CartComponent = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [selectedCartItem, setSelectedCartItem] = useState<CartItem | null>(
    null
  );

  const {orders, setOrders} = useOrderStore();
  const {cartState, setCartState} = useCartStore();

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
      try {
        const data = await cartRead();
        if (data) {
          setCartItems(data);
          setCartState(data);
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : '알 수 없는 오류가 발생했습니다.'
        );
      }
    }
    fetchCartItems();
  }, [setCartState]);

  useEffect(() => {
    console.log('orders 상태 업데이트 됨:', orders);
  }, [orders]);

  useEffect(() => {
    console.log('cartItems 상태 업데이트 됨:', cartItems);
  }, [cartItems]);

  const refreshCartItems = async () => {
    try {
      const data = await cartRead();
      console.log('새로운 데이터:', data);
      if (data) {
        setCartItems(data);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.'
      );
    }
  };

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
      setError(
        error instanceof Error ? error.message : '삭제 중 오류가 발생했습니다.'
      );
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const selectedIds = Array.from(selectedItems);
      await cartDelete(selectedIds);
      await refreshCartItems();
      setSelectedItems(new Set());
    } catch (error) {
      setError(
        error instanceof Error ? error.message : '삭제 중 오류가 발생했습니다.'
      );
    }
  };

  const handleOrder = async () => {
    if (selectedItems.size === 0) {
      setError('주문할 상품을 선택해주세요.');
      return;
    }
    try {
      const selectedList = cartItems.filter((item) =>
        selectedItems.has(item.cartInfoDto.cartId)
      );

      const orderItems = selectedList.map((item) => ({
        productId: item.cartInfoDto.productId,
        itemId: item.cartInfoDto.itemId,
        quantity: item.cartInfoDto.quantity,
      }));

      console.log('주문 요청:', orderItems); // 주문 요청 데이터 확인

      const orderResponse = await cartOrder(orderItems);
      console.log('서버 응답:', orderResponse); // 서버 응답 확인

      // OrderItem 타입에 맞게 변환
      const formattedOrder: OrderItem = {
        ...orderResponse,
        pointUsage: orderResponse.pointUsage || null,
        pointSave: orderResponse.pointSave || null,
        payment: orderResponse.payment || [],
        delivery: orderResponse.delivery || [],
      };

      console.log('변환된 주문:', formattedOrder); // 변환된 데이터 확인

      // store 업데이트
      setOrders([...orders, formattedOrder]);

      console.log('업데이트된 orders:', orders); // store 업데이트 확인

      await refreshCartItems();
      setSelectedItems(new Set());
      router.push('/buy');
    } catch (error) {
      console.error('주문 처리 중 에러:', error);
      setError(
        error instanceof Error ? error.message : '주문 중 오류가 발생했습니다.'
      );
    }
  };

  console.log(orders);

  return (
    <>
      {isOpen && selectedCartItem && (
        <OptionModal
          onClose={() => setIsOpen(false)}
          cartItem={selectedCartItem}
          onUpdate={refreshCartItems}
        />
      )}
      <div className={`w-screen flex flex-col justify-center`}>
        <div className="w-full h-full bg-[#EFF2F1] flex flex-col items-center">
          <div className="text-2xl mt-2">쇼핑 정보</div>
          <div className="w-[680px]">
            <div className="w-full flex items-center justify-between">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  checked={selectedItems.size === cartItems.length}
                  onChange={handleSelectAll}
                />
                <div>전체 선택</div>
              </div>
              <div
                className="w-20 h-8 border bg-white  rounded-[10px] flex justify-center items-center cursor-pointer"
                onClick={handleDeleteSelected}
              >
                선택 삭제
              </div>
            </div>
          </div>

          {cartItems.map((item) => (
            <div
              key={item.cartInfoDto.cartId}
              className="mt-4 w-[680px] h-[370px] bg-white flex flex-col gap-4 p-8 rounded-[10px]"
            >
              <div className="flex justify-between">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.cartInfoDto.cartId)}
                  onChange={() => handleItemSelect(item.cartInfoDto.cartId)}
                />
                <div
                  className="w-12 h-8 border rounded-[10px] flex justify-center items-center cursor-pointer"
                  onClick={() => handleDeleteItem(item.cartInfoDto.cartId)}
                >
                  삭제
                </div>
              </div>
              <CartProductInfo {...item.cartInfoDto} />
              <div className="flex gap-8">
                <Button
                  width="330px"
                  height="36px"
                  radius="10px"
                  border="2px solid #000"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    setIsOpen(true);
                    setSelectedCartItem(item);
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
          ))}
          <div className="mb-4">
            <CartNotice />
          </div>
        </div>
        <CartOrderButton
          totalAmount={selectedItemsInfo.totalAmount}
          totalItems={selectedItemsInfo.totalItems}
          handleOrder={handleOrder}
        />
      </div>
    </>
  );
};
