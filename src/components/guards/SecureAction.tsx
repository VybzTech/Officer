// ============================================
// URBAN GRAVITY - SECURE ACTION
// Re-authentication for sensitive operations
// ============================================

import { useState, type ReactNode, type MouseEvent } from 'react';
import { Lock, AlertTriangle, Loader2, X, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import type { Permission } from '@/types';
import { requiresReAuth, PERMISSION_LABELS } from '@/permissions';
import { cn } from '@/utils/cn';

interface SecureActionProps {
  /** The permission associated with this action */
  permission: Permission;
  /** Whether to force re-auth regardless of permission type */
  forceReAuth?: boolean;
  /** The action to perform after re-auth */
  onConfirm: () => void | Promise<void>;
  /** Children can be a button or any clickable element */
  children: ReactNode;
  /** Optional confirmation message */
  confirmMessage?: string;
  /** Danger action styling */
  isDanger?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * SecureAction - Wraps sensitive actions with re-authentication
 *
 * For sensitive operations like:
 * - Releasing escrow
 * - Deleting users
 * - Changing app config
 * - Managing feature flags
 *
 * @example
 * <SecureAction
 *   permission="RELEASE_ESCROW"
 *   onConfirm={() => releaseEscrow(escrowId)}
 *   confirmMessage="Release ₦500,000 to landlord?"
 * >
 *   <Button>Release Escrow</Button>
 * </SecureAction>
 */
export function SecureAction({
  permission,
  forceReAuth = false,
  onConfirm,
  children,
  confirmMessage,
  isDanger = false,
  disabled = false,
}: SecureActionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { hasPermission, officer } = useAuthStore();

  // Check if user has permission
  if (!hasPermission(permission)) {
    return null;
  }

  // Check if re-auth is needed
  const needsReAuth = forceReAuth || requiresReAuth(permission);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    if (needsReAuth) {
      setIsModalOpen(true);
      setPassword('');
      setError(null);
    } else {
      onConfirm();
    }
  };

  const handleVerify = async () => {
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // await api.post('/auth/verify-password', { password });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation (accept any password for demo)
      const isValid = password.length >= 1; // Replace with actual validation

      if (isValid) {
        setIsModalOpen(false);
        await onConfirm();
      } else {
        setError('Invalid password. Please try again.');
      }
    } catch {
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isVerifying) {
      handleVerify();
    }
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {/* Wrapped Child Element */}
      <div
        onClick={handleClick}
        className={cn(disabled && 'opacity-50 cursor-not-allowed')}
      >
        {children}
      </div>

      {/* Re-auth Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md rounded-xl bg-surface-raised border border-sidebar-border shadow-2xl animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg',
                  isDanger ? 'bg-danger/10' : 'bg-warning/10'
                )}>
                  {isDanger ? (
                    <AlertTriangle className="h-5 w-5 text-danger" />
                  ) : (
                    <Lock className="h-5 w-5 text-warning" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Verify Your Identity
                  </h3>
                  <p className="text-sm text-gray-400">
                    This action requires authentication
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-sidebar-hover transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-5">
              {/* Action Description */}
              <div className={cn(
                'rounded-lg p-4',
                isDanger ? 'bg-danger/5 border border-danger/20' : 'bg-warning/5 border border-warning/20'
              )}>
                <p className={cn(
                  'text-sm font-medium',
                  isDanger ? 'text-danger' : 'text-warning'
                )}>
                  Action: {PERMISSION_LABELS[permission]}
                </p>
                {confirmMessage && (
                  <p className="mt-1 text-sm text-gray-300">{confirmMessage}</p>
                )}
              </div>

              {/* Email Display */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Signed in as</label>
                <p className="text-white font-medium">{officer?.email}</p>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="secure-password" className="text-sm font-medium text-gray-300">
                  Enter your password to continue
                </label>
                <div className="relative">
                  <input
                    id="secure-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your password"
                    autoFocus
                    disabled={isVerifying}
                    className={cn(
                      'w-full rounded-lg border bg-surface py-3 pl-4 pr-12 text-white',
                      'placeholder:text-gray-500 focus:outline-none focus:ring-2',
                      'transition-colors duration-200',
                      'disabled:cursor-not-allowed disabled:opacity-50',
                      error
                        ? 'border-danger focus:border-danger focus:ring-danger/20'
                        : 'border-sidebar-border focus:border-primary-500 focus:ring-primary-500/20'
                    )}
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
                {error && (
                  <p className="text-sm text-danger">{error}</p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-sidebar-border">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isVerifying}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-sidebar-hover transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleVerify}
                disabled={isVerifying || !password.trim()}
                className={cn(
                  'px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                  isDanger
                    ? 'bg-danger hover:bg-danger-dark'
                    : 'bg-primary-600 hover:bg-primary-500'
                )}
              >
                {isVerifying ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  'Confirm'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
