import type { NavGroup } from "@/types";
import {
  LayoutDashboard,
  BarChart3,
  Brain,
  Building2,
  Users,
  UserCheck,
  Briefcase,
  ShieldCheck,
  ArrowUpCircle,
  Scale,
  AlertTriangle,
  Wallet,
  MapPin,
  Map,
  Activity,
  PlusSquare,
  DollarSign,
  ListChecks,
  CreditCard,
  RotateCcw,
  Terminal,
  FileText,
  History,
  Bug,
  Settings,
  Sliders,
  Shield,
  ToggleLeft,
  BookOpen,
  HelpCircle,
  FileCheck,
  Landmark,
  User,
  Lock,
  Monitor,
  KeyRound,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
// ==================== NAVIGATION STRUCTURE ====================

export const NAVIGATION: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
        permission: "VIEW_DASHBOARD",
      },
      {
        label: "Regional Metrics",
        path: "/metrics",
        icon: BarChart3,
        permission: "VIEW_REGIONAL_METRICS",
      },
      {
        label: "AI Insights",
        path: "/ai-insights",
        icon: Brain,
        permission: "VIEW_AI_INSIGHTS",
        isNew: true,
      },
    ],
  },
  {
    label: "Market Management",
    items: [
      {
        label: "Listings",
        path: "/listings",
        icon: Building2,
        permission: "VIEW_LISTINGS",
      },
      {
        label: "Landlords",
        path: "/landlords",
        icon: Users,
        permission: "VIEW_LANDLORDS",
      },
      {
        label: "Tenants",
        path: "/tenants",
        icon: UserCheck,
        permission: "VIEW_TENANTS",
      },
      {
        label: "Agents",
        path: "/agents",
        icon: Briefcase,
        permission: "VIEW_AGENTS",
      },
    ],
  },
  {
    label: "Moderation & Control",
    items: [
      {
        label: "Verification Requests",
        path: "/verifications",
        icon: ShieldCheck,
        permission: "VIEW_VERIFICATION_REQUESTS",
      },
      {
        label: "Subscription Upgrades",
        path: "/upgrades",
        icon: ArrowUpCircle,
        permission: "VIEW_SUBSCRIPTION_UPGRADES",
      },
      {
        label: "Disputes",
        path: "/disputes",
        icon: Scale,
        permission: "VIEW_DISPUTES",
      },
      {
        label: "Reports",
        path: "/reports",
        icon: AlertTriangle,
        permission: "VIEW_REPORTS",
      },
    ],
  },
  {
    label: "Intelligence",
    permission: "VIEW_AI_INSIGHTS",
    items: [
      {
        label: "AI Match Recommendations",
        path: "/ai/matches",
        icon: Brain,
        permission: "VIEW_AI_INSIGHTS",
      },
      {
        label: "Preference Mapping",
        path: "/ai/preferences",
        icon: Map,
        permission: "VIEW_AI_INSIGHTS",
      },
      {
        label: "Risk Scoring",
        path: "/ai/risk",
        icon: ShieldCheck,
        permission: "VIEW_AI_INSIGHTS",
      },
    ],
  },
  {
    label: "Regional Control",
    items: [
      {
        label: "Regions",
        path: "/regions",
        icon: MapPin,
        permission: "VIEW_REGIONS",
      },
      { label: "LGAs", path: "/lgas", icon: Map, permission: "VIEW_LGAS" },
      {
        label: "LGA Activity",
        path: "/lga-activity",
        icon: Activity,
        permission: "VIEW_LGA_ACTIVITY",
      },
      {
        label: "Add Official Listing",
        path: "/add-listing",
        icon: PlusSquare,
        permission: "CREATE_OFFICIAL_LISTING",
      },
    ],
  },
  {
    label: "Financial Control",
    items: [
      {
        label: "Escrow Accounts",
        path: "/escrow",
        icon: Wallet,
        permission: "VIEW_ESCROW",
      },
      {
        label: "Transaction Logs",
        path: "/transactions",
        icon: ListChecks,
        permission: "VIEW_TRANSACTIONS",
      },
      {
        label: "Payout Approvals",
        path: "/payouts",
        icon: CreditCard,
        permission: "APPROVE_PAYOUT",
      },
      {
        label: "Refund Management",
        path: "/refunds",
        icon: RotateCcw,
        permission: "REFUND_ESCROW",
      },
    ],
  },
  {
    label: "System Observability",
    items: [
      {
        label: "API Logs",
        path: "/logs/api",
        icon: Terminal,
        permission: "VIEW_API_LOGS",
      },
      {
        label: "Audit Logs",
        path: "/logs/audit",
        icon: FileText,
        permission: "VIEW_AUDIT_LOGS",
      },
      {
        label: "Activity Logs",
        path: "/logs/activity",
        icon: History,
        permission: "VIEW_ACTIVITY_LOGS",
      },
      {
        label: "Error Monitoring",
        path: "/logs/errors",
        icon: Bug,
        permission: "VIEW_ERROR_LOGS",
      },
    ],
  },
  {
    label: "Platform",
    items: [
      {
        label: "App Configuration",
        path: "/config/app",
        icon: Settings,
        permission: "VIEW_APP_CONFIG",
      },
      {
        label: "Tier Settings",
        path: "/config/tiers",
        icon: Sliders,
        permission: "VIEW_TIER_SETTINGS",
      },
      {
        label: "Role & Permissions",
        path: "/config/roles",
        icon: Shield,
        permission: "VIEW_ROLE_MATRIX",
      },
      {
        label: "Feature Flags",
        path: "/config/features",
        icon: ToggleLeft,
        permission: "VIEW_FEATURE_FLAGS",
      },
    ],
  },
  {
    label: "Documentation",
    items: [
      { label: "API Documentation", path: "/docs/api", icon: BookOpen },
      { label: "Moderation Guide", path: "/docs/moderation", icon: HelpCircle },
      { label: "Escrow Policy", path: "/docs/escrow", icon: FileCheck },
      { label: "Lagos Guidelines", path: "/docs/lagos", icon: Landmark },
    ],
  },
  {
    label: "Account",
    items: [
      {
        label: "Profile",
        path: "/account/profile",
        icon: User,
        permission: "VIEW_PROFILE",
      },
      {
        label: "Security",
        path: "/account/security",
        icon: Lock,
        permission: "MANAGE_2FA",
      },
      {
        label: "Active Sessions",
        path: "/account/sessions",
        icon: Monitor,
        permission: "VIEW_SESSIONS",
      },
      {
        label: "2FA Settings",
        path: "/account/2fa",
        icon: KeyRound,
        permission: "MANAGE_2FA",
      },
    ],
  },
];