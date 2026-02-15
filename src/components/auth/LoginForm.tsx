// ============================================
// URBAN GRAVITY - LOGIN FORM
// Secure authentication for Urban Gravity Officers
// ============================================

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";
import type { Officer } from "@/types";
import ComboText from "../ui/ComboText";
import { OptimizedImage } from "../ui/OptimizedImage";
import logo from "../../assets/images/ug-logo.png";
import { Input } from "../ui";
import CTAButton from "../ui/CTAButton";

// ==================== VALIDATION SCHEMA ====================
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Access identifier is required")
    .email("Please enter a valid official email address"),
  password: z
    .string()
    .min(1, "Security key is required")
    .min(8, "Password must be at least 8 characters for security compliance"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// ==================== MOCK DATA ====================
const MOCK_OFFICER: Officer = {
  id: "off-001",
  email: "admin@urbangravity.ng",
  firstName: "Adebayo",
  lastName: "Ogundimu",
  phone: "+234 803 456 7890",
  role: "SUPER_ADMIN",
  status: "ACTIVE",
  assignedRegions: ["region-001", "region-002"],
  assignedLgas: ["lga-001", "lga-002", "lga-003"],
  permissions: [],
  twoFactorEnabled: true,
  lastLoginAt: new Date().toISOString(),
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: new Date().toISOString(),
};

// ==================== COMPONENT ====================
export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    setLoginPending,
    setLoginSuccess,
    setLoginError,
    isLoading,
    error,
    clearError,
  } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    clearError();
    setLoginPending();

    try {
      // Simulate high-security authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1800));

      if (
        data.email === "admin@urbangravity.ng" &&
        data.password === "password123"
      ) {
        setLoginSuccess(MOCK_OFFICER, "session-sha256-v1");
      } else {
        throw new Error(
          "Authentication failed: Invalid credentials or account restricted",
        );
      }
    } catch (err) {
      setLoginError(
        err instanceof Error
          ? err.message
          : "Login failed. System breach protection active.",
      );
    }
  };

  return (
    <div className="w-full h-max space-y-8 animate-slide-in justify-between flex flex-col">
      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 rounded-2xl bg-danger-light/10 border border-danger-light/20 p-5 text-danger-dark animate-pulse">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-bold">Security Alert</p>
            <p className="text-xs font-semibold opacity-80">{error}</p>
          </div>
        </div>
      )}

      {/* Formal Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            id="email"
            {...register("email")}
            label="Email Address"
            type="email"
            placeholder="Enter your official email"
            required
            disabled={isLoading}
            iconName="Mail"
            iconPosition="right"
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            helperText="Must be at least 8 characters"
            error={errors.password?.message}
            disabled={isLoading}
            {...register("password")}
          />
        </div>
        {/* Remember / Audit Consent */}
        {/* TODO: Add Remember / Audit Consent Functionality */}
        <label className="flex items-center gap-3 cursor-pointer group select-none py-5">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              className="peer h-7 w-7 rounded-lg border-2 border-gray-100 bg-gray-50 text-sidebar focus:ring-0 focus:ring-offset-0 transition-all checked:border-primary-500 checked:bg-primary-500 checked:appearance-none"
            />
            <ShieldCheck
              className="absolute inset-0 m-auto h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
              strokeWidth={2}
            />
          </div>
          <span className="text-[11.5px] font-sans tracking-tighter text-gray-400 group-hover:text-gray-500 transition-colors tracking-widest">
            Declare session for audit
          </span>
        </label>
        <CTAButton
          type="submit"
          variant="primary"
          className="h-16 shadow-premium shadow-primary-500/20 w-full"
          children={isLoading ? "Encrypting Session..." : "Initiate Access"}
        />
      </form>

      {/* Demo Credentials (Mini Card) */}
      {/* <div className="rounded-2xl bg-sidebar p-5 text-white/90 shadow-premium-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <ShieldCheck className="h-12 w-12" />
        </div>
        <p className="text-[10px] font-black text-primary-500 uppercase tracking-[0.2em] mb-3">
          Development Environment
        </p>
        <div className="space-y-2 relative z-10">
          <div className="flex justify-between text-xs">
            <span className="text-white/50 font-bold uppercase tracking-tighter">
              ID:
            </span>
            <span className="font-mono text-primary-200">
              admin@urbangravity.ng
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-white/50 font-bold uppercase tracking-tighter">
              Key:
            </span>
            <span className="font-mono text-primary-200">password123</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
