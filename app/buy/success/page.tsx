import PaymentProcessor from "@/features/buy/ui/PaymentProcessor";
import { BuyComplete } from "@/views/buy/ui/BuyComplete";

export default async function BuySuccess() {
  return (
    <>
      <div className="w-screen h-full flex justify-center items-center">
        <BuyComplete />
        <PaymentProcessor />
      </div>
    </>
  );
}
