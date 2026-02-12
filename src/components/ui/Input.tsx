import {
  type InputHTMLAttributes,
  forwardRef,
  useState,
  type ReactNode,
} from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Icon component from lucide-react */
  icon?: LucideIcon;
  /** Icon name as string (e.g., 'Mail', 'User') */
  iconName?: string;
  /** Icon position: 'left' or 'right' */
  iconPosition?: "left" | "right";
  /** Show character count (requires maxLength prop) */
  showCount?: boolean;
  /** Custom suffix element (e.g., currency symbol, unit) */
  suffix?: ReactNode;
  /** Custom prefix element */
  prefix?: ReactNode;
  /** Input size variant */
  inputSize?: "sm" | "md" | "lg";
  /** Full width */
  fullWidth?: boolean;
  /** Required field indicator */
  required?: boolean;
}

const inputSizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-4 text-base",
};

const iconSizes = {
  sm: 16,
  md: 18,
  lg: 20,
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon: IconComponent,
      iconName,
      iconPosition = "left",
      showCount,
      suffix,
      prefix,
      inputSize = "md",
      fullWidth = true,
      required,
      className = "",
      type = "text",
      maxLength,
      value,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(value || "");

    // Resolve icon from iconName if provided
    let ResolvedIcon: LucideIcon | undefined = IconComponent;
    if (iconName && !IconComponent) {
      ResolvedIcon = (LucideIcons as any)[iconName] as LucideIcon | undefined;
    }

    const isPassword = type === "password";
    const currentType = isPassword && showPassword ? "text" : type;
    const iconSize = iconSizes[inputSize];

    // Calculate character count
    const currentLength =
      typeof value === "string" ? value.length : String(internalValue).length;
    const showCharCount = showCount && maxLength;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      props.onChange?.(e);
    };

    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-2 font-hubot">
            {label}
            {required && <span className="text-[#F44336] ml-1">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Prefix */}
          {prefix && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666] pointer-events-none">
              {prefix}
            </div>
          )}

          {/* Left Icon */}
          {ResolvedIcon && iconPosition === "left" && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666] pointer-events-none">
              <ResolvedIcon size={iconSize} />
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            type={currentType}
            value={value}
            maxLength={maxLength}
            required={required}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            onChange={handleChange}
            className={`
              ${fullWidth ? "w-full" : ""}
              ${inputSizes[inputSize]}
              ${ResolvedIcon && iconPosition === "left" ? "pl-10" : ""}
              ${ResolvedIcon && iconPosition === "right" ? "pr-10" : ""}
              ${isPassword ? "pr-10" : ""}
              ${suffix ? "pr-12" : ""}
              ${prefix ? "pl-12" : ""}
              bg-white border rounded-xl
              font-hubot
              text-[#1A1A1A] 
              placeholder:text-[#999]
              transition-all duration-200
              outline-none
              disabled:bg-[#F5F5F5] disabled:cursor-not-allowed disabled:text-[#999]
              ${
                error
                  ? "border-[#F44336] focus:border-[#F44336] focus:ring-2 focus:ring-[#F44336]/20"
                  : focused
                    ? "border-[#FFCA08] ring-2 ring-[#FFCA08]/20"
                    : "border-[#E0E0E0] hover:border-[#FFCA08]/50"
              }
              ${className}
            `}
            {...props}
          />

          {/* Right Icon */}
          {ResolvedIcon && iconPosition === "right" && !isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] pointer-events-none">
              <ResolvedIcon size={iconSize} />
            </div>
          )}

          {/* Password Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-[#1A1A1A] transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff size={iconSize} />
              ) : (
                <Eye size={iconSize} />
              )}
            </button>
          )}

          {/* Suffix */}
          {suffix && !isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] text-sm font-medium pointer-events-none">
              {suffix}
            </div>
          )}
        </div>

        {/* Helper Text / Error / Character Count */}
        <div className="flex items-center justify-between mt-1.5 min-h-[20px]">
          <div className="flex-1">
            {error && (
              <p className="text-xs text-[#F44336] font-medium">{error}</p>
            )}
            {!error && helperText && (
              <p className="text-xs text-[#666]">{helperText}</p>
            )}
          </div>
          {showCharCount && (
            <p
              className={`text-xs font-medium ml-2 ${
                currentLength > maxLength! ? "text-[#F44336]" : "text-[#666]"
              }`}
            >
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
