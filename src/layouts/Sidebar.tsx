// ============================================
// URBAN GRAVITY - SIDEBAR NAVIGATION
// Supabase-inspired navigation structure
// ============================================

import { NavLink, useLocation } from 'react-router-dom';
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
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { PermissionGate } from '@/components/guards';
import { cn } from '@/utils/cn';
import type { Permission } from '@/types';

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
    label: 'Overview',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, permission: 'VIEW_DASHBOARD' },
      { label: 'Regional Metrics', path: '/metrics', icon: BarChart3, permission: 'VIEW_REGIONAL_METRICS' },
      { label: 'AI Insights', path: '/ai-insights', icon: Brain, permission: 'VIEW_AI_INSIGHTS', isNew: true },
    ],
  },
  {
    label: 'Market Management',
    items: [
      { label: 'Listings', path: '/listings', icon: Building2, permission: 'VIEW_LISTINGS' },
      { label: 'Landlords', path: '/landlords', icon: Users, permission: 'VIEW_LANDLORDS' },
      { label: 'Tenants', path: '/tenants', icon: UserCheck, permission: 'VIEW_TENANTS' },
      { label: 'Agents', path: '/agents', icon: Briefcase, permission: 'VIEW_AGENTS' },
    ],
  },
  {
    label: 'Moderation & Control',
    items: [
      { label: 'Verification Requests', path: '/verifications', icon: ShieldCheck, permission: 'VIEW_VERIFICATION_REQUESTS' },
      { label: 'Subscription Upgrades', path: '/upgrades', icon: ArrowUpCircle, permission: 'VIEW_SUBSCRIPTION_UPGRADES' },
      { label: 'Disputes', path: '/disputes', icon: Scale, permission: 'VIEW_DISPUTES' },
      { label: 'Reports', path: '/reports', icon: AlertTriangle, permission: 'VIEW_REPORTS' },
    ],
  },
  {
    label: 'Intelligence',
    permission: 'VIEW_AI_INSIGHTS',
    items: [
      { label: 'AI Match Recommendations', path: '/ai/matches', icon: Brain, permission: 'VIEW_AI_INSIGHTS' },
      { label: 'Preference Mapping', path: '/ai/preferences', icon: Map, permission: 'VIEW_AI_INSIGHTS' },
      { label: 'Risk Scoring', path: '/ai/risk', icon: ShieldCheck, permission: 'VIEW_AI_INSIGHTS' },
    ],
  },
  {
    label: 'Regional Control',
    items: [
      { label: 'Regions', path: '/regions', icon: MapPin, permission: 'VIEW_REGIONS' },
      { label: 'LGAs', path: '/lgas', icon: Map, permission: 'VIEW_LGAS' },
      { label: 'LGA Activity', path: '/lga-activity', icon: Activity, permission: 'VIEW_LGA_ACTIVITY' },
      { label: 'Add Official Listing', path: '/add-listing', icon: PlusSquare, permission: 'CREATE_OFFICIAL_LISTING' },
    ],
  },
  {
    label: 'Financial Control',
    items: [
      { label: 'Escrow Accounts', path: '/escrow', icon: Wallet, permission: 'VIEW_ESCROW' },
      { label: 'Transaction Logs', path: '/transactions', icon: ListChecks, permission: 'VIEW_TRANSACTIONS' },
      { label: 'Payout Approvals', path: '/payouts', icon: CreditCard, permission: 'APPROVE_PAYOUT' },
      { label: 'Refund Management', path: '/refunds', icon: RotateCcw, permission: 'REFUND_ESCROW' },
    ],
  },
  {
    label: 'System Observability',
    items: [
      { label: 'API Logs', path: '/logs/api', icon: Terminal, permission: 'VIEW_API_LOGS' },
      { label: 'Audit Logs', path: '/logs/audit', icon: FileText, permission: 'VIEW_AUDIT_LOGS' },
      { label: 'Activity Logs', path: '/logs/activity', icon: History, permission: 'VIEW_ACTIVITY_LOGS' },
      { label: 'Error Monitoring', path: '/logs/errors', icon: Bug, permission: 'VIEW_ERROR_LOGS' },
    ],
  },
  {
    label: 'Platform',
    items: [
      { label: 'App Configuration', path: '/config/app', icon: Settings, permission: 'VIEW_APP_CONFIG' },
      { label: 'Tier Settings', path: '/config/tiers', icon: Sliders, permission: 'VIEW_TIER_SETTINGS' },
      { label: 'Role & Permissions', path: '/config/roles', icon: Shield, permission: 'VIEW_ROLE_MATRIX' },
      { label: 'Feature Flags', path: '/config/features', icon: ToggleLeft, permission: 'VIEW_FEATURE_FLAGS' },
    ],
  },
  {
    label: 'Documentation',
    items: [
      { label: 'API Documentation', path: '/docs/api', icon: BookOpen },
      { label: 'Moderation Guide', path: '/docs/moderation', icon: HelpCircle },
      { label: 'Escrow Policy', path: '/docs/escrow', icon: FileCheck },
      { label: 'Lagos Guidelines', path: '/docs/lagos', icon: Landmark },
    ],
  },
  {
    label: 'Account',
    items: [
      { label: 'Profile', path: '/account/profile', icon: User, permission: 'VIEW_PROFILE' },
      { label: 'Security', path: '/account/security', icon: Lock, permission: 'MANAGE_2FA' },
      { label: 'Active Sessions', path: '/account/sessions', icon: Monitor, permission: 'VIEW_SESSIONS' },
      { label: '2FA Settings', path: '/account/2fa', icon: KeyRound, permission: 'MANAGE_2FA' },
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
export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const location = useLocation();
  const { officer } = useAuthStore();

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border',
        'transform transition-all duration-300 ease-in-out',
        'lg:relative lg:translate-x-0',
        collapsed ? 'w-20' : 'w-64',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}
    >
      {/* Logo & Toggle */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center w-full')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 flex-shrink-0">
            <span className="text-lg font-bold text-white">UG</span>
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="text-lg font-bold text-white truncate">Urban Gravity</h1>
              <p className="text-xs text-gray-500 truncate">Officer Portal</p>
            </div>
          )}
        </div>

        {/* Mobile Close */}
        <button
          onClick={onMobileClose}
          className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-sidebar-hover"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Desktop Toggle */}
        <button
          onClick={onToggle}
          className={cn(
            'hidden lg:flex p-2 text-gray-400 hover:text-white rounded-lg hover:bg-sidebar-hover',
            collapsed && 'absolute -right-3 top-6 bg-sidebar border border-sidebar-border shadow-lg'
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Officer Info */}
      {officer && !collapsed && (
        <div className="px-4 py-3 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600/20 text-primary-400 font-semibold text-sm">
              {officer.firstName.charAt(0)}{officer.lastName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {officer.firstName} {officer.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {officer.role.replace('_', ' ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {NAVIGATION.map((group) => (
          <NavGroupComponent
            key={group.label}
            group={group}
            collapsed={collapsed}
            currentPath={location.pathname}
          />
        ))}
      </nav>

      {/* Version */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-sidebar-border">
          <p className="text-xs text-gray-600">
            Version 1.0.0 • Lagos, Nigeria
          </p>
        </div>
      )}
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
    <div>
      {/* Group Label */}
      {!collapsed && (
        <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
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
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
        'transition-all duration-200',
        collapsed && 'justify-center px-2',
        isActive
          ? 'bg-primary-600/10 text-primary-400'
          : 'text-gray-400 hover:bg-sidebar-hover hover:text-white'
      )}
      title={collapsed ? item.label : undefined}
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-primary-400')} />

      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>

          {/* Badge */}
          {item.badge && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-danger px-1.5 text-xs font-semibold text-white">
              {item.badge}
            </span>
          )}

          {/* New indicator */}
          {item.isNew && (
            <span className="rounded bg-success/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-success">
              New
            </span>
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
