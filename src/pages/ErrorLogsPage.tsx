// ============================================
// URBAN GRAVITY - ERROR LOGS PAGE
// Monitor and manage application errors
// ============================================

import { useEffect, useState } from "react";
import {
  AlertOctagon,
  Search,
  RefreshCw,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  Check,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { useDataStore } from "@/stores/dataStore";
import { cn } from "@/utils/cn";
import { formatDate, formatRelativeTime } from "@/utils/format";
import Loader from "@/components/ui/Loader";

const SEVERITY_CONFIG = {
  LOW: { color: "info", icon: Info },
  MEDIUM: { color: "warning", icon: AlertCircle },
  HIGH: { color: "error", icon: AlertTriangle },
  CRITICAL: { color: "error", icon: AlertOctagon },
};

const SERVICE_COLORS = {
  "UG-Core": "primary",
  "UG-App": "success",
  "UG-Officer": "warning",
};

export function ErrorLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);
  const [resolvedFilter, setResolvedFilter] = useState<boolean | null>(null);

  const { errorLogs, isLoading, fetchErrorLogs } = useDataStore();

  useEffect(() => {
    fetchErrorLogs();
  }, [fetchErrorLogs]);

  const filteredLogs = errorLogs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.errorType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = !severityFilter || log.severity === severityFilter;
    const matchesResolved =
      resolvedFilter === null || log.resolved === resolvedFilter;
    return matchesSearch && matchesSeverity && matchesResolved;
  });

  const criticalCount = errorLogs.filter((l) => l.severity === "CRITICAL" && !l.resolved).length;
  const unresolvedCount = errorLogs.filter((l) => !l.resolved).length;

  if (isLoading.errorLogs) {
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
          <h1 className="text-2xl font-bold text-gray-900">Error Monitoring</h1>
          <p className="text-gray-500 mt-1">
            Track and resolve application errors across all services
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            leftIcon={<Download className="h-4 w-4" />}
          >
            Export
          </Button>
          <Button
            variant="outline"
            onClick={() => fetchErrorLogs()}
            leftIcon={<RefreshCw className="h-4 w-4" />}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Critical Alert */}
      {criticalCount > 0 && (
        <Card padding="md" className="bg-error/5 border-error/20">
          <div className="flex items-center gap-3">
            <AlertOctagon className="h-6 w-6 text-error" />
            <div>
              <p className="font-semibold text-error">
                {criticalCount} Critical Error{criticalCount > 1 ? "s" : ""} Detected
              </p>
              <p className="text-sm text-gray-600">
                Immediate attention required for system stability
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Errors</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{errorLogs.length}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <AlertOctagon className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Unresolved</p>
              <p className="text-2xl font-bold text-error mt-1">{unresolvedCount}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-error/10 text-error">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Critical</p>
              <p className="text-2xl font-bold text-error mt-1">{criticalCount}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-error/10 text-error">
              <AlertOctagon className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Resolved</p>
              <p className="text-2xl font-bold text-success mt-1">
                {errorLogs.filter((l) => l.resolved).length}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search errors..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputSize="sm"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={resolvedFilter === null ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setResolvedFilter(null)}
          >
            All
          </Button>
          <Button
            variant={resolvedFilter === false ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setResolvedFilter(false)}
            leftIcon={<AlertTriangle className="h-4 w-4 text-error" />}
          >
            Unresolved
          </Button>
          <Button
            variant={resolvedFilter === true ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setResolvedFilter(true)}
            leftIcon={<CheckCircle2 className="h-4 w-4 text-success" />}
          >
            Resolved
          </Button>
        </div>
      </div>

      {/* Severity Filter */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={severityFilter === null ? "primary" : "outline"}
          size="sm"
          onClick={() => setSeverityFilter(null)}
        >
          All Severities
        </Button>
        {(["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const).map((severity) => {
          const config = SEVERITY_CONFIG[severity];
          const Icon = config.icon;
          return (
            <Button
              key={severity}
              variant={severityFilter === severity ? "primary" : "outline"}
              size="sm"
              onClick={() => setSeverityFilter(severity)}
              leftIcon={<Icon className="h-4 w-4" />}
            >
              {severity}
            </Button>
          );
        })}
      </div>

      {/* Error Logs List */}
      <div className="space-y-3">
        {filteredLogs.map((log) => {
          const severityConfig = SEVERITY_CONFIG[log.severity];
          const SeverityIcon = severityConfig.icon;

          return (
            <Card key={log.id} padding="none" className={cn(
              log.severity === "CRITICAL" && !log.resolved && "border-error"
            )}>
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0",
                    log.severity === "CRITICAL" ? "bg-error/10 text-error" :
                    log.severity === "HIGH" ? "bg-error/10 text-error" :
                    log.severity === "MEDIUM" ? "bg-warning/10 text-warning" :
                    "bg-info/10 text-info"
                  )}>
                    <SeverityIcon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge variant={SERVICE_COLORS[log.service] as any}>
                        {log.service}
                      </Badge>
                      <Badge variant={severityConfig.color as any}>
                        {log.severity}
                      </Badge>
                      <code className="text-xs font-mono bg-gray-100 px-1.5 py-0.5 rounded">
                        {log.errorType}
                      </code>
                      {log.resolved && (
                        <Badge variant="success">Resolved</Badge>
                      )}
                    </div>

                    <p className="text-gray-900 mb-2">{log.message}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatRelativeTime(log.timestamp)}
                      </div>
                      {log.userId && (
                        <div>User: {log.userId}</div>
                      )}
                      {log.resolvedBy && (
                        <div>Resolved by: {log.resolvedBy}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {!log.resolved && (
                      <Button
                        size="sm"
                        leftIcon={<Check className="h-4 w-4" />}
                      >
                        Resolve
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      leftIcon={<Eye className="h-4 w-4" />}
                    >
                      Details
                    </Button>
                  </div>
                </div>

                {log.stackTrace && (
                  <div className="mt-3 p-2 bg-gray-900 rounded text-xs font-mono text-gray-300 overflow-x-auto">
                    {log.stackTrace}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {filteredLogs.length === 0 && (
        <Card padding="lg" className="text-center">
          <CheckCircle2 className="h-12 w-12 text-success mx-auto" />
          <p className="text-gray-500 mt-4">No errors found</p>
        </Card>
      )}
    </div>
  );
}

export default ErrorLogsPage;
