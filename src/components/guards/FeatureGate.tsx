// ============================================
// URBAN GRAVITY - FEATURE GATE
// Conditional rendering based on feature flags
// ============================================

import type { ReactNode } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { useFeatureFlagsStore, type FeatureFlagKey } from '@/stores/feature-flags.store';

interface FeatureGateProps {
  /** The feature flag key to check */
  feature: FeatureFlagKey;
  /** Content to render when feature is enabled */
  children: ReactNode;
  /** Optional fallback when feature is disabled */
  fallback?: ReactNode;
  /** Optional - render nothing instead of fallback */
  silent?: boolean;
}

/**
 * FeatureGate - Conditionally renders children based on feature flags
 *
 * @example
 * <FeatureGate feature="AI_INSIGHTS">
 *   <AIInsightsPanel />
 * </FeatureGate>
 *
 * @example
 * <FeatureGate feature="BULK_OPERATIONS" fallback={<UpgradePrompt />}>
 *   <BulkActionsPanel />
 * </FeatureGate>
 */
export function FeatureGate({
  feature,
  children,
  fallback = null,
  silent = false,
}: FeatureGateProps) {
  const { officer } = useAuthStore();
  const { isFeatureEnabled } = useFeatureFlagsStore();

  if (!officer) {
    return silent ? null : <>{fallback}</>;
  }

  const isEnabled = isFeatureEnabled(feature, officer.role);

  if (isEnabled) {
    return <>{children}</>;
  }

  if (silent) {
    return null;
  }

  return <>{fallback}</>;
}

/**
 * Hook for programmatic feature flag checks
 */
export function useFeature(feature: FeatureFlagKey): boolean {
  const { officer } = useAuthStore();
  const { isFeatureEnabled } = useFeatureFlagsStore();

  if (!officer) return false;
  return isFeatureEnabled(feature, officer.role);
}
