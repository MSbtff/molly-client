"use client";

import Cart from "./Cart";

export const CartComponent = () => {
  return (
    <Cart.Root>
      <div className="w-full h-full bg-[#EFF2F1] flex flex-col items-center">
        <header className="text-2xl mt-2">쇼핑 정보</header>
        <Cart.Header />
        <Cart.List />
        <div className="mb-4">
          <Cart.Notice />
        </div>
      </div>
      <Cart.OrderButton />
    </Cart.Root>
  );
};
