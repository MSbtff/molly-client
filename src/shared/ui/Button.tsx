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
  totalAmount?: number;
  totalItems?: number;
  handleOrder?: () => void;
  hover?: string;
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
    totalAmount,

    handleOrder,
    hover,
  } = props;
  // const formattedAmount = totalAmount;
  // const won = formattedAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

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
      className={cn('button', hover || '', className || '')}
      onClick={totalAmount ? handleOrder : onClick}
      type={type}
    >
      {totalAmount ? (
        <div className={cn(color)} onClick={handleOrder}>
          {children}
        </div>
      ) : (
        <span className={cn(color)}>{children}</span>
      )}
    </button>
  );
};
