import PaymentProcessor from "@/features/buy/ui/PaymentProcessor";

export default async function BuySuccess() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <PaymentProcessor />
    </div>
  );
}
