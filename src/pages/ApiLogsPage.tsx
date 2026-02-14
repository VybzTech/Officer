// ============================================
// URBAN GRAVITY - API LOGS PAGE
// Monitor API requests and responses
// ============================================

import { useEffect, useState } from "react";
import {
  Server,
  Search,
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
  Filter,
  Download,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useDataStore } from "@/stores/dataStore";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/format";
import Loader from "@/components/ui/Loader";

const METHOD_COLORS = {
  GET: "info",
  POST: "success",
  PUT: "warning",
  DELETE: "error",
  PATCH: "default",
};

const getStatusColor = (code: number) => {
  if (code >= 200 && code < 300) return "success";
  if (code >= 400 && code < 500) return "warning";
  if (code >= 500) return "error";
  return "default";
};

export function ApiLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [methodFilter, setMethodFilter] = useState<string | null>(null);

  const { apiLogs, isLoading, fetchApiLogs } = useDataStore();

  useEffect(() => {
    fetchApiLogs();
  }, [fetchApiLogs]);

  const filteredLogs = apiLogs.filter((log) => {
    const matchesSearch =
      log.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.includes(searchQuery);
    const matchesMethod = !methodFilter || log.method === methodFilter;
    return matchesSearch && matchesMethod;
  });

  const avgResponseTime = Math.round(
    apiLogs.reduce((sum, l) => sum + l.responseTime, 0) / apiLogs.length,
  );
  const errorRate = Math.round(
    (apiLogs.filter((l) => l.statusCode >= 400).length / apiLogs.length) * 100,
  );

  if (isLoading.apiLogs) {
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
          <h1 className="text-2xl font-bold text-gray-900">API Logs</h1>
          <p className="text-gray-500 mt-1">
            Monitor API requests, response times, and errors
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
          <Button
            variant="outline"
            onClick={() => fetchApiLogs()}
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
              <p className="text-sm text-gray-500">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {apiLogs.length}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <Server className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Response</p>
              <p className="text-2xl font-bold text-primary-600 mt-1">
                {avgResponseTime}ms
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              <Zap className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-2xl font-bold text-success mt-1">
                {100 - errorRate}%
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
              <p className="text-sm text-gray-500">Error Rate</p>
              <p className="text-2xl font-bold text-error mt-1">{errorRate}%</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-error/10 text-error">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search by endpoint or IP..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputSize="sm"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={methodFilter === null ? "primary" : "outline"}
            size="sm"
            onClick={() => setMethodFilter(null)}
          >
            All
          </Button>
          {["GET", "POST", "PUT", "DELETE"].map((method) => (
            <Button
              key={method}
              variant={methodFilter === method ? "primary" : "outline"}
              size="sm"
              onClick={() => setMethodFilter(method)}
            >
              {method}
            </Button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Timestamp
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Method
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Endpoint
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">
                  Status
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">
                  Response
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.slice(0, 50).map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {formatDate(log.timestamp)}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={METHOD_COLORS[log.method] as any}>
                      {log.method}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm font-mono text-gray-700">
                      {log.endpoint}
                    </code>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge variant={getStatusColor(log.statusCode) as any}>
                      {log.statusCode}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        log.responseTime > 1000
                          ? "text-error"
                          : log.responseTime > 500
                            ? "text-warning"
                            : "text-success",
                      )}
                    >
                      {log.responseTime}ms
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-mono text-gray-500">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredLogs.length === 0 && (
        <Card padding="lg" className="text-center">
          <Server className="h-12 w-12 text-gray-300 mx-auto" />
          <p className="text-gray-500 mt-4">No API logs found</p>
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

export default ApiLogsPage;
