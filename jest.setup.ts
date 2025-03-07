import '@testing-library/jest-dom';

import React, { ImgHTMLAttributes } from "react";
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: ImgHTMLAttributes<HTMLImageElement>) => {
      return React.createElement('img', props); //jsx 대신 createElement 사용 
    },
  }));