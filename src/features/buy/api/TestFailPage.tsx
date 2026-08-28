"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function TestFailPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "PAYMENT_FAILED";
  const message =
    searchParams.get("message") || "결제가 취소되었거나 인증에 실패했습니다.";

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white p-8 text-center shadow-sm">
        <AlertCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
        <h1 className="mb-3 text-2xl font-bold text-gray-900">결제 실패</h1>
        <p role="alert" className="text-gray-600">
          {message}
        </p>
        <p className="mt-2 text-sm text-gray-400">오류 코드: {code}</p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/buy"
            className="bg-black px-5 py-3 font-medium text-white hover:bg-gray-800"
          >
            결제 다시 시도
          </Link>
          <Link
            href="/cart"
            className="border border-gray-300 px-5 py-3 font-medium hover:bg-gray-50"
          >
            장바구니로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}
