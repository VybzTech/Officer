import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export default function Card({ children, hover, className = '', ...props }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-[#F0F0F0] shadow-sm p-4 ${hover ? 'hover:shadow-md transition-shadow cursor-pointer' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
}
