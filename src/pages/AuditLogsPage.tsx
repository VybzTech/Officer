// ============================================
// URBAN GRAVITY - AUDIT LOGS PAGE
// Track officer actions and changes
// ============================================

import { useEffect, useState } from "react";
import {
  Shield,
  Search,
  RefreshCw,
  User,
  Clock,
  FileText,
  Download,
  Filter,
  Eye,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useDataStore } from "@/stores/dataStore";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/format";
import Loader from "@/components/ui/Loader";

const ACTION_COLORS: Record<string, string> = {
  APPROVE_LISTING: "success",
  REJECT_LISTING: "error",
  SUSPEND_USER: "error",
  RELEASE_ESCROW: "success",
  RESOLVE_DISPUTE: "info",
  UPDATE_CONFIG: "warning",
};

export function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<string | null>(null);

  const { auditLogs, isLoading, fetchAuditLogs } = useDataStore();

  useEffect(() => {
    fetchAuditLogs();
  }, [fetchAuditLogs]);

  const actions = Array.from(new Set(auditLogs.map((l) => l.action)));

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.officerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.targetId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = !actionFilter || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  if (isLoading.auditLogs) {
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
          <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-500 mt-1">
            Track all officer actions and system changes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
          <Button
            variant="outline"
            onClick={() => fetchAuditLogs()}
            leftIcon={<RefreshCw className="h-4 w-4" />}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Actions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {auditLogs.length}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <Shield className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Officers</p>
              <p className="text-2xl font-bold text-primary-600 mt-1">
                {new Set(auditLogs.map((l) => l.officerId)).size}
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
              <p className="text-sm text-gray-500">Today's Actions</p>
              <p className="text-2xl font-bold text-success mt-1">
                {
                  auditLogs.filter(
                    (l) =>
                      new Date(l.timestamp).toDateString() ===
                      new Date().toDateString(),
                  ).length
                }
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
              <Clock className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search by officer, action, target..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputSize="sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={actionFilter === null ? "primary" : "outline"}
            size="sm"
            onClick={() => setActionFilter(null)}
          >
            All Actions
          </Button>
          {actions.slice(0, 5).map((action) => (
            <Button
              key={action}
              variant={actionFilter === action ? "primary" : "outline"}
              size="sm"
              onClick={() => setActionFilter(action)}
            >
              {action.replace(/_/g, " ")}
            </Button>
          ))}
        </div>
      </div>

      {/* Audit Logs List */}
      <div className="space-y-3">
        {filteredLogs.slice(0, 50).map((log) => (
          <Card key={log.id} padding="md">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 flex-shrink-0">
                <Shield className="h-5 w-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-gray-900">
                    {log.officerName}
                  </span>
                  <Badge
                    variant={(ACTION_COLORS[log.action] as any) || "default"}
                  >
                    {log.action.replace(/_/g, " ")}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5" />
                    {log.targetType}: {log.targetId}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {formatDate(log.timestamp)}
                  </div>
                  <div className="font-mono text-xs">{log.ipAddress}</div>
                </div>

                {(log.previousValue || log.newValue) && (
                  <div className="mt-2 p-2 bg-gray-50 rounded text-xs font-mono">
                    {log.previousValue && (
                      <div className="text-error">- {log.previousValue}</div>
                    )}
                    {log.newValue && (
                      <div className="text-success">+ {log.newValue}</div>
                    )}
                  </div>
                )}
              </div>

              <Button
                size="sm"
                variant="ghost"
                leftIcon={<Eye className="h-4 w-4" />}
              >
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredLogs.length === 0 && (
        <Card padding="lg" className="text-center">
          <Shield className="h-12 w-12 text-gray-300 mx-auto" />
          <p className="text-gray-500 mt-4">No audit logs found</p>
        </Card>
      )}
    </div>
  );
}

export default AuditLogsPage;
