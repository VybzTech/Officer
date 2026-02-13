import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  MessageSquare,
  Eye,
} from "lucide-react";
import { disputesApi } from "@/services/api";
import type { Dispute } from "@/services/mockFn";
import { cn } from "@/utils/cn";

export function DisputesPage() {
  const [data, setData] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const disputes = await disputesApi.getAll();
      setData(disputes);
    } catch (error) {
      console.error("Failed to load disputes", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: Dispute["status"]) => {
    // Optimistic update could go here
    try {
      await disputesApi.updateStatus(id, status);
      loadData(); // Re-fetch for simplicity
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const filteredData = data.filter((item) => {
    const matchesStatus =
      statusFilter === "ALL" || item.status === statusFilter;
    const matchesSearch =
      item.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.complainantName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "IN_PROGRESS":
        return "bg-primary-50 text-primary-600 border-primary-200";
      case "RESOLVED":
        return "bg-green-50 text-green-600 border-green-200";
      case "ESCALATED":
        return "bg-red-50 text-red-600 border-red-200";
      case "CLOSED":
        return "bg-gray-50 text-gray-500 border-gray-200";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return "text-red-600 bg-red-50";
      case "HIGH":
        return "text-orange-600 bg-orange-50";
      case "MEDIUM":
        return "text-yellow-600 bg-yellow-50";
      case "LOW":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto"></div>
          <p className="text-gray-400 font-medium">Loading Disputes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Disputes Settlement
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and resolve escalated issues from payments, tenants, and
            landlords.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-primary-600 transition-all shadow-sm">
            <ArrowUpRight className="h-4 w-4" />
            Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-primary-500 rounded-xl hover:bg-primary-600 shadow-lg shadow-primary-500/20 transition-all active:scale-95">
            Create Dispute
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Open",
            value: data.filter((d) => d.status === "OPEN").length,
            icon: AlertCircle,
            color: "text-blue-600",
          },
          {
            label: "Escalated",
            value: data.filter((d) => d.status === "ESCALATED").length,
            icon: ArrowUpRight,
            color: "text-red-600",
          },
          {
            label: "Avg Resolution",
            value: "24h",
            icon: Clock,
            color: "text-orange-600",
          },
          {
            label: "Resolved Today",
            value: "12",
            icon: CheckCircle2,
            color: "text-green-600",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={cn("p-2 rounded-xl bg-gray-50", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-surface-border shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {["ALL", "OPEN", "ESCALATED", "RESOLVED"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap",
                statusFilter === status
                  ? "bg-primary-500 text-white shadow-md shadow-primary-500/20"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100",
              )}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search ticket # or user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 outline-none transition-all"
            />
          </div>
          <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors border border-gray-200">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-surface-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-left">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Issue
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-gray-100 text-gray-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {item.ticketNumber}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 max-w-[200px]">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-900 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                        {item.complainantName}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        {item.respondentName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                        getPriorityColor(item.priority),
                      )}
                    >
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold border",
                        getStatusColor(item.status),
                      )}
                    >
                      {item.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-medium text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {new Date(item.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(item.id, "RESOLVED")}
                        className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Mark Resolved"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                <Search className="h-6 w-6 text-gray-300" />
              </div>
              <p className="text-gray-900 font-medium">No disputes found</p>
              <p className="text-sm text-gray-500 mt-1">
                Try adjusting your filters or search query.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
