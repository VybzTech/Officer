// ============================================
// URBAN GRAVITY - VERIFICATIONS PAGE
// Review and process verification requests
// ============================================

import { useState } from "react";
import {
  ShieldCheck,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  User,
  Briefcase,
  Building,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, StatusBadge, TierBadge } from "@/components/ui/Badge";
import { PermissionGate } from "@/components/guards";
import { cn } from "@/utils/cn";
import { formatDate, formatRelativeTime } from "@/utils/format";
import type { UserType, RequestStatus } from "@/types";

// Mock data
const MOCK_VERIFICATIONS = [
  {
    id: "v-001",
    userId: "u-123",
    userName: "Adebayo Ogundimu",
    userEmail: "adebayo@email.com",
    userType: "LANDLORD" as UserType,
    currentTier: "FREE" as const,
    status: "PENDING" as RequestStatus,
    documents: ["NIN", "Utility Bill", "Property Title"],
    notes: "First time landlord registration",
    submittedAt: "2024-02-10T10:30:00Z",
    lgaName: "Ikeja",
    propertyCount: 3,
  },
  {
    id: "v-002",
    userId: "u-124",
    userName: "Premium Estates Ltd",
    userEmail: "info@premiumestates.ng",
    userType: "AGENT" as UserType,
    currentTier: "PRO" as const,
    status: "PENDING" as RequestStatus,
    documents: ["CAC Certificate", "Tax Clearance", "Office Address Proof"],
    notes: "Agency re-verification",
    submittedAt: "2024-02-09T14:15:00Z",
    lgaName: "Victoria Island",
    propertyCount: 45,
  },
  {
    id: "v-003",
    userId: "u-125",
    userName: "Chioma Nwosu",
    userEmail: "chioma.n@gmail.com",
    userType: "TENANT" as UserType,
    currentTier: "FREE" as const,
    status: "APPROVED" as RequestStatus,
    documents: ["NIN", "Employment Letter"],
    notes: null,
    submittedAt: "2024-02-08T09:00:00Z",
    reviewedAt: "2024-02-08T11:30:00Z",
    reviewedBy: "Officer Fatima",
    lgaName: "Surulere",
    propertyCount: 0,
  },
  {
    id: "v-004",
    userId: "u-126",
    userName: "John Properties",
    userEmail: "john@properties.ng",
    userType: "LANDLORD" as UserType,
    currentTier: "PRO" as const,
    status: "REJECTED" as RequestStatus,
    documents: ["NIN", "Utility Bill"],
    notes: "Documents not clear",
    rejectionReason: "Property title document is blurry and unreadable",
    submittedAt: "2024-02-07T16:45:00Z",
    reviewedAt: "2024-02-07T18:00:00Z",
    reviewedBy: "Officer Chidi",
    lgaName: "Lekki",
    propertyCount: 12,
  },
];

const STATS = [
  { label: "Total Requests", value: 156, icon: ShieldCheck, color: "primary" },
  { label: "Pending Review", value: 23, icon: Clock, color: "warning" },
  { label: "Approved Today", value: 12, icon: CheckCircle2, color: "success" },
  { label: "Rejected Today", value: 3, icon: XCircle, color: "danger" },
];

export function VerificationsPage() {
  const [activeTab, setActiveTab] = useState<"all" | RequestStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVerification, setSelectedVerification] = useState<
    (typeof MOCK_VERIFICATIONS)[0] | null
  >(null);

  const filteredVerifications = MOCK_VERIFICATIONS.filter((v) => {
    if (activeTab !== "all" && v.status !== activeTab) return false;
    if (
      searchQuery &&
      !v.userName.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const getUserTypeIcon = (type: UserType) => {
    switch (type) {
      case "TENANT":
        return User;
      case "LANDLORD":
        return Building;
      case "AGENT":
        return Briefcase;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Verification Requests</h1>
        <p className="text-gray-400 mt-1">
          Review and process user verification requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Card key={stat.label} padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  stat.color === "primary" &&
                    "bg-primary-500/10 text-primary-400",
                  stat.color === "warning" && "bg-warning/10 text-warning",
                  stat.color === "success" && "bg-success/10 text-success",
                  stat.color === "danger" && "bg-danger/10 text-danger",
                )}
              >
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 rounded-lg border border-sidebar-border bg-surface-raised pl-10 pr-4 text-white placeholder:text-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
        <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
          Filters
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-sidebar-border">
        {[
          { id: "all", label: "All" },
          { id: "PENDING", label: "Pending" },
          { id: "APPROVED", label: "Approved" },
          { id: "REJECTED", label: "Rejected" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === tab.id
                ? "text-primary-400 border-primary-400"
                : "text-gray-400 border-transparent hover:text-white",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredVerifications.map((verification) => {
            const TypeIcon = getUserTypeIcon(verification.userType);
            return (
              <Card
                key={verification.id}
                padding="md"
                hover
                onClick={() => setSelectedVerification(verification)}
                className={cn(
                  selectedVerification?.id === verification.id &&
                    "border-primary-500",
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-lg",
                      verification.userType === "TENANT" &&
                        "bg-blue-500/10 text-blue-400",
                      verification.userType === "LANDLORD" &&
                        "bg-success/10 text-success",
                      verification.userType === "AGENT" &&
                        "bg-warning/10 text-warning",
                    )}
                  >
                    <TypeIcon className="h-6 w-6" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white">
                            {verification.userName}
                          </h3>
                          <TierBadge tier={verification.currentTier} />
                        </div>
                        <p className="text-sm text-gray-400 mt-0.5">
                          {verification.userEmail}
                        </p>
                      </div>
                      <StatusBadge status={verification.status} />
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <TypeIcon className="h-4 w-4" />
                        {verification.userType}
                      </span>
                      <span>{verification.lgaName}</span>
                      <span>{verification.documents.length} documents</span>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-sidebar-border">
                      <span className="text-xs text-gray-500">
                        Submitted {formatRelativeTime(verification.submittedAt)}
                      </span>
                      {verification.status === "PENDING" && (
                        <div className="flex items-center gap-2">
                          <PermissionGate permission="APPROVE_VERIFICATION">
                            <Button size="sm" variant="success">
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </PermissionGate>
                          <PermissionGate permission="REJECT_VERIFICATION">
                            <Button size="sm" variant="danger">
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </PermissionGate>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          {selectedVerification ? (
            <Card padding="none" className="sticky top-6">
              <CardHeader className="p-6 border-b border-sidebar-border">
                <CardTitle>Verification Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* User Info */}
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                    User Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name</span>
                      <span className="text-white font-medium">
                        {selectedVerification.userName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email</span>
                      <span className="text-white">
                        {selectedVerification.userEmail}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type</span>
                      <span className="text-white">
                        {selectedVerification.userType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">LGA</span>
                      <span className="text-white">
                        {selectedVerification.lgaName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Properties</span>
                      <span className="text-white">
                        {selectedVerification.propertyCount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Submitted Documents
                  </h4>
                  <div className="space-y-2">
                    {selectedVerification.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-sidebar-hover"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-white">{doc}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {selectedVerification.notes && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                      Notes
                    </h4>
                    <p className="text-sm text-gray-300">
                      {selectedVerification.notes}
                    </p>
                  </div>
                )}

                {/* Rejection Reason */}
                {selectedVerification.status === "REJECTED" &&
                  selectedVerification.rejectionReason && (
                    <div className="p-4 rounded-lg bg-danger/10 border border-danger/20">
                      <h4 className="text-xs font-medium text-danger uppercase tracking-wider mb-2">
                        Rejection Reason
                      </h4>
                      <p className="text-sm text-gray-300">
                        {selectedVerification.rejectionReason}
                      </p>
                    </div>
                  )}

                {/* Timeline */}
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Timeline
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary-500 mt-1.5" />
                      <div>
                        <p className="text-sm text-white">Submitted</p>
                        <p className="text-xs text-gray-500">
                          {formatDate(selectedVerification.submittedAt)}
                        </p>
                      </div>
                    </div>
                    {selectedVerification.reviewedAt && (
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full mt-1.5",
                            selectedVerification.status === "APPROVED"
                              ? "bg-success"
                              : "bg-danger",
                          )}
                        />
                        <div>
                          <p className="text-sm text-white">
                            {selectedVerification.status === "APPROVED"
                              ? "Approved"
                              : "Rejected"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(selectedVerification.reviewedAt)} by{" "}
                            {selectedVerification.reviewedBy}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {selectedVerification.status === "PENDING" && (
                  <div className="flex gap-3 pt-4 border-t border-sidebar-border">
                    <PermissionGate permission="APPROVE_VERIFICATION">
                      <Button variant="success" className="flex-1">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </PermissionGate>
                    <PermissionGate permission="REJECT_VERIFICATION">
                      <Button variant="danger" className="flex-1">
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </PermissionGate>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card padding="lg" className="text-center">
              <ShieldCheck className="h-12 w-12 text-gray-600 mx-auto" />
              <p className="text-gray-400 mt-4">
                Select a verification request to view details
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
