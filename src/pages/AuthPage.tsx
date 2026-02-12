// ============================================
// URBAN GRAVITY - AUTH PAGE
// Login and 2FA flows
// ============================================

import { LoginForm, TwoFactorForm } from '@/components/auth';
import { useAuthStore } from '@/stores/auth.store';

export function AuthPage() {
  const { authStep } = useAuthStore();

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
              <span className="text-xl font-bold text-white">UG</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Urban Gravity</h2>
              <p className="text-sm text-primary-200">Officer Dashboard</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight">
              Manage Lagos
              <br />
              Real Estate
              <br />
              <span className="text-primary-300">Efficiently.</span>
            </h1>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500/20 text-primary-300 text-sm">
                ✓
              </div>
              <p className="text-primary-100">
                Review and approve listings, verifications, and upgrades
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500/20 text-primary-300 text-sm">
                ✓
              </div>
              <p className="text-primary-100">
                Monitor regional activity across all 20 Lagos LGAs
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500/20 text-primary-300 text-sm">
                ✓
              </div>
              <p className="text-primary-100">
                Secure escrow management and dispute resolution
              </p>
            </div>
          </div>
        </div>

        <div className="text-sm text-primary-300">
          © {new Date().getFullYear()} Urban Gravity. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          {authStep === 'LOGIN' && <LoginForm />}
          {authStep === 'TWO_FACTOR' && <TwoFactorForm />}
        </div>
      </div>
    </div>
  );
}
