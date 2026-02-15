// ============================================
// URBAN GRAVITY - REPORTS PAGE
// Comprehensive reporting and analytics export
// ============================================

import { useState, useEffect } from "react";
import {
  FileText,
  BarChart3,
  Download,
  Filter,
  Calendar,
  Eye,
  Share2,
  Trash2,
  Plus,
  TrendingUp,
  Clock,
  User,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useDataStore } from "@/stores/dataStore";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/format";
import Loader from "@/components/ui/Loader";

const REPORT_TYPES = [
  { id: "all", label: "All Reports" },
  { id: "operational", label: "Operational" },
  { id: "financial", label: "Financial" },
  { id: "compliance", label: "Compliance" },
  { id: "performance", label: "Performance" },
];

const MOCK_REPORTS = [
  {
    id: "rpt-001",
    name: "Weekly Listings Report",
    type: "operational",
    description: "Active listings, approvals, and rejections by region",
    frequency: "Weekly",
    lastGenerated: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    nextRun: new Date(Date.now() + 1000 * 60 * 1440).toISOString(),
    format: "PDF, CSV, Excel",
    status: "active",
    owner: "System",
    downloads: 24,
  },
  {
    id: "rpt-002",
    name: "Escrow & Transactions",
    type: "financial",
    description: "All escrow movements, releases, and transaction flows",
    frequency: "Daily",
    lastGenerated: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    nextRun: new Date(Date.now() + 1000 * 60 * 1440).toISOString(),
    format: "PDF, Excel",
    status: "active",
    owner: "Finance Team",
    downloads: 156,
  },
  {
    id: "rpt-003",
    name: "Verification Audit Trail",
    type: "compliance",
    description: "All user verifications, approvals, and rejections with audit logs",
    frequency: "Weekly",
    lastGenerated: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
    nextRun: new Date(Date.now() + 1000 * 60 * 2880).toISOString(),
    format: "PDF, CSV",
    status: "active",
    owner: "Compliance",
    downloads: 18,
  },
  {
    id: "rpt-004",
    name: "Officer Performance",
    type: "performance",
    description: "Response times, approval rates, and effectiveness metrics",
    frequency: "Monthly",
    lastGenerated: new Date(Date.now() - 1000 * 60 * 7200).toISOString(),
    nextRun: new Date(Date.now() + 1000 * 60 * 5760).toISOString(),
    format: "PDF, Excel",
    status: "active",
    owner: "HR Team",
    downloads: 8,
  },
  {
    id: "rpt-005",
    name: "Regional Market Analysis",
    type: "operational",
    description: "Market trends, pricing analysis, and demand by LGA",
    frequency: "Monthly",
    lastGenerated: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    nextRun: new Date(Date.now() + 1000 * 60 * 2880).toISOString(),
    format: "PDF, Excel, Dashboard",
    status: "active",
    owner: "Strategy",
    downloads: 32,
  },
];

export function ReportsPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  const { officer } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredReports = MOCK_REPORTS.filter((report) => {
    const matchesType = selectedType === "all" || report.type === selectedType;
    const matchesSearch =
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleGenerateReport = (id: string) => {
    setGeneratingId(id);
    setTimeout(() => setGeneratingId(null), 2000);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "operational":
        return "bg-primary-100 text-primary-700";
      case "financial":
        return "bg-success-100 text-success-700";
      case "compliance":
        return "bg-danger-100 text-danger-700";
      case "performance":
        return "bg-info-100 text-info-700";
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary-500" />
            Reports & Analytics
          </h1>
          <p className="text-gray-500 mt-1">
            Generate and manage comprehensive platform reports
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
          New Custom Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Reports", value: "12", icon: FileText },
          { label: "Generated Today", value: "3", icon: Calendar },
          { label: "Total Downloads", value: "238", icon: Download },
          { label: "Avg Gen. Time", value: "45s", icon: Clock },
        ].map((stat) => {
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
                <Icon className="h-5 w-5 text-gray-300" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <Input
            placeholder="Search reports..."
            icon={FileText}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputSize="sm"
            className="flex-1 max-w-xs"
          />
          <div className="flex items-center gap-2 flex-wrap">
            {REPORT_TYPES.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.id)}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {filteredReports.map((report) => (
          <Card key={report.id} padding="md" className="hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Left Section */}
              <div className="md:col-span-6 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{report.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {report.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-13">
                  <Badge className={getTypeColor(report.type)}>
                    {report.type}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {report.frequency}
                  </Badge>
                </div>
              </div>

              {/* Middle Section */}
              <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-gray-500 font-medium">Last Generated</p>
                  <p className="font-bold text-gray-900 mt-1">
                    {formatDate(report.lastGenerated)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Downloads</p>
                  <p className="font-bold text-gray-900 mt-1 flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    {report.downloads}
                  </p>
                </div>
                <div className="hidden md:block">
                  <p className="text-gray-500 font-medium">Format</p>
                  <p className="font-bold text-gray-700 mt-1 text-[10px]">
                    {report.format.split(",")[0]}
                  </p>
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="md:col-span-3 flex items-center gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Eye className="h-4 w-4" />}
                >
                  Preview
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  loading={generatingId === report.id}
                  onClick={() => handleGenerateReport(report.id)}
                  leftIcon={<Download className="h-4 w-4" />}
                >
                  {generatingId === report.id ? "Generating..." : "Download"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Share2 className="h-4 w-4" />}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Trash2 className="h-4 w-4 text-danger-500" />}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Custom Reports Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Create Custom Report</h2>
        <Card padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Report Name"
              placeholder="e.g., Q4 Performance Analysis"
              inputSize="sm"
            />
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 outline-none">
                <option>Operational</option>
                <option>Financial</option>
                <option>Compliance</option>
                <option>Performance</option>
              </select>
            </div>
            <Input
              label="Date Range"
              type="date"
              inputSize="sm"
            />
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Output Format
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 outline-none">
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
                <option>All Formats</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Button variant="primary">Generate Custom Report</Button>
            <Button variant="outline">Save as Template</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ReportsPage;