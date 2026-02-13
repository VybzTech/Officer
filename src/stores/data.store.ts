import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  usersApi,
  listingsApi,
  disputesApi,
  analyticsApi,
} from "@/services/api";
import type { User, Listing, Dispute } from "@/services/mockFn";

interface DataState {
  // Data
  users: User[];
  listings: Listing[];
  disputes: Dispute[];
  metrics: any | null; // Placeholder for robust metrics type

  // Loading States
  isLoadingUsers: boolean;
  isLoadingListings: boolean;
  isLoadingDisputes: boolean;
  isLoadingMetrics: boolean;

  // Errors
  error: string | null;

  // Actions
  fetchUsers: (role?: string) => Promise<void>;
  fetchListings: () => Promise<void>;
  fetchDisputes: () => Promise<void>;
  fetchMetrics: () => Promise<void>;

  // Computed / Helpers
  getUsersByRole: (role: string) => User[];
}

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      users: [],
      listings: [],
      disputes: [],
      metrics: null,

      isLoadingUsers: false,
      isLoadingListings: false,
      isLoadingDisputes: false,
      isLoadingMetrics: false,
      error: null,

      fetchUsers: async (role?: string) => {
        set({ isLoadingUsers: true, error: null });
        try {
          // In a real app, we might want to append or merge, but for now we replace
          // If role is provided, we only fetch that subset.
          // However, our API mocks returning all or filtered.
          // For simplicity, let's fetch all if no role to populate state fully,
          // or just the role if needed.
          // Strategy: Always fetch all users to keep state simple for this mock-driven app.
          const data = await usersApi.getAll();
          set({ users: data, isLoadingUsers: false });
        } catch (err: any) {
          set({ error: err.message, isLoadingUsers: false });
        }
      },

      fetchListings: async () => {
        set({ isLoadingListings: true, error: null });
        try {
          const data = await listingsApi.getAll();
          set({ listings: data, isLoadingListings: false });
        } catch (err: any) {
          set({ error: err.message, isLoadingListings: false });
        }
      },

      fetchDisputes: async () => {
        set({ isLoadingDisputes: true, error: null });
        try {
          const data = await disputesApi.getAll();
          set({ disputes: data, isLoadingDisputes: false });
        } catch (err: any) {
          set({ error: err.message, isLoadingDisputes: false });
        }
      },

      fetchMetrics: async () => {
        set({ isLoadingMetrics: true, error: null });
        try {
          const data = await analyticsApi.getOverview();
          set({ metrics: data, isLoadingMetrics: false });
        } catch (err: any) {
          set({ error: err.message, isLoadingMetrics: false });
        }
      },

      getUsersByRole: (role: string) => {
        return get().users.filter((u) => u.role === role);
      },
    }),
    {
      name: "ug-officer-data",
      storage: createJSONStorage(() => sessionStorage), // Session storage to be safe
      partialize: (state) => ({
        // Persist data to avoid refetching on every reload for now
        users: state.users,
        listings: state.listings,
        disputes: state.disputes,
        metrics: state.metrics,
      }),
    },
  ),
);
