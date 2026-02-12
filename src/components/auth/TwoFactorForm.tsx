// ============================================
// URBAN GRAVITY - TWO FACTOR AUTHENTICATION
// OTP verification after login
// ============================================

import { useState, useRef, useEffect, type KeyboardEvent, type ClipboardEvent } from 'react';
import { Shield, Loader2, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { cn } from '@/utils/cn';

const CODE_LENGTH = 6;

export function TwoFactorForm() {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { verify2FA, isLoading, error, clearError, logout, officer } = useAuthStore();

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Auto-submit when all digits entered
  useEffect(() => {
    const fullCode = code.join('');
    if (fullCode.length === CODE_LENGTH && !code.includes('')) {
      handleVerify(fullCode);
    }
  }, [code]);

  const handleVerify = async (verificationCode: string) => {
    clearError();
    await verify2FA(verificationCode);
  };

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input
    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Arrow navigation
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH);

    if (pastedData) {
      const newCode = [...code];
      pastedData.split('').forEach((char, i) => {
        if (i < CODE_LENGTH) {
          newCode[i] = char;
        }
      });
      setCode(newCode);

      // Focus last filled input or first empty
      const lastFilledIndex = Math.min(pastedData.length - 1, CODE_LENGTH - 1);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  const handleResend = () => {
    // TODO: Implement resend logic
    setResendTimer(30);
    setCode(Array(CODE_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
  };

  const handleBack = () => {
    logout();
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">Two-Factor Authentication</h1>
        <p className="mt-2 text-sm text-gray-400">
          Enter the 6-digit code from your authenticator app
        </p>
        {officer && (
          <p className="mt-1 text-xs text-gray-500">
            Signing in as {officer.email}
          </p>
        )}
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-lg bg-danger/10 border border-danger/20 p-4 text-danger">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* OTP Input */}
      <div className="space-y-6">
        <div className="flex justify-center gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={isLoading}
              className={cn(
                'h-14 w-12 rounded-lg border bg-surface-raised text-center text-xl font-bold text-white',
                'focus:outline-none focus:ring-2 transition-all duration-200',
                'disabled:cursor-not-allowed disabled:opacity-50',
                error
                  ? 'border-danger focus:border-danger focus:ring-danger/20'
                  : digit
                    ? 'border-primary-500 focus:border-primary-500 focus:ring-primary-500/20'
                    : 'border-sidebar-border focus:border-primary-500 focus:ring-primary-500/20'
              )}
            />
          ))}
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center justify-center gap-2 text-primary-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Verifying...</span>
          </div>
        )}

        {/* Resend Code */}
        <div className="text-center">
          {resendTimer > 0 ? (
            <p className="text-sm text-gray-500">
              Resend code in <span className="text-white font-medium">{resendTimer}s</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 mx-auto text-sm text-primary-400 hover:text-primary-300 transition-colors disabled:opacity-50"
            >
              <RefreshCw className="h-4 w-4" />
              Resend Code
            </button>
          )}
        </div>

        {/* Back Button */}
        <button
          type="button"
          onClick={handleBack}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 mx-auto text-sm text-gray-400 hover:text-gray-300 transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </button>
      </div>

      {/* Security Info */}
      <div className="mt-8 rounded-lg border border-sidebar-border bg-surface-raised p-4">
        <p className="text-xs text-gray-400 text-center">
          For your security, this session will expire in <span className="text-white">5 minutes</span>.
          If you don&apos;t have access to your authenticator, contact your administrator.
        </p>
      </div>

      {/* Demo Note */}
      <div className="mt-4 rounded-lg border border-primary-500/20 bg-primary-500/5 p-4">
        <p className="text-xs text-primary-400 text-center">
          <strong>Demo:</strong> Enter any 6 digits to proceed
        </p>
      </div>

      {/* Footer */}
      <p className="mt-8 text-center text-xs text-gray-500">
        Protected by Urban Gravity Security
      </p>
    </div>
  );
}
