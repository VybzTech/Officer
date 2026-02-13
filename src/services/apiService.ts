// ============================================
// URBAN GRAVITY - API SERVICE LAYER
// Axios-based API with mock data support
// ============================================

import axios, { type AxiosInstance, type AxiosError } from "axios";
import { mockDatabase } from "@/data/mockDatabase";
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

// ==================== AXIOS INSTANCE ====================

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = sessionStorage.getItem("ug-auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - could redirect to login
      sessionStorage.removeItem("ug-auth-token");
    }
    return Promise.reject(error);
  }
);

// ==================== HELPER FUNCTIONS ====================

// Simulate network delay
const delay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate API response format
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  meta?: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

const success = <T>(data: T, meta?: ApiResponse<T>["meta"]): ApiResponse<T> => ({
  success: true,
  data,
  meta,
});

const error = <T>(message: string): ApiResponse<T> => ({
  success: false,
  data: null as T,
  error: message,
});

// ==================== USERS API ====================

export const usersApi = {
  getAll: async (filters?: { role?: string; status?: string; tier?: string }): Promise<ApiResponse<User[]>> => {
    await delay(600);
    let users = [...mockDatabase.users];

    if (filters?.role) {
      users = users.filter((u) => u.role === filters.role);
    }
    if (filters?.status) {
      users = users.filter((u) => u.verificationStatus === filters.status);
    }
    if (filters?.tier) {
      users = users.filter((u) => u.tier === filters.tier);
    }

    return success(users, { total: users.length, page: 1, pageSize: users.length, totalPages: 1 });
  },

  getLandlords: async (): Promise<ApiResponse<User[]>> => {
    await delay(500);
    return success(mockDatabase.landlords);
  },

  getTenants: async (): Promise<ApiResponse<User[]>> => {
    await delay(500);
    return success(mockDatabase.tenants);
  },

  getAgents: async (): Promise<ApiResponse<User[]>> => {
    await delay(500);
    return success(mockDatabase.agents);
  },

  getById: async (id: string): Promise<ApiResponse<User>> => {
    await delay(300);
    const user = mockDatabase.users.find((u) => u.id === id);
    if (!user) return error("User not found");
    return success(user);
  },

  update: async (id: string, updates: Partial<User>): Promise<ApiResponse<User>> => {
    await delay(800);
    try {
      const updated = mockDatabase.updateUser(id, updates);
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },

  suspend: async (id: string): Promise<ApiResponse<User>> => {
    await delay(600);
    try {
      const updated = mockDatabase.updateUser(id, { verificationStatus: "REJECTED" });
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },

  verify: async (id: string): Promise<ApiResponse<User>> => {
    await delay(600);
    try {
      const updated = mockDatabase.updateUser(id, { verificationStatus: "VERIFIED" });
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },
};

// ==================== LISTINGS API ====================

export const listingsApi = {
  getAll: async (filters?: { status?: ListingStatus; type?: string; regionId?: string }): Promise<ApiResponse<Listing[]>> => {
    await delay(700);
    let listings = [...mockDatabase.listings];

    if (filters?.status) {
      listings = listings.filter((l) => l.status === filters.status);
    }
    if (filters?.type) {
      listings = listings.filter((l) => l.type === filters.type);
    }
    if (filters?.regionId) {
      listings = listings.filter((l) => l.regionId === filters.regionId);
    }

    return success(listings, { total: listings.length, page: 1, pageSize: listings.length, totalPages: 1 });
  },

  getById: async (id: string): Promise<ApiResponse<Listing>> => {
    await delay(300);
    const listing = mockDatabase.listings.find((l) => l.id === id);
    if (!listing) return error("Listing not found");
    return success(listing);
  },

  approve: async (id: string, officerId: string): Promise<ApiResponse<Listing>> => {
    await delay(800);
    try {
      const updated = mockDatabase.updateListing(id, {
        status: "APPROVED",
        approvedAt: new Date().toISOString(),
        approvedBy: officerId,
      });
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },

  reject: async (id: string): Promise<ApiResponse<Listing>> => {
    await delay(800);
    try {
      const updated = mockDatabase.updateListing(id, { status: "REJECTED" });
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },

  suspend: async (id: string): Promise<ApiResponse<Listing>> => {
    await delay(800);
    try {
      const updated = mockDatabase.updateListing(id, { status: "SUSPENDED" });
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },
};

// ==================== DISPUTES API ====================

export const disputesApi = {
  getAll: async (filters?: { status?: DisputeStatus; priority?: string }): Promise<ApiResponse<Dispute[]>> => {
    await delay(600);
    let disputes = [...mockDatabase.disputes].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    if (filters?.status) {
      disputes = disputes.filter((d) => d.status === filters.status);
    }
    if (filters?.priority) {
      disputes = disputes.filter((d) => d.priority === filters.priority);
    }

    return success(disputes);
  },

  getById: async (id: string): Promise<ApiResponse<Dispute>> => {
    await delay(300);
    const dispute = mockDatabase.disputes.find((d) => d.id === id);
    if (!dispute) return error("Dispute not found");
    return success(dispute);
  },

  updateStatus: async (id: string, status: DisputeStatus, resolution?: string): Promise<ApiResponse<Dispute>> => {
    await delay(800);
    try {
      const updates: Partial<Dispute> = {
        status,
        updatedAt: new Date().toISOString(),
      };
      if (status === "RESOLVED" || status === "CLOSED") {
        updates.resolvedAt = new Date().toISOString();
        if (resolution) updates.resolution = resolution;
      }
      const updated = mockDatabase.updateDispute(id, updates);
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },

  assign: async (id: string, officerId: string): Promise<ApiResponse<Dispute>> => {
    await delay(600);
    try {
      const updated = mockDatabase.updateDispute(id, { assignedTo: officerId });
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },
};

// ==================== VERIFICATIONS API ====================

export const verificationsApi = {
  getAll: async (status?: RequestStatus): Promise<ApiResponse<VerificationRequest[]>> => {
    await delay(500);
    let requests = [...mockDatabase.verificationRequests];
    if (status) {
      requests = requests.filter((v) => v.status === status);
    }
    return success(requests);
  },

  approve: async (id: string, officerId: string): Promise<ApiResponse<VerificationRequest>> => {
    await delay(800);
    try {
      const updated = mockDatabase.updateVerificationRequest(id, {
        status: "APPROVED",
        reviewedBy: officerId,
        reviewedAt: new Date().toISOString(),
      });
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },

  reject: async (id: string, officerId: string, reason: string): Promise<ApiResponse<VerificationRequest>> => {
    await delay(800);
    try {
      const updated = mockDatabase.updateVerificationRequest(id, {
        status: "REJECTED",
        reviewedBy: officerId,
        reviewedAt: new Date().toISOString(),
        rejectionReason: reason,
      });
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },
};

// ==================== SUBSCRIPTION UPGRADES API ====================

export const upgradesApi = {
  getAll: async (status?: RequestStatus): Promise<ApiResponse<SubscriptionUpgrade[]>> => {
    await delay(500);
    let upgrades = [...mockDatabase.subscriptionUpgrades];
    if (status) {
      upgrades = upgrades.filter((u) => u.status === status);
    }
    return success(upgrades);
  },

  approve: async (id: string, officerId: string): Promise<ApiResponse<SubscriptionUpgrade>> => {
    await delay(800);
    try {
      const updated = mockDatabase.updateSubscriptionUpgrade(id, {
        status: "APPROVED",
        reviewedBy: officerId,
        reviewedAt: new Date().toISOString(),
      });
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },

  reject: async (id: string, officerId: string, reason: string): Promise<ApiResponse<SubscriptionUpgrade>> => {
    await delay(800);
    try {
      const updated = mockDatabase.updateSubscriptionUpgrade(id, {
        status: "REJECTED",
        reviewedBy: officerId,
        reviewedAt: new Date().toISOString(),
        rejectionReason: reason,
      });
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },
};

// ==================== ESCROW API ====================

export const escrowApi = {
  getAll: async (status?: EscrowStatus): Promise<ApiResponse<EscrowAccount[]>> => {
    await delay(600);
    let accounts = [...mockDatabase.escrowAccounts];
    if (status) {
      accounts = accounts.filter((e) => e.status === status);
    }
    return success(accounts);
  },

  getById: async (id: string): Promise<ApiResponse<EscrowAccount>> => {
    await delay(300);
    const escrow = mockDatabase.escrowAccounts.find((e) => e.id === id);
    if (!escrow) return error("Escrow account not found");
    return success(escrow);
  },

  release: async (id: string, officerId: string): Promise<ApiResponse<EscrowAccount>> => {
    await delay(1000);
    try {
      const updated = mockDatabase.updateEscrow(id, {
        status: "RELEASED",
        releasedAt: new Date().toISOString(),
        releasedBy: officerId,
        updatedAt: new Date().toISOString(),
      });
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },

  refund: async (id: string, officerId: string): Promise<ApiResponse<EscrowAccount>> => {
    await delay(1000);
    try {
      const updated = mockDatabase.updateEscrow(id, {
        status: "REFUNDED",
        releasedAt: new Date().toISOString(),
        releasedBy: officerId,
        updatedAt: new Date().toISOString(),
      });
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },

  dispute: async (id: string): Promise<ApiResponse<EscrowAccount>> => {
    await delay(800);
    try {
      const updated = mockDatabase.updateEscrow(id, {
        status: "DISPUTED",
        updatedAt: new Date().toISOString(),
      });
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },
};

// ==================== TRANSACTIONS API ====================

export const transactionsApi = {
  getAll: async (): Promise<ApiResponse<Transaction[]>> => {
    await delay(700);
    const transactions = [...mockDatabase.transactions].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return success(transactions);
  },
};

// ==================== PAYOUTS API ====================

export const payoutsApi = {
  getAll: async (status?: RequestStatus): Promise<ApiResponse<PayoutRequest[]>> => {
    await delay(500);
    let payouts = [...mockDatabase.payoutRequests];
    if (status) {
      payouts = payouts.filter((p) => p.status === status);
    }
    return success(payouts);
  },

  approve: async (id: string, officerId: string): Promise<ApiResponse<PayoutRequest>> => {
    await delay(1000);
    try {
      const updated = mockDatabase.updatePayoutRequest(id, {
        status: "APPROVED",
        reviewedBy: officerId,
        approvedBy: officerId,
        processedAt: new Date().toISOString(),
      });
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },

  reject: async (id: string, officerId: string): Promise<ApiResponse<PayoutRequest>> => {
    await delay(800);
    try {
      const updated = mockDatabase.updatePayoutRequest(id, {
        status: "REJECTED",
        reviewedBy: officerId,
      });
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },
};

// ==================== REFUNDS API ====================

export const refundsApi = {
  getAll: async (status?: RequestStatus): Promise<ApiResponse<RefundRequest[]>> => {
    await delay(500);
    let refunds = [...mockDatabase.refundRequests];
    if (status) {
      refunds = refunds.filter((r) => r.status === status);
    }
    return success(refunds);
  },
};

// ==================== LOGS API ====================

export const logsApi = {
  getActivityLogs: async (filters?: { userId?: string; action?: string }): Promise<ApiResponse<ActivityLog[]>> => {
    await delay(600);
    let logs = [...mockDatabase.activityLogs].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    if (filters?.userId) {
      logs = logs.filter((l) => l.userId === filters.userId);
    }
    if (filters?.action) {
      logs = logs.filter((l) => l.action === filters.action);
    }
    return success(logs);
  },

  getAuditLogs: async (): Promise<ApiResponse<AuditLog[]>> => {
    await delay(600);
    const logs = [...mockDatabase.auditLogs].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return success(logs);
  },

  getApiLogs: async (): Promise<ApiResponse<ApiLog[]>> => {
    await delay(600);
    const logs = [...mockDatabase.apiLogs].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return success(logs);
  },

  getErrorLogs: async (): Promise<ApiResponse<ErrorLog[]>> => {
    await delay(600);
    const logs = [...mockDatabase.errorLogs].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return success(logs);
  },
};

// ==================== SESSIONS API ====================

export const sessionsApi = {
  getAll: async (): Promise<ApiResponse<Session[]>> => {
    await delay(500);
    return success(mockDatabase.sessions);
  },

  getActive: async (): Promise<ApiResponse<Session[]>> => {
    await delay(500);
    const active = mockDatabase.sessions.filter((s) => s.isActive);
    return success(active);
  },

  terminate: async (id: string): Promise<ApiResponse<{ success: boolean }>> => {
    await delay(600);
    const session = mockDatabase.sessions.find((s) => s.id === id);
    if (session) {
      session.isActive = false;
    }
    return success({ success: true });
  },
};

// ==================== CONFIG API ====================

export const configApi = {
  getFeatureFlags: async (): Promise<ApiResponse<FeatureFlag[]>> => {
    await delay(400);
    return success(mockDatabase.featureFlags);
  },

  updateFeatureFlag: async (id: string, updates: Partial<FeatureFlag>): Promise<ApiResponse<FeatureFlag>> => {
    await delay(600);
    try {
      const updated = mockDatabase.updateFeatureFlag(id, updates);
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },

  getTierConfigs: async (): Promise<ApiResponse<TierConfig[]>> => {
    await delay(400);
    return success(mockDatabase.tierConfigs);
  },

  getAppConfigs: async (): Promise<ApiResponse<AppConfig[]>> => {
    await delay(400);
    return success(mockDatabase.appConfigs);
  },

  updateAppConfig: async (id: string, value: string, officerId: string): Promise<ApiResponse<AppConfig>> => {
    await delay(600);
    try {
      const updated = mockDatabase.updateAppConfig(id, { value, updatedBy: officerId });
      return success(updated);
    } catch (e) {
      return error((e as Error).message);
    }
  },
};

// ==================== REGIONS API ====================

export const regionsApi = {
  getAll: async (): Promise<ApiResponse<typeof mockDatabase.regions>> => {
    await delay(300);
    return success(mockDatabase.regions);
  },

  getLgas: async (regionId?: string): Promise<ApiResponse<typeof mockDatabase.lgas>> => {
    await delay(300);
    let lgas = [...mockDatabase.lgas];
    if (regionId) {
      lgas = lgas.filter((l) => l.regionId === regionId);
    }
    return success(lgas);
  },
};

// ==================== ANALYTICS API ====================

export const analyticsApi = {
  getOverview: async () => {
    await delay(800);
    const data = {
      totalUsers: mockDatabase.users.length,
      totalLandlords: mockDatabase.landlords.length,
      totalTenants: mockDatabase.tenants.length,
      totalAgents: mockDatabase.agents.length,
      totalListings: mockDatabase.listings.length,
      activeListings: mockDatabase.listings.filter((l) => l.status === "ACTIVE" || l.status === "APPROVED").length,
      pendingListings: mockDatabase.listings.filter((l) => l.status === "PENDING").length,
      openDisputes: mockDatabase.disputes.filter((d) => ["OPEN", "IN_PROGRESS", "ESCALATED"].includes(d.status)).length,
      totalEscrow: mockDatabase.escrowAccounts.reduce((sum, e) => sum + (e.status === "HELD" ? e.amount : 0), 0),
      pendingVerifications: mockDatabase.verificationRequests.filter((v) => v.status === "PENDING").length,
      pendingUpgrades: mockDatabase.subscriptionUpgrades.filter((u) => u.status === "PENDING").length,
      activeSessions: mockDatabase.sessions.filter((s) => s.isActive).length,
    };
    return success(data);
  },

  getRegionalMetrics: async () => {
    await delay(1000);
    const metrics = mockDatabase.regions.map((region) => {
      const regionLgas = mockDatabase.lgas.filter((l) => l.regionId === region.id);
      const lgaIds = regionLgas.map((l) => l.id);
      const regionUsers = mockDatabase.users.filter((u) => lgaIds.includes(u.lgaId));
      const regionListings = mockDatabase.listings.filter((l) => lgaIds.includes(l.lgaId));

      return {
        region,
        lgas: regionLgas,
        stats: {
          totalUsers: regionUsers.length,
          totalListings: regionListings.length,
          activeListings: regionListings.filter((l) => l.status === "ACTIVE" || l.status === "APPROVED").length,
          totalViews: regionListings.reduce((sum, l) => sum + l.views, 0),
          avgPrice: regionListings.length > 0
            ? regionListings.reduce((sum, l) => sum + l.price, 0) / regionListings.length
            : 0,
        },
      };
    });
    return success(metrics);
  },
};

// ==================== NOTIFICATIONS API ====================

export const notificationsApi = {
  getAll: async (): Promise<ApiResponse<typeof mockDatabase.notifications>> => {
    await delay(400);
    const notifications = [...mockDatabase.notifications].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return success(notifications);
  },

  getUnread: async () => {
    await delay(300);
    const unread = mockDatabase.notifications.filter((n) => !n.isRead);
    return success(unread);
  },

  markAsRead: async (id: string) => {
    await delay(200);
    const notification = mockDatabase.notifications.find((n) => n.id === id);
    if (notification) {
      notification.isRead = true;
    }
    return success({ success: true });
  },

  markAllAsRead: async () => {
    await delay(300);
    mockDatabase.notifications.forEach((n) => {
      n.isRead = true;
    });
    return success({ success: true });
  },
};

// ==================== EXPORT ALL ====================

export const api = {
  users: usersApi,
  listings: listingsApi,
  disputes: disputesApi,
  verifications: verificationsApi,
  upgrades: upgradesApi,
  escrow: escrowApi,
  transactions: transactionsApi,
  payouts: payoutsApi,
  refunds: refundsApi,
  logs: logsApi,
  sessions: sessionsApi,
  config: configApi,
  regions: regionsApi,
  analytics: analyticsApi,
  notifications: notificationsApi,
};

export default api;
