import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2, type LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/utils/cn";

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
    bg-primary-500 hover:bg-primary-600
    text-sidebar font-bold
    border border-primary-500 shadow-glow-sm hover:shadow-glow
    active:scale-[0.98] transition-all duration-200
  `,
  secondary: `
    bg-sidebar hover:bg-sidebar-hover
    text-white font-semibold
    border border-sidebar-border
    shadow-lg active:scale-[0.98] transition-all duration-200
  `,
  outline: `
    bg-transparent
    border-2 border-primary-500 text-primary-500
    hover:bg-primary-500 hover:text-sidebar
    font-bold active:scale-[0.98] transition-all duration-200
  `,
  danger: `
    bg-danger hover:bg-danger-dark
    text-white font-semibold
    shadow-md active:scale-[0.98] transition-all duration-200
  `,
  ghost: `
    bg-transparent hover:bg-primary-500/10
    text-gray-600 hover:text-primary-600
    font-medium
    active:scale-[0.98] transition-all duration-200
  `,
  gradient: `
    bg-gradient-to-br from-primary-400 to-primary-600
    hover:from-primary-500 hover:to-primary-700
    text-sidebar font-bold
    shadow-glow active:scale-[0.98] transition-all duration-200
  `,
};

const sizes: Record<string, string> = {
  sm: "px-3.5 py-1.5 text-xs rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-7 py-3.5 text-base rounded-2xl gap-2.5",
  xl: "px-10 py-5 text-lg rounded-2xl gap-3",
};

const iconSizes: Record<string, number> = {
  sm: 14,
  md: 18,
  lg: 22,
  xl: 26,
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

    const defaultIconSize = iconSize || iconSizes[size] || 18;

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "relative overflow-hidden inline-flex items-center justify-center font-sans tracking-tight transition-all duration-300 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {loading && (
          <Loader2 size={defaultIconSize} className="animate-spin mr-2" />
        )}
        {!loading && ResolvedIcon && iconPosition === "left" && (
          <ResolvedIcon
            size={defaultIconSize}
            className={children ? "mr-2" : ""}
          />
        )}
        <span className="relative z-10">{children}</span>
        {!loading && ResolvedIcon && iconPosition === "right" && (
          <ResolvedIcon
            size={defaultIconSize}
            className={children ? "ml-2" : ""}
          />
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
