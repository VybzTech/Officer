// ============================================
// URBAN GRAVITY - FEATURE FLAGS STORE
// Controls feature availability by role
// ============================================

import { create } from 'zustand';
import type { Role, FeatureFlag } from '@/types';

// ==================== FEATURE FLAG KEYS ====================
export type FeatureFlagKey =
  | 'AI_INSIGHTS'
  | 'AI_MATCH_RECOMMENDATIONS'
  | 'RISK_SCORING_ENGINE'
  | 'ADVANCED_ANALYTICS'
  | 'BULK_OPERATIONS'
  | 'EXPORT_REPORTS'
  | 'API_ACCESS'
  | 'CUSTOM_NOTIFICATIONS'
  | 'ESCROW_MANAGEMENT'
  | 'MULTI_REGION_VIEW'
  | 'AUDIT_LOGS_EXPORT'
  | 'REALTIME_DASHBOARD';

// ==================== DEFAULT FLAGS ====================
const DEFAULT_FEATURE_FLAGS: Record<FeatureFlagKey, FeatureFlag> = {
  AI_INSIGHTS: {
    id: 'ff-001',
    key: 'AI_INSIGHTS',
    name: 'AI Insights',
    description: 'Access to AI-powered insights and analytics',
    isEnabled: true,
    enabledFor: ['SUPER_ADMIN', 'OFFICER'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  AI_MATCH_RECOMMENDATIONS: {
    id: 'ff-002',
    key: 'AI_MATCH_RECOMMENDATIONS',
    name: 'AI Match Recommendations',
    description: 'AI-powered tenant-property matching suggestions',
    isEnabled: true,
    enabledFor: ['SUPER_ADMIN', 'OFFICER'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  RISK_SCORING_ENGINE: {
    id: 'ff-003',
    key: 'RISK_SCORING_ENGINE',
    name: 'Risk Scoring Engine',
    description: 'Automated risk assessment for users and transactions',
    isEnabled: true,
    enabledFor: ['SUPER_ADMIN'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  ADVANCED_ANALYTICS: {
    id: 'ff-004',
    key: 'ADVANCED_ANALYTICS',
    name: 'Advanced Analytics',
    description: 'Deep analytics with custom date ranges and filters',
    isEnabled: true,
    enabledFor: ['SUPER_ADMIN', 'OFFICER'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  BULK_OPERATIONS: {
    id: 'ff-005',
    key: 'BULK_OPERATIONS',
    name: 'Bulk Operations',
    description: 'Perform bulk approve/reject/suspend operations',
    isEnabled: true,
    enabledFor: ['SUPER_ADMIN'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  EXPORT_REPORTS: {
    id: 'ff-006',
    key: 'EXPORT_REPORTS',
    name: 'Export Reports',
    description: 'Export data and reports to CSV/PDF',
    isEnabled: true,
    enabledFor: ['SUPER_ADMIN', 'OFFICER'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  API_ACCESS: {
    id: 'ff-007',
    key: 'API_ACCESS',
    name: 'API Access',
    description: 'Direct API access for integrations',
    isEnabled: false,
    enabledFor: ['SUPER_ADMIN'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  CUSTOM_NOTIFICATIONS: {
    id: 'ff-008',
    key: 'CUSTOM_NOTIFICATIONS',
    name: 'Custom Notifications',
    description: 'Create custom notification rules and alerts',
    isEnabled: true,
    enabledFor: ['SUPER_ADMIN', 'OFFICER'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  ESCROW_MANAGEMENT: {
    id: 'ff-009',
    key: 'ESCROW_MANAGEMENT',
    name: 'Escrow Management',
    description: 'Full escrow account management capabilities',
    isEnabled: true,
    enabledFor: ['SUPER_ADMIN', 'OFFICER'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  MULTI_REGION_VIEW: {
    id: 'ff-010',
    key: 'MULTI_REGION_VIEW',
    name: 'Multi-Region View',
    description: 'View data across multiple regions simultaneously',
    isEnabled: true,
    enabledFor: ['SUPER_ADMIN'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  AUDIT_LOGS_EXPORT: {
    id: 'ff-011',
    key: 'AUDIT_LOGS_EXPORT',
    name: 'Audit Logs Export',
    description: 'Export audit logs for compliance',
    isEnabled: true,
    enabledFor: ['SUPER_ADMIN'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  REALTIME_DASHBOARD: {
    id: 'ff-012',
    key: 'REALTIME_DASHBOARD',
    name: 'Real-time Dashboard',
    description: 'Live updating dashboard metrics',
    isEnabled: true,
    enabledFor: ['SUPER_ADMIN', 'OFFICER', 'REGIONAL_OFFICER'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

// ==================== STATE INTERFACE ====================
interface FeatureFlagsState {
  flags: Record<FeatureFlagKey, FeatureFlag>;
  isLoading: boolean;
  error: string | null;
}

// ==================== ACTIONS INTERFACE ====================
interface FeatureFlagsActions {
  // Check flags
  isFeatureEnabled: (key: FeatureFlagKey, userRole: Role) => boolean;

  // Management (SUPER_ADMIN only)
  toggleFlag: (key: FeatureFlagKey) => void;
  updateFlagRoles: (key: FeatureFlagKey, roles: Role[]) => void;

  // Load from server
  loadFlags: () => Promise<void>;

  // Reset
  reset: () => void;
}

// ==================== INITIAL STATE ====================
const initialState: FeatureFlagsState = {
  flags: DEFAULT_FEATURE_FLAGS,
  isLoading: false,
  error: null,
};

// ==================== STORE ====================
export const useFeatureFlagsStore = create<FeatureFlagsState & FeatureFlagsActions>()(
  (set, get) => ({
    ...initialState,

    // ==================== CHECK FLAGS ====================
    isFeatureEnabled: (key, userRole) => {
      const { flags } = get();
      const flag = flags[key];

      if (!flag) return false;
      if (!flag.isEnabled) return false;

      return flag.enabledFor.includes(userRole);
    },

    // ==================== MANAGEMENT ====================
    toggleFlag: (key) => {
      set((state) => {
        const flag = state.flags[key];
        if (!flag) return state;

        return {
          flags: {
            ...state.flags,
            [key]: {
              ...flag,
              isEnabled: !flag.isEnabled,
              updatedAt: new Date().toISOString(),
            },
          },
        };
      });
    },

    updateFlagRoles: (key, roles) => {
      set((state) => {
        const flag = state.flags[key];
        if (!flag) return state;

        return {
          flags: {
            ...state.flags,
            [key]: {
              ...flag,
              enabledFor: roles,
              updatedAt: new Date().toISOString(),
            },
          },
        };
      });
    },

    // ==================== LOAD FROM SERVER ====================
    loadFlags: async () => {
      set({ isLoading: true, error: null });

      try {
        // TODO: Replace with actual API call
        // const response = await api.get('/feature-flags');
        // set({ flags: response.data, isLoading: false });

        // For now, use defaults
        await new Promise((resolve) => setTimeout(resolve, 500));
        set({ isLoading: false });
      } catch {
        set({ isLoading: false, error: 'Failed to load feature flags' });
      }
    },

    // ==================== RESET ====================
    reset: () => {
      set(initialState);
    },
  })
);

// ==================== SELECTORS ====================
export const selectFlags = (state: FeatureFlagsState) => state.flags;
export const selectIsLoading = (state: FeatureFlagsState) => state.isLoading;
