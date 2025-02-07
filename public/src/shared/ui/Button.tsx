import React from 'react';
import {cn} from '../util/lib/utils';

type ButtonProps = {
  children: string;
  onClick?: (e: React.MouseEvent) => void;
  width?: string;
  height?: string;
  color?: string;
  bg?: string;
  radius?: string;
  border?: string;
};

export const Button = (props: ButtonProps) => {
  const {onClick, width, height, color, bg, radius, children, border} = props;
  return (
    <button
      style={{
        width,
        height,
        color,
        background: bg,
        borderRadius: radius,
        border: border,
      }}
      className={cn('button')}
      onClick={onClick}
    >
      <span className={cn(color)}>{children}</span>
    </button>
  );
};
