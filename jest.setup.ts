import '@testing-library/jest-dom';

import React, { ImgHTMLAttributes } from "react";
jest.mock('next/image', () => ({
    __esModule: true,
    default: (
      props: ImgHTMLAttributes<HTMLImageElement> & {
        priority?: boolean;
        unoptimized?: boolean;
      }
    ) => {
      const { priority, unoptimized, ...imageProps } = props;
      void priority;
      void unoptimized;
      return React.createElement('img', imageProps); // jsx 대신 createElement 사용
    },
  }));
