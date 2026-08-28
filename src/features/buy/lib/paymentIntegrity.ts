import type { OrderItem } from "@/app/provider/OrderStore";

export interface PaymentCallback {
  paymentKey: string;
  tossOrderId: string;
  amount: number;
  paymentType: string;
}

export type PaymentValidationResult =
  | { ok: true; callback: PaymentCallback }
  | {
      ok: false;
      code:
        | "MISSING_PAYMENT_PARAMETER"
        | "INVALID_PAYMENT_AMOUNT"
        | "ORDER_CONTEXT_NOT_FOUND"
        | "ORDER_CONTEXT_INVALID"
        | "ORDER_ID_MISMATCH"
        | "AMOUNT_MISMATCH";
      message: string;
    };

type SearchParamsReader = Pick<URLSearchParams, "get">;

export function validatePaymentCallback(
  searchParams: SearchParamsReader,
  order?: OrderItem
): PaymentValidationResult {
  const paymentKey = searchParams.get("paymentKey")?.trim() ?? "";
  const tossOrderId = searchParams.get("orderId")?.trim() ?? "";
  const amountValue = searchParams.get("amount")?.trim() ?? "";
  const paymentType = searchParams.get("paymentType")?.trim() || "NORMAL";

  if (!paymentKey || !tossOrderId || !amountValue) {
    return {
      ok: false,
      code: "MISSING_PAYMENT_PARAMETER",
      message: "결제 승인에 필요한 정보가 누락되었습니다.",
    };
  }

  if (paymentKey.length > 200 || !/^\d+$/.test(amountValue)) {
    return {
      ok: false,
      code: "INVALID_PAYMENT_AMOUNT",
      message: "유효하지 않은 결제 정보입니다.",
    };
  }

  const amount = Number(amountValue);
  if (!Number.isSafeInteger(amount) || amount <= 0) {
    return {
      ok: false,
      code: "INVALID_PAYMENT_AMOUNT",
      message: "결제 금액이 올바르지 않습니다.",
    };
  }

  if (!order) {
    return {
      ok: false,
      code: "ORDER_CONTEXT_NOT_FOUND",
      message: "결제 요청 당시의 주문 정보를 찾을 수 없습니다.",
    };
  }

  if (
    !Number.isSafeInteger(order.orderId) ||
    !Number.isSafeInteger(order.totalAmount) ||
    order.totalAmount <= 0 ||
    !order.defaultAddress ||
    !Array.isArray(order.orderDetails)
  ) {
    return {
      ok: false,
      code: "ORDER_CONTEXT_INVALID",
      message: "저장된 주문 정보가 올바르지 않습니다.",
    };
  }

  if (tossOrderId !== order.tossOrderId) {
    return {
      ok: false,
      code: "ORDER_ID_MISMATCH",
      message: "결제 요청의 주문번호가 저장된 주문과 일치하지 않습니다.",
    };
  }

  if (amount !== order.totalAmount) {
    return {
      ok: false,
      code: "AMOUNT_MISMATCH",
      message: "결제 금액이 주문 금액과 일치하지 않습니다.",
    };
  }

  return {
    ok: true,
    callback: {
      paymentKey,
      tossOrderId,
      amount,
      paymentType,
    },
  };
}
