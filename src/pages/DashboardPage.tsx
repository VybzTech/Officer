// ============================================
// URBAN GRAVITY - DASHBOARD PAGE
// Main overview with metrics and activity
// ============================================

import {
  Building2,
  Users,
  UserCheck,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  Wallet,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PermissionGate } from '@/components/guards';
import { cn } from '@/utils/cn';
import { formatNaira, formatRelativeTime } from '@/utils/format';

// Mock data
const STATS = [
  {
    label: 'Total Listings',
    value: '2,847',
    change: '+12.5%',
    trend: 'up' as const,
    icon: Building2,
    color: 'primary',
  },
  {
    label: 'Active Landlords',
    value: '1,234',
    change: '+8.2%',
    trend: 'up' as const,
    icon: Users,
    color: 'success',
  },
  {
    label: 'Active Tenants',
    value: '3,456',
    change: '+15.3%',
    trend: 'up' as const,
    icon: UserCheck,
    color: 'info',
  },
  {
    label: 'Pending Verifications',
    value: '47',
    change: '-5.1%',
    trend: 'down' as const,
    icon: ShieldCheck,
    color: 'warning',
  },
];

const PENDING_ACTIONS = [
  { id: 1, type: 'verification', title: 'John Doe - Landlord Verification', time: '2 hours ago', priority: 'high' },
  { id: 2, type: 'listing', title: '3 Bedroom Flat, Lekki Phase 1', time: '3 hours ago', priority: 'medium' },
  { id: 3, type: 'upgrade', title: 'Pro to Premier - Adebayo Ltd', time: '5 hours ago', priority: 'low' },
  { id: 4, type: 'dispute', title: 'Payment Dispute #1234', time: '1 day ago', priority: 'high' },
  { id: 5, type: 'verification', title: 'Jane Smith - Agent Verification', time: '1 day ago', priority: 'medium' },
];

const RECENT_ACTIVITY = [
  { id: 1, action: 'Approved', target: 'Listing #4521', officer: 'You', time: '10 min ago', status: 'success' },
  { id: 2, action: 'Rejected', target: 'Verification #892', officer: 'You', time: '25 min ago', status: 'danger' },
  { id: 3, action: 'Released', target: 'Escrow ₦1.2M', officer: 'Chidi O.', time: '1 hour ago', status: 'success' },
  { id: 4, action: 'Suspended', target: 'User @landlord123', officer: 'Fatima A.', time: '2 hours ago', status: 'warning' },
];

const ESCROW_SUMMARY = {
  totalHeld: 45000000,
  pendingRelease: 12500000,
  releasedToday: 8200000,
  disputes: 3,
};

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here&apos;s what&apos;s happening in Lagos.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            Export Report
          </Button>
          <Button size="sm" leftIcon={<Building2 className="h-4 w-4" />}>
            Add Listing
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Card key={stat.label} padding="md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg',
                stat.color === 'primary' && 'bg-primary-500/10 text-primary-400',
                stat.color === 'success' && 'bg-success/10 text-success',
                stat.color === 'info' && 'bg-blue-500/10 text-blue-400',
                stat.color === 'warning' && 'bg-warning/10 text-warning'
              )}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {stat.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-danger" />
              )}
              <span className={cn(
                'text-sm font-medium',
                stat.trend === 'up' ? 'text-success' : 'text-danger'
              )}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Actions */}
        <Card padding="none" className="lg:col-span-2">
          <CardHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle>Pending Actions</CardTitle>
              <Badge variant="warning">{PENDING_ACTIONS.length} items</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-sidebar-border">
              {PENDING_ACTIONS.map((action) => (
                <div
                  key={action.id}
                  className="flex items-center justify-between p-4 hover:bg-sidebar-hover transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-lg',
                      action.type === 'verification' && 'bg-primary-500/10 text-primary-400',
                      action.type === 'listing' && 'bg-success/10 text-success',
                      action.type === 'upgrade' && 'bg-warning/10 text-warning',
                      action.type === 'dispute' && 'bg-danger/10 text-danger'
                    )}>
                      {action.type === 'verification' && <ShieldCheck className="h-5 w-5" />}
                      {action.type === 'listing' && <Building2 className="h-5 w-5" />}
                      {action.type === 'upgrade' && <TrendingUp className="h-5 w-5" />}
                      {action.type === 'dispute' && <AlertTriangle className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{action.title}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3" />
                        {action.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        action.priority === 'high' ? 'danger' :
                        action.priority === 'medium' ? 'warning' : 'default'
                      }
                      size="sm"
                    >
                      {action.priority}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-sidebar-border">
              <Button variant="ghost" className="w-full">
                View All Pending Actions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card padding="none">
          <CardHeader className="p-6 pb-0">
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-sidebar-border">
              {RECENT_ACTIVITY.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-sidebar-hover transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-full mt-0.5',
                      activity.status === 'success' && 'bg-success/10 text-success',
                      activity.status === 'danger' && 'bg-danger/10 text-danger',
                      activity.status === 'warning' && 'bg-warning/10 text-warning'
                    )}>
                      {activity.status === 'success' && <CheckCircle2 className="h-4 w-4" />}
                      {activity.status === 'danger' && <XCircle className="h-4 w-4" />}
                      {activity.status === 'warning' && <AlertTriangle className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">
                        <span className={cn(
                          'font-medium',
                          activity.status === 'success' && 'text-success',
                          activity.status === 'danger' && 'text-danger',
                          activity.status === 'warning' && 'text-warning'
                        )}>
                          {activity.action}
                        </span>
                        {' '}{activity.target}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        by {activity.officer} • {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-sidebar-border">
              <Button variant="ghost" className="w-full">
                View Activity Log
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Escrow Summary - Permission Gated */}
      <PermissionGate permission="VIEW_ESCROW">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Escrow Summary</CardTitle>
                  <p className="text-sm text-gray-400 mt-0.5">Today&apos;s financial overview</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-400">Total Held</p>
                <p className="text-xl font-bold text-white mt-1">
                  {formatNaira(ESCROW_SUMMARY.totalHeld)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Pending Release</p>
                <p className="text-xl font-bold text-warning mt-1">
                  {formatNaira(ESCROW_SUMMARY.pendingRelease)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Released Today</p>
                <p className="text-xl font-bold text-success mt-1">
                  {formatNaira(ESCROW_SUMMARY.releasedToday)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Disputes</p>
                <p className="text-xl font-bold text-danger mt-1">
                  {ESCROW_SUMMARY.disputes}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </PermissionGate>

      {/* Quick Stats by Region */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Overview - Lagos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { name: 'Ikeja', listings: 342, growth: '+12%' },
              { name: 'Lekki', listings: 567, growth: '+23%' },
              { name: 'Victoria Island', listings: 234, growth: '+8%' },
              { name: 'Surulere', listings: 189, growth: '+5%' },
              { name: 'Yaba', listings: 156, growth: '+15%' },
            ].map((region) => (
              <div
                key={region.name}
                className="p-4 rounded-lg border border-sidebar-border hover:border-primary-500/50 transition-colors cursor-pointer"
              >
                <p className="text-sm font-medium text-white">{region.name}</p>
                <p className="text-lg font-bold text-white mt-1">{region.listings}</p>
                <p className="text-xs text-success mt-0.5">{region.growth} this month</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
