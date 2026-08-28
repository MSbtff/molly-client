import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { CartItem } from "@/features/cart/api/cartRead";
import { cartRead } from "@/features/cart/api/cartRead";
import cartDelete from "@/features/cart/api/cartDelete";
import cartOrder from "@/features/cart/api/cartOrder";
import { cartUpdate } from "@/features/cart/api/cartUpdate";
import { CartComponent } from "../ui/CartComponent";

const mockPush = jest.fn();
const mockSetCartState = jest.fn();
const mockSetOrders = jest.fn();
let mockCartStoreItems: CartItem[] = [];

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("lucide-react", () => ({
  X: () => <span aria-label="닫기">x</span>,
}));

jest.mock("@/features/cart/api/cartRead", () => ({
  cartRead: jest.fn(),
}));

jest.mock("@/features/cart/api/cartDelete", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/features/cart/api/cartOrder", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/features/cart/api/cartUpdate", () => ({
  cartUpdate: jest.fn(),
}));

jest.mock("@/app/provider/CartStore", () => ({
  useCartStore: () => ({
    cartState: mockCartStoreItems,
    setCartState: mockSetCartState,
  }),
}));

jest.mock("@/app/provider/EncryptStore", () => ({
  useEncryptStore: () => ({ setOrders: mockSetOrders }),
}));

const mockCartRead = cartRead as jest.MockedFunction<typeof cartRead>;
const mockCartDelete = cartDelete as jest.MockedFunction<typeof cartDelete>;
const mockCartOrder = cartOrder as jest.MockedFunction<typeof cartOrder>;
const mockCartUpdate = cartUpdate as jest.MockedFunction<typeof cartUpdate>;

const cartItems: CartItem[] = [
  {
    cartInfoDto: {
      cartId: 1,
      itemId: 101,
      productId: 1001,
      productName: "테스트 상품 1",
      brandName: "테스트 브랜드",
      price: 10000,
      quantity: 1,
      color: "Black",
      size: "M",
      url: "/images/test-1.jpg",
    },
    colorDetails: [
      {
        color: "Black",
        colorCode: "#000000",
        sizeDetails: [{ id: 101, size: "M", quantity: 5 }],
      },
      {
        color: "White",
        colorCode: "#FFFFFF",
        sizeDetails: [{ id: 102, size: "L", quantity: 3 }],
      },
    ],
  },
  {
    cartInfoDto: {
      cartId: 2,
      itemId: 201,
      productId: 1002,
      productName: "테스트 상품 2",
      brandName: "테스트 브랜드",
      price: 20000,
      quantity: 2,
      color: "White",
      size: "L",
      url: "/images/test-2.jpg",
    },
    colorDetails: [
      {
        color: "White",
        colorCode: "#FFFFFF",
        sizeDetails: [{ id: 201, size: "L", quantity: 4 }],
      },
    ],
  },
];

const renderCart = async (items: CartItem[] = cartItems) => {
  mockCartStoreItems = items;
  mockCartRead.mockResolvedValue(items);
  render(<CartComponent />);

  if (items.length > 0) {
    await screen.findByText(items[0].cartInfoDto.productName);
  } else {
    await screen.findByText("장바구니가 비어있습니다");
  }
};

describe("장바구니 사용자 흐름", () => {
  beforeEach(() => {
    mockCartStoreItems = [];
    mockCartDelete.mockResolvedValue(undefined);
    mockCartUpdate.mockResolvedValue(undefined);
    mockCartOrder.mockResolvedValue({ orderId: 100 });
  });

  test("조회한 장바구니 상품을 렌더링하고 전역 상태에 동기화한다", async () => {
    await renderCart();

    expect(screen.getByText("테스트 상품 1")).toBeInTheDocument();
    expect(screen.getByText("테스트 상품 2")).toBeInTheDocument();
    expect(screen.getByText("10,000원")).toBeInTheDocument();
    expect(screen.getByText("40,000원")).toBeInTheDocument();
    expect(mockSetCartState).toHaveBeenCalledWith(cartItems);
  });

  test("조회 결과가 없으면 빈 장바구니 상태를 보여준다", async () => {
    await renderCart([]);

    expect(screen.getByText("장바구니가 비어있습니다")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "상품을 선택해주세요" })).toBeDisabled();
  });

  test("개별 상품 선택과 해제에 따라 주문 금액을 다시 계산한다", async () => {
    await renderCart();
    const [, firstItemCheckbox] = screen.getAllByRole("checkbox");

    fireEvent.click(firstItemCheckbox);
    expect(screen.getByRole("button", { name: "10,000원 주문하기" })).toBeEnabled();

    fireEvent.click(firstItemCheckbox);
    expect(screen.getByRole("button", { name: "상품을 선택해주세요" })).toBeDisabled();
  });

  test("전체 선택과 전체 해제에 따라 모든 체크박스와 합계를 갱신한다", async () => {
    await renderCart();
    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[0]);
    checkboxes.forEach((checkbox) => expect(checkbox).toBeChecked());
    expect(screen.getByRole("button", { name: "50,000원 주문하기" })).toBeEnabled();

    fireEvent.click(checkboxes[0]);
    checkboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked());
  });

  test("옵션 모달에서 수량을 변경해 장바구니 수정 요청을 보낸다", async () => {
    await renderCart();

    fireEvent.click(screen.getAllByRole("button", { name: "옵션 변경" })[0]);
    expect(await screen.findByText("최대 주문 가능 수량: 5개")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "+" }));
    fireEvent.click(screen.getByRole("button", { name: "확인" }));

    await waitFor(() => {
      expect(mockCartUpdate).toHaveBeenCalledWith(1, 101, 2);
    });
    expect(mockCartRead).toHaveBeenCalledTimes(2);
  });

  test("동일 옵션으로 변경하면 중복 상품 확인 후 기존 항목을 병합 처리한다", async () => {
    const duplicateItems: CartItem[] = [
      cartItems[0],
      {
        ...cartItems[1],
        cartInfoDto: {
          ...cartItems[1].cartInfoDto,
          productId: 1001,
          itemId: 102,
          color: "White",
          size: "L",
        },
      },
    ];
    await renderCart(duplicateItems);

    fireEvent.click(screen.getAllByRole("button", { name: "옵션 변경" })[0]);
    fireEvent.click(await screen.findByRole("button", { name: "옵션 선택 ▼" }));
    fireEvent.click(screen.getByText("L"));
    fireEvent.click(screen.getByRole("button", { name: "확인" }));

    expect(await screen.findByText("중복된 상품 발견")).toBeInTheDocument();
    expect(mockCartUpdate).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "확인" }));
    await waitFor(() => {
      expect(mockCartDelete).toHaveBeenCalledWith(2);
      expect(mockCartUpdate).toHaveBeenCalledWith(1, 102, 1);
    });
  });

  test("개별 삭제 후 서버에서 장바구니를 다시 조회한다", async () => {
    mockCartStoreItems = cartItems;
    mockCartRead
      .mockResolvedValueOnce(cartItems)
      .mockResolvedValueOnce([cartItems[1]]);
    render(<CartComponent />);
    await screen.findByText("테스트 상품 1");

    fireEvent.click(screen.getAllByRole("button", { name: "삭제" })[0]);

    await waitFor(() => expect(mockCartDelete).toHaveBeenCalledWith(1));
    await waitFor(() => {
      expect(screen.queryByText("테스트 상품 1")).not.toBeInTheDocument();
    });
    expect(screen.getByText("테스트 상품 2")).toBeInTheDocument();
  });

  test("선택 상품을 한 번에 삭제하고 선택 상태를 초기화한다", async () => {
    mockCartStoreItems = cartItems;
    mockCartRead.mockResolvedValueOnce(cartItems).mockResolvedValueOnce([]);
    render(<CartComponent />);
    await screen.findByText("테스트 상품 1");

    fireEvent.click(screen.getAllByRole("checkbox")[0]);
    fireEvent.click(screen.getByText("선택 삭제"));

    await waitFor(() => expect(mockCartDelete).toHaveBeenCalledWith([1, 2]));
    expect(await screen.findByText("장바구니가 비어있습니다")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "상품을 선택해주세요" })).toBeDisabled();
  });

  test("선택 상품으로 주문을 생성하고 결제 페이지로 이동한다", async () => {
    await renderCart();
    fireEvent.click(screen.getAllByRole("checkbox")[1]);

    fireEvent.click(screen.getByRole("button", { name: "10,000원 주문하기" }));

    await waitFor(() => {
      expect(mockCartOrder).toHaveBeenCalledWith([{ cartId: 1 }]);
      expect(mockSetOrders).toHaveBeenCalledWith([
        {
          orderId: 100,
          pointUsage: null,
          pointSave: null,
          payment: [],
          delivery: [],
        },
      ]);
      expect(mockPush).toHaveBeenCalledWith("/buy");
    });
  });
});
