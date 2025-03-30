"use client";

import Buy from "./Buy";

// 결제페이지
export default function BuyContainer() {
  return (
    <Buy.Root>
      <Buy.Header />
      <Buy.Content>
        <Buy.Address />
        <Buy.Products />
        <Buy.Point />
        <Buy.Payment />
        <Buy.Summary />
        <Buy.OrderButton />
      </Buy.Content>
    </Buy.Root>
  );
}
