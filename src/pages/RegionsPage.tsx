// ============================================
// URBAN GRAVITY - REGIONS PAGE
// Manage Lagos regions and regional data
// ============================================

import { useEffect, useState } from "react";
import {
  Map,
  MapPin,
  Users,
  Home,
  TrendingUp,
  Building2,
  RefreshCw,
  ChevronRight,
  Eye,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useDataStore } from "@/stores/dataStore";
import { cn } from "@/utils/cn";
import { formatNumber } from "@/utils/format";
import Loader from "@/components/ui/Loader";

export function RegionsPage() {
  const { regions, lgas, listings, users, isLoading, fetchRegions, fetchLgas, fetchListings, fetchUsers } = useDataStore();

  useEffect(() => {
    fetchRegions();
    fetchLgas();
    fetchListings();
    fetchUsers();
  }, [fetchRegions, fetchLgas, fetchListings, fetchUsers]);

  const getRegionStats = (regionId: string) => {
    const regionLgas = lgas.filter((l) => l.regionId === regionId);
    const lgaIds = regionLgas.map((l) => l.id);
    const regionUsers = users.filter((u) => lgaIds.includes(u.lgaId));
    const regionListings = listings.filter((l) => lgaIds.includes(l.lgaId));

    return {
      lgaCount: regionLgas.length,
      userCount: regionUsers.length,
      listingCount: regionListings.length,
      activeListings: regionListings.filter((l) => l.status === "ACTIVE" || l.status === "APPROVED").length,
      totalPopulation: regionLgas.reduce((sum, l) => sum + l.population, 0),
    };
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
          <h1 className="text-2xl font-bold text-gray-900">Lagos Regions</h1>
          <p className="text-gray-500 mt-1">
            Overview of Lagos regions and their statistics
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            fetchRegions();
            fetchLgas();
          }}
          leftIcon={<RefreshCw className="h-4 w-4" />}
        >
          Refresh
        </Button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Regions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{regions.length}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              <Map className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total LGAs</p>
              <p className="text-2xl font-bold text-primary-600 mt-1">{lgas.length}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              <MapPin className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-success mt-1">{users.length}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Listings</p>
              <p className="text-2xl font-bold text-info mt-1">{listings.length}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-info/10 text-info">
              <Home className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Regions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regions.map((region) => {
          const stats = getRegionStats(region.id);
          const regionLgas = lgas.filter((l) => l.regionId === region.id);

          return (
            <Card key={region.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                      <Map className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{region.name}</h3>
                      <Badge variant="default">{region.code}</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-xs">LGAs</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{stats.lgaCount}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Users className="h-4 w-4" />
                      <span className="text-xs">Users</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{stats.userCount}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Home className="h-4 w-4" />
                      <span className="text-xs">Listings</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{stats.listingCount}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Building2 className="h-4 w-4" />
                      <span className="text-xs">Population</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{formatNumber(stats.totalPopulation)}</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-500 mb-2">Local Government Areas:</p>
                  <div className="flex flex-wrap gap-1">
                    {regionLgas.map((lga) => (
                      <Badge key={lga.id} variant="default" className="text-xs">
                        {lga.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4"
                  rightIcon={<ChevronRight className="h-4 w-4" />}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default RegionsPage;
