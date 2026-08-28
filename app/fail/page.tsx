import { Suspense } from "react";
import { TestFailPage } from "@/features/buy/api/TestFailPage";

export default function PaymentFailPage() {
  return (
    <Suspense fallback={null}>
      <TestFailPage />
    </Suspense>
  );
}
