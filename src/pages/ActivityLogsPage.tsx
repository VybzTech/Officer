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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useDataStore } from "@/stores/dataStore";
import { cn } from "@/utils/cn";
import { formatDate, formatRelativeTime } from "@/utils/format";
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
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
          <p className="text-gray-500 mt-1">
            Monitor user activities across the platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
          <Button
            variant="outline"
            onClick={() => fetchActivityLogs()}
            leftIcon={<RefreshCw className="h-4 w-4" />}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {activityLogs.length}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <Activity className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-2xl font-bold text-primary-600 mt-1">
                {new Set(activityLogs.map((l) => l.userId)).size}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              <User className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Successful</p>
              <p className="text-2xl font-bold text-success mt-1">
                {successCount}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Failed</p>
              <p className="text-2xl font-bold text-error mt-1">
                {failureCount}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-error/10 text-error">
              <XCircle className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search by user, action, resource..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputSize="sm"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === null ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setStatusFilter(null)}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "SUCCESS" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setStatusFilter("SUCCESS")}
            leftIcon={<CheckCircle2 className="h-4 w-4 text-success" />}
          >
            Success
          </Button>
          <Button
            variant={statusFilter === "FAILURE" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setStatusFilter("FAILURE")}
            leftIcon={<XCircle className="h-4 w-4 text-error" />}
          >
            Failed
          </Button>
        </div>
      </div>

      {/* Action Filter */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={actionFilter === null ? "primary" : "outline"}
          size="sm"
          onClick={() => setActionFilter(null)}
        >
          All Actions
        </Button>
        {actions.slice(0, 6).map((action) => {
          const Icon = ACTION_ICONS[action] || Activity;
          return (
            <Button
              key={action}
              variant={actionFilter === action ? "primary" : "outline"}
              size="sm"
              onClick={() => setActionFilter(action)}
              leftIcon={<Icon className="h-4 w-4" />}
            >
              {action.replace(/_/g, " ")}
            </Button>
          );
        })}
      </div>

      {/* Activity Logs Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Time
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  User
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Action
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Resource
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  IP Address
                </th>
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
      </Card>

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
