import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-slate-100 mb-2">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-4 py-2.5 text-base rounded-lg border-2 bg-dark-800 border-dark-700 text-white placeholder-slate-200 shadow-sm focus:border-success focus:bg-dark-700/40 focus:outline-none disabled:bg-dark-700 disabled:border-dark-700 disabled:text-slate-200 disabled:cursor-not-allowed transition-all duration-200 ${
          error ? 'border-error focus:border-error' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-error text-sm mt-1.5 font-medium">{error}</p>}
      {helperText && <p className="text-slate-200 text-sm mt-1.5">{helperText}</p>}
    </div>
  );
}
