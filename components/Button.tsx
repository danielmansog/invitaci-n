
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'custom';
  href?: string;
  target?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  href,
  target,
  className = '',
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-cormorant font-semibold tracking-wider text-lg rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out";
  
  let variantStyle = '';
  switch (variant) {
    case 'primary':
      variantStyle = "bg-gold text-white hover:bg-gold-dark focus:ring-gold-dark px-8 py-3"; // Approx 15px 30px
      break;
    case 'secondary':
      variantStyle = "bg-siena text-white hover:bg-siena-dark focus:ring-siena-dark px-6 py-2.5"; // Approx 10px 22px
      break;
    case 'custom':
      variantStyle = ""; // Use className for full control
      break;
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={`${baseStyle} ${variantStyle} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`${baseStyle} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
