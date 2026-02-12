import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2, type LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "danger"
    | "ghost"
    | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
  /** Icon component from lucide-react */
  icon?: LucideIcon;
  /** Icon name as string (e.g., 'ArrowRight', 'Check') */
  iconName?: string;
  /** Icon position: 'left' or 'right' */
  iconPosition?: "left" | "right";
  /** Icon size in pixels */
  iconSize?: number;
}

const variants: Record<string, string> = {
  primary: `
    bg-gradient-to-br from-[#ffda0b] via-[#FFCA08] to-[#ffda0b]
    hover:from-[#ffda0b] hover:via-[#f4c03d] hover:to-[#ffda0b]
    text-[#1A1A1A] font-semibold
    border border-[#ffda0b] hover:border-[#FFdA0B]
    shadow-md hover:shadow-lg active:shadow-sm
    active:scale-[0.98]
  `,
  secondary: `
    bg-gradient-to-br from-[#2A2A2A] via-[#1A1A1A] to-[#1A1A1A]
    hover:from-[#3A3A3A] hover:via-[#2A2A2A] hover:to-[#2A2A2A]
    text-white font-semibold
    border border-[#2A2A2A]
    shadow-md hover:shadow-lg active:shadow-sm
    active:scale-[0.98]
  `,
  outline: `
    bg-gradient-to-br from-white via-[#FAFAFA] to-[#F5F5F5]
    hover:from-[#F5F5F5] hover:via-[#F0F0F0] hover:to-[#EDEDED]
    border border-[#E0E0E0] hover:border-[#FFCA08]/70
    text-[#1A1A1A] font-semibold
    shadow-sm hover:shadow-md active:shadow-sm
    active:scale-[0.98]
  `,
  danger: `
    bg-gradient-to-br from-[#F44336] via-[#E53935] to-[#D32F2F]
    hover:from-[#E53935] hover:via-[#D32F2F] hover:to-[#C62828]
    text-white font-semibold
    border border-[#F44336]
    shadow-md hover:shadow-lg active:shadow-sm
    active:scale-[0.98]
  `,
  ghost: `
    bg-transparent hover:bg-[#F5F5F5]
    text-[#666] hover:text-[#1A1A1A]
    font-medium
    active:scale-[0.98]
  `,
  gradient: `
    bg-gradient-to-br from-[#FAFAFA] via-[#F5F5F5] to-[#EDEDED]
    hover:from-[#F0F0F0] hover:via-[#E8E8E8] hover:to-[#E0E0E0]
    text-[#1A1A1A] font-semibold
    border border-[#E0E0E0] hover:border-[#FFCA08]/70
    shadow-md hover:shadow-lg active:shadow-sm
    active:scale-[0.98]
  `,
};

const sizes: Record<string, string> = {
  sm: "px-3 py-2 text-xs rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2",
  xl: "px-8 py-4 text-lg rounded-xl gap-2.5",
};

const iconSizes: Record<string, number> = {
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading,
      fullWidth,
      icon: IconComponent,
      iconName,
      iconPosition = "left",
      iconSize,
      className = "",
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    // Resolve icon from iconName if provided
    let ResolvedIcon: LucideIcon | undefined = IconComponent;
    if (iconName && !IconComponent) {
      ResolvedIcon = (LucideIcons as any)[iconName] as LucideIcon | undefined;
    }

    const defaultIconSize = iconSize || iconSizes[size];

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          relative overflow-hidden
          inline-flex items-center justify-center
          font-hubot transition-all duration-200
          focus:ring-2 focus:ring-offset-2 focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant]} 
          ${sizes[size]} 
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        {...props}
      >
        {loading && <Loader2 size={defaultIconSize} className="animate-spin" />}
        {!loading && ResolvedIcon && iconPosition === "left" && (
          <ResolvedIcon size={defaultIconSize} />
        )}
        {children}
        {!loading && ResolvedIcon && iconPosition === "right" && (
          <ResolvedIcon size={defaultIconSize} />
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;

// import React, {   useRef, type ReactNode, type ButtonHTMLAttributes } from 'react';
// // import { cn } from '@/lib/utils'; // ← optional: if you have clsx/tailwind-merge helper (very common)

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: 'purple-blue' | 'teal' | 'default';
//   children: ReactNode;
//   className?: string;
//   ripple?: boolean; // default true
// }

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   (
//     {
//       variant = 'default',
//       children,
//       className,
//       ripple = true,
//       onClick,
//       ...props
//     },
//     ref
//   ) => {
//     const buttonRef = useRef<HTMLButtonElement>(null);

//     const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
//       if (!ripple || !buttonRef.current) return;

//       const btn = buttonRef.current;
//       const rect = btn.getBoundingClientRect();
//       const size = Math.max(rect.width, rect.height);

//       const x = event.clientX - rect.left - size / 2;
//       const y = event.clientY - rect.top - size / 2;

//       const circle = document.createElement('span');
//       circle.classList.add(
//         'absolute',
//         'rounded-full',
//         'bg-white/30',
//         'pointer-events-none',
//         'animate-ripple'
//       );
//       circle.style.width = circle.style.height = `${size}px`;
//       circle.style.left = `${x}px`;
//       circle.style.top = `${y}px`;

//       // Remove old ripples if many clicks happen fast
//       const oldRipple = btn.querySelector('.animate-ripple');
//       if (oldRipple) oldRipple.remove();

//       btn.appendChild(circle);

//       // Cleanup after animation
//       setTimeout(() => {
//         circle.remove();
//       }, 700);
//     };

//     const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//       createRipple(e);
//       if (onClick) onClick(e);
//     };

//     // Base styles + variant-specific gradients
//     const baseStyles = `relative overflow-hidden
//       text-white font-medium rounded-lg
//       text-sm px-5 py-2.5 text-center leading-5
//       focus:ring-4 focus:outline-none transition-all duration-200
//       shadow-md hover:shadow-lg active:shadow-sm
//       ${className}`
//     // const baseStyles = cn(
//     //   'relative overflow-hidden',
//     //   'text-white font-medium rounded-lg', // rounded-base → assuming rounded-lg or similar in your tailwind config
//     //   'text-sm px-5 py-2.5 text-center leading-5',
//     //   'focus:ring-4 focus:outline-none transition-all duration-200',
//     //   'shadow-md hover:shadow-lg active:shadow-sm',
//     //   className
//     // );

//     const variantStyles = {
//       'purple-blue':
//         'bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800',
//       teal:
//         'bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-teal-800/80',
//       default:
//         'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:ring-indigo-300',
//     }[variant];

//     return (
//       <button
//         ref={(node) => {
//           buttonRef.current = node;
//           if (typeof ref === 'function') ref(node);
//           else if (ref) ref.current = node;
//         }}
//         type="button"
//         className={`${baseStyles} ${variantStyles}`}
//         onClick={handleClick}
//         {...props}
//       >
//         {children}
//       </button>
//     );
//   }
// );

// Button.displayName = 'Button';

// export default Button;
