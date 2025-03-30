"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  CartItem as CartItemType,
  cartRead,
} from "@/features/cart/api/cartRead";
import cartDelete from "@/features/cart/api/cartDelete";
import cartOrder from "@/features/cart/api/cartOrder";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/provider/CartStore";
import { useEncryptStore } from "@/app/provider/EncryptStore";
import { useCartOptions } from "@/features/cart/hooks/useCartOptions";
import { OptionModal } from "./OptionModal";
import { Button } from "@/shared/ui/Button";
import { CartProductInfo } from "./CartProductInfo";
import { CartSkelton } from "./CartSkelton";
import { CartNotice as CartNoticeComponent } from "./CartNotice";
import { CartOrderButton as CartOrderButtonComponent } from "./CartOrderButton";

// 컨텍스트 정의
interface CartContextType {
  cartItems: CartItemType[];
  selectedItems: Set<number>;
  isLoading: boolean;
  handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleItemSelect: (cartId: number) => void;
  handleDeleteItem: (cartId: number) => Promise<void>;
  handleDeleteSelected: () => Promise<void>;
  handleOrder: () => Promise<void>;
  openOptionModal: (item: CartItemType) => void;
  selectedItemsInfo: {
    totalAmount: number;
    totalItems: number;
  };
}

const CartContext = createContext<CartContextType | null>(null);

// 컨텍스트 훅
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a Cart.Root component");
  }
  return context;
};

// 루트 컴포넌트
const CartRoot = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const { orders, setOrders } = useEncryptStore();
  const { setCartState } = useCartStore();

  const refreshCartItems = async () => {
    try {
      const data = await cartRead();
      if (data) {
        setCartItems(data);
      }
    } catch (error) {
      console.error("카트 데이터 조회 중 오류", error);
    }
  };

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

      const orderResponse = await cartOrder(orderItems);

      // 주문 정보 형식화
      const formattedOrder = {
        ...orderResponse,
        pointUsage: orderResponse.pointUsage || null,
        pointSave: orderResponse.pointSave || null,
        payment: orderResponse.payment || [],
        delivery: orderResponse.delivery || [],
      };

      // 상태 업데이트
      setOrders([...orders, formattedOrder]);
      await refreshCartItems();
      setSelectedItems(new Set());
      router.push("/buy");
    } catch (error) {
      console.error("주문 처리 중 에러:", error);
      alert("주문 처리 중 오류가 발생했습니다.");
    }
  };

  // 컨텍스트 값 제공
  const value = {
    cartItems,
    selectedItems,
    isLoading,
    handleSelectAll,
    handleItemSelect,
    handleDeleteItem,
    handleDeleteSelected,
    handleOrder,
    openOptionModal,
    selectedItemsInfo,
  };

  return (
    <CartContext.Provider value={value}>
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
      <div className={`w-screen flex flex-col justify-center`}>{children}</div>
    </CartContext.Provider>
  );
};

// 헤더 컴포넌트
const CartHeader = () => {
  const { handleSelectAll, cartItems, selectedItems, handleDeleteSelected } =
    useCart();

  return (
    <div className="xs:w-[480px] sm:w-[600px] md:w-[680px]">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-2">
          <input
            type="checkbox"
            checked={
              selectedItems.size === cartItems.length && cartItems.length > 0
            }
            onChange={handleSelectAll}
            className="cursor-pointer"
          />
          <div>전체 선택</div>
        </div>
        <div
          className="w-20 h-8 border bg-white rounded-[10px] flex justify-center items-center cursor-pointer hover:text-gray-500"
          onClick={handleDeleteSelected}
        >
          선택 삭제
        </div>
      </div>
    </div>
  );
};

// 리스트 컴포넌트
const CartList = () => {
  const { cartItems, isLoading } = useCart();

  if (isLoading) {
    return <CartLoading />;
  }

  if (cartItems.length === 0) {
    return <CartEmpty />;
  }

  return (
    <>
      {cartItems.map((item) => (
        <CartItem key={item.cartInfoDto.cartId} item={item} />
      ))}
    </>
  );
};

// 로딩 컴포넌트
const CartLoading = () => {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="mt-4 xs:w-[480px] sm:w-[600px] md:w-[680px] h-[400px] bg-white flex flex-col gap-4 p-8 rounded-[10px]"
          style={{ contain: "layout paint" }}
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
      ))}
    </>
  );
};

// 빈 장바구니 컴포넌트
const CartEmpty = () => {
  return (
    <div className="mt-4 xs:w-[480px] sm:w-[600px] md:w-[680px] h-[400px] bg-white flex flex-col items-center justify-center p-8 rounded-[10px]">
      <h3 className="text-xl font-medium mb-4">장바구니가 비어있습니다</h3>
      <p className="text-gray-500">상품을 담아보세요!</p>
    </div>
  );
};

// 아이템 컴포넌트
const CartItem = ({ item }: { item: CartItemType }) => {
  const {
    handleItemSelect,
    selectedItems,
    handleDeleteItem,
    openOptionModal,
    handleOrder,
  } = useCart();

  return (
    <div className="mt-4 xs:w-[480px] sm:w-[600px] md:w-[680px] h-[400px] bg-white flex flex-col gap-4 p-8 rounded-[10px]">
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
          onClick={handleOrder}
        >
          주문 하기
        </Button>
      </div>
    </div>
  );
};

// 공지사항 컴포넌트
const CartNotice = () => {
  return <CartNoticeComponent />;
};

// 주문 버튼 컴포넌트
const CartOrderButton = () => {
  const { selectedItemsInfo, handleOrder } = useCart();

  return (
    <div className="sticky bottom-0 w-full">
      <CartOrderButtonComponent
        totalAmount={selectedItemsInfo.totalAmount}
        totalItems={selectedItemsInfo.totalItems}
        handleOrder={handleOrder}
      />
    </div>
  );
};

// 컴파운드 컴포넌트 생성
const Cart = {
  Root: CartRoot,
  Header: CartHeader,
  List: CartList,
  Item: CartItem,
  Empty: CartEmpty,
  Notice: CartNotice,
  OrderButton: CartOrderButton,
};

export default Cart;
