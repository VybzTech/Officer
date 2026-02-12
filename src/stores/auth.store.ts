// ============================================
// URBAN GRAVITY - AUTH STORE
// Zustand State Management for Authentication
// ============================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  Officer,
  Permission,
  Region,
  LGA,
  AuthStep,
  Role,
} from '@/types';
import { ROLE_PERMISSIONS, ROLE_HIERARCHY } from '@/types';

// ==================== STATE INTERFACE ====================
interface AuthState {
  // Officer data
  officer: Officer | null;

  // Auth status
  isAuthenticated: boolean;
  authStep: AuthStep;
  sessionId: string | null;

  // Scope
  regionScope: Region[];
  lgaScope: LGA[];

  // Permissions (computed from role + custom)
  permissions: Permission[];

  // UI State
  isLoading: boolean;
  error: string | null;

  // Re-auth state
  requiresReAuth: boolean;
  reAuthCallback: (() => void) | null;
}

// ==================== ACTIONS INTERFACE ====================
interface AuthActions {
  // Login flow
  setLoginPending: () => void;
  setLoginSuccess: (officer: Officer, sessionId: string) => void;
  setLoginError: (error: string) => void;

  // 2FA flow
  set2FARequired: (sessionToken: string) => void;
  verify2FA: (code: string) => Promise<boolean>;

  // Session management
  setAuthenticated: (officer: Officer, regions: Region[], lgas: LGA[]) => void;
  updateOfficer: (updates: Partial<Officer>) => void;
  logout: () => void;

  // Scope
  setRegionScope: (regions: Region[]) => void;
  setLgaScope: (lgas: LGA[]) => void;

  // Permission helpers
  hasPermission: (permission: Permission) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  isRoleHigherOrEqual: (targetRole: Role) => boolean;

  // Re-auth
  requestReAuth: (callback: () => void) => void;
  confirmReAuth: (password: string) => Promise<boolean>;
  cancelReAuth: () => void;

  // Reset
  clearError: () => void;
  reset: () => void;
}

// ==================== INITIAL STATE ====================
const initialState: AuthState = {
  officer: null,
  isAuthenticated: false,
  authStep: 'LOGIN',
  sessionId: null,
  regionScope: [],
  lgaScope: [],
  permissions: [],
  isLoading: false,
  error: null,
  requiresReAuth: false,
  reAuthCallback: null,
};

// ==================== STORE ====================
export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // ==================== LOGIN FLOW ====================
      setLoginPending: () => {
        set({ isLoading: true, error: null });
      },

      setLoginSuccess: (officer, sessionId) => {
        const permissions = ROLE_PERMISSIONS[officer.role] ?? [];
        set({
          officer,
          sessionId,
          permissions,
          authStep: officer.twoFactorEnabled ? 'TWO_FACTOR' : 'AUTHENTICATED',
          isAuthenticated: !officer.twoFactorEnabled,
          isLoading: false,
          error: null,
        });
      },

      setLoginError: (error) => {
        set({ isLoading: false, error, officer: null });
      },

      // ==================== 2FA FLOW ====================
      set2FARequired: (_sessionToken) => {
        set({ authStep: 'TWO_FACTOR', isLoading: false });
      },

      verify2FA: async (_code) => {
        set({ isLoading: true, error: null });

        // TODO: Replace with actual API call
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // For demo, accept any 6-digit code
        const isValid = true; // Replace with actual validation

        if (isValid) {
          set({
            authStep: 'AUTHENTICATED',
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        }

        set({ isLoading: false, error: 'Invalid verification code' });
        return false;
      },

      // ==================== SESSION MANAGEMENT ====================
      setAuthenticated: (officer, regions, lgas) => {
        const permissions = ROLE_PERMISSIONS[officer.role] ?? [];
        set({
          officer,
          isAuthenticated: true,
          authStep: 'AUTHENTICATED',
          regionScope: regions,
          lgaScope: lgas,
          permissions,
          isLoading: false,
          error: null,
        });
      },

      updateOfficer: (updates) => {
        const { officer } = get();
        if (officer) {
          set({ officer: { ...officer, ...updates } });
        }
      },

      logout: () => {
        set(initialState);
        // Clear any stored session data
        sessionStorage.clear();
      },

      // ==================== SCOPE ====================
      setRegionScope: (regions) => {
        set({ regionScope: regions });
      },

      setLgaScope: (lgas) => {
        set({ lgaScope: lgas });
      },

      // ==================== PERMISSION HELPERS ====================
      hasPermission: (permission) => {
        const { permissions } = get();
        return permissions.includes(permission);
      },

      hasAllPermissions: (requiredPermissions) => {
        const { permissions } = get();
        return requiredPermissions.every((p) => permissions.includes(p));
      },

      hasAnyPermission: (requiredPermissions) => {
        const { permissions } = get();
        return requiredPermissions.some((p) => permissions.includes(p));
      },

      isRoleHigherOrEqual: (targetRole) => {
        const { officer } = get();
        if (!officer) return false;
        return (ROLE_HIERARCHY[officer.role] ?? 0) >= (ROLE_HIERARCHY[targetRole] ?? 0);
      },

      // ==================== RE-AUTH ====================
      requestReAuth: (callback) => {
        set({ requiresReAuth: true, reAuthCallback: callback });
      },

      confirmReAuth: async (_password) => {
        set({ isLoading: true });

        // TODO: Replace with actual API call
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const { reAuthCallback } = get();

        // For demo, accept any password
        const isValid = true; // Replace with actual validation

        if (isValid && reAuthCallback) {
          reAuthCallback();
          set({ requiresReAuth: false, reAuthCallback: null, isLoading: false });
          return true;
        }

        set({ isLoading: false, error: 'Invalid password' });
        return false;
      },

      cancelReAuth: () => {
        set({ requiresReAuth: false, reAuthCallback: null });
      },

      // ==================== RESET ====================
      clearError: () => {
        set({ error: null });
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'ug-officer-auth',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        // Only persist essential data, not callbacks or loading states
        officer: state.officer,
        sessionId: state.sessionId,
        isAuthenticated: state.isAuthenticated,
        authStep: state.authStep,
        permissions: state.permissions,
      }),
    }
  )
);

// ==================== SELECTORS ====================
export const selectOfficer = (state: AuthState) => state.officer;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectAuthStep = (state: AuthState) => state.authStep;
export const selectPermissions = (state: AuthState) => state.permissions;
export const selectRegionScope = (state: AuthState) => state.regionScope;
export const selectLgaScope = (state: AuthState) => state.lgaScope;
export const selectIsLoading = (state: AuthState) => state.isLoading;
export const selectError = (state: AuthState) => state.error;
export const selectRequiresReAuth = (state: AuthState) => state.requiresReAuth;
