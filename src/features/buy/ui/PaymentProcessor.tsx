"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import TossRequest, {
  GetPaymentStatus,
} from "@/features/buy/api/tossRequest";
import { validatePaymentCallback } from "@/features/buy/lib/paymentIntegrity";
import {
  clearEncryptedOrderStorage,
  useEncryptStore,
} from "@/app/provider/EncryptStore";
import { BuyComplete } from "@/views/buy/ui/BuyComplete";
import type { CompletedOrderInfo } from "@/views/buy/ui/BuyComplete";

type ProcessorState =
  | { status: "processing" }
  | { status: "success"; orderInfo: CompletedOrderInfo }
  | { status: "error"; message: string; retryable: boolean };

const STATUS_POLL_ATTEMPTS = 5;
const STATUS_POLL_INTERVAL_MS = 2000;

function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function waitForFinalPaymentStatus(orderId: number) {
  let latestResult = await GetPaymentStatus(orderId);

  for (
    let attempt = 1;
    latestResult.pending && attempt < STATUS_POLL_ATTEMPTS;
    attempt += 1
  ) {
    await delay(STATUS_POLL_INTERVAL_MS);
    latestResult = await GetPaymentStatus(orderId);
  }

  if (latestResult.pending) {
    return {
      ...latestResult,
      message:
        "결제 결과 확인이 지연되고 있습니다. 주문내역에서 최종 상태를 확인해주세요.",
      retryable: true,
    };
  }
  return latestResult;
}

export default function PaymentProcessor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orders = useEncryptStore((state) => state.orders);
  const callbackQuery = searchParams.toString();
  const startedRequestRef = useRef<string | null>(null);
  const completedRef = useRef(false);
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<ProcessorState>({
    status: "processing",
  });

  useEffect(() => {
    if (completedRef.current) return;
    let cancelled = false;

    const currentOrder = orders.at(-1);
    const validation = validatePaymentCallback(
      new URLSearchParams(callbackQuery),
      currentOrder
    );

    if (!validation.ok) {
      setState({
        status: "error",
        message: validation.message,
        retryable: false,
      });
      return;
    }

    if (!currentOrder) return;

    const requestKey = `${validation.callback.paymentKey}:${attempt}`;
    if (startedRequestRef.current === requestKey) return;
    startedRequestRef.current = requestKey;
    setState({ status: "processing" });

    const { paymentKey, tossOrderId, amount, paymentType } =
      validation.callback;
    const {
      orderId,
      defaultAddress,
      orderDetails,
    } = currentOrder;

    async function processPayment() {
      const confirmationResult = await TossRequest({
        userOrderId: orderId,
        tossOrderId,
        amount,
        point: "0",
        paymentKey,
        paymentType,
        delivery: {
          receiverPhone: defaultAddress.recipientCellPhone,
          receiverName: defaultAddress.recipient,
          addressDetail: defaultAddress.addrDetail,
          numberAddress: defaultAddress.numberAddress,
          roadAddress: defaultAddress.roadAddress,
        },
      });

      const result = confirmationResult.pending
        ? await waitForFinalPaymentStatus(orderId)
        : confirmationResult;

      if (cancelled) return;

      if (!result.success) {
        setState({
          status: "error",
          message: result.message,
          retryable: result.retryable ?? false,
        });
        return;
      }

      const orderInfo: CompletedOrderInfo = {
        orderNumber: tossOrderId,
        totalAmount: amount,
        items: orderDetails.length,
        confirmedAt: new Date().toISOString(),
      };

      completedRef.current = true;
      clearEncryptedOrderStorage();
      setState({ status: "success", orderInfo });
      router.replace("/buy/success", { scroll: false });
    }

    void processPayment();
    return () => {
      cancelled = true;
    };
  }, [attempt, callbackQuery, orders, router]);

  const retryPayment = () => {
    startedRequestRef.current = null;
    setAttempt((currentAttempt) => currentAttempt + 1);
  };

  if (state.status === "success") {
    return <BuyComplete orderInfo={state.orderInfo} />;
  }

  if (state.status === "error") {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-lg bg-white p-8 text-center shadow-sm">
          <AlertCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
          <h1 className="mb-3 text-2xl font-bold text-gray-900">
            결제를 완료하지 못했습니다
          </h1>
          <p role="alert" className="mb-6 text-gray-600">
            {state.message}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            {state.retryable && (
              <button
                type="button"
                onClick={retryPayment}
                className="bg-black px-5 py-3 font-medium text-white hover:bg-gray-800"
              >
                승인 다시 시도
              </button>
            )}
            <Link
              href="/mypage"
              className="border border-gray-300 px-5 py-3 font-medium hover:bg-gray-50"
            >
              주문내역 확인
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

  return (
    <div
      className="flex min-h-[70vh] w-full items-center justify-center bg-gray-50 px-4"
      aria-live="polite"
    >
      <div className="text-center">
        <LoaderCircle className="mx-auto mb-4 h-12 w-12 animate-spin text-gray-800" />
        <h1 className="text-2xl font-bold text-gray-900">결제 승인 중입니다</h1>
        <p className="mt-2 text-gray-600">
          완료 화면이 표시될 때까지 페이지를 닫지 마세요.
        </p>
      </div>
    </div>
  );
}
