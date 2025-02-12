import React from 'react';
import {cn} from '../util/lib/utils';

type ButtonProps = {
  children: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  width?: string;
  height?: string;
  color?: string;
  bg?: string;
  radius?: string;
  border?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

export const Button = (props: ButtonProps) => {
  const {
    onClick,
    width,
    height,
    color,
    bg,
    radius,
    children,
    border,
    type,
    className,
  } = props;
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
      className={cn('button' + (className ? ` ${className}` : ''))}
      onClick={onClick}
      type={type}
    >
      <span className={cn(color)}>{children}</span>
    </button>
  );
};
