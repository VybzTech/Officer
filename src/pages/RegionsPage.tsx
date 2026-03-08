import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Map,
  MapPin,
  Users,
  Home,
  Plus,
  Building2,
  RefreshCw,
  ChevronRight,
  Trash2,
  UserPlus,
  Move,
  Activity,
  MoreVertical,
  List,
  LayoutGrid
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useDataStore } from "@/stores/dataStore";
import { cn } from "@/utils/cn";
import { formatNumber } from "@/utils/format";
import Loader from "@/components/ui/Loader";
import { BigHeader } from "@/components/ui/Typography";
import toast from "react-hot-toast";
import { PermissionGate } from "@/components/guards";

export function RegionsPage() {
  const {
    regions,
    lgas,
    listings,
    users,
    isLoading,
    fetchRegions,
    fetchLgas,
    fetchListings,
    fetchUsers,
  } = useDataStore();

  useEffect(() => {
    fetchRegions();
    fetchLgas();
    fetchListings();
    fetchUsers();
  }, [fetchRegions, fetchLgas, fetchListings, fetchUsers]);

  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getRegionStats = (regionId: string) => {
    const regionLgas = lgas.filter((l) => l.regionId === regionId);
    const lgaIds = regionLgas.map((l) => l.id);
    const regionUsers = users.filter((u) => lgaIds.includes(u.lgaId as any));
    const regionListings = listings.filter((l) => lgaIds.includes(l.lgaId as any));

    return {
      lgaCount: regionLgas.length,
      userCount: regionUsers.length,
      listingCount: regionListings.length,
      activeListings: regionListings.filter(
        (l) => l.status === "ACTIVE" || l.status === "APPROVED",
      ).length,
      averageActiveUsers: regionUsers.length > 0 ? Math.floor(regionUsers.length * 0.42) : 0, // Mock metric
      totalPopulation: regionLgas.reduce((sum, l) => sum + l.population, 0),
    };
  };

  // Mock Handlers
  const handleAddRegion = () => toast.success("New Region drafting opened.");
  const handleDeleteRegion = (name: string) => {
    toast.success(`Region ${name} slated for deletion.`);
    setActiveMenu(null);
  };
  const handleAssignOfficer = (name: string) => {
    toast.success(`Assigning officer to ${name}...`);
    setActiveMenu(null);
  };
  const handleReassignLGA = (id: string) => {
    navigate(`/regions/${id}/reassign`);
  };
  const handleMonitorMetrics = (id: string) => {
    navigate(`/regions/${id}/info`);
  };

  const loading = isLoading.listings || isLoading.users;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <BigHeader useHubot subtitle="Lagos sector mapping, allocations and regional intelligence" className="text-3xl text-gray-900">
            Regional Control
          </BigHeader>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button onClick={() => setViewMode('grid')} className={cn("p-1.5 rounded-md transition-colors", viewMode === 'grid' ? "bg-white text-primary-600 shadow-sm" : "text-gray-400 hover:text-gray-600")}><LayoutGrid className="w-4 h-4" /></button>
            <button onClick={() => setViewMode('list')} className={cn("p-1.5 rounded-md transition-colors", viewMode === 'list' ? "bg-white text-primary-600 shadow-sm" : "text-gray-400 hover:text-gray-600")}><List className="w-4 h-4" /></button>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              fetchRegions();
              fetchLgas();
            }}
            className="border-gray-200 text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all"
            icon={RefreshCw}
          >
            Sync
          </Button>
          <PermissionGate permission="MANAGE_REGIONS">
            <Button
              onClick={handleAddRegion}
              className="bg-primary-500 text-gray-900 font-bold border-b-[4px] border-primary-700 active:border-b-0 active:translate-y-[4px] transition-all shadow-sm"
              icon={Plus}
            >
              Add Region
            </Button>
          </PermissionGate>
        </div>
      </div>

      {/* Dashboard Metrics (Rearranged) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase text-gray-500">Total Regions</p>
              <p className="text-3xl font-black font-hubot text-gray-900 mt-1">{regions.length}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
              <Map className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase text-gray-500">Total LGAs</p>
              <p className="text-3xl font-black font-hubot text-primary-600 mt-1">{lgas.length}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
              <MapPin className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase text-gray-500">Total Listings</p>
              <p className="text-3xl font-black font-hubot text-info mt-1">{listings.length}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-info/10 text-info">
              <Home className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase text-gray-500">Avg Active Users</p>
              <p className="text-3xl font-black font-hubot text-success mt-1">42%</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-success/10 text-success">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Regions Grid Display */}
      <div className={cn("grid gap-6", viewMode === 'grid' ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
        {regions.map((region) => {
          const stats = getRegionStats(region.id);
          const regionLgas = lgas.filter((l) => l.regionId === region.id);
          const isMenuOpen = activeMenu === region.id;

          return (
            <div key={region.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative pb-[76px]">

              <div className="p-6">
                {/* Card Header & Controls */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-primary-50 border border-primary-100 text-primary-600 shadow-inner">
                      <Map className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 font-hubot tracking-tight">
                        {region.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-gray-400">Sector {region.code}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenu(isMenuOpen ? null : region.id)}
                      className={cn(
                        "h-10 w-10 flex items-center justify-center rounded-xl transition-colors border",
                        isMenuOpen ? "bg-gray-100 border-gray-200 text-gray-900" : "bg-white border-transparent text-gray-400 hover:bg-gray-50 hover:border-gray-200 hover:text-gray-900"
                      )}
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>

                    {isMenuOpen && (
                      <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 shadow-xl rounded-2xl p-2 z-50 animate-fade-in">
                        <PermissionGate permission="MANAGE_REGIONS">
                          <button onClick={() => handleAssignOfficer(region.name)} className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl flex items-center gap-2">
                            <UserPlus className="h-4 w-4 text-gray-400" /> Assign Officer
                          </button>
                          <button onClick={() => handleReassignLGA(region.id)} className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl flex items-center gap-2">
                            <Move className="h-4 w-4 text-gray-400" /> Reassign LGA
                          </button>
                        </PermissionGate>
                        <button onClick={() => handleMonitorMetrics(region.id)} className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl flex items-center gap-2">
                          <Activity className="h-4 w-4 text-primary-500" /> Monitor Metrics
                        </button>
                        <PermissionGate permission="MANAGE_REGIONS">
                          <div className="h-px bg-gray-100 my-1"></div>
                          <button onClick={() => handleDeleteRegion(region.name)} className="w-full text-left px-3 py-2 text-sm font-bold text-danger hover:bg-danger/10 rounded-xl flex items-center gap-2">
                            <Trash2 className="h-4 w-4" /> Delete Region
                          </button>
                        </PermissionGate>
                      </div>
                    )}
                  </div>
                </div>

                {/* Micro Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center text-center">
                    <MapPin className="h-5 w-5 text-gray-400 mb-2" />
                    <p className="text-2xl font-black font-hubot text-gray-900 leading-none mb-1">{stats.lgaCount}</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">LGAs Attached</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center text-center">
                    <Users className="h-5 w-5 text-gray-400 mb-2" />
                    <p className="text-2xl font-black font-hubot text-gray-900 leading-none mb-1">{stats.userCount}</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Users Residing</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center text-center">
                    <Home className="h-5 w-5 text-gray-400 mb-2" />
                    <p className="text-2xl font-black font-hubot text-gray-900 leading-none mb-1">{stats.listingCount}</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Total Listings</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center text-center">
                    <Building2 className="h-5 w-5 text-gray-400 mb-2" />
                    <p className="text-2xl font-black font-hubot text-gray-900 leading-none mb-1">{formatNumber(stats.totalPopulation)}</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Population Map</p>
                  </div>
                </div>

                {/* LGAs Tags */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Contained LGAs</p>
                  <div className="flex flex-wrap gap-2">
                    {regionLgas.map((lga) => (
                      <span key={lga.id} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg border border-gray-200 shadow-sm">
                        {lga.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pin to bottom action */}
              <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-100 rounded-b-[32px] bg-gray-50/50">
                <Button
                  fullWidth
                  variant="ghost"
                  onClick={() => handleMonitorMetrics(region.id)}
                  className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 shadow-sm rounded-xl h-12 flex items-center justify-center gap-2"
                >
                  Regional Breakdown <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Click outside listener mockup */}
      {activeMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setActiveMenu(null)} />
      )}
    </div>
  );
}

export default RegionsPage;
