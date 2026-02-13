import { mockDb } from "./mockFn";
import type { User, Listing, Dispute } from "./mockFn";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ==================== USERS API ====================
export const usersApi = {
  getAll: async (role?: string): Promise<User[]> => {
    await delay(500);
    if (role) return mockDb.users.filter((u) => u.role === role);
    return mockDb.users;
  },

  getById: async (id: string): Promise<User> => {
    await delay(300);
    const user = mockDb.users.find((u) => u.id === id);
    if (!user) throw new Error("User not found");
    return user;
  },

  update: async (id: string, updates: Partial<User>): Promise<User> => {
    await delay(800);
    return mockDb.updateUser(id, updates);
  },
};

// ==================== LISTINGS API ====================
export const listingsApi = {
  getAll: async (): Promise<Listing[]> => {
    await delay(600);
    return mockDb.listings;
  },
};

// ==================== DISPUTES API ====================
export const disputesApi = {
  getAll: async (): Promise<Dispute[]> => {
    await delay(500);
    return mockDb.disputes.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  },

  getById: async (id: string): Promise<Dispute> => {
    await delay(300);
    const dispute = mockDb.disputes.find((d) => d.id === id);
    if (!dispute) throw new Error("Dispute not found");
    return dispute;
  },

  updateStatus: async (
    id: string,
    status: Dispute["status"],
  ): Promise<Dispute> => {
    await delay(600);
    return mockDb.updateDispute(id, {
      status,
      updatedAt: new Date().toISOString(),
    });
  },
};

// ==================== ANALYTICS API ====================
export const analyticsApi = {
  getOverview: async () => {
    await delay(1000);
    return {
      activeUsers: mockDb.users.length,
      activeListings: mockDb.listings.filter((l) => l.status === "ACTIVE")
        .length,
      openDisputes: mockDb.disputes.filter((d) =>
        ["OPEN", "ESCALATED"].includes(d.status),
      ).length,
      revenue: 45000000,
    };
  },
};
