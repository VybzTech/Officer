// ============================================
// URBAN GRAVITY - LOGIN FORM
// Secure authentication for Urban Gravity Officers
// ============================================

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
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
    <div className="w-full space-y-8 animate-slide-in">
      <div className="flex gap-5 items-center justify-left">
        <OptimizedImage
          src={logo}
          alt="Urban Gravity"
          width={70}
          height={70}
        />

        <ComboText
          firstText={"Urban"}
          secondText={"Gravity"}
          fontFamily="hubot"
          fontWeight="bold"
          size={28}
          gap={1}
          className="tracking-tighter"
        />
      </div>
      {/* 1. Header with Badge */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100/50 border border-primary-200">
          <ShieldCheck className="h-3.5 w-3.5 text-primary-600" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">
            Secured System Access
          </span>
        </div>
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
            Authorised <span className="text-primary-500">Personnel</span> Only.
          </h1>
          <p className="mt-2 text-sm font-medium text-gray-500 leading-relaxed">
            Enter your official credentials below to access the Urban Gravity
            administrative environment.
          </p>
        </div>
      </div>

      {/* 2. Error Message */}
      {error && (
        <div className="flex items-start gap-3 rounded-2xl bg-danger-light/10 border border-danger-light/20 p-5 text-danger-dark animate-pulse">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-bold">Security Alert</p>
            <p className="text-xs font-semibold opacity-80">{error}</p>
          </div>
        </div>
      )}

      {/* 3. Formal Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div className="group space-y-2">
          <label
            htmlFor="email"
            className="block text-xs font-black uppercase tracking-[0.15em] text-gray-400 group-focus-within:text-primary-600 transition-colors"
          >
            Official ID / Email
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Mail
                className={cn(
                  "h-5 w-5 transition-colors",
                  errors.email
                    ? "text-danger"
                    : "text-gray-300 group-focus-within:text-primary-500",
                )}
              />
            </div>
            <input
              id="email"
              type="email"
              placeholder="name@officer.urbangravity.ng"
              className={cn(
                "w-full rounded-2xl border bg-gray-50 py-4 pl-12 pr-4 text-gray-900 font-bold",
                "placeholder:text-gray-300 placeholder:font-medium outline-none ring-offset-2 transition-all duration-300",
                errors.email
                  ? "border-danger-light bg-danger-light/5 text-danger focus:ring-4 focus:ring-danger/10"
                  : "border-gray-100 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10",
              )}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-[11px] font-bold text-danger px-1 uppercase tracking-tighter transition-all">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="group space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-xs font-black uppercase tracking-[0.15em] text-gray-400 group-focus-within:text-primary-600 transition-colors"
            >
              Security Key
            </label>
            <button
              type="button"
              className="text-[10px] font-bold text-gray-400 hover:text-primary-500 uppercase tracking-widest transition-colors"
            >
              Lost Key?
            </button>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Lock
                className={cn(
                  "h-5 w-5 transition-colors",
                  errors.password
                    ? "text-danger"
                    : "text-gray-300 group-focus-within:text-primary-500",
                )}
              />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              className={cn(
                "w-full rounded-2xl border bg-gray-50 py-4 pl-12 pr-12 text-gray-900 font-bold",
                "placeholder:text-gray-300 outline-none ring-offset-2 transition-all duration-300",
                errors.password
                  ? "border-danger-light bg-danger-light/5 text-danger focus:ring-4 focus:ring-danger/10"
                  : "border-gray-100 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10",
              )}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-300 hover:text-primary-500 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] font-bold text-danger px-1 uppercase tracking-tighter transition-all">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember / Audit Consent */}
        <label className="flex items-center gap-3 cursor-pointer group select-none">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              className="peer h-5 w-5 rounded-lg border-2 border-gray-100 bg-gray-50 text-sidebar focus:ring-0 focus:ring-offset-0 transition-all checked:border-primary-500 checked:bg-primary-500"
            />
            <ShieldCheck
              className="absolute inset-0 m-auto h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
              strokeWidth={3}
            />
          </div>
          <span className="text-[11px] font-bold text-gray-400 group-hover:text-gray-500 transition-colors uppercase tracking-widest">
            Declare session for Lagos region audit
          </span>
        </label>

        {/* Submit */}
        <Button
          type="submit"
          loading={isLoading}
          variant="primary"
          fullWidth
          size="lg"
          className="h-16 shadow-premium shadow-primary-500/20"
        >
          {isLoading ? "Decrypting Session..." : "Initiate Secure Access"}
        </Button>
      </form>

      {/* 4. Help / Support Footer */}
      <div className="pt-8 flex items-center justify-between border-t border-gray-50">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Security Core Online
          </span>
        </div>
        <button className="text-[10px] font-bold text-primary-500 hover:underline uppercase tracking-widest">
          Support Center
        </button>
      </div>

      {/* Demo Credentials (Mini Card) */}
      <div className="rounded-2xl bg-sidebar p-5 text-white/90 shadow-premium-lg relative overflow-hidden group">
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
      </div>
    </div>
  );
}
