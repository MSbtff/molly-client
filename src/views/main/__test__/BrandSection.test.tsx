//테스트 시나리오
/*내가 생각한거
1. ui 렌더링되는지
2. 텍스트 렌더링되는지
3. 클릭하면 url 바뀌고 페이지 이동하는지
네스트 이미지만 목킹하면 됨 */

/*
1. 컴포넌트가 정상적으로 렌더링되는지 확인
2. 모든 브랜드가 올바르게 렌더링되는지 확인
3. 이미지가 정상적으로 표시되는지 확인
4. 클릭 시 useRouter().push()가 올바르게 호출되는지 확인 (네비게이션 테스트)
useRouter를 목킹, 네스트 이미지 목킹
*/

/* eslint-disable @next/next/no-img-element */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BrandSection from '../ui/BrandSection';
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));
jest.mock("next/image", () => ({
    __esModule: true,
    default: ({ src, alt }: { src: string; alt: string }) => (
        <img src={src} alt={alt} />
    ),
}));

describe('BrandSection', () => {
    let mockRouter: { push: jest.Mock };

    beforeEach(() => {
        mockRouter = { push: jest.fn() };
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
    });

    test('BrandSection이 정상적으로 렌더링되는지 확인', () => {
        render(<BrandSection />);

        const sectionElement = screen.getByRole("region");
        expect(sectionElement).toBeInTheDocument();
    });

    test("모든 브랜드 버튼과 이미지가 정상적으로 렌더링되는지 확인", () => {
        render(<BrandSection />);
        const brandTitles = [
            "구호플러스", "이세이미야케", "빈폴", "띠어리", "메종키츠네",
            "유니폼브릿지", "PXG", "아미", "가니"
        ];

        brandTitles.forEach((title) => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });

        const images = screen.getAllByRole("img"); //모든 <img> 태그 요소를 찾는다.
        expect(images).toHaveLength(10);
    });

    test("브랜드 버튼을 클릭하면 useRouter().push()가 올바르게 호출되는지 확인 ", () => {
        render(<BrandSection />);

        // '구호플러스' 브랜드 버튼 찾기
        const button = screen.getByText("빈폴");

        // 클릭 이벤트 발생
        fireEvent.click(button);

        // useRouter().push()가 올바르게 호출되었는지 검증
        expect(mockRouter.push).toHaveBeenCalledWith("/product?brandName=빈폴");
    });

    test("브랜드 이미지 클릭 시 네비게이션 정상적으로 작동하는지 확인", () => {
        render(<BrandSection />);

        const img = screen.getByAltText('빈폴');
        fireEvent.click(img);
        expect(mockRouter.push).toHaveBeenCalledWith("/product?brandName=빈폴");

    });

});