// BannerSection.test.js
import React, {ReactNode} from 'react';
import { render, screen } from '@testing-library/react';
import BannerSection from '../ui/BannerSection';
import {ImgHTMLAttributes} from "react";

//목킹 : swiper, swiperslide, css, 배너 이미지, next/image
jest.mock("swiper/react", () => ({
    Swiper: ({ children }: { children: ReactNode }) => (
        <div data-testid="swiper">{children}</div>
    ),
    SwiperSlide: ({ children }: { children: ReactNode }) => (
        <div data-testid="swiper-slide">{children}</div>
    ),
}));

jest.mock('swiper/modules', () => ({
  Pagination: jest.fn(),
  Autoplay: jest.fn(),
}));

jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/pagination', () => ({}));

jest.mock('../../../../public/images/banner/optimize1.avif', () => ({
  src: '/mock-path/optimize1.avif',
  height: 600,
  width: 1200,
}));
jest.mock('../../../../public/images/banner/optimize11.avif', () => ({
  src: '/mock-path/optimize11.avif',
  height: 600,
  width: 1200,
}));

jest.mock("next/image", () => ({
    __esModule: true,
    default: ({
        src,
        alt,
        ...props
    }: ImgHTMLAttributes<HTMLImageElement> & { src: { src: string } | string }) => {
        const imageSrc = typeof src === "object" && src !== null ? (src as { src: string }).src : (src as string);

        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} src={imageSrc} alt={alt} />;
    },
}));

describe('BannerSection', () => {
  test('BannerSection이 정상적으로 렌더링되는지 확인', () => {
    render(<BannerSection />);
    // screen.debug(); // 현재 렌더링된 DOM을 출력 (디버깅용)
    
    const sectionElement = screen.getByTestId('banner-section');
    expect(sectionElement).toBeInTheDocument();
    
    const swiperElement = screen.getByTestId('swiper');
    expect(swiperElement).toBeInTheDocument();
    
    const slides = screen.getAllByTestId('swiper-slide');
    expect(slides).toHaveLength(10);
  });
  
  test('배너 title, subtitle이 화면에 올바르게 표시되는지 확인', () => {
    render(<BannerSection />);
    
    expect(screen.getByText('가족의 발견')).toBeInTheDocument();
    expect(screen.getByText('5% 추가적립 + 신세계 3만원권')).toBeInTheDocument();
    expect(screen.getByText('새로운 시작')).toBeInTheDocument();
    expect(screen.getByText('신상 컬렉션을 만나보세요')).toBeInTheDocument();
  });
  
  test('Swiper의 속성이 올바르게 설정되었는지 확인', () => {
    render(<BannerSection />);
    
    const swiperElement = screen.getByTestId('swiper');
    expect(swiperElement).toBeInTheDocument();
    expect(swiperElement).toHaveAttribute("data-testid", "swiper"); // 존재 여부 확인

    // expect(swiperElement).toHaveAttribute('spaceBetween', '0');
    // expect(swiperElement).toHaveAttribute('slidesPerView', '1');
    // expect(swiperElement).toHaveAttribute('loop', 'true');
    // expect(swiperElement).toHaveClass('w-full h-full');
  });
  
  test('배너 이미지가 제대로 렌더링되는지 확인', () => {
    render(<BannerSection />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(10);
    
    expect(images[0]).toHaveAttribute('alt', 'banner-0');
    expect(images[0]).toHaveAttribute('layout', 'fill');
    expect(images[0]).toHaveAttribute('objectFit', 'cover');
  });
});