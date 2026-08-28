import React, { StrictMode } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PaymentProcessor from "./PaymentProcessor";
import TossRequest, {
  GetPaymentStatus,
} from "@/features/buy/api/tossRequest";
import { clearEncryptedOrderStorage } from "@/app/provider/EncryptStore";

const mockReplace = jest.fn();
const mockRouter = { replace: mockReplace };
const mockOrder = {
  orderId: 101,
  tossOrderId: "ORDER_20260811_001",
  totalAmount: 32000,
  userPoint: "encrypted-point",
  defaultAddress: {
    recipient: "encrypted-name",
    recipientCellPhone: "encrypted-phone",
    roadAddress: "encrypted-road",
    numberAddress: "encrypted-number",
    addrDetail: "encrypted-detail",
  },
  orderDetails: [{ quantity: 1 }],
};
const mockOrders = [mockOrder];
let mockQuery =
  "paymentKey=payment-key&orderId=ORDER_20260811_001&amount=32000&paymentType=NORMAL";

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => new URLSearchParams(mockQuery),
}));

jest.mock("lucide-react", () => ({
  AlertCircle: () => <span data-testid="alert-icon" />,
  LoaderCircle: () => <span data-testid="loading-icon" />,
}));

jest.mock("@/features/buy/api/tossRequest", () => ({
  __esModule: true,
  default: jest.fn(),
  GetPaymentStatus: jest.fn(),
}));

jest.mock("@/app/provider/EncryptStore", () => ({
  useEncryptStore: (selector: (state: { orders: typeof mockOrder[] }) => unknown) =>
    selector({ orders: mockOrders }),
  clearEncryptedOrderStorage: jest.fn(),
}));

jest.mock("@/views/buy/ui/BuyComplete", () => ({
  BuyComplete: ({ orderInfo }: { orderInfo: { orderNumber: string } }) => (
    <div>승인 완료: {orderInfo.orderNumber}</div>
  ),
}));

const mockTossRequest = TossRequest as jest.MockedFunction<typeof TossRequest>;
const mockGetPaymentStatus = GetPaymentStatus as jest.MockedFunction<
  typeof GetPaymentStatus
>;
const mockClearOrderStorage = clearEncryptedOrderStorage as jest.MockedFunction<
  typeof clearEncryptedOrderStorage
>;

describe("PaymentProcessor", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockQuery =
      "paymentKey=payment-key&orderId=ORDER_20260811_001&amount=32000&paymentType=NORMAL";
  });

  it("승인 성공 전에는 완료 화면을 표시하지 않고 성공 후 주문 상태를 정리한다", async () => {
    let resolveRequest: (value: Awaited<ReturnType<typeof TossRequest>>) => void;
    mockTossRequest.mockReturnValue(
      new Promise((resolve) => {
        resolveRequest = resolve;
      })
    );

    render(<PaymentProcessor />);

    expect(screen.getByText("결제 승인 중입니다")).toBeInTheDocument();
    expect(screen.queryByText(/승인 완료/)).not.toBeInTheDocument();

    resolveRequest!({ success: true, message: "success" });

    expect(await screen.findByText(`승인 완료: ${mockOrder.tossOrderId}`)).toBeInTheDocument();
    expect(mockClearOrderStorage).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/buy/success", { scroll: false });
  });

  it("변조된 결제 금액이면 승인 API를 호출하지 않는다", () => {
    mockQuery =
      "paymentKey=payment-key&orderId=ORDER_20260811_001&amount=100&paymentType=NORMAL";

    render(<PaymentProcessor />);

    expect(
      screen.getByText("결제 금액이 주문 금액과 일치하지 않습니다.")
    ).toBeInTheDocument();
    expect(mockTossRequest).not.toHaveBeenCalled();
  });

  it("Strict Mode에서 승인 요청을 중복 호출하지 않는다", async () => {
    mockTossRequest.mockReturnValue(new Promise(() => undefined));

    render(
      <StrictMode>
        <PaymentProcessor />
      </StrictMode>
    );

    await waitFor(() => expect(mockTossRequest).toHaveBeenCalledTimes(1));
  });

  it("승인 결과가 불확실하면 상태 조회로 최종 승인을 복구한다", async () => {
    mockTossRequest.mockResolvedValue({
      success: false,
      pending: true,
      message: "승인 확인 중",
      retryable: true,
    });
    mockGetPaymentStatus.mockResolvedValue({
      success: true,
      message: "승인 완료",
    });

    render(<PaymentProcessor />);

    expect(
      await screen.findByText(`승인 완료: ${mockOrder.tossOrderId}`)
    ).toBeInTheDocument();
    expect(mockGetPaymentStatus).toHaveBeenCalledWith(mockOrder.orderId);
    expect(mockClearOrderStorage).toHaveBeenCalledTimes(1);
  });

  it("재시도 가능한 승인 실패는 사용자가 다시 요청할 수 있다", async () => {
    mockTossRequest
      .mockResolvedValueOnce({
        success: false,
        message: "일시적인 승인 오류입니다.",
        retryable: true,
      })
      .mockResolvedValueOnce({ success: true, message: "success" });

    render(<PaymentProcessor />);

    expect(await screen.findByText("일시적인 승인 오류입니다.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "승인 다시 시도" }));

    await waitFor(() => expect(mockTossRequest).toHaveBeenCalledTimes(2));
    expect(await screen.findByText(`승인 완료: ${mockOrder.tossOrderId}`)).toBeInTheDocument();
  });
});
