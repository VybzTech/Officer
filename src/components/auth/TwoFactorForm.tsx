// ============================================
// URBAN GRAVITY - TWO FACTOR AUTHENTICATION
// Secure secondary verification for officers
// ============================================

import {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import {
  Shield,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  Fingerprint,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";

const CODE_LENGTH = 6;

export function TwoFactorForm() {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { verify2FA, isLoading, error, clearError, logout, officer } =
    useAuthStore();

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const fullCode = code.join("");
    if (fullCode.length === CODE_LENGTH && !code.includes("")) {
      handleVerify(fullCode);
    }
  }, [code]);

  const handleVerify = async (verificationCode: string) => {
    clearError();
    await verify2FA(verificationCode);
  };

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH);
    if (pastedData) {
      const newCode = [...code];
      pastedData.split("").forEach((char, i) => {
        if (i < CODE_LENGTH) newCode[i] = char;
      });
      setCode(newCode);
      const lastFilledIndex = Math.min(pastedData.length - 1, CODE_LENGTH - 1);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  const handleResend = () => {
    setResendTimer(60);
    setCode(Array(CODE_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
  };

  const handleBack = () => {
    logout();
  };

  return (
    <div className="w-full space-y-8 animate-scale-in">
      {/* 1. Security Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sidebar/5 border border-sidebar/10">
          <Fingerprint className="h-3.5 w-3.5 text-sidebar" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sidebar">
            Identity Verification Required
          </span>
        </div>
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
            Security <span className="text-primary-500">Check</span>.
          </h1>
          <p className="mt-2 text-sm font-medium text-gray-500 leading-relaxed">
            We&apos;ve sent a cryptographic code to your primary official
            device. Confirm your identity to establish a secure session.
          </p>
        </div>
      </div>

      {/* 2. Error Display */}
      {/* {error && (
        <div className="flex items-start gap-3 rounded-2xl bg-danger-light/10 border border-danger-light/20 p-5 text-danger-dark">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-bold">Verification Error</p>
            <p className="text-xs font-semibold opacity-80">{error}</p>
          </div>
        </div>
      )} */}

      {/* 3. OTP Controller */}
      <div className="space-y-10">
        <div className="flex justify-between gap-3 sm:gap-4">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={isLoading}
              className={cn(
                "h-16 w-full max-w-[56px] rounded-2xl border bg-gray-50 text-center text-2xl font-black text-gray-900",
                "outline-none ring-offset-2 transition-all duration-300",
                "disabled:opacity-50 disabled:grayscale",
                error
                  ? "border-danger focus:border-danger focus:ring-4 focus:ring-danger/10"
                  : digit
                    ? "border-primary-500 bg-white ring-4 ring-primary-500/10"
                    : "border-gray-100 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10",
              )}
            />
          ))}
        </div>

        {/* Dynamic Actions */}
        <div className="space-y-4">
          <Button
            variant="primary"
            fullWidth
            size="lg"
            className="h-16 shadow-premium shadow-primary-500/20"
            disabled={code.includes("") || isLoading}
            loading={isLoading}
            onClick={() => handleVerify(code.join(""))}
          >
            {isLoading
              ? "Verifying Credentials..."
              : "Establishing Secure Tunnel"}
          </Button>

          <div className="flex items-center justify-between px-2">
            <button
              onClick={handleBack}
              disabled={isLoading}
              className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-sidebar transition-colors uppercase tracking-[0.2em]"
            >
              <ArrowLeft className="h-4 w-4" />
              Reset Login
            </button>

            {resendTimer > 0 ? (
              <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.2em]">
                Resend in <span className="text-primary">{resendTimer}s</span>
              </span>
            ) : (
              <button
                onClick={handleResend}
                className="flex items-center gap-2 text-[10px] font-black text-primary-600 hover:text-primary-700 transition-colors uppercase tracking-[0.2em]"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Regenerate Code
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. Security Footnote */}
      {/* <div className="rounded-2xl bg-sidebar/5 border border-sidebar/10 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-sidebar">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-black text-gray-900 uppercase tracking-tighter">
              Encrypted Protocol
            </p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1">
              Lagos Center Node 04
            </p>
          </div>
        </div>
        <p className="text-[11px] font-medium text-gray-500 leading-relaxed">
          Your sessions are monitored by the Urban Gravity Anti-Fraud Engine.
          Unauthorised access attempts will be logged with full IP and regional
          tracing.
        </p>
      </div> */}
    </div>
  );
}
