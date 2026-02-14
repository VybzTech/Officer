// ============================================
// URBAN GRAVITY - TRANSACTIONS PAGE
// View and monitor all platform transactions
// ============================================

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  RefreshCw as RefreshIcon,
  CreditCard,
  Search,
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useDataStore } from "@/stores/dataStore";
import { cn } from "@/utils/cn";
import { formatNaira, formatDate } from "@/utils/format";
import Loader from "@/components/ui/Loader";
import type { Transaction, TransactionType } from "@/data/mockDatabase";

const TYPE_CONFIG = {
  DEPOSIT: { icon: ArrowDownLeft, color: "success", label: "Deposit" },
  WITHDRAWAL: { icon: ArrowUpRight, color: "warning", label: "Withdrawal" },
  TRANSFER: { icon: ArrowLeftRight, color: "info", label: "Transfer" },
  REFUND: { icon: RefreshIcon, color: "default", label: "Refund" },
  PAYOUT: { icon: CreditCard, color: "primary", label: "Payout" },
};

const STATUS_CONFIG = {
  SUCCESS: { color: "success", icon: CheckCircle2 },
  PENDING: { color: "warning", icon: Clock },
  FAILED: { color: "error", icon: XCircle },
};

export function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionType | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const { transactions, isLoading, fetchTransactions } = useDataStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !typeFilter || txn.type === typeFilter;
    const matchesStatus = !statusFilter || txn.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalVolume = transactions
    .filter((t) => t.status === "SUCCESS")
    .reduce((sum, t) => sum + t.amount, 0);
  const successRate = Math.round(
    (transactions.filter((t) => t.status === "SUCCESS").length /
      transactions.length) *
      100,
  );
  const pendingCount = transactions.filter(
    (t) => t.status === "PENDING",
  ).length;

  if (isLoading.transactions) {
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
          <h1 className="text-2xl font-bold text-gray-900">Transaction Logs</h1>
          <p className="text-gray-500 mt-1">
            Monitor all financial transactions on the platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
          <Button
            variant="outline"
            onClick={() => fetchTransactions()}
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
              <p className="text-sm text-gray-500">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {transactions.length}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Volume</p>
              <p className="text-2xl font-bold text-primary-600 mt-1">
                {formatNaira(totalVolume)}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-2xl font-bold text-success mt-1">
                {successRate}%
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
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-warning mt-1">
                {pendingCount}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10 text-warning">
              <Clock className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search by reference, user, description..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputSize="sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={typeFilter === null ? "primary" : "outline"}
            size="sm"
            onClick={() => setTypeFilter(null)}
          >
            All Types
          </Button>
          {(Object.keys(TYPE_CONFIG) as TransactionType[]).map((type) => {
            const config = TYPE_CONFIG[type];
            const Icon = config.icon;
            return (
              <Button
                key={type}
                variant={typeFilter === type ? "primary" : "outline"}
                size="sm"
                onClick={() => setTypeFilter(type)}
                leftIcon={<Icon className="h-4 w-4" />}
              >
                {config.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2">
        <Button
          variant={statusFilter === null ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setStatusFilter(null)}
        >
          All Status
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
          variant={statusFilter === "PENDING" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setStatusFilter("PENDING")}
          leftIcon={<Clock className="h-4 w-4 text-warning" />}
        >
          Pending
        </Button>
        <Button
          variant={statusFilter === "FAILED" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setStatusFilter("FAILED")}
          leftIcon={<XCircle className="h-4 w-4 text-error" />}
        >
          Failed
        </Button>
      </div>

      {/* Transactions Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Reference
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Type
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  User
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Description
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">
                  Amount
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.slice(0, 50).map((txn) => {
                const typeConfig = TYPE_CONFIG[txn.type];
                const statusConfig = STATUS_CONFIG[txn.status];
                const TypeIcon = typeConfig.icon;
                const StatusIcon = statusConfig.icon;

                return (
                  <tr
                    key={txn.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <code className="text-xs font-mono bg-gray-100 px-1.5 py-0.5 rounded">
                        {txn.reference}
                      </code>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <TypeIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{typeConfig.label}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {txn.userName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500 max-w-xs truncate">
                      {txn.description}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={cn(
                          "font-semibold",
                          txn.type === "DEPOSIT"
                            ? "text-success"
                            : txn.type === "WITHDRAWAL" || txn.type === "PAYOUT"
                              ? "text-error"
                              : "text-gray-900",
                        )}
                      >
                        {txn.type === "DEPOSIT"
                          ? "+"
                          : txn.type === "WITHDRAWAL" || txn.type === "PAYOUT"
                            ? "-"
                            : ""}
                        {formatNaira(txn.amount)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={statusConfig.color as any}>
                        {txn.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {formatDate(txn.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredTransactions.length === 0 && (
        <Card padding="lg" className="text-center">
          <CreditCard className="h-12 w-12 text-gray-300 mx-auto" />
          <p className="text-gray-500 mt-4">No transactions found</p>
        </Card>
      )}

      {filteredTransactions.length > 50 && (
        <p className="text-center text-sm text-gray-500">
          Showing 50 of {filteredTransactions.length} transactions
        </p>
      )}
    </div>
  );
}

export default TransactionsPage;
