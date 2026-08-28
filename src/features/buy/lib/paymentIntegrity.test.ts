import type { OrderItem } from "@/app/provider/OrderStore";
import { validatePaymentCallback } from "./paymentIntegrity";

const order: OrderItem = {
  orderId: 101,
  tossOrderId: "ORDER_20260811_001",
  userId: 1,
  totalAmount: 32000,
  userPoint: 0,
  pointUsage: null,
  pointSave: null,
  status: "PENDING",
  cancelStatus: "NONE",
  orderedAt: "2026-08-11T10:00:00.000Z",
  payment: null,
  delivery: null,
  defaultAddress: {
    addressId: 1,
    recipient: "홍길동",
    recipientCellPhone: "01012345678",
    roadAddress: "서울시",
    numberAddress: "1-1",
    addrDetail: "101호",
    defaultAddr: true,
    userId: 1,
    userName: "홍길동",
  },
  orderDetails: [],
};

function createParams(overrides: Record<string, string> = {}) {
  return new URLSearchParams({
    paymentKey: "payment-key",
    orderId: order.tossOrderId,
    amount: String(order.totalAmount),
    paymentType: "NORMAL",
    ...overrides,
  });
}

describe("validatePaymentCallback", () => {
  it("저장된 주문과 일치하는 결제 콜백을 허용한다", () => {
    expect(validatePaymentCallback(createParams(), order)).toEqual({
      ok: true,
      callback: {
        paymentKey: "payment-key",
        tossOrderId: order.tossOrderId,
        amount: order.totalAmount,
        paymentType: "NORMAL",
      },
    });
  });

  it("주문번호가 다르면 승인을 차단한다", () => {
    expect(
      validatePaymentCallback(createParams({ orderId: "OTHER_ORDER" }), order)
    ).toMatchObject({ ok: false, code: "ORDER_ID_MISMATCH" });
  });

  it("콜백 금액이 저장된 주문 금액과 다르면 승인을 차단한다", () => {
    expect(
      validatePaymentCallback(createParams({ amount: "100" }), order)
    ).toMatchObject({ ok: false, code: "AMOUNT_MISMATCH" });
  });

  it("숫자가 아닌 금액을 차단한다", () => {
    expect(
      validatePaymentCallback(createParams({ amount: "32,000" }), order)
    ).toMatchObject({ ok: false, code: "INVALID_PAYMENT_AMOUNT" });
  });

  it("주문 컨텍스트가 없으면 승인을 차단한다", () => {
    expect(validatePaymentCallback(createParams())).toMatchObject({
      ok: false,
      code: "ORDER_CONTEXT_NOT_FOUND",
    });
  });

  it("필수 결제 파라미터가 없으면 승인을 차단한다", () => {
    expect(
      validatePaymentCallback(
        new URLSearchParams({ orderId: order.tossOrderId }),
        order
      )
    ).toMatchObject({ ok: false, code: "MISSING_PAYMENT_PARAMETER" });
  });
});
