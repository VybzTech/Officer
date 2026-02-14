// ============================================
// URBAN GRAVITY - ESCROW ACCOUNTS PAGE
// Manage escrow accounts and releases
// ============================================

import { useEffect, useState } from "react";
import {
  Wallet,
  Search,
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  User,
  Home,
  DollarSign,
  Filter,
  Eye,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useDataStore } from "@/stores/dataStore";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/utils/cn";
import { formatNaira, formatDate } from "@/utils/format";
import Loader from "@/components/ui/Loader";
import type { EscrowAccount, EscrowStatus } from "@/data/mockDatabase";

const STATUS_CONFIG = {
  PENDING: { color: "warning", icon: Clock, label: "Pending" },
  HELD: { color: "info", icon: Wallet, label: "Held" },
  RELEASED: { color: "success", icon: CheckCircle2, label: "Released" },
  REFUNDED: { color: "default", icon: ArrowRight, label: "Refunded" },
  DISPUTED: { color: "error", icon: AlertTriangle, label: "Disputed" },
};

export function EscrowPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<EscrowStatus | null>(null);
  const [selectedEscrow, setSelectedEscrow] = useState<EscrowAccount | null>(
    null,
  );

  const {
    escrowAccounts,
    isLoading,
    isActionLoading,
    fetchEscrowAccounts,
    releaseEscrow,
    refundEscrow,
  } = useDataStore();
  const { officer } = useAuthStore();

  useEffect(() => {
    fetchEscrowAccounts();
  }, [fetchEscrowAccounts]);

  const filteredAccounts = escrowAccounts.filter((account) => {
    const matchesSearch =
      account.transactionRef
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      account.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.landlordName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.listingTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || account.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalHeld = escrowAccounts
    .filter((e) => e.status === "HELD")
    .reduce((sum, e) => sum + e.amount, 0);
  const totalReleased = escrowAccounts
    .filter((e) => e.status === "RELEASED")
    .reduce((sum, e) => sum + e.amount, 0);
  const disputedCount = escrowAccounts.filter(
    (e) => e.status === "DISPUTED",
  ).length;

  const handleRelease = async (id: string) => {
    if (officer) {
      await releaseEscrow(id, officer.id);
    }
  };

  const handleRefund = async (id: string) => {
    if (officer) {
      await refundEscrow(id, officer.id);
    }
  };

  if (isLoading.escrow) {
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
          <h1 className="text-2xl font-bold text-gray-900">Escrow Accounts</h1>
          <p className="text-gray-500 mt-1">
            Monitor and manage escrow holdings across transactions
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => fetchEscrowAccounts()}
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
              <p className="text-sm text-gray-500">Total Accounts</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {escrowAccounts.length}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <Wallet className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Currently Held</p>
              <p className="text-2xl font-bold text-primary-600 mt-1">
                {formatNaira(totalHeld)}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Released</p>
              <p className="text-2xl font-bold text-success mt-1">
                {formatNaira(totalReleased)}
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
              <p className="text-sm text-gray-500">Disputed</p>
              <p className="text-2xl font-bold text-error mt-1">
                {disputedCount}
              </p>
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
            placeholder="Search by ref, tenant, landlord..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputSize="sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={statusFilter === null ? "primary" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(null)}
          >
            All
          </Button>
          {(Object.keys(STATUS_CONFIG) as EscrowStatus[]).map((status) => {
            const config = STATUS_CONFIG[status];
            return (
              <Button
                key={status}
                variant={statusFilter === status ? "primary" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {config.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Escrow List */}
      <div className="space-y-4">
        {filteredAccounts.map((escrow) => {
          const statusConfig = STATUS_CONFIG[escrow.status];
          const StatusIcon = statusConfig.icon;
          const isReleasing = isActionLoading[`escrow-${escrow.id}`];

          return (
            <Card key={escrow.id} padding="none">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0",
                        `bg-${statusConfig.color}/10 text-${statusConfig.color}`,
                      )}
                      style={{
                        backgroundColor:
                          statusConfig.color === "warning"
                            ? "rgba(245, 158, 11, 0.1)"
                            : statusConfig.color === "info"
                              ? "rgba(59, 130, 246, 0.1)"
                              : statusConfig.color === "success"
                                ? "rgba(16, 185, 129, 0.1)"
                                : statusConfig.color === "error"
                                  ? "rgba(239, 68, 68, 0.1)"
                                  : "rgba(156, 163, 175, 0.1)",
                        color:
                          statusConfig.color === "warning"
                            ? "#D97706"
                            : statusConfig.color === "info"
                              ? "#2563EB"
                              : statusConfig.color === "success"
                                ? "#059669"
                                : statusConfig.color === "error"
                                  ? "#DC2626"
                                  : "#6B7280",
                      }}
                    >
                      <StatusIcon className="h-6 w-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <code className="text-sm font-mono font-semibold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                          {escrow.transactionRef}
                        </code>
                        <Badge variant={statusConfig.color as any}>
                          {statusConfig.label}
                        </Badge>
                      </div>

                      <p className="text-lg font-bold text-gray-900 mb-2">
                        {formatNaira(escrow.amount)}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 flex items-center gap-1">
                            <User className="h-3.5 w-3.5" /> Tenant
                          </p>
                          <p className="font-medium text-gray-900">
                            {escrow.tenantName}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 flex items-center gap-1">
                            <User className="h-3.5 w-3.5" /> Landlord
                          </p>
                          <p className="font-medium text-gray-900">
                            {escrow.landlordName}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 flex items-center gap-1">
                            <Home className="h-3.5 w-3.5" /> Property
                          </p>
                          <p className="font-medium text-gray-900 truncate">
                            {escrow.listingTitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {escrow.status === "HELD" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleRelease(escrow.id)}
                          loading={isReleasing}
                          leftIcon={<CheckCircle2 className="h-4 w-4" />}
                        >
                          Release
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRefund(escrow.id)}
                          disabled={isReleasing}
                          leftIcon={<ArrowRight className="h-4 w-4" />}
                        >
                          Refund
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      leftIcon={<Eye className="h-4 w-4" />}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>

              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Created: {formatDate(escrow.createdAt)}
                </div>
                {escrow.releasedAt && (
                  <div>
                    Released: {formatDate(escrow.releasedAt)} by{" "}
                    {escrow.releasedBy}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {filteredAccounts.length === 0 && (
        <Card padding="lg" className="text-center">
          <Wallet className="h-12 w-12 text-gray-300 mx-auto" />
          <p className="text-gray-500 mt-4">No escrow accounts found</p>
        </Card>
      )}
    </div>
  );
}

export default EscrowPage;
