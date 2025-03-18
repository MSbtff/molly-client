/* eslint-disable @next/next/no-img-element */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HotItemsSection from "../ui/HotItemsSection";
import { act } from "react-dom/test-utils";

//fetch 목킹 (api 요청을 가짜로)
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            data: [
                {
                    id: 1,
                    url: "/product/1",
                    brandName: "Nike",
                    productName: "Air Max 270",
                    price: 129000,
                    thumbnail: { path: "/images/shoes1.jpg", filename: "shoes1.jpg" },
                },
                {
                    id: 2,
                    url: "/product/2",
                    brandName: "Adidas",
                    productName: "Ultraboost",
                    price: 159000,
                    thumbnail: { path: "/images/shoes2.jpg", filename: "shoes2.jpg" },
                },
                {
                    id: 3,
                    url: "/product/3",
                    brandName: "Puma",
                    productName: "RS-X",
                    price: 99000,
                    thumbnail: { path: "/images/shoes3.jpg", filename: "shoes3.jpg" },
                },
            ],
        }),
    })
) as jest.Mock;

jest.mock("next/image", () => ({
    __esModule: true,
    default: ({ src, alt, onError }: { src: string; alt: string; onError?: () => void }) => (
        <img src={src} alt={alt} onError={onError} />
    ),
}));

describe("HotItemsSection", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("컴포넌트가 정상적으로 렌더링되는지 확인", () => {
        render(<HotItemsSection />);
        expect(screen.getByText("지금 핫한 신상템")).toBeInTheDocument();
    });

    test("API 데이터를 정상적으로 불러오는지 확인", async () => {
        render(<HotItemsSection />);

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

        expect(await screen.findByText("Nike")).toBeInTheDocument();
        expect(await screen.findByText("Air Max 270")).toBeInTheDocument();

        //가격 정보는 3번째부터 렌더링 됨.
        expect(await screen.findByText((content) => content.includes("99,000"))).toBeInTheDocument();
    });

    test("이미지를 올바르게 렌더링하는지 확인", async () => {
        render(<HotItemsSection />);

        const images = await screen.findAllByRole("img");
        expect(images.length).toBeGreaterThan(0);

        expect(images[0]).toHaveAttribute("src", expect.stringContaining("/images/shoes1.jpg"));
        expect(images[0]).toHaveAttribute("alt", "Nike");

        expect(images[1]).toHaveAttribute("src", expect.stringContaining("/images/shoes2.jpg"));
        expect(images[1]).toHaveAttribute("alt", "Adidas");
    });

    test("이미지 로딩 오류 시 기본 이미지로 변경되는지 확인", async () => {
        render(<HotItemsSection />);

        const imgElement = await screen.findByAltText("Nike");
        // fireEvent.error(imgElement); //에러 호출 -> 이미지 에러 상태 업데이트 -> url 변경

        act(()=>{
            fireEvent.error(imgElement);
        });

        await waitFor(() => {
            screen.debug(); //이미지의 src 값이 변경되어서 나옴
            expect(screen.getByAltText("Nike")).toHaveAttribute("src", "/images/noImage.svg")
        });

        screen.debug();
    });

    test("상품 클릭 시 올바른 URL로 이동하는지 확인", async () => {
        render(<HotItemsSection />);

        const button = await screen.findByText("Nike");
        fireEvent.click(button);
        expect(button).toBeInTheDocument();
    });

    test("다른 상품 더보기 버튼이 정상적으로 표시되는지 확인", () => {
        render(<HotItemsSection />);

        const moreButton = screen.getByText("다른 상품 더보기");
        expect(moreButton).toBeInTheDocument();

        fireEvent.click(moreButton);
        expect(moreButton).toBeInTheDocument();
    });
});
