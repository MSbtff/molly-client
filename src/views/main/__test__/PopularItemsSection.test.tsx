import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PopularItemsSection from "../ui/PopularItemsSection";
import "@testing-library/jest-dom";
import {act} from 'react';

const mockProducts = {
  data: [
    {
      id: 1,
      url: "/product/1",
      brandName: "브랜드A",
      productName: "상품A",
      price: 50000,
      thumbnail: { path: "/images/productA.jpg", filename: "productA.jpg" },
    },
    {
      id: 2,
      url: "/product/2",
      brandName: "브랜드B",
      productName: "상품B",
      price: 75000,
      thumbnail: { path: "/images/productB.jpg", filename: "productB.jpg" },
    },
  ],
};

// 테스트 파일 최상단에 추가
jest.mock('lucide-react', () => ({
  RotateCcw: () => <div data-testid="rotate-icon">Mock Icon</div>
}));
 
describe("PopularItemsSection", () => {
  beforeEach(() => {
    // fetch 요청을 mock 처리
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockProducts),
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // 테스트마다 mock을 초기화
  });

  test("컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
    await act(async () => {
      render(<PopularItemsSection />);
    });

    expect(screen.getByText("지금 인기있는 상품")).toBeInTheDocument();
  });

  test("API 데이터를 성공적으로 불러오고 화면에 렌더링하는지 확인", async () => {
    await act(async () => {
      render(<PopularItemsSection />);
    });

    // 로딩이 완료된 후 상품들이 렌더링되는지 확인
    await waitFor(() => {
      expect(screen.getByText("브랜드A")).toBeInTheDocument();
      expect(screen.getByText("상품A")).toBeInTheDocument();
      expect(screen.getByText("50,000원")).toBeInTheDocument();

      expect(screen.getByText("브랜드B")).toBeInTheDocument();
      expect(screen.getByText("상품B")).toBeInTheDocument();
      expect(screen.getByText("75,000원")).toBeInTheDocument();
    });
  });

  test("카테고리 버튼 클릭 시 fetch가 호출되는지 확인", async () => {
    await act(async () => {
      render(<PopularItemsSection />);
    });

    const categoryButton = screen.getByText("상의");
    fireEvent.click(categoryButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(encodeURIComponent("상의"))
      );
    });
  });

  test("이미지 로딩 실패 시 기본 이미지가 표시되는지 확인", async () => {
    await act(async () => {
      render(<PopularItemsSection />);
    });

    const imgElement = screen.getAllByRole("img")[0];
    
    // 이미지 로딩 실패 이벤트 발생
    fireEvent.error(imgElement);

    // 기본 이미지(/images/noImage.svg)로 변경되었는지 확인
    await waitFor(() => {
      expect(imgElement).toHaveAttribute("src", "/images/noImage.svg");
    });
  });
});
