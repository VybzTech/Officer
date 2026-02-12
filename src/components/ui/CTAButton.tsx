// import React, {
//   useRef,
//   type ReactNode,
//   type ButtonHTMLAttributes,
// } from "react";

// interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: "purple-blue" | "teal" | "default";
//   children: ReactNode;
//   className?: string;
//   ripple?: boolean; // default true
// }

// const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
//   (
//     {
//       variant = "default",
//       children,
//       className,
//       ripple = true,
//       onClick,
//       ...props
//     },
//     ref,
//   ) => {
//     const buttonRef = useRef<HTMLButtonElement>(null);

//     const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
//       if (!ripple || !buttonRef.current) return;

//       const btn = buttonRef.current;
//       const rect = btn.getBoundingClientRect();
//       const size = Math.max(rect.width, rect.height);

//       const x = event.clientX - rect.left - size / 2;
//       const y = event.clientY - rect.top - size / 2;

//       const circle = document.createElement("span");
//       circle.classList.add(
//         "absolute",
//         "rounded-full",
//         "bg-white/30",
//         "pointer-events-none",
//         "animate-ripple",
//       );
//       circle.style.width = circle.style.height = `${size}px`;
//       circle.style.left = `${x}px`;
//       circle.style.top = `${y}px`;

//       // Remove old ripples if many clicks happen fast
//       const oldRipple = btn.querySelector(".animate-ripple");
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
//       focus:ring-1 focus:outline-none transition-all duration-200
//       shadow-md hover:shadow-lg active:shadow-sm
//       ${className}`;

//     const variantStyles = {
//       "purple-blue":
//         "bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800",
//       teal: "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-teal-800/80",
//       default:
//         "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:ring-indigo-300",
//     }[variant];

//     return (
//       <button
//         ref={(node) => {
//           buttonRef.current = node;
//           if (typeof ref === "function") ref(node);
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
//   },
// );

// CTAButton.displayName = "CTAButton";

// export default CTAButton;

import React, {
  useRef,
  type ReactNode,
  type ButtonHTMLAttributes,
} from "react";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "default" | "purple-blue" | "teal"; // added primary
  children: ReactNode;
  className?: string;
  ripple?: boolean;
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  (
    {
      variant = "default",
      children,
      className = "",
      ripple = true,
      onClick,
      ...props
    },
    ref,
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!ripple || !buttonRef.current) return;

      const btn = buttonRef.current;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const circle = document.createElement("span");
      circle.classList.add(
        "absolute",
        "inset-0",
        "rounded-full",
        "bg-white/25",
        "pointer-events-none",
        "animate-ripple",
        "scale-0",
        "origin-center",
      );
      circle.style.width = circle.style.height = `${size}px`;
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      const old = btn.querySelector(".animate-ripple");
      if (old) old.remove();

      btn.appendChild(circle);

      setTimeout(() => circle.remove(), 700);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(e);
      onClick?.(e);
    };

    // Base (common to all)
    const base = `relative overflow-hidden
       font-medium rounded-[11px] font-hubot
      text-[15px] px-6 py-3 text-center leading-5
      focus:ring-1 focus:outline-none focus:ring-offset-10 transition-all duration-200
      shadow-md hover:shadow-md active:shadow-sm active:scale-[0.98]
      ${className}`;

    // Variant-specific
    const variants = {
      primary: `
        bg-gradient-to-br from-[#ffda0b] via-[#FFCA08] to-[#ffda0b]
        hover:bg-gradient-to-br hover:from:[#ffda0b] hover:via-[#f4c03d] hover:to-[#ffda0b]
        text-white hover:cursor-pointer hover:disabled:cursor-not-allowed
        focus:ring-[#FFCA08]/50 focus:ring-offset-[#FFCA08]/30
        border border-2 border-[#ffda0b] hover:border-[#FFdA0B]
      `,
      default: `
        bg-gradient-to-br from-[#FAFAFA] via-[#F5F5F5] to-[#EDEDED]
        hover:from-[#F0F0F0] hover:via-[#E8E8E8] hover:to-[#E0E0E0]
        text-[#1A1A1A]
        border border-[#E0E0E0] hover:border-[#FFCA08]/70
        focus:ring-gray-300/50 focus:ring-offset-2
      `,
      "purple-blue": `
        bg-gradient-to-br from-purple-600 to-blue-500
        hover:bg-gradient-to-bl
        focus:ring-blue-300 dark:focus:ring-blue-800
      `,
      teal: `
        bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600
        hover:bg-gradient-to-br
        focus:ring-teal-300 dark:focus:ring-teal-800
        shadow-lg shadow-teal-500/40 dark:shadow-teal-800/60
      `,
    };

    return (
      <button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        type="button"
        className={`${base} ${variants[variant] || variants.default}`}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  },
);

CTAButton.displayName = "CTAButton";

export default CTAButton;
