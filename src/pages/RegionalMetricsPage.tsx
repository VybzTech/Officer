import { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Map,
  Users,
  Home,
  AlertTriangle,
  ArrowUpRight,
  Download,
} from "lucide-react";
import { analyticsApi } from "@/services/api";
import { cn } from "@/utils/cn";

export function RegionalMetricsPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await analyticsApi.getOverview();
      setMetrics(data);
    } catch (error) {
      console.error("Failed to load metrics", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto"></div>
          <p className="text-gray-400 font-medium">Loading Regional Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Regional Metrics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Comprehensive overview of Lagos State real estate performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-primary-600 transition-all shadow-sm">
            <Download className="h-4 w-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Active Listings",
            value: metrics?.activeListings || 0,
            icon: Home,
            color: "text-primary-600 bg-primary-50",
          },
          {
            label: "Total Users",
            value: metrics?.activeUsers || 0,
            icon: Users,
            color: "text-blue-600 bg-blue-50",
          },
          {
            label: "Open Disputes",
            value: metrics?.openDisputes || 0,
            icon: AlertTriangle,
            color: "text-red-600 bg-red-50",
          },
          {
            label: "Monthly Revenue",
            value: `₦${(metrics?.revenue || 0).toLocaleString()}`,
            icon: TrendingUp,
            color: "text-green-600 bg-green-50",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-extrabold text-gray-900 mt-2">
                  {stat.value}
                </h3>
              </div>
              <div className={cn("p-2.5 rounded-xl", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-xs font-medium text-green-600">
              <ArrowUpRight className="h-3 w-3" />
              <span>+12% vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Regional Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Lagos Heatmap</h3>
            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg">
              <button className="px-3 py-1 text-xs font-bold bg-white text-gray-900 rounded shadow-sm">
                Map
              </button>
              <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-900">
                List
              </button>
            </div>
          </div>
          <div className="flex-1 bg-gray-100 rounded-xl flex items-center justify-center min-h-[300px] relative overflow-hidden group">
            <Map className="h-12 w-12 text-gray-300 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/5 to-transparent"></div>
            <p className="absolute bottom-4 left-4 text-xs font-medium text-gray-400">
              Interactive Map Integration Pending
            </p>
          </div>
        </div>

        {/* Top Regions List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Top Performing Regions
          </h3>
          <div className="space-y-6">
            {[
              { name: "Lekki Phase 1", score: 98, trend: "+5%" },
              { name: "Victoria Island", score: 92, trend: "+2%" },
              { name: "Ikeja GRA", score: 88, trend: "+7%" },
              { name: "Ikoyi", score: 85, trend: "-1%" },
              { name: "Surulere", score: 76, trend: "+12%" },
            ].map((region, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-xs font-bold text-gray-500">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-gray-900">
                      {region.name}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-bold",
                        region.trend.startsWith("+")
                          ? "text-green-600"
                          : "text-red-500",
                      )}
                    >
                      {region.trend}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full"
                      style={{ width: `${region.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-xs font-bold text-gray-500 border border-dashed border-gray-300 rounded-xl hover:text-primary-600 hover:border-primary-500 transition-colors">
            VIEW ALL REGIONS
          </button>
        </div>
      </div>
    </div>
  );
}
