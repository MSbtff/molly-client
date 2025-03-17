/*
1. 컴포넌트가 정상적으로 렌더링되는지 확인
2. API 호출이 정상적으로 이루어지는지 확인
3. 브랜드 리스트가 올바르게 렌더링되는지 확인
4. 첫 번째 브랜드가 자동으로 선택되는지 확인
5. 선택된 브랜드의 상품이 올바르게 렌더링되는지 확인
6. 이미지 로딩 실패 시 기본 이미지(/images/noImage.svg)로 변경되는지 확인
7. 다른 상품 더보기 버튼이 정상적으로 표시되는지 확인
*/
/* eslint-disable @next/next/no-img-element */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FeaturedBrandSection from "../ui/FeaturedBrandSection";

//fetch API 목킹
global.fetch = jest.fn((url) =>
    Promise.resolve({
        json: () =>
            Promise.resolve(
                url.includes("popular-brand")
                    ? {
                        data: [
                            { brandThumbnailUrl: "/brand1.jpg", brandName: "Nike" },
                            { brandThumbnailUrl: "/brand2.jpg", brandName: "Adidas" },
                            { brandThumbnailUrl: "/brand3.jpg", brandName: "Puma" },
                            { brandThumbnailUrl: "/brand4.jpg", brandName: "New Balance" },
                            { brandThumbnailUrl: "/brand5.jpg", brandName: "Reebok" },
                        ],
                    }
                    : {
                        data: [
                            {
                                id: 1,
                                brandName: "Nike",
                                productName: "Air Max 270",
                                price: 129000,
                                thumbnail: { path: "/shoes1.jpg" },
                            },
                            {
                                id: 2,
                                brandName: "Nike",
                                productName: "Air Force 1",
                                price: 159000,
                                thumbnail: { path: "/shoes2.jpg" },
                            },
                            {
                                id: 3,
                                brandName: "Nike",
                                productName: "React Infinity",
                                price: 99000,
                                thumbnail: { path: "/shoes3.jpg" },
                            },
                        ],
                    }
            ),
    })
) as jest.Mock;

jest.mock("next/image", () => ({
    __esModule: true,
    default: ({ src, alt, onError }: { src: string; alt: string; onError?: () => void }) => (
        <img src={src} alt={alt} onError={onError} />
    ),
}));

describe("", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("컴포넌트가 정상적으로 렌더링되는지 확인", () => {
        render(<FeaturedBrandSection />);
        expect(screen.getByText('주목할 브랜드')).toBeInTheDocument();
    });

    test("API 호출이 정상적으로 이루어지는지 확인", async () => {
        render(<FeaturedBrandSection />);
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    });

    test("브랜드 리스트가 올바르게 렌더링되는지 확인", async () => {
        render(<FeaturedBrandSection />);

        await waitFor(() => {
            expect(screen.getByText(/Nike/i)).toBeInTheDocument(); //첫번째 상품은 Nike 문자열 단독이 아니라 다른 텍스트와 함께 묶여 있어서 
            //screen.getByText("Nike")는 정확히 Nike만 포함된 요소를 찾기에 에러가 발생한다. 
            //getByText의 matcher 옵션 사용을 하면(RegExp)
            //getByText를 부분 일치하는 방식으로 찾게 된다.
            expect(screen.getByText("Adidas")).toBeInTheDocument();
            expect(screen.getByText("Puma")).toBeInTheDocument();
            expect(screen.getByText("New Balance")).toBeInTheDocument();
            expect(screen.getByText("Reebok")).toBeInTheDocument();
        });
    });

    test("첫 번째 브랜드가 자동으로 선택되는지 확인", async () => {
        render(<FeaturedBrandSection />);
        await waitFor(() => expect(screen.getByText("새로워진 Nike")).toBeInTheDocument());
    });

    test("선택된 브랜드의 상품이 올바르게 렌더링되는지 확인", async () => {
        render(<FeaturedBrandSection />);

        await waitFor(() => {
            expect(screen.getByText("Air Max 270")).toBeInTheDocument();
            expect(screen.getByText("Air Force 1")).toBeInTheDocument();
            expect(screen.getByText("React Infinity")).toBeInTheDocument();
        });
    });

    test("이미지 로딩 오류 시 기본 이미지로 변경되는지 확인", async () => {
        render(<FeaturedBrandSection />);

        const imgElements = await screen.findAllByAltText("Nike");
        const firstImg = imgElements[0];

        fireEvent.error(firstImg); //act() 없이 실행해도 됨. 내부적으로 act()를 실행함

        await waitFor(() => {
            screen.debug();
            expect(firstImg).toHaveAttribute("src", "/images/noImage.svg");
            // const updateImg = screen.getByAltText("Nike");
            // expect(updateImg).toHaveAttribute("src", "/images/noImage.svg");
        });
    });

    test("다른 상품 더보기 버튼이 정상적으로 표시되는지 확인", () => {
        render(<FeaturedBrandSection />);
        expect(screen.getByText("다른 상품 더보기")).toBeInTheDocument();
    });
});