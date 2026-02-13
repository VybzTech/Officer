// ============================================
// URBAN GRAVITY - SUBSCRIPTION UPGRADES PAGE
// Manage subscription upgrade requests
// ============================================

import { useEffect, useState } from "react";
import {
  TrendingUp,
  Search,
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  Star,
  Crown,
  Sparkles,
  ArrowRight,
  User,
  CreditCard,
  Eye,
  AlertTriangle,
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
import type { RequestStatus, SubscriptionTier } from "@/data/mockDatabase";

const STATUS_CONFIG = {
  PENDING: { color: "warning", icon: Clock, label: "Pending Review" },
  APPROVED: { color: "success", icon: CheckCircle2, label: "Approved" },
  REJECTED: { color: "error", icon: XCircle, label: "Rejected" },
  CANCELLED: { color: "default", icon: XCircle, label: "Cancelled" },
};

const TIER_ICONS = {
  FREE: Star,
  PRO: Crown,
  PREMIER: Sparkles,
};

const TIER_COLORS = {
  FREE: "default",
  PRO: "warning",
  PREMIER: "success",
};

export function UpgradesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<RequestStatus | null>(null);

  const { subscriptionUpgrades, isLoading, isActionLoading, fetchSubscriptionUpgrades, approveUpgrade, rejectUpgrade } = useDataStore();
  const { officer } = useAuthStore();

  useEffect(() => {
    fetchSubscriptionUpgrades();
  }, [fetchSubscriptionUpgrades]);

  const filteredUpgrades = subscriptionUpgrades.filter((upgrade) => {
    const matchesSearch =
      upgrade.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      upgrade.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || upgrade.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = subscriptionUpgrades.filter((u) => u.status === "PENDING").length;
  const totalRevenue = subscriptionUpgrades
    .filter((u) => u.status === "APPROVED")
    .reduce((sum, u) => sum + u.amount, 0);
  const pendingRevenue = subscriptionUpgrades
    .filter((u) => u.status === "PENDING")
    .reduce((sum, u) => sum + u.amount, 0);

  const handleApprove = async (id: string) => {
    if (officer) {
      await approveUpgrade(id, officer.id);
    }
  };

  const handleReject = async (id: string) => {
    if (officer) {
      await rejectUpgrade(id, officer.id, "Request does not meet requirements");
    }
  };

  if (isLoading.upgrades) {
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
          <h1 className="text-2xl font-bold text-gray-900">Subscription Upgrades</h1>
          <p className="text-gray-500 mt-1">
            Review and approve subscription tier upgrade requests
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => fetchSubscriptionUpgrades()}
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
              <p className="text-2xl font-bold text-gray-900 mt-1">{subscriptionUpgrades.length}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-warning mt-1">{pendingCount}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10 text-warning">
              <Clock className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Approved Revenue</p>
              <p className="text-2xl font-bold text-success mt-1">
                {formatCurrency(totalRevenue)}
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
              <p className="text-sm text-gray-500">Pending Revenue</p>
              <p className="text-2xl font-bold text-primary-600 mt-1">
                {formatCurrency(pendingRevenue)}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search by name or email..."
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

      {/* Upgrade Requests List */}
      <div className="space-y-4">
        {filteredUpgrades.map((upgrade) => {
          const statusConfig = STATUS_CONFIG[upgrade.status];
          const CurrentIcon = TIER_ICONS[upgrade.currentTier];
          const RequestedIcon = TIER_ICONS[upgrade.requestedTier];
          const isProcessing = isActionLoading[`upgrade-${upgrade.id}`];

          return (
            <Card key={upgrade.id} padding="none">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0",
                      upgrade.status === "PENDING" ? "bg-warning/10 text-warning" :
                      upgrade.status === "APPROVED" ? "bg-success/10 text-success" :
                      "bg-gray-100 text-gray-400"
                    )}>
                      <TrendingUp className="h-6 w-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-gray-900">{upgrade.userName}</span>
                        <Badge variant={statusConfig.color as any}>
                          {statusConfig.label}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-500 mb-3">{upgrade.userEmail}</p>

                      {/* Tier Transition */}
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-3">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg",
                            upgrade.currentTier === "FREE" ? "bg-gray-100 text-gray-600" :
                            "bg-primary-100 text-primary-600"
                          )}>
                            <CurrentIcon className="h-4 w-4" />
                          </div>
                          <span className="font-medium text-gray-700">{upgrade.currentTier}</span>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg",
                            upgrade.requestedTier === "PRO" ? "bg-primary-100 text-primary-600" :
                            "bg-gradient-to-br from-primary-500 to-primary-600 text-white"
                          )}>
                            <RequestedIcon className="h-4 w-4" />
                          </div>
                          <span className="font-medium text-gray-700">{upgrade.requestedTier}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-500">
                          <CreditCard className="h-4 w-4" />
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(upgrade.amount)}
                          </span>
                        </div>
                        {upgrade.paymentReference && (
                          <div className="flex items-center gap-1 text-gray-500">
                            <span>Ref:</span>
                            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                              {upgrade.paymentReference}
                            </code>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {upgrade.status === "PENDING" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(upgrade.id)}
                          loading={isProcessing}
                          leftIcon={<CheckCircle2 className="h-4 w-4" />}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(upgrade.id)}
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
                      View User
                    </Button>
                  </div>
                </div>
              </div>

              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Requested: {formatDate(upgrade.createdAt)}
                </div>
                {upgrade.reviewedAt && (
                  <div>
                    Reviewed: {formatDate(upgrade.reviewedAt)} by {upgrade.reviewedBy}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {filteredUpgrades.length === 0 && (
        <Card padding="lg" className="text-center">
          <TrendingUp className="h-12 w-12 text-gray-300 mx-auto" />
          <p className="text-gray-500 mt-4">No upgrade requests found</p>
        </Card>
      )}

      {/* Info Banner */}
      <Card padding="md" className="bg-info/5 border-info/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-info-dark">Upgrade Verification</p>
            <p className="text-sm text-gray-600 mt-1">
              Ensure payment has been verified before approving upgrades. Check the payment
              reference against the payment gateway records. Approved upgrades take effect immediately.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default UpgradesPage;
