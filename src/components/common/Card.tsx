import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  hover?: boolean;
}

export function Card({ children, className = '', title, hover = false }: CardProps) {
  return (
    <div
      className={`bg-dark-800 border border-dark-700 rounded-xl p-6 transition-all duration-200 ${
        hover ? 'hover:border-dark-600 hover:shadow-lg' : ''
      } ${className}`}
    >
      {title && <h2 className="text-base font-semibold text-white mb-4">{title}</h2>}
      {children}
    </div>
  );
}
