// ============================================
// URBAN GRAVITY - ROUTER CONFIGURATION
// Protected routes with auth guards
// ============================================

import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';
import { DashboardLayout } from '@/layouts';
import {
  AuthPage,
  DashboardPage,
  ListingsPage,
  VerificationsPage,
} from '@/pages';

// ==================== AUTH GUARD ====================
function AuthGuard() {
  const { isAuthenticated, authStep } = useAuthStore();

  // Not logged in or in 2FA step - show auth page
  if (!isAuthenticated || authStep !== 'AUTHENTICATED') {
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
  if (isAuthenticated && authStep === 'AUTHENTICATED') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

// ==================== PLACEHOLDER PAGES ====================
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <p className="text-gray-400 mt-2">This page is under development</p>
    </div>
  );
}

// ==================== ROUTER ====================
export const router = createBrowserRouter([
  // Public routes
  {
    element: <PublicGuard />,
    children: [
      {
        path: '/login',
        element: <AuthPage />,
      },
    ],
  },

  // Protected routes
  {
    element: <AuthGuard />,
    children: [
      // Root redirect
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },

      // Overview
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/metrics',
        element: <PlaceholderPage title="Regional Metrics" />,
      },
      {
        path: '/ai-insights',
        element: <PlaceholderPage title="AI Insights" />,
      },

      // Market Management
      {
        path: '/listings',
        element: <ListingsPage />,
      },
      {
        path: '/landlords',
        element: <PlaceholderPage title="Landlords" />,
      },
      {
        path: '/tenants',
        element: <PlaceholderPage title="Tenants" />,
      },
      {
        path: '/agents',
        element: <PlaceholderPage title="Agents" />,
      },

      // Moderation & Control
      {
        path: '/verifications',
        element: <VerificationsPage />,
      },
      {
        path: '/upgrades',
        element: <PlaceholderPage title="Subscription Upgrades" />,
      },
      {
        path: '/disputes',
        element: <PlaceholderPage title="Disputes" />,
      },
      {
        path: '/reports',
        element: <PlaceholderPage title="Reports" />,
      },

      // Intelligence
      {
        path: '/ai/matches',
        element: <PlaceholderPage title="AI Match Recommendations" />,
      },
      {
        path: '/ai/preferences',
        element: <PlaceholderPage title="Preference Mapping" />,
      },
      {
        path: '/ai/risk',
        element: <PlaceholderPage title="Risk Scoring" />,
      },

      // Regional Control
      {
        path: '/regions',
        element: <PlaceholderPage title="Regions" />,
      },
      {
        path: '/lgas',
        element: <PlaceholderPage title="LGAs" />,
      },
      {
        path: '/lga-activity',
        element: <PlaceholderPage title="LGA Activity" />,
      },
      {
        path: '/add-listing',
        element: <PlaceholderPage title="Add Official Listing" />,
      },

      // Financial Control
      {
        path: '/escrow',
        element: <PlaceholderPage title="Escrow Accounts" />,
      },
      {
        path: '/transactions',
        element: <PlaceholderPage title="Transaction Logs" />,
      },
      {
        path: '/payouts',
        element: <PlaceholderPage title="Payout Approvals" />,
      },
      {
        path: '/refunds',
        element: <PlaceholderPage title="Refund Management" />,
      },

      // System Observability
      {
        path: '/logs/api',
        element: <PlaceholderPage title="API Logs" />,
      },
      {
        path: '/logs/audit',
        element: <PlaceholderPage title="Audit Logs" />,
      },
      {
        path: '/logs/activity',
        element: <PlaceholderPage title="Activity Logs" />,
      },
      {
        path: '/logs/errors',
        element: <PlaceholderPage title="Error Monitoring" />,
      },

      // Platform Configuration
      {
        path: '/config/app',
        element: <PlaceholderPage title="App Configuration" />,
      },
      {
        path: '/config/tiers',
        element: <PlaceholderPage title="Tier Settings" />,
      },
      {
        path: '/config/roles',
        element: <PlaceholderPage title="Role & Permissions" />,
      },
      {
        path: '/config/features',
        element: <PlaceholderPage title="Feature Flags" />,
      },

      // Documentation
      {
        path: '/docs/api',
        element: <PlaceholderPage title="API Documentation" />,
      },
      {
        path: '/docs/moderation',
        element: <PlaceholderPage title="Moderation Guide" />,
      },
      {
        path: '/docs/escrow',
        element: <PlaceholderPage title="Escrow Policy" />,
      },
      {
        path: '/docs/lagos',
        element: <PlaceholderPage title="Lagos Guidelines" />,
      },

      // Account
      {
        path: '/account/profile',
        element: <PlaceholderPage title="Profile" />,
      },
      {
        path: '/account/security',
        element: <PlaceholderPage title="Security Settings" />,
      },
      {
        path: '/account/sessions',
        element: <PlaceholderPage title="Active Sessions" />,
      },
      {
        path: '/account/2fa',
        element: <PlaceholderPage title="2FA Settings" />,
      },

      // 404
      {
        path: '*',
        element: <PlaceholderPage title="404 - Page Not Found" />,
      },
    ],
  },
]);
