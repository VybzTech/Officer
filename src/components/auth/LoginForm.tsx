// ============================================
// URBAN GRAVITY - LOGIN FORM
// Secure login with validation
// ============================================

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { cn } from '@/utils/cn';
import type { Officer } from '@/types';

// ==================== VALIDATION SCHEMA ====================
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// ==================== MOCK DATA (Replace with API) ====================
const MOCK_OFFICER: Officer = {
  id: 'off-001',
  email: 'admin@urbangravity.ng',
  firstName: 'Adebayo',
  lastName: 'Ogundimu',
  phone: '+234 803 456 7890',
  role: 'SUPER_ADMIN',
  status: 'ACTIVE',
  assignedRegions: ['region-001', 'region-002'],
  assignedLgas: ['lga-001', 'lga-002', 'lga-003'],
  permissions: [],
  twoFactorEnabled: true,
  lastLoginAt: new Date().toISOString(),
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: new Date().toISOString(),
};

// ==================== COMPONENT ====================
export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { setLoginPending, setLoginSuccess, setLoginError, isLoading, error, clearError } =
    useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    clearError();
    setLoginPending();

    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/login', data);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock validation
      if (data.email === 'admin@urbangravity.ng' && data.password === 'password123') {
        setLoginSuccess(MOCK_OFFICER, 'session-123');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600">
          <span className="text-2xl font-bold text-white">UG</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Officer Portal</h1>
        <p className="mt-2 text-sm text-gray-400">
          Sign in to access the Urban Gravity dashboard
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-lg bg-danger/10 border border-danger/20 p-4 text-danger">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email Address
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@urbangravity.ng"
              className={cn(
                'w-full rounded-lg border bg-surface-raised py-3 pl-12 pr-4 text-white',
                'placeholder:text-gray-500 focus:outline-none focus:ring-2',
                'transition-colors duration-200',
                errors.email
                  ? 'border-danger focus:border-danger focus:ring-danger/20'
                  : 'border-sidebar-border focus:border-primary-500 focus:ring-primary-500/20'
              )}
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-danger">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              className={cn(
                'w-full rounded-lg border bg-surface-raised py-3 pl-12 pr-12 text-white',
                'placeholder:text-gray-500 focus:outline-none focus:ring-2',
                'transition-colors duration-200',
                errors.password
                  ? 'border-danger focus:border-danger focus:ring-danger/20'
                  : 'border-sidebar-border focus:border-primary-500 focus:ring-primary-500/20'
              )}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-300"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-danger">{errors.password.message}</p>
          )}
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-sidebar-border bg-surface-raised text-primary-500 focus:ring-primary-500/20"
            />
            <span className="text-sm text-gray-400">Remember me</span>
          </label>
          <button
            type="button"
            className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'w-full rounded-lg bg-primary-600 py-3 font-semibold text-white',
            'transition-all duration-200',
            'hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Signing in...
            </span>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Demo Credentials */}
      <div className="mt-8 rounded-lg border border-sidebar-border bg-surface-raised p-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
          Demo Credentials
        </p>
        <div className="space-y-1 text-sm">
          <p className="text-gray-300">
            <span className="text-gray-500">Email:</span> admin@urbangravity.ng
          </p>
          <p className="text-gray-300">
            <span className="text-gray-500">Password:</span> password123
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-center text-xs text-gray-500">
        Protected by Urban Gravity Security
      </p>
    </div>
  );
}
