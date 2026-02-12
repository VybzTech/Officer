import { type SelectHTMLAttributes, forwardRef, useState } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Label text displayed above the select */
  label?: string;
  /** Error message displayed below the select */
  error?: string;
  /** Helper text displayed below the select */
  helperText?: string;
  /** Icon component from lucide-react */
  icon?: LucideIcon;
  /** Icon name as string (e.g., 'User', 'MapPin') */
  iconName?: string;
  /** Select options */
  options: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Select size variant */
  selectSize?: "sm" | "md" | "lg";
  /** Full width */
  fullWidth?: boolean;
  /** Required field indicator */
  required?: boolean;
}

const selectSizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-4 text-base",
};

const iconSizes = {
  sm: 16,
  md: 18,
  lg: 20,
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      icon: IconComponent,
      iconName,
      options,
      placeholder,
      selectSize = "md",
      fullWidth = true,
      required,
      className = "",
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);

    // Resolve icon from iconName if provided
    let ResolvedIcon: LucideIcon | undefined = IconComponent;
    if (iconName && !IconComponent) {
      ResolvedIcon = (LucideIcons as any)[iconName] as LucideIcon | undefined;
    }

    const iconSize = iconSizes[selectSize];

    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-2 font-hubot">
            {label}
            {required && <span className="text-[#F44336] ml-1">*</span>}
          </label>
        )}

        {/* Select Container */}
        <div className="relative">
          {/* Left Icon */}
          {ResolvedIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666] pointer-events-none z-10">
              <ResolvedIcon size={iconSize} />
            </div>
          )}

          {/* Select Field */}
          <select
            ref={ref}
            required={required}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            className={`
              ${fullWidth ? "w-full" : ""}
              ${selectSizes[selectSize]}
              ${ResolvedIcon ? "pl-10" : ""}
              pr-10
              bg-white border rounded-xl
              font-hubot
              text-[#1A1A1A]
              transition-all duration-200
              outline-none
              appearance-none
              cursor-pointer
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
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Chevron Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] pointer-events-none">
            <ChevronDown size={iconSize} />
          </div>
        </div>

        {/* Helper Text / Error */}
        <div className="mt-1.5 min-h-[20px]">
          {error && (
            <p className="text-xs text-[#F44336] font-medium">{error}</p>
          )}
          {!error && helperText && (
            <p className="text-xs text-[#666]">{helperText}</p>
          )}
        </div>
      </div>
    );
  },
);

Select.displayName = "Select";
export default Select;
