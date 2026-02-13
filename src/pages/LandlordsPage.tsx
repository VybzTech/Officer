import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  UserCheck,
  Shield,
  Mail,
  Phone,
  MapPin,
  MoreHorizontal,
  Building2,
} from "lucide-react";
import { usersApi } from "@/services/api";
import type { User } from "@/services/mockFn";
import { cn } from "@/utils/cn";
import { getInitials } from "@/utils/format";

export function LandlordsPage() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const users = await usersApi.getAll("LANDLORD");
      setData(users);
    } catch (error) {
      console.error("Failed to load landlords", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter((item) => {
    const term = searchQuery.toLowerCase();
    return (
      item.firstName.toLowerCase().includes(term) ||
      item.lastName.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6 animate-fade-in p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Landlord Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage property owners, verification status, and portfolio
            performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full border-2 border-white bg-gray-200"
              />
            ))}
            <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
              +1k
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-primary-500 rounded-xl hover:bg-primary-600 shadow-lg shadow-primary-500/20 transition-all active:scale-95">
            <Mail className="h-4 w-4" />
            Group Message
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-surface-border shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            Verified Only
          </button>
          <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors border border-gray-200">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 bg-gray-100 rounded-2xl animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredData.map((user) => (
            <div
              key={user.id}
              className="group relative bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-premium transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt=""
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
                        {getInitials(user.firstName, user.lastName)}
                      </div>
                    )}
                    <div
                      className={cn(
                        "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white",
                        user.status === "VERIFIED"
                          ? "bg-blue-500"
                          : "bg-gray-400",
                      )}
                    >
                      {user.status === "VERIFIED" && (
                        <UserCheck className="h-2 w-2" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 leading-tight">
                      {user.firstName} {user.lastName}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Building2 className="h-3 w-3 text-gray-400" />
                      <p className="text-xs text-gray-500 font-medium">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </div>
                <button className="text-gray-300 hover:text-gray-600">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Mail className="h-3.5 w-3.5 text-gray-400" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Phone className="h-3.5 w-3.5 text-gray-400" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                  <span>{user.region}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide",
                      user.tier === "PRO"
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 text-gray-600",
                    )}
                  >
                    {user.tier}
                  </span>
                  {user.status === "VERIFIED" && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      <Shield className="h-3 w-3" />
                      KYC
                    </span>
                  )}
                </div>
                <button className="text-xs font-bold text-primary-600 hover:text-primary-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Portfolio
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
