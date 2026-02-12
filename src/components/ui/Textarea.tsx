import { type TextareaHTMLAttributes, forwardRef, useState } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text displayed above the textarea */
  label?: string;
  /** Error message displayed below the textarea */
  error?: string;
  /** Helper text displayed below the textarea */
  helperText?: string;
  /** Show character count (requires maxLength prop) */
  showCount?: boolean;
  /** Textarea size variant */
  textareaSize?: "sm" | "md" | "lg";
  /** Full width */
  fullWidth?: boolean;
  /** Required field indicator */
  required?: boolean;
  /** Auto-resize based on content */
  autoResize?: boolean;
}

const textareaSizes = {
  sm: "px-3 py-2 text-sm min-h-[80px]",
  md: "px-4 py-3 text-sm min-h-[120px]",
  lg: "px-5 py-4 text-base min-h-[160px]",
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      showCount,
      textareaSize = "md",
      fullWidth = true,
      required,
      autoResize = false,
      className = "",
      maxLength,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value || "");

    // Calculate character count
    const currentLength =
      typeof value === "string" ? value.length : String(internalValue).length;
    const showCharCount = showCount && maxLength;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInternalValue(e.target.value);

      // Auto-resize logic
      if (autoResize) {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }

      onChange?.(e);
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

        {/* Textarea Field */}
        <textarea
          ref={ref}
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
            ${textareaSizes[textareaSize]}
            ${autoResize ? "resize-none overflow-hidden" : "resize-y"}
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

Textarea.displayName = "Textarea";
export default Textarea;
