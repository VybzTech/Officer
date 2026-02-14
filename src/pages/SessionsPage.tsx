// ============================================
// URBAN GRAVITY - SESSIONS PAGE
// Monitor and manage active user sessions
// ============================================

import { useEffect, useState } from "react";
import {
  Monitor,
  Smartphone,
  Globe,
  Clock,
  MapPin,
  Shield,
  RefreshCw,
  Search,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Users,
  Activity,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useDataStore } from "@/stores/dataStore";
import { cn } from "@/utils/cn";
import { formatDate, formatRelativeTime } from "@/utils/format";
import Loader from "@/components/ui/Loader";
import type { Session } from "@/data/mockDatabase";

export function SessionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState<boolean | null>(null);

  const {
    sessions,
    isLoading,
    isActionLoading,
    fetchSessions,
    terminateSession,
  } = useDataStore();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.ipAddress.includes(searchQuery) ||
      session.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterActive === null || session.isActive === filterActive;
    return matchesSearch && matchesFilter;
  });

  const activeSessions = sessions.filter((s) => s.isActive);
  const officerSessions = sessions.filter(
    (s) => s.userRole === "OFFICER" || s.userRole === "SUPER_ADMIN",
  );

  const handleTerminate = async (id: string) => {
    await terminateSession(id);
  };

  const getDeviceIcon = (userAgent: string) => {
    if (userAgent.toLowerCase().includes("mobile")) {
      return Smartphone;
    }
    return Monitor;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "error";
      case "OFFICER":
        return "warning";
      case "LANDLORD":
        return "success";
      case "TENANT":
        return "info";
      case "AGENT":
        return "default";
      default:
        return "default";
    }
  };

  if (isLoading.sessions) {
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
          <h1 className="text-2xl font-bold text-gray-900">Active Sessions</h1>
          <p className="text-gray-500 mt-1">
            Monitor and manage user sessions across the platform
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => fetchSessions()}
          leftIcon={<RefreshCw className="h-4 w-4" />}
        >
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {sessions.length}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Now</p>
              <p className="text-2xl font-bold text-success mt-1">
                {activeSessions.length}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
              <Activity className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Officer Sessions</p>
              <p className="text-2xl font-bold text-primary-600 mt-1">
                {officerSessions.length}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              <Shield className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Expired</p>
              <p className="text-2xl font-bold text-gray-500 mt-1">
                {sessions.filter((s) => !s.isActive).length}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
              <XCircle className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search by name, IP, or location..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputSize="sm"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterActive === null ? "primary" : "outline"}
            size="sm"
            onClick={() => setFilterActive(null)}
          >
            All
          </Button>
          <Button
            variant={filterActive === true ? "primary" : "outline"}
            size="sm"
            onClick={() => setFilterActive(true)}
            leftIcon={<CheckCircle2 className="h-4 w-4" />}
          >
            Active
          </Button>
          <Button
            variant={filterActive === false ? "primary" : "outline"}
            size="sm"
            onClick={() => setFilterActive(false)}
            leftIcon={<XCircle className="h-4 w-4" />}
          >
            Expired
          </Button>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-3">
        {filteredSessions.map((session) => {
          const DeviceIcon = getDeviceIcon(session.userAgent);
          const isTerminating = isActionLoading[`session-${session.id}`];
          const isExpired = new Date(session.expiresAt) < new Date();

          return (
            <Card key={session.id} padding="none">
              <div className="p-4 flex items-center gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0",
                    session.isActive
                      ? "bg-success/10 text-success"
                      : "bg-gray-100 text-gray-400",
                  )}
                >
                  <DeviceIcon className="h-6 w-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">
                      {session.userName}
                    </span>
                    <Badge variant={getRoleColor(session.userRole) as any}>
                      {session.userRole}
                    </Badge>
                    {session.isActive ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="default">Expired</Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Globe className="h-3.5 w-3.5" />
                      {session.ipAddress}
                    </div>
                    {session.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {session.location}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      Last active: {formatRelativeTime(session.lastActivity)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {session.isActive && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTerminate(session.id)}
                      loading={isTerminating}
                      className="text-error border-error hover:bg-error/5"
                    >
                      Terminate
                    </Button>
                  )}
                </div>
              </div>

              {/* Device Info */}
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
                <span className="font-mono">
                  {session.userAgent.substring(0, 80)}...
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredSessions.length === 0 && (
        <Card padding="lg" className="text-center">
          <Monitor className="h-12 w-12 text-gray-300 mx-auto" />
          <p className="text-gray-500 mt-4">No sessions found</p>
        </Card>
      )}

      {/* Security Notice */}
      <Card padding="md" className="bg-warning/5 border-warning/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-warning-dark">Session Security</p>
            <p className="text-sm text-gray-600 mt-1">
              Terminating a session will immediately log out the user. This
              action is logged in the audit trail. Consider notifying users
              before terminating their sessions.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SessionsPage;
