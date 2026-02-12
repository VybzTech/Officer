// ============================================
// URBAN GRAVITY - PERMISSION GATE
// Conditional rendering based on permissions
// ============================================

import type { ReactNode } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import type { Permission } from '@/types';

interface PermissionGateProps {
  /** Single permission required */
  permission?: Permission;
  /** Multiple permissions - user must have ALL */
  permissions?: Permission[];
  /** Multiple permissions - user must have ANY */
  anyPermission?: Permission[];
  /** Content to render when permission check passes */
  children: ReactNode;
  /** Optional fallback when permission check fails */
  fallback?: ReactNode;
  /** Optional - render nothing instead of fallback */
  silent?: boolean;
}

/**
 * PermissionGate - Conditionally renders children based on user permissions
 *
 * @example
 * // Single permission
 * <PermissionGate permission="APPROVE_LISTING">
 *   <ApproveButton />
 * </PermissionGate>
 *
 * @example
 * // All permissions required
 * <PermissionGate permissions={['VIEW_ESCROW', 'RELEASE_ESCROW']}>
 *   <EscrowPanel />
 * </PermissionGate>
 *
 * @example
 * // Any permission
 * <PermissionGate anyPermission={['APPROVE_LISTING', 'REJECT_LISTING']}>
 *   <ListingActions />
 * </PermissionGate>
 *
 * @example
 * // With fallback
 * <PermissionGate permission="VIEW_API_LOGS" fallback={<AccessDenied />}>
 *   <ApiLogs />
 * </PermissionGate>
 */
export function PermissionGate({
  permission,
  permissions,
  anyPermission,
  children,
  fallback = null,
  silent = false,
}: PermissionGateProps) {
  const { hasPermission, hasAllPermissions, hasAnyPermission } = useAuthStore();

  let hasAccess = true;

  // Check single permission
  if (permission) {
    hasAccess = hasPermission(permission);
  }

  // Check all permissions
  if (hasAccess && permissions && permissions.length > 0) {
    hasAccess = hasAllPermissions(permissions);
  }

  // Check any permission
  if (hasAccess && anyPermission && anyPermission.length > 0) {
    hasAccess = hasAnyPermission(anyPermission);
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  if (silent) {
    return null;
  }

  return <>{fallback}</>;
}

/**
 * Hook for programmatic permission checks
 */
export function usePermission(permission: Permission): boolean {
  const { hasPermission } = useAuthStore();
  return hasPermission(permission);
}

/**
 * Hook for checking multiple permissions
 */
export function usePermissions(permissions: Permission[]): {
  hasAll: boolean;
  hasAny: boolean;
  check: (p: Permission) => boolean;
} {
  const { hasPermission, hasAllPermissions, hasAnyPermission } = useAuthStore();

  return {
    hasAll: hasAllPermissions(permissions),
    hasAny: hasAnyPermission(permissions),
    check: hasPermission,
  };
}
