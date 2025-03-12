/*
    테스트 시나리오
    1. 컴포넌트 정상적으로 렌더링되는지 확인
    2. 모든 슬라이스가 올바르게 렌더링되는지 확인
    3. 이미지가 정상적으로 렌더링되는지 확인
    3. 슬라이드 이동 동작이 정상적으로 수행되는지 확인
*/

import React, { ReactNode } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StyleClipSection from "../ui/StyleClipSection";

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt }: { src: string; alt: string }) => (
        <img src={src} alt={alt} />
    ),
}));

jest.mock("swiper/react", () => ({
    Swiper: ({ children }: { children: ReactNode }) => (
        <div data-testid="swiper">{children}</div>
    ),
    SwiperSlide: ({ children }: { children: ReactNode }) => (
        <div data-testid="swiper-slide">{children}</div>
    ),
}));

jest.mock('swiper/modules', () => ({
    Navigation: jest.fn(),
}));

jest.mock("swiper/css", () => ({}));
jest.mock("swiper/css/navigation", () => ({}));

describe("StyleClipSection", () => {
    test("컴포넌트가 정상적으로 렌더링되는지 확인", () => {
        render(<StyleClipSection />);
        const sectionElement = screen.getByRole("region");
        expect(sectionElement).toBeInTheDocument();
    });

    test("모든 슬라이드가 올바르게 렌더링되는지 확인", () => {
        render(<StyleClipSection />);
        const sliders = screen.getAllByTestId("swiper-slide");
        expect(sliders.length).toBeGreaterThan(0); //최소 1개 이상 있어야 함
    });

    test("이미지가 정상적으로 렌더링되는지 확인", () => {
        render(<StyleClipSection />);

        const images = screen.getAllByRole("img");
        expect(images.length).toBeGreaterThan(0);

        const rjftImages = screen.getAllByAltText("rjft");
        expect(rjftImages.length).toBeGreaterThan(0); // 최소 하나 이상의 'rjft' 이미지를 가져와야 함

        const angkeumImages = screen.getAllByAltText("앙큼");
        expect(angkeumImages.length).toBeGreaterThan(0);
    });

    test("네비게이션 버튼이 정상적으로 표시되는지 확인", () => {
        render(<StyleClipSection />);
        const moreButton = screen.getByText("더보기");
        expect(moreButton).toBeInTheDocument();
    });

    test("네비게이션 버튼이 정상적으로 표시되는지 확인", () => {
        render(<StyleClipSection />);

        const prevButton = document.querySelector(".swiper-button-prev");
        const nextButton = document.querySelector(".swiper-button-next");

        expect(prevButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
    });

    test("슬라이드 이동 동작이 정상적으로 수행되는지 확인 (mocking)", () => {
        render(<StyleClipSection />);
        const nextButton = document.querySelector(".swiper-button-next") as HTMLButtonElement;
        const prevButton = document.querySelector(".swiper-button-prev") as HTMLButtonElement;

        //클릭 이벤트가 발생했는지 확인
        expect(nextButton).toBeInTheDocument();
        expect(prevButton).toBeInTheDocument();

        //버튼 클릭 이벤트 발생
        fireEvent.click(nextButton);
        fireEvent.click(prevButton);
    });
});