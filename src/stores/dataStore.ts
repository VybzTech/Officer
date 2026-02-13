// ============================================
// URBAN GRAVITY - COMPREHENSIVE DATA STORE
// Zustand store for all application data
// ============================================

import { create } from "zustand";
import { api } from "@/services/apiService";
import type {
  User,
  Listing,
  Dispute,
  VerificationRequest,
  SubscriptionUpgrade,
  EscrowAccount,
  Transaction,
  PayoutRequest,
  RefundRequest,
  ActivityLog,
  AuditLog,
  ApiLog,
  ErrorLog,
  Session,
  FeatureFlag,
  TierConfig,
  AppConfig,
  RequestStatus,
  ListingStatus,
  DisputeStatus,
  EscrowStatus,
} from "@/data/mockDatabase";
import { mockDatabase } from "@/data/mockDatabase";

// ==================== STATE INTERFACE ====================

interface DataState {
  // Data
  users: User[];
  landlords: User[];
  tenants: User[];
  agents: User[];
  listings: Listing[];
  disputes: Dispute[];
  verificationRequests: VerificationRequest[];
  subscriptionUpgrades: SubscriptionUpgrade[];
  escrowAccounts: EscrowAccount[];
  transactions: Transaction[];
  payoutRequests: PayoutRequest[];
  refundRequests: RefundRequest[];
  activityLogs: ActivityLog[];
  auditLogs: AuditLog[];
  apiLogs: ApiLog[];
  errorLogs: ErrorLog[];
  sessions: Session[];
  featureFlags: FeatureFlag[];
  tierConfigs: TierConfig[];
  appConfigs: AppConfig[];
  regions: typeof mockDatabase.regions;
  lgas: typeof mockDatabase.lgas;
  notifications: typeof mockDatabase.notifications;

  // Analytics
  analytics: {
    totalUsers: number;
    totalLandlords: number;
    totalTenants: number;
    totalAgents: number;
    totalListings: number;
    activeListings: number;
    pendingListings: number;
    openDisputes: number;
    totalEscrow: number;
    pendingVerifications: number;
    pendingUpgrades: number;
    activeSessions: number;
  } | null;

  // Loading States
  isLoading: {
    users: boolean;
    landlords: boolean;
    tenants: boolean;
    agents: boolean;
    listings: boolean;
    disputes: boolean;
    verifications: boolean;
    upgrades: boolean;
    escrow: boolean;
    transactions: boolean;
    payouts: boolean;
    refunds: boolean;
    activityLogs: boolean;
    auditLogs: boolean;
    apiLogs: boolean;
    errorLogs: boolean;
    sessions: boolean;
    featureFlags: boolean;
    tierConfigs: boolean;
    appConfigs: boolean;
    analytics: boolean;
    notifications: boolean;
  };

  // Action Loading States (for individual actions)
  isActionLoading: Record<string, boolean>;

  // Errors
  error: string | null;

  // Actions
  fetchUsers: (filters?: { role?: string; status?: string; tier?: string }) => Promise<void>;
  fetchLandlords: () => Promise<void>;
  fetchTenants: () => Promise<void>;
  fetchAgents: () => Promise<void>;
  fetchListings: (filters?: { status?: ListingStatus }) => Promise<void>;
  fetchDisputes: (filters?: { status?: DisputeStatus }) => Promise<void>;
  fetchVerificationRequests: (status?: RequestStatus) => Promise<void>;
  fetchSubscriptionUpgrades: (status?: RequestStatus) => Promise<void>;
  fetchEscrowAccounts: (status?: EscrowStatus) => Promise<void>;
  fetchTransactions: () => Promise<void>;
  fetchPayoutRequests: (status?: RequestStatus) => Promise<void>;
  fetchRefundRequests: (status?: RequestStatus) => Promise<void>;
  fetchActivityLogs: () => Promise<void>;
  fetchAuditLogs: () => Promise<void>;
  fetchApiLogs: () => Promise<void>;
  fetchErrorLogs: () => Promise<void>;
  fetchSessions: () => Promise<void>;
  fetchFeatureFlags: () => Promise<void>;
  fetchTierConfigs: () => Promise<void>;
  fetchAppConfigs: () => Promise<void>;
  fetchAnalytics: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
  fetchRegions: () => Promise<void>;
  fetchLgas: (regionId?: string) => Promise<void>;

  // Mutation Actions
  approveVerification: (id: string, officerId: string) => Promise<boolean>;
  rejectVerification: (id: string, officerId: string, reason: string) => Promise<boolean>;
  approveUpgrade: (id: string, officerId: string) => Promise<boolean>;
  rejectUpgrade: (id: string, officerId: string, reason: string) => Promise<boolean>;
  approveListing: (id: string, officerId: string) => Promise<boolean>;
  rejectListing: (id: string) => Promise<boolean>;
  suspendListing: (id: string) => Promise<boolean>;
  updateDisputeStatus: (id: string, status: DisputeStatus, resolution?: string) => Promise<boolean>;
  releaseEscrow: (id: string, officerId: string) => Promise<boolean>;
  refundEscrow: (id: string, officerId: string) => Promise<boolean>;
  approvePayout: (id: string, officerId: string) => Promise<boolean>;
  rejectPayout: (id: string, officerId: string) => Promise<boolean>;
  verifyUser: (id: string) => Promise<boolean>;
  suspendUser: (id: string) => Promise<boolean>;
  toggleFeatureFlag: (id: string, isEnabled: boolean) => Promise<boolean>;
  updateAppConfig: (id: string, value: string, officerId: string) => Promise<boolean>;
  terminateSession: (id: string) => Promise<boolean>;

  // Utility
  clearError: () => void;
  setActionLoading: (key: string, loading: boolean) => void;
}

// ==================== STORE ====================

export const useDataStore = create<DataState>((set, get) => ({
  // Initial Data
  users: [],
  landlords: [],
  tenants: [],
  agents: [],
  listings: [],
  disputes: [],
  verificationRequests: [],
  subscriptionUpgrades: [],
  escrowAccounts: [],
  transactions: [],
  payoutRequests: [],
  refundRequests: [],
  activityLogs: [],
  auditLogs: [],
  apiLogs: [],
  errorLogs: [],
  sessions: [],
  featureFlags: [],
  tierConfigs: [],
  appConfigs: [],
  regions: [],
  lgas: [],
  notifications: [],
  analytics: null,

  // Loading States
  isLoading: {
    users: false,
    landlords: false,
    tenants: false,
    agents: false,
    listings: false,
    disputes: false,
    verifications: false,
    upgrades: false,
    escrow: false,
    transactions: false,
    payouts: false,
    refunds: false,
    activityLogs: false,
    auditLogs: false,
    apiLogs: false,
    errorLogs: false,
    sessions: false,
    featureFlags: false,
    tierConfigs: false,
    appConfigs: false,
    analytics: false,
    notifications: false,
  },

  isActionLoading: {},
  error: null,

  // ==================== FETCH ACTIONS ====================

  fetchUsers: async (filters) => {
    set((s) => ({ isLoading: { ...s.isLoading, users: true }, error: null }));
    const response = await api.users.getAll(filters);
    if (response.success) {
      set((s) => ({ users: response.data, isLoading: { ...s.isLoading, users: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, users: false } }));
    }
  },

  fetchLandlords: async () => {
    set((s) => ({ isLoading: { ...s.isLoading, landlords: true }, error: null }));
    const response = await api.users.getLandlords();
    if (response.success) {
      set((s) => ({ landlords: response.data, isLoading: { ...s.isLoading, landlords: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, landlords: false } }));
    }
  },

  fetchTenants: async () => {
    set((s) => ({ isLoading: { ...s.isLoading, tenants: true }, error: null }));
    const response = await api.users.getTenants();
    if (response.success) {
      set((s) => ({ tenants: response.data, isLoading: { ...s.isLoading, tenants: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, tenants: false } }));
    }
  },

  fetchAgents: async () => {
    set((s) => ({ isLoading: { ...s.isLoading, agents: true }, error: null }));
    const response = await api.users.getAgents();
    if (response.success) {
      set((s) => ({ agents: response.data, isLoading: { ...s.isLoading, agents: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, agents: false } }));
    }
  },

  fetchListings: async (filters) => {
    set((s) => ({ isLoading: { ...s.isLoading, listings: true }, error: null }));
    const response = await api.listings.getAll(filters);
    if (response.success) {
      set((s) => ({ listings: response.data, isLoading: { ...s.isLoading, listings: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, listings: false } }));
    }
  },

  fetchDisputes: async (filters) => {
    set((s) => ({ isLoading: { ...s.isLoading, disputes: true }, error: null }));
    const response = await api.disputes.getAll(filters);
    if (response.success) {
      set((s) => ({ disputes: response.data, isLoading: { ...s.isLoading, disputes: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, disputes: false } }));
    }
  },

  fetchVerificationRequests: async (status) => {
    set((s) => ({ isLoading: { ...s.isLoading, verifications: true }, error: null }));
    const response = await api.verifications.getAll(status);
    if (response.success) {
      set((s) => ({ verificationRequests: response.data, isLoading: { ...s.isLoading, verifications: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, verifications: false } }));
    }
  },

  fetchSubscriptionUpgrades: async (status) => {
    set((s) => ({ isLoading: { ...s.isLoading, upgrades: true }, error: null }));
    const response = await api.upgrades.getAll(status);
    if (response.success) {
      set((s) => ({ subscriptionUpgrades: response.data, isLoading: { ...s.isLoading, upgrades: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, upgrades: false } }));
    }
  },

  fetchEscrowAccounts: async (status) => {
    set((s) => ({ isLoading: { ...s.isLoading, escrow: true }, error: null }));
    const response = await api.escrow.getAll(status);
    if (response.success) {
      set((s) => ({ escrowAccounts: response.data, isLoading: { ...s.isLoading, escrow: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, escrow: false } }));
    }
  },

  fetchTransactions: async () => {
    set((s) => ({ isLoading: { ...s.isLoading, transactions: true }, error: null }));
    const response = await api.transactions.getAll();
    if (response.success) {
      set((s) => ({ transactions: response.data, isLoading: { ...s.isLoading, transactions: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, transactions: false } }));
    }
  },

  fetchPayoutRequests: async (status) => {
    set((s) => ({ isLoading: { ...s.isLoading, payouts: true }, error: null }));
    const response = await api.payouts.getAll(status);
    if (response.success) {
      set((s) => ({ payoutRequests: response.data, isLoading: { ...s.isLoading, payouts: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, payouts: false } }));
    }
  },

  fetchRefundRequests: async (status) => {
    set((s) => ({ isLoading: { ...s.isLoading, refunds: true }, error: null }));
    const response = await api.refunds.getAll(status);
    if (response.success) {
      set((s) => ({ refundRequests: response.data, isLoading: { ...s.isLoading, refunds: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, refunds: false } }));
    }
  },

  fetchActivityLogs: async () => {
    set((s) => ({ isLoading: { ...s.isLoading, activityLogs: true }, error: null }));
    const response = await api.logs.getActivityLogs();
    if (response.success) {
      set((s) => ({ activityLogs: response.data, isLoading: { ...s.isLoading, activityLogs: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, activityLogs: false } }));
    }
  },

  fetchAuditLogs: async () => {
    set((s) => ({ isLoading: { ...s.isLoading, auditLogs: true }, error: null }));
    const response = await api.logs.getAuditLogs();
    if (response.success) {
      set((s) => ({ auditLogs: response.data, isLoading: { ...s.isLoading, auditLogs: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, auditLogs: false } }));
    }
  },

  fetchApiLogs: async () => {
    set((s) => ({ isLoading: { ...s.isLoading, apiLogs: true }, error: null }));
    const response = await api.logs.getApiLogs();
    if (response.success) {
      set((s) => ({ apiLogs: response.data, isLoading: { ...s.isLoading, apiLogs: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, apiLogs: false } }));
    }
  },

  fetchErrorLogs: async () => {
    set((s) => ({ isLoading: { ...s.isLoading, errorLogs: true }, error: null }));
    const response = await api.logs.getErrorLogs();
    if (response.success) {
      set((s) => ({ errorLogs: response.data, isLoading: { ...s.isLoading, errorLogs: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, errorLogs: false } }));
    }
  },

  fetchSessions: async () => {
    set((s) => ({ isLoading: { ...s.isLoading, sessions: true }, error: null }));
    const response = await api.sessions.getAll();
    if (response.success) {
      set((s) => ({ sessions: response.data, isLoading: { ...s.isLoading, sessions: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, sessions: false } }));
    }
  },

  fetchFeatureFlags: async () => {
    set((s) => ({ isLoading: { ...s.isLoading, featureFlags: true }, error: null }));
    const response = await api.config.getFeatureFlags();
    if (response.success) {
      set((s) => ({ featureFlags: response.data, isLoading: { ...s.isLoading, featureFlags: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, featureFlags: false } }));
    }
  },

  fetchTierConfigs: async () => {
    set((s) => ({ isLoading: { ...s.isLoading, tierConfigs: true }, error: null }));
    const response = await api.config.getTierConfigs();
    if (response.success) {
      set((s) => ({ tierConfigs: response.data, isLoading: { ...s.isLoading, tierConfigs: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, tierConfigs: false } }));
    }
  },

  fetchAppConfigs: async () => {
    set((s) => ({ isLoading: { ...s.isLoading, appConfigs: true }, error: null }));
    const response = await api.config.getAppConfigs();
    if (response.success) {
      set((s) => ({ appConfigs: response.data, isLoading: { ...s.isLoading, appConfigs: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, appConfigs: false } }));
    }
  },

  fetchAnalytics: async () => {
    set((s) => ({ isLoading: { ...s.isLoading, analytics: true }, error: null }));
    const response = await api.analytics.getOverview();
    if (response.success) {
      set((s) => ({ analytics: response.data, isLoading: { ...s.isLoading, analytics: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, analytics: false } }));
    }
  },

  fetchNotifications: async () => {
    set((s) => ({ isLoading: { ...s.isLoading, notifications: true }, error: null }));
    const response = await api.notifications.getAll();
    if (response.success) {
      set((s) => ({ notifications: response.data, isLoading: { ...s.isLoading, notifications: false } }));
    } else {
      set((s) => ({ error: response.error, isLoading: { ...s.isLoading, notifications: false } }));
    }
  },

  fetchRegions: async () => {
    const response = await api.regions.getAll();
    if (response.success) {
      set({ regions: response.data });
    }
  },

  fetchLgas: async (regionId) => {
    const response = await api.regions.getLgas(regionId);
    if (response.success) {
      set({ lgas: response.data });
    }
  },

  // ==================== MUTATION ACTIONS ====================

  approveVerification: async (id, officerId) => {
    get().setActionLoading(`verify-${id}`, true);
    const response = await api.verifications.approve(id, officerId);
    get().setActionLoading(`verify-${id}`, false);
    if (response.success) {
      set((s) => ({
        verificationRequests: s.verificationRequests.map((v) =>
          v.id === id ? response.data : v
        ),
      }));
      return true;
    }
    set({ error: response.error });
    return false;
  },

  rejectVerification: async (id, officerId, reason) => {
    get().setActionLoading(`verify-${id}`, true);
    const response = await api.verifications.reject(id, officerId, reason);
    get().setActionLoading(`verify-${id}`, false);
    if (response.success) {
      set((s) => ({
        verificationRequests: s.verificationRequests.map((v) =>
          v.id === id ? response.data : v
        ),
      }));
      return true;
    }
    set({ error: response.error });
    return false;
  },

  approveUpgrade: async (id, officerId) => {
    get().setActionLoading(`upgrade-${id}`, true);
    const response = await api.upgrades.approve(id, officerId);
    get().setActionLoading(`upgrade-${id}`, false);
    if (response.success) {
      set((s) => ({
        subscriptionUpgrades: s.subscriptionUpgrades.map((u) =>
          u.id === id ? response.data : u
        ),
      }));
      return true;
    }
    set({ error: response.error });
    return false;
  },

  rejectUpgrade: async (id, officerId, reason) => {
    get().setActionLoading(`upgrade-${id}`, true);
    const response = await api.upgrades.reject(id, officerId, reason);
    get().setActionLoading(`upgrade-${id}`, false);
    if (response.success) {
      set((s) => ({
        subscriptionUpgrades: s.subscriptionUpgrades.map((u) =>
          u.id === id ? response.data : u
        ),
      }));
      return true;
    }
    set({ error: response.error });
    return false;
  },

  approveListing: async (id, officerId) => {
    get().setActionLoading(`listing-${id}`, true);
    const response = await api.listings.approve(id, officerId);
    get().setActionLoading(`listing-${id}`, false);
    if (response.success) {
      set((s) => ({
        listings: s.listings.map((l) => (l.id === id ? response.data : l)),
      }));
      return true;
    }
    set({ error: response.error });
    return false;
  },

  rejectListing: async (id) => {
    get().setActionLoading(`listing-${id}`, true);
    const response = await api.listings.reject(id);
    get().setActionLoading(`listing-${id}`, false);
    if (response.success) {
      set((s) => ({
        listings: s.listings.map((l) => (l.id === id ? response.data : l)),
      }));
      return true;
    }
    set({ error: response.error });
    return false;
  },

  suspendListing: async (id) => {
    get().setActionLoading(`listing-${id}`, true);
    const response = await api.listings.suspend(id);
    get().setActionLoading(`listing-${id}`, false);
    if (response.success) {
      set((s) => ({
        listings: s.listings.map((l) => (l.id === id ? response.data : l)),
      }));
      return true;
    }
    set({ error: response.error });
    return false;
  },

  updateDisputeStatus: async (id, status, resolution) => {
    get().setActionLoading(`dispute-${id}`, true);
    const response = await api.disputes.updateStatus(id, status, resolution);
    get().setActionLoading(`dispute-${id}`, false);
    if (response.success) {
      set((s) => ({
        disputes: s.disputes.map((d) => (d.id === id ? response.data : d)),
      }));
      return true;
    }
    set({ error: response.error });
    return false;
  },

  releaseEscrow: async (id, officerId) => {
    get().setActionLoading(`escrow-${id}`, true);
    const response = await api.escrow.release(id, officerId);
    get().setActionLoading(`escrow-${id}`, false);
    if (response.success) {
      set((s) => ({
        escrowAccounts: s.escrowAccounts.map((e) => (e.id === id ? response.data : e)),
      }));
      return true;
    }
    set({ error: response.error });
    return false;
  },

  refundEscrow: async (id, officerId) => {
    get().setActionLoading(`escrow-${id}`, true);
    const response = await api.escrow.refund(id, officerId);
    get().setActionLoading(`escrow-${id}`, false);
    if (response.success) {
      set((s) => ({
        escrowAccounts: s.escrowAccounts.map((e) => (e.id === id ? response.data : e)),
      }));
      return true;
    }
    set({ error: response.error });
    return false;
  },

  approvePayout: async (id, officerId) => {
    get().setActionLoading(`payout-${id}`, true);
    const response = await api.payouts.approve(id, officerId);
    get().setActionLoading(`payout-${id}`, false);
    if (response.success) {
      set((s) => ({
        payoutRequests: s.payoutRequests.map((p) => (p.id === id ? response.data : p)),
      }));
      return true;
    }
    set({ error: response.error });
    return false;
  },

  rejectPayout: async (id, officerId) => {
    get().setActionLoading(`payout-${id}`, true);
    const response = await api.payouts.reject(id, officerId);
    get().setActionLoading(`payout-${id}`, false);
    if (response.success) {
      set((s) => ({
        payoutRequests: s.payoutRequests.map((p) => (p.id === id ? response.data : p)),
      }));
      return true;
    }
    set({ error: response.error });
    return false;
  },

  verifyUser: async (id) => {
    get().setActionLoading(`user-${id}`, true);
    const response = await api.users.verify(id);
    get().setActionLoading(`user-${id}`, false);
    if (response.success) {
      set((s) => ({
        users: s.users.map((u) => (u.id === id ? response.data : u)),
        landlords: s.landlords.map((u) => (u.id === id ? response.data : u)),
        tenants: s.tenants.map((u) => (u.id === id ? response.data : u)),
        agents: s.agents.map((u) => (u.id === id ? response.data : u)),
      }));
      return true;
    }
    set({ error: response.error });
    return false;
  },

  suspendUser: async (id) => {
    get().setActionLoading(`user-${id}`, true);
    const response = await api.users.suspend(id);
    get().setActionLoading(`user-${id}`, false);
    if (response.success) {
      set((s) => ({
        users: s.users.map((u) => (u.id === id ? response.data : u)),
        landlords: s.landlords.map((u) => (u.id === id ? response.data : u)),
        tenants: s.tenants.map((u) => (u.id === id ? response.data : u)),
        agents: s.agents.map((u) => (u.id === id ? response.data : u)),
      }));
      return true;
    }
    set({ error: response.error });
    return false;
  },

  toggleFeatureFlag: async (id, isEnabled) => {
    get().setActionLoading(`flag-${id}`, true);
    const response = await api.config.updateFeatureFlag(id, { isEnabled });
    get().setActionLoading(`flag-${id}`, false);
    if (response.success) {
      set((s) => ({
        featureFlags: s.featureFlags.map((f) => (f.id === id ? response.data : f)),
      }));
      return true;
    }
    set({ error: response.error });
    return false;
  },

  updateAppConfig: async (id, value, officerId) => {
    get().setActionLoading(`config-${id}`, true);
    const response = await api.config.updateAppConfig(id, value, officerId);
    get().setActionLoading(`config-${id}`, false);
    if (response.success) {
      set((s) => ({
        appConfigs: s.appConfigs.map((c) => (c.id === id ? response.data : c)),
      }));
      return true;
    }
    set({ error: response.error });
    return false;
  },

  terminateSession: async (id) => {
    get().setActionLoading(`session-${id}`, true);
    const response = await api.sessions.terminate(id);
    get().setActionLoading(`session-${id}`, false);
    if (response.success) {
      set((s) => ({
        sessions: s.sessions.map((sess) =>
          sess.id === id ? { ...sess, isActive: false } : sess
        ),
      }));
      return true;
    }
    return false;
  },

  // ==================== UTILITY ====================

  clearError: () => set({ error: null }),

  setActionLoading: (key, loading) => {
    set((s) => ({
      isActionLoading: { ...s.isActionLoading, [key]: loading },
    }));
  },
}));

export default useDataStore;
