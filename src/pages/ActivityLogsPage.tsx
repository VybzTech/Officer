// ============================================
// URBAN GRAVITY - ACTIVITY LOGS PAGE
// Track user activities across the platform
// ============================================

import { useEffect, useState } from "react";
import {
  Activity,
  Search,
  RefreshCw,
  User,
  Clock,
  CheckCircle2,
  XCircle,
  Download,
  Filter,
  LogIn,
  LogOut,
  Eye,
  Edit,
  Plus,
  FileText,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { BigHeader } from "@/components/ui/Typography";
import { useDataStore } from "@/stores/dataStore";
import { cn } from "@/utils/cn";
import { formatRelativeTime } from "@/utils/format";
import Loader from "@/components/ui/Loader";

const ACTION_ICONS: Record<string, typeof Activity> = {
  LOGIN: LogIn,
  LOGOUT: LogOut,
  VIEW_LISTING: Eye,
  CREATE_LISTING: Plus,
  UPDATE_PROFILE: Edit,
  SUBMIT_DISPUTE: FileText,
  MAKE_PAYMENT: FileText,
};

const ROLE_COLORS: Record<string, string> = {
  SUPER_ADMIN: "error",
  OFFICER: "warning",
  LANDLORD: "success",
  TENANT: "info",
  AGENT: "default",
};

export function ActivityLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const { activityLogs, isLoading, fetchActivityLogs } = useDataStore();

  useEffect(() => {
    fetchActivityLogs();
  }, [fetchActivityLogs]);

  const actions = Array.from(new Set(activityLogs.map((l) => l.action)));

  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = !actionFilter || log.action === actionFilter;
    const matchesStatus = !statusFilter || log.status === statusFilter;
    return matchesSearch && matchesAction && matchesStatus;
  });

  const successCount = activityLogs.filter(
    (l) => l.status === "SUCCESS",
  ).length;
  const failureCount = activityLogs.filter(
    (l) => l.status === "FAILURE",
  ).length;

  if (isLoading.activityLogs) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <BigHeader subtitle="Monitor user activities across the platform">
          Activity Logs
        </BigHeader>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 h-10 px-4 rounded-2xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button
            onClick={() => fetchActivityLogs()}
            className="flex items-center gap-2 h-10 px-4 rounded-2xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-premium transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total</p>
              <p className="text-3xl font-extrabold text-gray-900 tracking-tight mt-1">{activityLogs.length}</p>
            </div>
            <div className="h-11 w-11 rounded-2xl bg-gray-100 text-gray-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-premium transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Active Users</p>
              <p className="text-3xl font-extrabold text-primary-600 tracking-tight mt-1">{new Set(activityLogs.map((l) => l.userId)).size}</p>
            </div>
            <div className="h-11 w-11 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <User className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-premium transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Successful</p>
              <p className="text-3xl font-extrabold text-success tracking-tight mt-1">{successCount}</p>
            </div>
            <div className="h-11 w-11 rounded-2xl bg-success/10 text-success flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-premium transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Failed</p>
              <p className="text-3xl font-extrabold text-error tracking-tight mt-1">{failureCount}</p>
            </div>
            <div className="h-11 w-11 rounded-2xl bg-error/10 text-error flex items-center justify-center group-hover:scale-110 transition-transform">
              <XCircle className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by user, action or resource..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 h-10 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-500/10 outline-none transition-all placeholder:text-gray-400"
          />
        </div>
        <div className="flex gap-2 shrink-0">
          {[null, "SUCCESS", "FAILURE"].map((s) => (
            <button
              key={String(s)}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "px-3 h-9 rounded-xl text-xs font-bold transition-all",
                statusFilter === s ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {s === null ? "All" : s === "SUCCESS" ? "✓ Success" : "✕ Failed"}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 flex flex-wrap gap-2">
        <button
          onClick={() => setActionFilter(null)}
          className={cn("px-3 h-8 rounded-xl text-xs font-bold transition-all", actionFilter === null ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}
        >
          All Actions
        </button>
        {actions.slice(0, 6).map((action) => {
          const Icon = ACTION_ICONS[action] || Activity;
          return (
            <button
              key={action}
              onClick={() => setActionFilter(action)}
              className={cn(
                "flex items-center gap-1.5 px-3 h-8 rounded-xl text-xs font-bold transition-all",
                actionFilter === action ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              <Icon className="h-3 w-3" />
              {action.replace(/_/g, " ")}
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50">
                <th className="text-left py-3.5 px-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Time</th>
                <th className="text-left py-3.5 px-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">User</th>
                <th className="text-left py-3.5 px-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Action</th>
                <th className="text-left py-3.5 px-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Resource</th>
                <th className="text-center py-3.5 px-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left py-3.5 px-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.slice(0, 50).map((log) => {
                const ActionIcon = ACTION_ICONS[log.action] || Activity;
                return (
                  <tr
                    key={log.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {formatRelativeTime(log.timestamp)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {log.userName}
                        </span>
                        <Badge
                          variant={ROLE_COLORS[log.userRole] as any}
                          className="text-xs"
                        >
                          {log.userRole}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <ActionIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {log.action.replace(/_/g, " ")}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {log.resource}
                      {log.resourceId && (
                        <span className="text-gray-400 ml-1">
                          ({log.resourceId})
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge
                        variant={log.status === "SUCCESS" ? "success" : "error"}
                      >
                        {log.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm font-mono text-gray-500">
                      {log.ipAddress}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredLogs.length === 0 && (
        <Card padding="lg" className="text-center">
          <Activity className="h-12 w-12 text-gray-300 mx-auto" />
          <p className="text-gray-500 mt-4">No activity logs found</p>
        </Card>
      )}

      {filteredLogs.length > 50 && (
        <p className="text-center text-sm text-gray-500">
          Showing 50 of {filteredLogs.length} logs
        </p>
      )}
    </div>
  );
}

export default ActivityLogsPage;
