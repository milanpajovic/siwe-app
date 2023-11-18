import React, { ReactNode } from 'react';
import classNames from 'classnames';
import './style.scss';
import { SpinnerGap } from '@phosphor-icons/react';

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  name?: string;
  type?: 'submit' | 'button';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'icon'
    | 'none'
    | 'round'
    | 'cancel';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({
  name,
  variant,
  className,
  type,
  disabled,
  children,
  onClick,
  size,
  isLoading,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      name={name}
      className={classNames(className, {
        'btn-default': !variant || variant === 'primary',
        'btn-secondary': variant === 'secondary',
        'btn-tertiary': variant === 'tertiary',
        'btn-none': variant === 'none',
        'btn-icon': variant === 'icon',
        'btn-sm': size === 'sm',
        'btn-round': variant === 'round',
        'btn-cancel': variant === 'cancel',
      })}
      disabled={disabled || isLoading}
    >
      {isLoading && <SpinnerGap className="mr-2 animate-spin text-xl" />}
      {children}
    </button>
  );
};

export default Button;
