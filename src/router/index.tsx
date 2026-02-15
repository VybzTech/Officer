// // ============================================
// // URBAN GRAVITY - ROUTER CONFIGURATION
// // Protected routes with auth guards
// // ============================================

// import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
// import { useAuthStore } from "@/stores/auth.store";
// import { DashboardLayout } from "@/layouts";
// import {
//   AuthPage,
//   DashboardPage,
//   ListingsPage,
//   VerificationsPage,
//   DisputesPage,
//   TenantsPage,
//   LandlordsPage,
// } from "@/pages";

// // ==================== AUTH GUARD ====================
// function AuthGuard() {
//   const { isAuthenticated, authStep } = useAuthStore();

//   // Not logged in or in 2FA step - show auth page
//   if (!isAuthenticated || authStep !== "AUTHENTICATED") {
//     return <AuthPage />;
//   }

//   // Authenticated - render children with dashboard layout
//   return (
//     <DashboardLayout>
//       <Outlet />
//     </DashboardLayout>
//   );
// }

// // ==================== PUBLIC GUARD ====================
// function PublicGuard() {
//   const { isAuthenticated, authStep } = useAuthStore();

//   // Already authenticated - redirect to dashboard
//   if (isAuthenticated && authStep === "AUTHENTICATED") {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return <Outlet />;
// }

// // ==================== PLACEHOLDER PAGES ====================
// function PlaceholderPage({ title }: { title: string }) {
//   return (
//     <div className="flex flex-col items-center justify-center h-96">
//       <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
//       <p className="text-gray-500 mt-2">This module is under development</p>
//     </div>
//   );
// }

// // ==================== ROUTER ====================
// export const router = createBrowserRouter([
//   // Public routes
//   {
//     element: <PublicGuard />,
//     children: [
//       {
//         path: "/login",
//         element: <AuthPage />,
//       },
//     ],
//   },

//   // Protected routes
//   {
//     element: <AuthGuard />,
//     children: [
//       // Root redirect
//       {
//         path: "/",
//         element: <Navigate to="/dashboard" replace />,
//       },

//       // Overview
//       {
//         path: "/dashboard",
//         element: <DashboardPage />,
//       },
//       {
//         path: "/metrics",
//         element: <PlaceholderPage title="Regional Metrics" />,
//       },
//       {
//         path: "/ai-insights",
//         element: <PlaceholderPage title="AI Insights" />,
//       },

//       // Market Management
//       {
//         path: "/listings",
//         element: <ListingsPage />,
//       },
//       {
//         path: "/landlords",
//         element: <LandlordsPage />,
//       },
//       {
//         path: "/tenants",
//         element: <TenantsPage />,
//       },
//       {
//         path: "/agents",
//         element: <PlaceholderPage title="Agents" />,
//       },

//       // Moderation & Control
//       {
//         path: "/verifications",
//         element: <VerificationsPage />,
//       },
//       {
//         path: "/upgrades",
//         element: <PlaceholderPage title="Subscription Upgrades" />,
//       },
//       {
//         path: "/disputes",
//         element: <DisputesPage />,
//       },
//       {
//         path: "/reports",
//         element: <PlaceholderPage title="Reports" />,
//       },

//       // Intelligence
//       {
//         path: "/ai/matches",
//         element: <PlaceholderPage title="AI Match Recommendations" />,
//       },
//       {
//         path: "/ai/preferences",
//         element: <PlaceholderPage title="Preference Mapping" />,
//       },
//       {
//         path: "/ai/risk",
//         element: <PlaceholderPage title="Risk Scoring" />,
//       },

//       // Regional Control
//       {
//         path: "/regions",
//         element: <PlaceholderPage title="Regions" />,
//       },
//       {
//         path: "/lgas",
//         element: <PlaceholderPage title="LGAs" />,
//       },
//       {
//         path: "/lga-activity",
//         element: <PlaceholderPage title="LGA Activity" />,
//       },
//       {
//         path: "/add-listing",
//         element: <PlaceholderPage title="Add Official Listing" />,
//       },

//       // Financial Control
//       {
//         path: "/escrow",
//         element: <PlaceholderPage title="Escrow Accounts" />,
//       },
//       {
//         path: "/transactions",
//         element: <PlaceholderPage title="Transaction Logs" />,
//       },
//       {
//         path: "/payouts",
//         element: <PlaceholderPage title="Payout Approvals" />,
//       },
//       {
//         path: "/refunds",
//         element: <PlaceholderPage title="Refund Management" />,
//       },

//       // System Observability
//       {
//         path: "/logs/api",
//         element: <PlaceholderPage title="API Logs" />,
//       },
//       {
//         path: "/logs/audit",
//         element: <PlaceholderPage title="Audit Logs" />,
//       },
//       {
//         path: "/logs/activity",
//         element: <PlaceholderPage title="Activity Logs" />,
//       },
//       {
//         path: "/logs/errors",
//         element: <PlaceholderPage title="Error Monitoring" />,
//       },

//       // Platform Configuration
//       {
//         path: "/config/app",
//         element: <PlaceholderPage title="App Configuration" />,
//       },
//       {
//         path: "/config/tiers",
//         element: <PlaceholderPage title="Tier Settings" />,
//       },
//       {
//         path: "/config/roles",
//         element: <PlaceholderPage title="Role & Permissions" />,
//       },
//       {
//         path: "/config/features",
//         element: <PlaceholderPage title="Feature Flags" />,
//       },

//       // Documentation
//       {
//         path: "/docs/api",
//         element: <PlaceholderPage title="API Documentation" />,
//       },
//       {
//         path: "/docs/moderation",
//         element: <PlaceholderPage title="Moderation Guide" />,
//       },
//       {
//         path: "/docs/escrow",
//         element: <PlaceholderPage title="Escrow Policy" />,
//       },
//       {
//         path: "/docs/lagos",
//         element: <PlaceholderPage title="Lagos Guidelines" />,
//       },

//       // Account
//       {
//         path: "/account/profile",
//         element: <PlaceholderPage title="Profile" />,
//       },
//       {
//         path: "/account/security",
//         element: <PlaceholderPage title="Security Settings" />,
//       },
//       {
//         path: "/account/sessions",
//         element: <PlaceholderPage title="Active Sessions" />,
//       },
//       {
//         path: "/account/2fa",
//         element: <PlaceholderPage title="2FA Settings" />,
//       },

//       // 404
//       {
//         path: "*",
//         element: <PlaceholderPage title="404 - Page Not Found" />,
//       },
//     ],
//   },
// ]);

// ============================================
// URBAN GRAVITY - ROUTER CONFIGURATION
// Protected routes with auth guards
// ============================================

import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { DashboardLayout } from "@/layouts";
import {
  AuthPage,
  DashboardPage,
  ListingsPage,
  VerificationsPage,
  DisputesPage,
  TenantsPage,
  LandlordsPage,
  AgentsPage,
  RegionalMetricsPage,
  UpgradesPage,
  // ReportsPage,
  RegionsPage,
  LgasPage,
  LgaActivityPage,
  EscrowPage,
  TransactionsPage,
  PayoutsPage,
  RefundsPage,
  ApiLogsPage,
  AuditLogsPage,
  ActivityLogsPage,
  ErrorLogsPage,
  AppConfigPage,
  TierSettingsPage,
  // RolePermissionsPage,
  SessionsPage,
} from "@/pages";
import AiInsightsPage from "@/pages/AiInsightsPage";

// ==================== AUTH GUARD ====================
function AuthGuard() {
  const { isAuthenticated, authStep } = useAuthStore();

  // Not logged in or in 2FA step - show auth page
  if (!isAuthenticated || authStep !== "AUTHENTICATED") {
    return <AuthPage />;
  }

  // Authenticated - render children with dashboard layout
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

// ==================== PUBLIC GUARD ====================
function PublicGuard() {
  const { isAuthenticated, authStep } = useAuthStore();

  // Already authenticated - redirect to dashboard
  if (isAuthenticated && authStep === "AUTHENTICATED") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

// ==================== PLACEHOLDER COMPONENT ====================
// For routes still under development
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-500">This module is under development</p>
        <p className="text-sm text-gray-400 mt-4">Coming soon...</p>
      </div>
    </div>
  );
}

// ==================== ROUTER ====================
export const router = createBrowserRouter([
  // ========== PUBLIC ROUTES ==========
  {
    element: <PublicGuard />,
    children: [
      {
        path: "/login",
        element: <AuthPage />,
      },
    ],
  },

  // ========== PROTECTED ROUTES ==========
  {
    element: <AuthGuard />,
    children: [
      // Root redirect
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },

      // ========== OVERVIEW ==========
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/metrics",
        element: <RegionalMetricsPage />,
      },
      {
        path: "/ai-insights",
        element: <AiInsightsPage />,
        // element: <ComingSoon title="AI Insights" />,
      },

      // ========== MARKET MANAGEMENT ==========
      {
        path: "/listings",
        element: <ListingsPage />,
      },
      {
        path: "/landlords",
        element: <LandlordsPage />,
      },
      {
        path: "/tenants",
        element: <TenantsPage />,
      },
      {
        path: "/agents",
        element: <AgentsPage />,
      },

      // ========== MODERATION & CONTROL ==========
      {
        path: "/verifications",
        element: <VerificationsPage />,
      },
      {
        path: "/upgrades",
        element: <UpgradesPage />,
      },
      {
        path: "/disputes",
        element: <DisputesPage />,
      },
      {
        path: "/reports",
        element: <ComingSoon title="Reports Page" />,
      },

      // ========== AI INTELLIGENCE ==========
      {
        path: "/ai/matches",
        element: <ComingSoon title="AI Match Recommendations" />,
      },
      {
        path: "/ai/preferences",
        element: <ComingSoon title="Preference Mapping" />,
      },
      {
        path: "/ai/risk",
        element: <ComingSoon title="Risk Scoring" />,
      },

      // ========== REGIONAL CONTROL ==========
      {
        path: "/regions",
        element: <RegionsPage />,
      },
      {
        path: "/lgas",
        element: <LgasPage />,
      },
      {
        path: "/lga-activity",
        element: <LgaActivityPage />,
      },
      {
        path: "/add-listing",
        element: <ComingSoon title="Add Official Listing" />,
      },

      // ========== FINANCIAL CONTROL ==========
      {
        path: "/escrow",
        element: <EscrowPage />,
      },
      {
        path: "/transactions",
        element: <TransactionsPage />,
      },
      {
        path: "/payouts",
        element: <PayoutsPage />,
      },
      {
        path: "/refunds",
        element: <RefundsPage />,
      },

      // ========== SYSTEM OBSERVABILITY ==========
      {
        path: "/logs/api",
        element: <ApiLogsPage />,
      },
      {
        path: "/logs/audit",
        element: <AuditLogsPage />,
      },
      {
        path: "/logs/activity",
        element: <ActivityLogsPage />,
      },
      {
        path: "/logs/errors",
        element: <ErrorLogsPage />,
      },

      // ========== PLATFORM CONFIGURATION ==========
      {
        path: "/config/app",
        element: <AppConfigPage />,
      },
      {
        path: "/config/tiers",
        element: <TierSettingsPage />,
      },
      {
        path: "/config/roles",
        element: <ComingSoon title="Role Permissions" />,
      },
      {
        path: "/config/features",
        element: <ComingSoon title="Feature Flags" />,
      },

      // ========== DOCUMENTATION ==========
      {
        path: "/docs/api",
        element: <ComingSoon title="API Documentation" />,
      },
      {
        path: "/docs/moderation",
        element: <ComingSoon title="Moderation Guide" />,
      },
      {
        path: "/docs/escrow",
        element: <ComingSoon title="Escrow Policy" />,
      },
      {
        path: "/docs/lagos",
        element: <ComingSoon title="Lagos Guidelines" />,
      },

      // ========== ACCOUNT SETTINGS ==========
      {
        path: "/account/profile",
        element: <ComingSoon title="Profile Settings" />,
      },
      {
        path: "/account/security",
        element: <ComingSoon title="Security Settings" />,
      },
      {
        path: "/account/sessions",
        element: <SessionsPage />,
      },
      {
        path: "/account/2fa",
        element: <ComingSoon title="2FA Settings" />,
      },

      // ========== 404 ==========
      {
        path: "*",
        element: (
          <div className="flex flex-col items-center justify-center h-96">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
            <p className="text-gray-500">Page not found</p>
          </div>
        ),
      },
    ],
  },
]);
