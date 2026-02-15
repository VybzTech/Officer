// ============================================
// URBAN GRAVITY - AI MATCH RECOMMENDATIONS
// Intelligent property matching algorithm
// ============================================

import { useState, useEffect } from "react";
import {
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  User,
  Building2,
  Filter,
  Search,
  MessageSquare,
  TrendingUp,
  Star,
  MapPin,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useDataStore } from "@/stores/dataStore";
import { cn } from "@/utils/cn";
import { formatNaira } from "@/utils/format";
import Loader from "@/components/ui/Loader";

const MOCK_MATCHES = [
  {
    id: "mtch-001",
    tenantId: "usr-023",
    tenantName: "Chioma Adeyemi",
    tenantRole: "Professional",
    listingId: "lst-089",
    listingTitle: "Luxury 2BR, Lekki Phase 1",
    price: "₦850,000/mo",
    location: "Lekki Phase 1, Eti-Osa",
    matchScore: 94,
    matchReasons: [
      "Budget alignment",
      "Location preference",
      "Amenities match",
    ],
    status: "pending",
    confidence: 96,
    favorability: "excellent",
  },
  {
    id: "mtch-002",
    tenantId: "usr-045",
    tenantName: "Adekunle Okafor",
    tenantRole: "Student",
    listingId: "lst-142",
    listingTitle: "3BR Family Home, Ikeja",
    price: "₦650,000/mo",
    location: "Ikeja GRA, Ikeja",
    matchScore: 87,
    matchReasons: ["Space requirement", "Transport access", "Family-friendly"],
    status: "viewed",
    confidence: 89,
    favorability: "good",
  },
  {
    id: "mtch-003",
    tenantId: "usr-067",
    tenantName: "Sarah Johnson",
    tenantRole: "Business Owner",
    listingId: "lst-201",
    listingTitle: "Premium 4BR Penthouse, VI",
    price: "₦2,500,000/mo",
    location: "Victoria Island, Lagos Island",
    matchScore: 91,
    matchReasons: ["Premium lifestyle", "Business district", "Executive amenities"],
    status: "pending",
    confidence: 93,
    favorability: "excellent",
  },
  {
    id: "mtch-004",
    tenantId: "usr-089",
    tenantName: "Tunde Akinwande",
    tenantRole: "Medical Professional",
    listingId: "lst-156",
    listingTitle: "Modern 1BR Apartment, Surulere",
    price: "₦420,000/mo",
    location: "Surulere, Lagos Mainland",
    matchScore: 78,
    matchReasons: ["Commute distance", "Hospital proximity"],
    status: "pending",
    confidence: 82,
    favorability: "moderate",
  },
];

const METRICS = [
  {
    label: "Successful Matches",
    value: "847",
    trend: "+23%",
    color: "success",
  },
  {
    label: "Match Rate",
    value: "84%",
    trend: "+4.2%",
    color: "primary",
  },
  {
    label: "Tenant Satisfaction",
    value: "4.7/5",
    trend: "+0.3",
    color: "info",
  },
  {
    label: "Avg Response Time",
    value: "12h",
    trend: "-2h",
    color: "warning",
  },
];

export function AiMatchRecommendationsPage() {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackLoading, setFeedbackLoading] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const filteredMatches = MOCK_MATCHES.filter((match) => {
    const matchesStatus = filterStatus === "all" || match.status === filterStatus;
    const matchesSearch =
      match.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.listingTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleFeedback = (id: string, feedback: "positive" | "negative") => {
    setFeedbackLoading(`${id}-${feedback}`);
    setTimeout(() => setFeedbackLoading(null), 1000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success-600 bg-success-50";
    if (score >= 80) return "text-primary-600 bg-primary-50";
    if (score >= 70) return "text-warning-600 bg-warning-50";
    return "text-danger-600 bg-danger-50";
  };

  const getFavorabilityBadge = (fav: string) => {
    switch (fav) {
      case "excellent":
        return "bg-success-100 text-success-700";
      case "good":
        return "bg-primary-100 text-primary-700";
      case "moderate":
        return "bg-warning-100 text-warning-700";
      default:
        return "bg-gray-100 text-gray-700";
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
          <Lightbulb className="h-8 w-8 text-primary-500" />
          AI Match Recommendations
        </h1>
        <p className="text-gray-500 mt-1">
          Intelligent property-tenant matching powered by machine learning
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {METRICS.map((metric) => (
          <Card key={metric.label} padding="md">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {metric.label}
              </p>
              <div className="flex items-end gap-2 mt-2">
                <p className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </p>
                <p className={`text-xs font-bold ${
                  metric.color === "success" ? "text-success-600" :
                  metric.color === "primary" ? "text-primary-600" :
                  metric.color === "info" ? "text-info-600" :
                  "text-warning-600"
                }`}>
                  {metric.trend}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Input
          placeholder="Search matches..."
          icon={Search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputSize="sm"
          className="flex-1 max-w-xs"
        />

        <div className="flex items-center gap-2">
          {[
            { id: "all", label: "All" },
            { id: "pending", label: "Pending" },
            { id: "viewed", label: "Viewed" },
          ].map((status) => (
            <Button
              key={status.id}
              variant={filterStatus === status.id ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(status.id)}
            >
              {status.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Matches Grid */}
      <div className="space-y-4">
        {filteredMatches.map((match) => (
          <Card
            key={match.id}
            padding="md"
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              selectedMatch === match.id && "ring-2 ring-primary-500"
            )}
            onClick={() =>
              setSelectedMatch(selectedMatch === match.id ? null : match.id)
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Match Score */}
              <div className="md:col-span-2 flex flex-col items-center justify-center py-4 border-r border-gray-100">
                <div
                  className={cn(
                    "h-16 w-16 rounded-lg flex items-center justify-center font-bold text-lg",
                    getScoreColor(match.matchScore)
                  )}
                >
                  {match.matchScore}%
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center font-medium">
                  Match Score
                </p>
              </div>

              {/* Tenant Info */}
              <div className="md:col-span-3 space-y-2">
                <div>
                  <h3 className="font-bold text-gray-900">{match.tenantName}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{match.tenantRole}</p>
                </div>
              </div>

              {/* Property Info */}
              <div className="md:col-span-3 space-y-2">
                <h4 className="font-bold text-gray-900">{match.listingTitle}</h4>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-primary-600">
                    {match.price}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    {match.location}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="md:col-span-2 space-y-2">
                <div>
                  <p className="text-xs text-gray-500 font-medium">CONFIDENCE</p>
                  <p className="font-bold text-gray-900">{match.confidence}%</p>
                </div>
                <Badge className={getFavorabilityBadge(match.favorability)}>
                  {match.favorability}
                </Badge>
              </div>

              {/* Actions */}
              <div className="md:col-span-2 flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={
                    <ThumbsUp
                      className={cn(
                        "h-4 w-4",
                        feedbackLoading?.includes("positive")
                          ? "text-success-600"
                          : ""
                      )}
                    />
                  }
                  onClick={() => handleFeedback(match.id, "positive")}
                  loading={feedbackLoading === `${match.id}-positive`}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={
                    <ThumbsDown
                      className={cn(
                        "h-4 w-4",
                        feedbackLoading?.includes("negative")
                          ? "text-danger-600"
                          : ""
                      )}
                    />
                  }
                  onClick={() => handleFeedback(match.id, "negative")}
                  loading={feedbackLoading === `${match.id}-negative`}
                />
              </div>
            </div>

            {/* Expanded Details */}
            {selectedMatch === match.id && (
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-4 animate-fade-in">
                <div>
                  <h4 className="font-bold text-sm text-gray-900 mb-2">
                    Match Reasons
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {match.matchReasons.map((reason, idx) => (
                      <Badge key={idx} variant="default">
                        {reason}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-50 -mx-4 -mb-4 p-4 rounded-b-lg">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">TENANT ID</p>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      {match.tenantId}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">LISTING ID</p>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      {match.listingId}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">STATUS</p>
                    <Badge className="mt-1" variant="outline">
                      {match.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" className="flex-1">
                      Contact
                    </Button>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Recommendation Info */}
      <Card padding="md" className="bg-primary-50 border-primary-200">
        <div className="flex gap-3">
          <Lightbulb className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-primary-900">Smart Matching Algorithm</p>
            <p className="text-sm text-primary-700 mt-1">
              Our AI analyzes 50+ parameters including budget, preferences,
              location, amenities, and historical matches to deliver
              high-confidence recommendations. Feedback helps improve accuracy.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AiMatchRecommendationsPage;