// ============================================
// URBAN GRAVITY - PAYOUTS PAGE
// Manage payout requests and approvals
// ============================================

import { useEffect, useState } from "react";
import {
  Banknote,
  Search,
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  Building2,
  User,
  CreditCard,
  AlertTriangle,
  Eye,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { useDataStore } from "@/stores/dataStore";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/utils/cn";
import { formatCurrency, formatDate } from "@/utils/format";
import Loader from "@/components/ui/Loader";
import type { RequestStatus } from "@/data/mockDatabase";

const STATUS_CONFIG = {
  PENDING: { color: "warning", icon: Clock, label: "Pending Review" },
  APPROVED: { color: "success", icon: CheckCircle2, label: "Approved" },
  REJECTED: { color: "error", icon: XCircle, label: "Rejected" },
  CANCELLED: { color: "default", icon: XCircle, label: "Cancelled" },
};

export function PayoutsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<RequestStatus | null>(null);

  const { payoutRequests, isLoading, isActionLoading, fetchPayoutRequests, approvePayout, rejectPayout } = useDataStore();
  const { officer } = useAuthStore();

  useEffect(() => {
    fetchPayoutRequests();
  }, [fetchPayoutRequests]);

  const filteredRequests = payoutRequests.filter((request) => {
    const matchesSearch =
      request.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.accountNumber.includes(searchQuery);
    const matchesStatus = !statusFilter || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPending = payoutRequests
    .filter((p) => p.status === "PENDING")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingCount = payoutRequests.filter((p) => p.status === "PENDING").length;
  const totalApproved = payoutRequests
    .filter((p) => p.status === "APPROVED")
    .reduce((sum, p) => sum + p.amount, 0);

  const handleApprove = async (id: string) => {
    if (officer) {
      await approvePayout(id, officer.id);
    }
  };

  const handleReject = async (id: string) => {
    if (officer) {
      await rejectPayout(id, officer.id);
    }
  };

  if (isLoading.payouts) {
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
          <h1 className="text-2xl font-bold text-gray-900">Payout Approvals</h1>
          <p className="text-gray-500 mt-1">
            Review and process payout requests from landlords and agents
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => fetchPayoutRequests()}
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
              <p className="text-sm text-gray-500">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{payoutRequests.length}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <Banknote className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending ({pendingCount})</p>
              <p className="text-2xl font-bold text-warning mt-1">
                {formatCurrency(totalPending)}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10 text-warning">
              <Clock className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Approved</p>
              <p className="text-2xl font-bold text-success mt-1">
                {formatCurrency(totalApproved)}
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
              <p className="text-sm text-gray-500">Rejected</p>
              <p className="text-2xl font-bold text-error mt-1">
                {payoutRequests.filter((p) => p.status === "REJECTED").length}
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
            placeholder="Search by name, bank, account..."
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
          {(["PENDING", "APPROVED", "REJECTED"] as RequestStatus[]).map((status) => {
            const config = STATUS_CONFIG[status];
            const Icon = config.icon;
            return (
              <Button
                key={status}
                variant={statusFilter === status ? "primary" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                leftIcon={<Icon className="h-4 w-4" />}
              >
                {config.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Payout Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => {
          const statusConfig = STATUS_CONFIG[request.status];
          const StatusIcon = statusConfig.icon;
          const isProcessing = isActionLoading[`payout-${request.id}`];

          return (
            <Card key={request.id} padding="none">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0",
                      request.status === "PENDING" ? "bg-warning/10 text-warning" :
                      request.status === "APPROVED" ? "bg-success/10 text-success" :
                      "bg-gray-100 text-gray-400"
                    )}>
                      <Banknote className="h-6 w-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-gray-900">{request.userName}</span>
                        <Badge variant={statusConfig.color as any}>
                          {statusConfig.label}
                        </Badge>
                      </div>

                      <p className="text-2xl font-bold text-gray-900 mb-3">
                        {formatCurrency(request.amount)}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{request.bankName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <CreditCard className="h-4 w-4 text-gray-400" />
                          <span className="font-mono">{request.accountNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {request.status === "PENDING" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(request.id)}
                          loading={isProcessing}
                          leftIcon={<CheckCircle2 className="h-4 w-4" />}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(request.id)}
                          disabled={isProcessing}
                          className="text-error border-error hover:bg-error/5"
                          leftIcon={<XCircle className="h-4 w-4" />}
                        >
                          Reject
                        </Button>
                      </>
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
              </div>

              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Requested: {formatDate(request.requestedAt)}
                </div>
                {request.processedAt && (
                  <div>
                    Processed: {formatDate(request.processedAt)} by {request.approvedBy}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {filteredRequests.length === 0 && (
        <Card padding="lg" className="text-center">
          <Banknote className="h-12 w-12 text-gray-300 mx-auto" />
          <p className="text-gray-500 mt-4">No payout requests found</p>
        </Card>
      )}

      {/* Warning Banner */}
      <Card padding="md" className="bg-warning/5 border-warning/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-warning-dark">Payout Processing</p>
            <p className="text-sm text-gray-600 mt-1">
              Approved payouts are processed within 24-48 hours. Ensure bank details are verified
              before approval. All payout actions are logged in the audit trail.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PayoutsPage;
