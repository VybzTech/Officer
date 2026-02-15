// ============================================
// URBAN GRAVITY - RISK SCORING
// Fraud detection and risk assessment dashboard
// ============================================

import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Shield,
  TrendingUp,
  User,
  Home,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  Eye,
  Lock,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/format";
import Loader from "@/components/ui/Loader";

const RISK_LEVELS = ["critical", "high", "medium", "low"];

const MOCK_RISK_ITEMS = [
  {
    id: "risk-001",
    type: "user",
    entity: "Chinedu Okafor (ACC-2847)",
    riskLevel: "critical",
    score: 87,
    reasons: [
      "12 listings created in 2 hours",
      "Payment method changed 3x in 48h",
      "Geographic inconsistency detected",
    ],
    action: "immediate_review",
    status: "flagged",
    detectedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "risk-002",
    type: "listing",
    entity: "4BR Villa - Ikoyi (LST-4021)",
    riskLevel: "high",
    score: 72,
    reasons: [
      "Duplicate property detected",
      "Images from 2 different sources",
      "Price 40% above market average",
    ],
    action: "manual_review",
    status: "pending",
    detectedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    id: "risk-003",
    type: "transaction",
    entity: "Transaction #TX-8934",
    riskLevel: "medium",
    score: 58,
    reasons: [
      "High-value transfer",
      "First-time activity",
      "Unusual timing pattern",
    ],
    action: "contact_user",
    status: "monitoring",
    detectedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
  {
    id: "risk-004",
    type: "user",
    entity: "Sarah Johnson (USR-5623)",
    riskLevel: "low",
    score: 34,
    reasons: ["Minor profile inconsistency", "Unverified phone number"],
    action: "send_reminder",
    status: "resolved",
    detectedAt: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
  },
  {
    id: "risk-005",
    type: "listing",
    entity: "2BR Apartment - Lekki (LST-3892)",
    riskLevel: "high",
    score: 68,
    reasons: [
      "Suspicious landlord activity",
      "Similar title to flagged listing",
      "Contact info shared with suspended user",
    ],
    action: "suspend_listing",
    status: "flagged",
    detectedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
  },
];

const RISK_STATS = [
  { label: "Flagged Items", value: "28", color: "danger", icon: AlertTriangle },
  { label: "Under Review", value: "12", color: "warning", icon: AlertCircle },
  { label: "Resolved Issues", value: "145", color: "success", icon: CheckCircle },
  { label: "Detection Accuracy", value: "94.2%", color: "info", icon: Shield },
];

const RISK_FACTORS = [
  { name: "Rapid Account Activity", weight: 28, status: "critical" },
  { name: "Payment Method Changes", weight: 22, status: "high" },
  { name: "Geographic Inconsistency", weight: 18, status: "high" },
  { name: "Duplicate Content", weight: 16, status: "medium" },
  { name: "Unverified Information", weight: 10, status: "low" },
  { name: "Uncommon Timing Patterns", weight: 6, status: "low" },
];

export function RiskScoringPage() {
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
  const [filterLevel, setFilterLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const filteredRisks = MOCK_RISK_ITEMS.filter((item) => {
    const matchesLevel = filterLevel === "all" || item.riskLevel === filterLevel;
    const matchesSearch =
      item.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const handleAction = (id: string) => {
    setActionLoading(id);
    setTimeout(() => setActionLoading(null), 1500);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-danger-100 text-danger-700 border-danger-200";
      case "high":
        return "bg-warning-100 text-warning-700 border-warning-200";
      case "medium":
        return "bg-info-100 text-info-700 border-info-200";
      case "low":
        return "bg-success-100 text-success-700 border-success-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getRiskTextColor = (level: string) => {
    switch (level) {
      case "critical":
        return "text-danger-700";
      case "high":
        return "text-warning-700";
      case "medium":
        return "text-info-700";
      case "low":
        return "text-success-700";
      default:
        return "text-gray-700";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "user":
        return <User className="h-4 w-4" />;
      case "listing":
        return <Home className="h-4 w-4" />;
      case "transaction":
        return <Zap className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Shield className="h-8 w-8 text-danger-500" />
          Risk Scoring & Fraud Detection
        </h1>
        <p className="text-gray-500 mt-1">
          AI-powered fraud detection and risk assessment
        </p>
      </div>

      {/* Risk Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {RISK_STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} padding="md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  stat.color === "danger" && "bg-danger-100 text-danger-600",
                  stat.color === "warning" && "bg-warning-100 text-warning-600",
                  stat.color === "success" && "bg-success-100 text-success-600",
                  stat.color === "info" && "bg-info-100 text-info-600",
                )}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Input
          placeholder="Search by entity or type..."
          icon={Search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputSize="sm"
          className="flex-1 max-w-xs"
        />

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={filterLevel === "all" ? "primary" : "outline"}
            size="sm"
            onClick={() => setFilterLevel("all")}
          >
            All
          </Button>
          {RISK_LEVELS.map((level) => (
            <Button
              key={level}
              variant={filterLevel === level ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilterLevel(level)}
              className={filterLevel === level ? "" : ""}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Risk Items */}
      <div className="space-y-3">
        {filteredRisks.map((item) => (
          <Card
            key={item.id}
            padding="md"
            className={cn(
              "border-l-4 transition-all hover:shadow-md cursor-pointer",
              item.riskLevel === "critical" && "border-l-danger-500 bg-danger-50/30",
              item.riskLevel === "high" && "border-l-warning-500 bg-warning-50/30",
              item.riskLevel === "medium" && "border-l-info-500 bg-info-50/30",
              item.riskLevel === "low" && "border-l-success-500 bg-success-50/30"
            )}
            onClick={() =>
              setSelectedRisk(selectedRisk === item.id ? null : item.id)
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              {/* Risk Score */}
              <div className="md:col-span-1 flex items-center justify-center">
                <div
                  className={cn(
                    "h-12 w-12 rounded-lg flex items-center justify-center font-bold text-lg",
                    getRiskColor(item.riskLevel)
                  )}
                >
                  {item.score}
                </div>
              </div>

              {/* Entity Info */}
              <div className="md:col-span-4 space-y-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(item.type)}
                  <h3 className="font-bold text-gray-900">{item.entity}</h3>
                </div>
                <Badge
                  className={cn(
                    "text-xs",
                    getRiskColor(item.riskLevel)
                  )}
                >
                  {item.riskLevel.toUpperCase()} RISK
                </Badge>
              </div>

              {/* Details */}
              <div className="md:col-span-3">
                <p className="text-xs font-medium text-gray-500 mb-1">
                  DETECTED
                </p>
                <p className="text-xs font-bold text-gray-900">
                  {new Date(item.detectedAt).toLocaleTimeString()}
                </p>
              </div>

              {/* Status */}
              <div className="md:col-span-2">
                <StatusBadge status={item.status} className="text-xs" />
              </div>

              {/* Actions */}
              <div className="md:col-span-2 flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Eye className="h-4 w-4" />}
                />
                <Button
                  variant="primary"
                  size="sm"
                  loading={actionLoading === item.id}
                  onClick={() => handleAction(item.id)}
                >
                  Review
                </Button>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedRisk === item.id && (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 animate-fade-in">
                <div>
                  <p className="text-xs font-medium text-gray-700 mb-2">
                    RISK FACTORS
                  </p>
                  <div className="space-y-2">
                    {item.reasons.map((reason, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                        <AlertCircle className="h-4 w-4 text-warning-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-gray-50 -mx-4 -mb-4 p-4 rounded-b-lg">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">TYPE</p>
                    <p className="text-xs font-bold text-gray-900 mt-1 capitalize">
                      {item.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">ACTION</p>
                    <p className="text-xs font-bold text-gray-900 mt-1">
                      {item.action.replace(/_/g, " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">STATUS</p>
                    <p className="text-xs font-bold text-gray-900 mt-1 capitalize">
                      {item.status}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="danger" size="sm" className="flex-1">
                    Take Action
                  </Button>
                  <Button variant="outline" size="sm">
                    Mark Safe
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Risk Factor Weights */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Risk Model Weights</h2>
        <Card padding="md">
          <div className="space-y-3">
            {RISK_FACTORS.map((factor) => (
              <div key={factor.name} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-gray-900 text-sm">
                      {factor.name}
                    </h4>
                    <span className="text-sm font-bold text-gray-600">
                      {factor.weight}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        factor.status === "critical" && "bg-danger-500",
                        factor.status === "high" && "bg-warning-500",
                        factor.status === "medium" && "bg-info-500",
                        factor.status === "low" && "bg-success-500"
                      )}
                      style={{ width: `${factor.weight}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Security Notice */}
      <Card padding="md" className="bg-danger-50 border-danger-200">
        <div className="flex gap-3">
          <Lock className="h-5 w-5 text-danger-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-danger-900">Security Advisory</p>
            <p className="text-sm text-danger-700 mt-1">
              Critical risk items require immediate review and action. All actions
              are logged for audit purposes. Suspicious items may be reported to
              relevant authorities if necessary.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default RiskScoringPage;