import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    'font-semibold rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:shadow-md active:shadow-sm disabled:shadow-none';

  const variantStyles = {
    primary: 'bg-primary hover:bg-primary-hover text-white disabled:bg-dark-700 disabled:text-slate-200',
    secondary: 'bg-dark-700 hover:bg-dark-600 text-slate-50 disabled:bg-dark-700 disabled:text-slate-200',
    ghost: 'bg-transparent hover:bg-slate-100/10 text-slate-50 border border-slate-100 hover:border-slate-50 disabled:text-slate-200 disabled:border-dark-700',
    danger: 'bg-error hover:bg-error-hover text-white disabled:bg-dark-700 disabled:text-slate-200',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm h-8 rounded-lg',
    md: 'px-5 py-3 text-[15px] h-10',
    lg: 'px-6 py-3.5 text-[15px] h-12',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
