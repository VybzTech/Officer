// ============================================
// URBAN GRAVITY - PERMISSION ENGINE
// Security-First Architecture
// ============================================

import type { Permission, Role, ROLE_PERMISSIONS, ROLE_HIERARCHY } from '@/types';

/**
 * Check if a role has a specific permission
 */
export function hasPermission(
  userPermissions: Permission[],
  requiredPermission: Permission
): boolean {
  return userPermissions.includes(requiredPermission);
}

/**
 * Check if a role has ALL specified permissions
 */
export function hasAllPermissions(
  userPermissions: Permission[],
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.every((p) => userPermissions.includes(p));
}

/**
 * Check if a role has ANY of the specified permissions
 */
export function hasAnyPermission(
  userPermissions: Permission[],
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.some((p) => userPermissions.includes(p));
}

/**
 * Get permissions for a role from the static mapping
 */
export function getPermissionsForRole(
  role: Role,
  rolePermissions: typeof ROLE_PERMISSIONS
): Permission[] {
  return rolePermissions[role] ?? [];
}

/**
 * Check if one role is higher than another in hierarchy
 */
export function isRoleHigherOrEqual(
  userRole: Role,
  targetRole: Role,
  hierarchy: typeof ROLE_HIERARCHY
): boolean {
  return (hierarchy[userRole] ?? 0) >= (hierarchy[targetRole] ?? 0);
}

/**
 * Permission categories for UI grouping
 */
export const PERMISSION_CATEGORIES = {
  OVERVIEW: {
    label: 'Overview',
    permissions: ['VIEW_DASHBOARD', 'VIEW_REGIONAL_METRICS', 'VIEW_AI_INSIGHTS'] as Permission[],
  },
  MARKET_VIEW: {
    label: 'Market View',
    permissions: ['VIEW_LISTINGS', 'VIEW_LANDLORDS', 'VIEW_TENANTS', 'VIEW_AGENTS'] as Permission[],
  },
  MARKET_MANAGE: {
    label: 'Market Management',
    permissions: [
      'APPROVE_LISTING', 'REJECT_LISTING', 'SUSPEND_LISTING', 'CREATE_OFFICIAL_LISTING',
      'SUSPEND_USER', 'UNSUSPEND_USER', 'DELETE_USER',
    ] as Permission[],
  },
  MODERATION: {
    label: 'Moderation',
    permissions: [
      'VIEW_VERIFICATION_REQUESTS', 'APPROVE_VERIFICATION', 'REJECT_VERIFICATION',
      'VIEW_SUBSCRIPTION_UPGRADES', 'APPROVE_SUBSCRIPTION_UPGRADE', 'REJECT_SUBSCRIPTION_UPGRADE',
      'VIEW_DISPUTES', 'RESOLVE_DISPUTE', 'VIEW_REPORTS', 'RESOLVE_REPORT',
    ] as Permission[],
  },
  FINANCIAL: {
    label: 'Financial Control',
    permissions: [
      'VIEW_ESCROW', 'RELEASE_ESCROW', 'HOLD_ESCROW', 'REFUND_ESCROW',
      'VIEW_TRANSACTIONS', 'APPROVE_PAYOUT', 'REJECT_PAYOUT',
    ] as Permission[],
  },
  REGIONAL: {
    label: 'Regional Control',
    permissions: [
      'VIEW_REGIONS', 'MANAGE_REGIONS', 'VIEW_LGAS', 'MANAGE_LGAS', 'VIEW_LGA_ACTIVITY',
    ] as Permission[],
  },
  OBSERVABILITY: {
    label: 'System Observability',
    permissions: [
      'VIEW_API_LOGS', 'VIEW_AUDIT_LOGS', 'VIEW_ACTIVITY_LOGS', 'VIEW_ERROR_LOGS',
    ] as Permission[],
  },
  PLATFORM: {
    label: 'Platform Configuration',
    permissions: [
      'VIEW_APP_CONFIG', 'MANAGE_APP_CONFIG', 'VIEW_TIER_SETTINGS', 'MANAGE_TIER_SETTINGS',
      'VIEW_ROLE_MATRIX', 'MANAGE_ROLE_MATRIX', 'VIEW_FEATURE_FLAGS', 'MANAGE_FEATURE_FLAGS',
    ] as Permission[],
  },
  ACCOUNT: {
    label: 'Account',
    permissions: [
      'VIEW_PROFILE', 'UPDATE_PROFILE', 'MANAGE_2FA', 'VIEW_SESSIONS', 'TERMINATE_SESSIONS',
    ] as Permission[],
  },
} as const;

/**
 * Sensitive actions that require re-authentication
 */
export const SENSITIVE_ACTIONS: Permission[] = [
  'DELETE_USER',
  'RELEASE_ESCROW',
  'REFUND_ESCROW',
  'APPROVE_PAYOUT',
  'MANAGE_APP_CONFIG',
  'MANAGE_ROLE_MATRIX',
  'MANAGE_FEATURE_FLAGS',
  'TERMINATE_SESSIONS',
];

/**
 * Check if an action requires re-authentication
 */
export function requiresReAuth(permission: Permission): boolean {
  return SENSITIVE_ACTIONS.includes(permission);
}

/**
 * Permission display names for UI
 */
export const PERMISSION_LABELS: Record<Permission, string> = {
  VIEW_DASHBOARD: 'View Dashboard',
  VIEW_REGIONAL_METRICS: 'View Regional Metrics',
  VIEW_AI_INSIGHTS: 'View AI Insights',
  VIEW_LISTINGS: 'View Listings',
  APPROVE_LISTING: 'Approve Listings',
  REJECT_LISTING: 'Reject Listings',
  SUSPEND_LISTING: 'Suspend Listings',
  CREATE_OFFICIAL_LISTING: 'Create Official Listings',
  VIEW_LANDLORDS: 'View Landlords',
  VIEW_TENANTS: 'View Tenants',
  VIEW_AGENTS: 'View Agents',
  SUSPEND_USER: 'Suspend Users',
  UNSUSPEND_USER: 'Unsuspend Users',
  DELETE_USER: 'Delete Users',
  VIEW_VERIFICATION_REQUESTS: 'View Verification Requests',
  APPROVE_VERIFICATION: 'Approve Verifications',
  REJECT_VERIFICATION: 'Reject Verifications',
  VIEW_SUBSCRIPTION_UPGRADES: 'View Subscription Upgrades',
  APPROVE_SUBSCRIPTION_UPGRADE: 'Approve Subscription Upgrades',
  REJECT_SUBSCRIPTION_UPGRADE: 'Reject Subscription Upgrades',
  VIEW_DISPUTES: 'View Disputes',
  RESOLVE_DISPUTE: 'Resolve Disputes',
  VIEW_REPORTS: 'View Reports',
  RESOLVE_REPORT: 'Resolve Reports',
  VIEW_ESCROW: 'View Escrow Accounts',
  RELEASE_ESCROW: 'Release Escrow',
  HOLD_ESCROW: 'Hold Escrow',
  REFUND_ESCROW: 'Refund Escrow',
  VIEW_TRANSACTIONS: 'View Transactions',
  APPROVE_PAYOUT: 'Approve Payouts',
  REJECT_PAYOUT: 'Reject Payouts',
  VIEW_REGIONS: 'View Regions',
  MANAGE_REGIONS: 'Manage Regions',
  VIEW_LGAS: 'View LGAs',
  MANAGE_LGAS: 'Manage LGAs',
  VIEW_LGA_ACTIVITY: 'View LGA Activity',
  VIEW_API_LOGS: 'View API Logs',
  VIEW_AUDIT_LOGS: 'View Audit Logs',
  VIEW_ACTIVITY_LOGS: 'View Activity Logs',
  VIEW_ERROR_LOGS: 'View Error Logs',
  VIEW_APP_CONFIG: 'View App Configuration',
  MANAGE_APP_CONFIG: 'Manage App Configuration',
  VIEW_TIER_SETTINGS: 'View Tier Settings',
  MANAGE_TIER_SETTINGS: 'Manage Tier Settings',
  VIEW_ROLE_MATRIX: 'View Role Matrix',
  MANAGE_ROLE_MATRIX: 'Manage Role Matrix',
  VIEW_FEATURE_FLAGS: 'View Feature Flags',
  MANAGE_FEATURE_FLAGS: 'Manage Feature Flags',
  VIEW_PROFILE: 'View Profile',
  UPDATE_PROFILE: 'Update Profile',
  MANAGE_2FA: 'Manage Two-Factor Authentication',
  VIEW_SESSIONS: 'View Active Sessions',
  TERMINATE_SESSIONS: 'Terminate Sessions',
};
