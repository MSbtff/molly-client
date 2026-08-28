import cartDelete from "../api/cartDelete";
import cartOrder from "../api/cartOrder";
import { cartUpdate } from "../api/cartUpdate";
import { getValidAuthToken } from "@/shared/util/lib/authTokenValue";

jest.mock("next/headers", () => ({
  cookies: jest.fn().mockResolvedValue({
    get: jest.fn().mockReturnValue({ value: "encryptToken" }),
  }),
}));

jest.mock("@/shared/util/lib/encrypteToken", () => ({
  decryptToken: jest.fn().mockReturnValue("decryptToken"),
}));

jest.mock("@/shared/util/lib/authTokenValue", () => ({
  getValidAuthToken: jest.fn(),
}));

const mockFetch = jest.fn();
const mockGetValidAuthToken = getValidAuthToken as jest.MockedFunction<
  typeof getValidAuthToken
>;

describe("장바구니 API 계약", () => {
  beforeAll(() => {
    process.env.NEXT_SERVER_URL = "https://api.example.com";
    global.fetch = mockFetch;
  });

  beforeEach(() => {
    mockGetValidAuthToken.mockResolvedValue("decryptToken");
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ orderId: 1 }),
    });
  });

  test("선택한 cartId 목록으로 주문 생성 요청을 보낸다", async () => {
    const orderItems = [{ cartId: 1 }, { cartId: 2 }];

    await expect(cartOrder(orderItems)).resolves.toEqual({ orderId: 1 });
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.example.com/orders",
      expect.objectContaining({
        method: "POST",
        headers: {
          Authorization: "decryptToken",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderRequests: orderItems }),
      })
    );
  });

  test("주문 생성 실패 시 서버 오류 메시지를 포함해 예외를 전달한다", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 400,
      json: jest.fn().mockResolvedValue({ message: "Bad Request" }),
    });

    await expect(cartOrder([{ cartId: 1 }])).rejects.toThrow(
      "주문 실패: Bad Request"
    );
  });

  test.each([
    [1, [1]],
    [[1, 2], [1, 2]],
  ])("단건과 다건 삭제 요청을 배열 형식으로 보낸다", async (input, body) => {
    await cartDelete(input);

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.example.com/cart",
      expect.objectContaining({
        method: "DELETE",
        headers: {
          Authorization: "decryptToken",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
    );
  });

  test("옵션 변경 시 cartId, itemId, quantity를 수정 요청에 담는다", async () => {
    await cartUpdate(1, 102, 3);

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.example.com/cart",
      expect.objectContaining({
        method: "PUT",
        headers: {
          Authorization: "decryptToken",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartId: 1, itemId: 102, quantity: 3 }),
      })
    );
  });

  test("인증 토큰을 얻지 못하면 삭제 API를 호출하지 않는다", async () => {
    mockGetValidAuthToken.mockRejectedValue(new Error("토큰이 유효하지 않습니다."));

    await expect(cartDelete(1)).rejects.toThrow("토큰이 유효하지 않습니다.");
    expect(mockFetch).not.toHaveBeenCalled();
  });
});
