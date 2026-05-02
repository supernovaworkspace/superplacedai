'use client';

import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { useState } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  href?: string;
  className?: string;
};

const baseStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 15,
  fontWeight: 500,
  lineHeight: 1,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  border: 'none',
  whiteSpace: 'nowrap',
};

const sizeStyles: Record<ButtonSize, CSSProperties> = {
  sm: { padding: '10px 18px' },
  md: { padding: '14px 28px' },
  lg: { padding: '16px 32px' },
};

const variantStyles: Record<ButtonVariant, { normal: CSSProperties; hover: CSSProperties }> = {
  primary: {
    normal: {
      background: '#d4af37',
      color: '#faf9f5',
    },
    hover: {
      background: '#b5583a',
      color: '#faf9f5',
    },
  },
  secondary: {
    normal: {
      background: '#e6e9ed',
      color: '#4d4c48',
    },
    hover: {
      background: '#d8d6cc',
      color: '#4d4c48',
    },
  },
  dark: {
    normal: {
      background: '#111418',
      color: '#faf9f5',
      border: '1px solid #2a3038',
    },
    hover: {
      background: '#2a3038',
      color: '#faf9f5',
      border: '1px solid #2a3038',
    },
  },
  ghost: {
    normal: {
      background: 'transparent',
      color: '#687078',
    },
    hover: {
      background: 'transparent',
      color: '#111418',
    },
  },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  className,
}: ButtonProps) {
  const [hovered, setHovered] = useState(false);

  const style: CSSProperties = {
    ...baseStyle,
    ...sizeStyles[size],
    ...(hovered ? variantStyles[variant].hover : variantStyles[variant].normal),
  };

  if (href) {
    return (
      <a
        href={href}
        className={className}
        style={style}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
