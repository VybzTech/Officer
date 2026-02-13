// ============================================
// URBAN GRAVITY - LGAs PAGE
// Manage Lagos Local Government Areas
// ============================================

import { useEffect, useState } from "react";
import {
  MapPin,
  Search,
  RefreshCw,
  Users,
  Home,
  TrendingUp,
  Building2,
  Filter,
  Eye,
  ChevronRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { useDataStore } from "@/stores/dataStore";
import { cn } from "@/utils/cn";
import { formatNumber } from "@/utils/format";
import Loader from "@/components/ui/Loader";

export function LgasPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState<string | null>(null);

  const { regions, lgas, listings, users, isLoading, fetchRegions, fetchLgas, fetchListings, fetchUsers } = useDataStore();

  useEffect(() => {
    fetchRegions();
    fetchLgas();
    fetchListings();
    fetchUsers();
  }, [fetchRegions, fetchLgas, fetchListings, fetchUsers]);

  const filteredLgas = lgas.filter((lga) => {
    const matchesSearch = lga.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = !regionFilter || lga.regionId === regionFilter;
    return matchesSearch && matchesRegion;
  });

  const getLgaStats = (lgaId: string) => {
    const lgaUsers = users.filter((u) => u.lgaId === lgaId);
    const lgaListings = listings.filter((l) => l.lgaId === lgaId);

    return {
      userCount: lgaUsers.length,
      listingCount: lgaListings.length,
      activeListings: lgaListings.filter((l) => l.status === "ACTIVE" || l.status === "APPROVED").length,
      pendingListings: lgaListings.filter((l) => l.status === "PENDING").length,
    };
  };

  const getRegionName = (regionId: string) => {
    return regions.find((r) => r.id === regionId)?.name || "Unknown";
  };

  const loading = isLoading.listings || isLoading.users;

  if (loading) {
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
          <h1 className="text-2xl font-bold text-gray-900">Local Government Areas</h1>
          <p className="text-gray-500 mt-1">
            View and manage the 20 LGAs of Lagos State
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => fetchLgas()}
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
              <p className="text-sm text-gray-500">Total LGAs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{lgas.length}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              <MapPin className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Population</p>
              <p className="text-2xl font-bold text-primary-600 mt-1">
                {formatNumber(lgas.reduce((sum, l) => sum + l.population, 0))}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Listings</p>
              <p className="text-2xl font-bold text-success mt-1">{listings.length}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
              <Home className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg per LGA</p>
              <p className="text-2xl font-bold text-info mt-1">
                {Math.round(listings.length / lgas.length)}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-info/10 text-info">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search LGAs..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputSize="sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={regionFilter === null ? "primary" : "outline"}
            size="sm"
            onClick={() => setRegionFilter(null)}
          >
            All Regions
          </Button>
          {regions.map((region) => (
            <Button
              key={region.id}
              variant={regionFilter === region.id ? "primary" : "outline"}
              size="sm"
              onClick={() => setRegionFilter(region.id)}
            >
              {region.code}
            </Button>
          ))}
        </div>
      </div>

      {/* LGAs Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">LGA</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Region</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">Population</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">Users</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">Listings</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">Active</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">Pending</th>
                <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLgas.map((lga) => {
                const stats = getLgaStats(lga.id);
                return (
                  <tr key={lga.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-gray-900">{lga.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="default">{getRegionName(lga.regionId)}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600">
                      {formatNumber(lga.population)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium text-gray-900">{stats.userCount}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-medium text-gray-900">{stats.listingCount}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Badge variant="success">{stats.activeListings}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {stats.pendingListings > 0 ? (
                        <Badge variant="warning">{stats.pendingListings}</Badge>
                      ) : (
                        <span className="text-gray-400">0</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button
                        size="sm"
                        variant="ghost"
                        leftIcon={<Eye className="h-4 w-4" />}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredLgas.length === 0 && (
        <Card padding="lg" className="text-center">
          <MapPin className="h-12 w-12 text-gray-300 mx-auto" />
          <p className="text-gray-500 mt-4">No LGAs found</p>
        </Card>
      )}
    </div>
  );
}

export default LgasPage;
