"use server";

import { getValidAuthToken } from "@/shared/util/lib/authTokenValue";

export interface ConfirmPaymentRequest {
  userOrderId: number;
  tossOrderId: string;
  amount: number;
  point: string;
  paymentKey: string;
  paymentType: string;
  delivery: {
    receiverPhone: string;
    receiverName: string;
    addressDetail: string;
    numberAddress: string;
    roadAddress: string;
  };
}

export interface ConfirmPaymentResult {
  success: boolean;
  pending?: boolean;
  message: string;
  code?: string;
  status?: number;
  retryable?: boolean;
  data?: unknown;
}

interface PaymentBackendResponse {
  paymentStatus?: string;
  code?: string;
  message?: string;
}

const APPROVED_STATUS = "결제승인";
const PENDING_STATUS = "결제대기";

async function readResponse(res: Response): Promise<unknown> {
  const responseText = await res.text();
  if (!responseText) return null;

  try {
    return JSON.parse(responseText);
  } catch {
    return null;
  }
}

function toPaymentResult(
  res: Response,
  responseData: unknown
): ConfirmPaymentResult {
  const paymentResponse = responseData as PaymentBackendResponse | null;

  if (
    res.status === 202 ||
    paymentResponse?.paymentStatus === PENDING_STATUS
  ) {
    return {
      success: false,
      pending: true,
      code: "PAYMENT_CONFIRMATION_PENDING",
      message: "결제사의 최종 승인 결과를 확인하고 있습니다.",
      status: res.status,
      retryable: true,
      data: responseData,
    };
  }

  if (!res.ok) {
    return {
      success: false,
      code: paymentResponse?.code ?? "PAYMENT_CONFIRMATION_FAILED",
      message: paymentResponse?.message || "결제 승인에 실패했습니다.",
      status: res.status,
      retryable: res.status >= 500 || res.status === 409,
      data: responseData,
    };
  }

  if (!responseData) {
    return {
      success: false,
      code: "INVALID_PAYMENT_RESPONSE",
      message: "결제 승인 결과를 확인할 수 없습니다.",
      status: res.status,
      retryable: true,
    };
  }

  if (
    paymentResponse?.paymentStatus &&
    paymentResponse.paymentStatus !== APPROVED_STATUS
  ) {
    return {
      success: false,
      code: "PAYMENT_NOT_APPROVED",
      message: "결제가 최종 승인되지 않았습니다.",
      status: res.status,
      retryable: false,
      data: responseData,
    };
  }

  if (
    responseData !== null &&
    typeof responseData === "object" &&
    "success" in responseData &&
    responseData.success === false
  ) {
    return {
      success: false,
      code: paymentResponse?.code ?? "PAYMENT_CONFIRMATION_FAILED",
      message: paymentResponse?.message ?? "결제 승인에 실패했습니다.",
      status: res.status,
      retryable: false,
    };
  }

  return {
    success: true,
    data: responseData,
    message: "결제가 성공적으로 완료되었습니다.",
  };
}

function isValidRequest(request: ConfirmPaymentRequest) {
  return (
    Number.isSafeInteger(request.userOrderId) &&
    request.userOrderId > 0 &&
    Number.isSafeInteger(request.amount) &&
    request.amount > 0 &&
    request.tossOrderId.length > 0 &&
    request.paymentKey.length > 0 &&
    request.paymentKey.length <= 200
  );
}

// 결제 승인은 반드시 인증된 서버와 결제 백엔드를 통해 처리합니다.
export default async function TossRequest(
  request: ConfirmPaymentRequest
): Promise<ConfirmPaymentResult> {
  if (!isValidRequest(request)) {
    return {
      success: false,
      code: "INVALID_PAYMENT_REQUEST",
      message: "유효하지 않은 결제 승인 요청입니다.",
      retryable: false,
    };
  }

  try {
    const authToken = await getValidAuthToken();

    if (!authToken) {
      return {
        success: false,
        code: "UNAUTHORIZED",
        message: "인증 토큰이 없습니다. 다시 로그인해주세요.",
        retryable: false,
      };
    }

    const res = await fetch(
      `${process.env.NEXT_SERVER_URL}/orders/${request.userOrderId}/payment`,
      {
        method: "POST",
        headers: {
          Authorization: `${authToken}`,
          "Content-Type": "application/json",
          "Idempotency-Key": request.paymentKey,
        },
        body: JSON.stringify({
          orderId: request.userOrderId,
          tossOrderId: request.tossOrderId,
          paymentKey: request.paymentKey,
          amount: request.amount,
          paymentType: request.paymentType,
          point: request.point,
          delivery: {
            receiver_name: request.delivery.receiverName,
            receiver_phone: request.delivery.receiverPhone,
            road_address: request.delivery.roadAddress,
            number_address: request.delivery.numberAddress,
            addr_detail: request.delivery.addressDetail,
          },
        }),
        cache: "no-store",
      }
    );

    return toPaymentResult(res, await readResponse(res));
  } catch (error) {
    console.error("결제 요청 실패:", error);
    return {
      success: false,
      code: "PAYMENT_NETWORK_ERROR",
      message:
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.",
      retryable: true,
    };
  }
}

export async function GetPaymentStatus(
  userOrderId: number
): Promise<ConfirmPaymentResult> {
  if (!Number.isSafeInteger(userOrderId) || userOrderId <= 0) {
    return {
      success: false,
      code: "INVALID_ORDER_ID",
      message: "유효하지 않은 주문번호입니다.",
      retryable: false,
    };
  }

  try {
    const authToken = await getValidAuthToken();
    if (!authToken) {
      return {
        success: false,
        code: "UNAUTHORIZED",
        message: "인증 토큰이 없습니다. 다시 로그인해주세요.",
        retryable: false,
      };
    }

    const res = await fetch(
      `${process.env.NEXT_SERVER_URL}/orders/${userOrderId}/payment-status`,
      {
        method: "GET",
        headers: { Authorization: `${authToken}` },
        cache: "no-store",
      }
    );
    return toPaymentResult(res, await readResponse(res));
  } catch (error) {
    console.error("결제 상태 조회 실패:", error);
    return {
      success: false,
      pending: true,
      code: "PAYMENT_STATUS_NETWORK_ERROR",
      message: "결제 상태를 확인하고 있습니다.",
      retryable: true,
    };
  }
}
