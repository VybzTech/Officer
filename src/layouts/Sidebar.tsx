// ============================================
// URBAN GRAVITY - SIDEBAR NAVIGATION
// Supabase-inspired navigation structure
// ============================================

import { NavLink, useLocation } from "react-router-dom";
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
  type LucideIcon,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { PermissionGate } from "@/components/guards";
import { cn } from "@/utils/cn";
import type { Permission } from "@/types";

// ==================== TYPES ====================
interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  permission?: Permission;
  permissions?: Permission[];
  badge?: string | number;
  isNew?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
  permission?: Permission;
}

// ==================== NAVIGATION STRUCTURE ====================
const NAVIGATION: NavGroup[] = [
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

// ==================== PROPS ====================
interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

// ==================== COMPONENT ====================
export function Sidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const location = useLocation();
  const { officer } = useAuthStore();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border shadow-xl",
        "transform transition-all duration-300 ease-in-out",
        "lg:relative lg:translate-x-0",
        collapsed ? "w-20" : "w-72",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      {/* Brand Header */}
      <div className="flex h-20 items-center justify-between px-6 border-b border-sidebar-border bg-sidebar/50 backdrop-blur-sm">
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center w-full",
          )}
        >
          {/* Logo */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-primary-500 to-yellow-300 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 shadow-glow-sm">
              <Landmark className="h-6 w-6 text-sidebar" strokeWidth={2.5} />
            </div>
          </div>

          {!collapsed && (
            <div className="overflow-hidden animate-fade-in">
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg font-extrabold text-white tracking-tight">
                  Urban Gravity
                </h1>
                <div className="px-1.5 py-0.5 rounded bg-primary-500/10 border border-primary-500/20">
                  <span className="text-[10px] font-bold text-primary-500 uppercase">
                    Pro
                  </span>
                </div>
              </div>
              <p className="text-[11px] font-medium text-gray-500 uppercase tracking-widest leading-none mt-1">
                Officer Intelligence
              </p>
            </div>
          )}
        </div>

        {/* Mobile Close */}
        <button
          onClick={onMobileClose}
          className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-sidebar-hover transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Desktop Toggle */}
        <button
          onClick={onToggle}
          className={cn(
            "hidden lg:flex p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-sidebar-hover transition-all border border-transparent hover:border-sidebar-border",
            collapsed &&
              "absolute -right-3 top-8 bg-sidebar border border-sidebar-border shadow-lg z-10",
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll py-6 px-4 space-y-8 scroll-smooth">
        {NAVIGATION.map((group) => (
          <NavGroupComponent
            key={group.label}
            group={group}
            collapsed={collapsed}
            currentPath={location.pathname}
          />
        ))}

        {/* Quick Actions (Only when not collapsed) */}
        {!collapsed && (
          <div className="pt-4 px-2">
            <button className="w-full flex items-center justify-center gap-2 btn-primary shadow-lg shadow-primary-500/10 active:scale-95 group">
              <PlusSquare className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Create Official Listing</span>
            </button>
          </div>
        )}
      </nav>

      {/* Officer Profile & Version */}
      <div className="mt-auto border-t border-sidebar-border bg-sidebar/50 p-4">
        {officer && (
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl p-2 transition-colors duration-200",
              !collapsed && "hover:bg-sidebar-hover cursor-pointer",
            )}
          >
            <div className="relative flex-shrink-0">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 text-sidebar font-bold text-sm shadow-md">
                {officer.firstName.charAt(0)}
                {officer.lastName.charAt(0)}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-sidebar bg-success shadow-sm"></div>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0 animate-fade-in">
                <p className="text-sm font-semibold text-white truncate leading-tight">
                  {officer.firstName} {officer.lastName}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Shield className="h-3 w-3 text-primary-500" />
                  <p className="text-xs font-medium text-gray-500 truncate uppercase tracking-tighter">
                    {officer.role.replace("_", " ")}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {!collapsed && (
          <div className="mt-4 px-2 flex items-center justify-between">
            <p className="text-[10px] font-medium text-gray-600 uppercase tracking-widest">
              v1.0.0-lagos
            </p>
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-success animate-pulse"></div>
              <span className="text-[10px] text-gray-500 uppercase tracking-tighter">
                Online
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

// ==================== NAV GROUP COMPONENT ====================
function NavGroupComponent({
  group,
  collapsed,
  currentPath,
}: {
  group: NavGroup;
  collapsed: boolean;
  currentPath: string;
}) {
  const content = (
    <div className="space-y-1.5">
      {/* Group Label */}
      {!collapsed && (
        <h3 className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600/80">
          {group.label}
        </h3>
      )}

      {/* Group Items */}
      <ul className="space-y-1">
        {group.items.map((item) => (
          <NavItemComponent
            key={item.path}
            item={item}
            collapsed={collapsed}
            isActive={currentPath === item.path}
          />
        ))}
      </ul>
    </div>
  );

  // Wrap in permission gate if group has permission
  if (group.permission) {
    return (
      <PermissionGate permission={group.permission} silent>
        {content}
      </PermissionGate>
    );
  }

  return content;
}

// ==================== NAV ITEM COMPONENT ====================
function NavItemComponent({
  item,
  collapsed,
  isActive,
}: {
  item: NavItem;
  collapsed: boolean;
  isActive: boolean;
}) {
  const Icon = item.icon;

  const linkContent = (
    <NavLink
      to={item.path}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        collapsed && "justify-center px-0 py-3 mx-2",
        isActive
          ? "bg-primary-500/10 text-primary-500 border border-primary-500/20 shadow-sm"
          : "text-gray-400 hover:text-white hover:bg-sidebar-hover/50",
      )}
      title={collapsed ? item.label : undefined}
    >
      <div
        className={cn(
          "relative flex items-center justify-center transition-transform duration-200 group-active:scale-95",
          isActive
            ? "text-primary-500"
            : "group-hover:text-white group-hover:scale-110",
        )}
      >
        <Icon
          className="h-5 w-5 flex-shrink-0"
          strokeWidth={isActive ? 2.5 : 2}
        />
        {isActive && !collapsed && (
          <div className="absolute -left-3 h-4 w-1 bg-primary-500 rounded-r-full"></div>
        )}
      </div>

      {!collapsed && (
        <>
          <span className="flex-1 truncate tracking-tight">{item.label}</span>

          {/* Badge */}
          {item.badge && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-lg bg-danger px-1.5 text-[10px] font-bold text-white shadow-sm ring-1 ring-white/10">
              {item.badge}
            </span>
          )}

          {/* New indicator - Premium Dot */}
          {item.isNew && (
            <div className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse shadow-[0_0_8px_rgba(249,193,28,0.5)]"></div>
          )}
        </>
      )}
    </NavLink>
  );

  // Wrap in permission gate if item has permission
  if (item.permission) {
    return (
      <li>
        <PermissionGate permission={item.permission} silent>
          {linkContent}
        </PermissionGate>
      </li>
    );
  }

  return <li>{linkContent}</li>;
}
