import TossRequest, { GetPaymentStatus } from "./tossRequest";
import type { ConfirmPaymentRequest } from "./tossRequest";
import { getValidAuthToken } from "@/shared/util/lib/authTokenValue";

jest.mock("@/shared/util/lib/authTokenValue", () => ({
  getValidAuthToken: jest.fn(),
}));

const mockGetValidAuthToken = getValidAuthToken as jest.MockedFunction<
  typeof getValidAuthToken
>;
const mockFetch = jest.fn();

const request: ConfirmPaymentRequest = {
  userOrderId: 101,
  tossOrderId: "ORDER_20260811_001",
  amount: 32000,
  point: "encrypted-point",
  paymentKey: "payment-key",
  paymentType: "NORMAL",
  delivery: {
    receiverPhone: "encrypted-phone",
    receiverName: "encrypted-name",
    addressDetail: "encrypted-detail",
    numberAddress: "encrypted-number",
    roadAddress: "encrypted-road",
  },
};

describe("TossRequest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_SERVER_URL = "https://api.example.com";
    mockGetValidAuthToken.mockResolvedValue("Bearer auth-token");
    global.fetch = mockFetch;
  });

  it("paymentKey를 멱등키로 전달해 승인 요청을 중복 방지한다", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      text: jest.fn().mockResolvedValue('{"status":"DONE"}'),
    });

    await expect(TossRequest(request)).resolves.toMatchObject({ success: true });
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.example.com/orders/101/payment",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer auth-token",
          "Idempotency-Key": request.paymentKey,
        }),
        cache: "no-store",
      })
    );
  });

  it("유효하지 않은 요청은 백엔드로 전달하지 않는다", async () => {
    await expect(TossRequest({ ...request, amount: 0 })).resolves.toMatchObject({
      success: false,
      code: "INVALID_PAYMENT_REQUEST",
      retryable: false,
    });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("일시적인 서버 오류는 재시도 가능한 실패로 반환한다", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 503,
      text: jest
        .fn()
        .mockResolvedValue('{"code":"TEMPORARY_ERROR","message":"잠시 후 재시도"}'),
    });

    await expect(TossRequest(request)).resolves.toMatchObject({
      success: false,
      code: "TEMPORARY_ERROR",
      retryable: true,
      status: 503,
    });
  });

  it("성공 상태 코드라도 승인 응답이 손상되면 완료 처리하지 않는다", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      text: jest.fn().mockResolvedValue("invalid-json"),
    });

    await expect(TossRequest(request)).resolves.toMatchObject({
      success: false,
      code: "INVALID_PAYMENT_RESPONSE",
      retryable: true,
    });
  });

  it("202 승인 대기 응답을 결제 성공으로 처리하지 않는다", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 202,
      text: jest.fn().mockResolvedValue('{"paymentStatus":"결제대기"}'),
    });

    await expect(TossRequest(request)).resolves.toMatchObject({
      success: false,
      pending: true,
      code: "PAYMENT_CONFIRMATION_PENDING",
    });
  });

  it("주문 결제 상태를 인증된 서버 API에서 조회한다", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      text: jest.fn().mockResolvedValue('{"paymentStatus":"결제승인"}'),
    });

    await expect(GetPaymentStatus(request.userOrderId)).resolves.toMatchObject({
      success: true,
    });
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.example.com/orders/101/payment-status",
      expect.objectContaining({
        method: "GET",
        headers: { Authorization: "Bearer auth-token" },
        cache: "no-store",
      })
    );
  });
});
