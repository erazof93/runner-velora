import type { ReactNode } from 'react';
import type { AccentColor } from './AccentBar';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  accentColor?: AccentColor;
  hover?: boolean;
}

const accentBorderMap: Record<AccentColor, string> = {
  green: 'border-l-success',
  orange: 'border-l-secondary',
  red: 'border-l-error',
  purple: 'border-l-purple',
  blue: 'border-l-blue',
  yellow: 'border-l-warning',
};

export function Card({
  children,
  className = '',
  title,
  subtitle,
  accentColor,
  hover = false,
}: CardProps) {
  return (
    <div
      className={`bg-dark-800 border border-dark-700 rounded-2xl p-4 transition-all duration-200 ${
        accentColor ? `border-l-4 ${accentBorderMap[accentColor]}` : ''
      } ${hover ? 'hover:border-dark-600 hover:shadow-lg' : ''} ${className}`}
    >
      {title && (
        <div className="mb-3">
          <h2 className="text-base font-semibold text-white">{title}</h2>
          {subtitle && <p className="text-xs text-slate-100 mt-0.5">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
