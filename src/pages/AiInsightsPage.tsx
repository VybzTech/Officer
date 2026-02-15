// ============================================
// URBAN GRAVITY - AI INSIGHTS PAGE
// Intelligence-powered insights and recommendations
// ============================================

import { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Zap,
  Search,
  Filter,
  Calendar,
  Download,
  Brain,
  Target,
  Shield,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { useDataStore } from "@/stores/dataStore";
import { cn } from "@/utils/cn";
import { formatDate, formatNaira } from "@/utils/format";
import Loader from "@/components/ui/Loader";

const INSIGHT_CATEGORIES = [
  { id: "fraud", label: "Fraud Detection", icon: Shield, color: "danger" },
  { id: "optimization", label: "Optimization", icon: Zap, color: "primary" },
  { id: "trends", label: "Market Trends", icon: TrendingUp, color: "success" },
  { id: "quality", label: "Quality Issues", icon: AlertCircle, color: "warning" },
];

const MOCK_INSIGHTS = [
  {
    id: "ins-001",
    category: "fraud",
    title: "Suspicious Landlord Activity Detected",
    description: "User ACC-2847 shows abnormal listing creation pattern (12 in 2 hours)",
    severity: "high",
    confidence: 94,
    action: "Review & Suspend",
    affectedUsers: 3,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "ins-002",
    category: "optimization",
    title: "Slow Verification Processing",
    description: "Average verification time has increased by 34% this week",
    severity: "medium",
    confidence: 87,
    action: "Allocate Resources",
    affectedUsers: 142,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "ins-003",
    category: "trends",
    title: "High Demand in Lekki Phase 1",
    description: "3BR properties in Lekki Phase 1 showing 45% more inquiries",
    severity: "low",
    confidence: 91,
    action: "Encourage Listings",
    affectedUsers: 28,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: "ins-004",
    category: "quality",
    title: "Low Quality Listing Images",
    description: "Listings from OPT-891 have 15% lower engagement due to image quality",
    severity: "medium",
    confidence: 82,
    action: "Send Guidelines",
    affectedUsers: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
  },
];

const RECOMMENDATIONS = [
  {
    id: "rec-001",
    title: "Implement Tiered Verification",
    description: "Speed up simple verifications with automated checks",
    impact: "40% faster processing",
    priority: "high",
    type: "process",
  },
  {
    id: "rec-002",
    title: "Seasonal Pricing Alerts",
    description: "Alert landlords about seasonal market fluctuations",
    impact: "Increase rent collections",
    priority: "medium",
    type: "feature",
  },
  {
    id: "rec-003",
    title: "Premium Listing Promotion",
    description: "Focus marketing on high-demand micro-markets",
    impact: "15% growth potential",
    priority: "medium",
    type: "strategy",
  },
];

export function AiInsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState("week");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredInsights = MOCK_INSIGHTS.filter((insight) => {
    const matchesCategory = !selectedCategory || insight.category === selectedCategory;
    const matchesSearch =
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-danger/10 text-danger";
      case "medium":
        return "bg-warning/10 text-warning";
      default:
        return "bg-success/10 text-success";
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary-500" />
            AI Insights & Analytics
          </h1>
          <p className="text-gray-500 mt-1">
            Intelligence-powered recommendations to optimize platform operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Active Insights",
            value: "12",
            color: "primary",
            icon: Brain,
          },
          {
            label: "Avg Confidence",
            value: "89%",
            color: "success",
            icon: CheckCircle2,
          },
          {
            label: "Issues Resolved",
            value: "28",
            color: "info",
            icon: Target,
          },
          {
            label: "Est. Impact",
            value: "₦2.4M",
            color: "warning",
            icon: TrendingUp,
          },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} padding="md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {metric.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {metric.value}
                  </p>
                </div>
                <div
                  className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center",
                    `bg-${metric.color}-100 text-${metric.color}-600`,
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {INSIGHT_CATEGORIES.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "primary" : "outline"}
              size="sm"
              onClick={() =>
                setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
              }
              leftIcon={<cat.icon className="h-3 w-3" />}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredInsights.map((insight) => (
          <Card key={insight.id} padding="md" className="hover:shadow-lg transition-shadow">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{insight.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {insight.description}
                  </p>
                </div>
                <Badge className={cn("flex-shrink-0", getSeverityColor(insight.severity))}>
                  {insight.severity.charAt(0).toUpperCase() + insight.severity.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-gray-50 -mx-4 -mb-3 px-4 py-3 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500 font-medium">CONFIDENCE</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">
                    {insight.confidence}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">AFFECTED</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">
                    {insight.affectedUsers}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">DETECTED</p>
                  <p className="text-xs font-bold text-gray-900 mt-1">
                    {new Date(insight.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                className="w-full"
              >
                {insight.action}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Recommendations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Recommended Actions</h2>
          <Badge variant="success">Data-Driven</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RECOMMENDATIONS.map((rec) => (
            <Card key={rec.id} padding="md" className="border-l-4 border-l-primary-500">
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-gray-900">{rec.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{rec.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">IMPACT</p>
                    <p className="text-sm font-bold text-primary-600 mt-0.5">
                      {rec.impact}
                    </p>
                  </div>
                  <Badge
                    variant={rec.priority === "high" ? "danger" : "default"}
                    className="text-xs"
                  >
                    {rec.priority}
                  </Badge>
                </div>

                <Button variant="outline" size="sm" className="w-full text-xs">
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <Card padding="md" className="bg-info/5 border-info/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-info-dark">AI Insights Notice</p>
            <p className="text-sm text-gray-600 mt-1">
              All recommendations are based on 7+ days of historical data analysis
              and platform activity patterns. Final decisions rest with human
              officers.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AiInsightsPage;