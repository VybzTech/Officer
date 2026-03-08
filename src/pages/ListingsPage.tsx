import { useState, useMemo, useRef, useEffect } from "react";
import {
  Building2,
  Search,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  Clock,
  Ban
} from "lucide-react";
import Button from "@/components/ui/Button";
import { PermissionGate } from "@/components/guards";
import { cn } from "@/utils/cn";
import { mockDatabase } from "@/data/mockDatabase";
import { ListingsTable } from "../components/listings/ListingsTable";
import { ListingDetailModal } from "../components/listings/ListingDetailModal";
import { BigHeader } from "@/components/ui/Typography";
import { HubotH1 } from "@/components/ui/HubotText";

const MOCK_LISTINGS = mockDatabase.listings;

const FILTER_TABS = [
  { id: "all", label: "All Listings", icon: Filter },
  { id: "pending", label: "Pending", icon: Clock },
  { id: "approved", label: "Approved", icon: CheckCircle2 },
  { id: "rejected", label: "Rejected", icon: XCircle },
  { id: "suspended", label: "Suspended", icon: Ban },
];

export function ListingsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedListings, setSelectedListings] = useState<string[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<any>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  // Advanced Filters Dropdown
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(["all"]); // Status
  const [activeTierFilters, setActiveTierFilters] = useState<string[]>(["all"]); // Tiers
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFilterDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleAdvancedFilter = (id: string, type: 'status' | 'tier' = 'status') => {
    if (type === 'status') {
      setActiveFilters((prev) => {
        if (id === "all") return ["all"];
        const newFilters = prev.filter((f) => f !== "all");
        if (newFilters.includes(id)) {
          const result = newFilters.filter((f) => f !== id);
          return result.length === 0 ? ["all"] : result;
        } else {
          return [...newFilters, id];
        }
      });
    } else {
      setActiveTierFilters((prev) => {
        if (id === "all") return ["all"];
        const newFilters = prev.filter((f) => f !== "all");
        if (newFilters.includes(id)) {
          const result = newFilters.filter((f) => f !== id);
          return result.length === 0 ? ["all"] : result;
        } else {
          return [...newFilters, id];
        }
      });
    }
    setCurrentPage(1);
  };

  // Pagination states mock
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  const processedListings = useMemo(() => {
    let filtered = MOCK_LISTINGS.filter((listing) => {
      // First check tab if we mapped activeTab to filters
      // We will merge activeTab and activeFilters logically
      const currentFilters = activeFilters.includes("all") ? (activeTab !== "all" ? [activeTab] : ["all"]) : activeFilters;

      if (!currentFilters.includes("all") && !currentFilters.includes(listing.status?.toLowerCase())) {
        return false;
      }

      if (!activeTierFilters.includes("all") && !activeTierFilters.includes((listing as any).ownerTier?.toLowerCase())) {
        return false;
      }

      if (
        searchQuery &&
        !listing.title?.toLowerCase().includes(searchQuery?.toLowerCase()) &&
        !listing.address?.toLowerCase().includes(searchQuery?.toLowerCase()) &&
        !listing.ownerName?.toLowerCase().includes(searchQuery?.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        let aValue: any = a[sortConfig.key as keyof typeof a];
        let bValue: any = b[sortConfig.key as keyof typeof b];

        // Specific handling for region since it's mapped to lgaName/address sometimes
        if (sortConfig.key === 'region') {
          aValue = (a as any).lgaName || a.address || "";
          bValue = (b as any).lgaName || b.address || "";
        }

        aValue = aValue ?? "";
        bValue = bValue ?? "";

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [activeTab, searchQuery, sortConfig, activeFilters]);

  // Pagination slice
  const totalPages = Math.ceil(processedListings.length / itemsPerPage);
  const currentItems = processedListings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSelection = (id: string) => {
    setSelectedListings((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <div className="space-y-6 relative">
      {/* Page Header */}
      <div className="mb-10 flex justify-between items-center">
        <BigHeader >Listings Management</BigHeader>
        <PermissionGate permission="CREATE_OFFICIAL_LISTING">
          <Button
            iconSize={20}
            icon={Building2}
            className="bg-primary-500 flex items-center gap-2 text-gray-900 border-b-[5px] border-primary-700 active:border-b-0 active:translate-y-[5px] transition-all"
          >
            Add Official Listing
          </Button>
        </PermissionGate>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search listings by title, address, owner..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full h-12 rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-hubot"
          />
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-visible pb-2 lg:pb-0 relative">
          {/* Icon Tabs */}
          <div className="flex items-center gap-2 p-1 bg-gray-50 rounded-2xl border border-gray-200 flex-shrink-0">
            {FILTER_TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setCurrentPage(1); }}
                  title={tab.label}
                  className={cn(
                    "relative flex items-center justify-center h-10 w-12 rounded-xl text-gray-400 transition-all",
                    activeTab === tab.id
                      ? "bg-white text-primary-600 shadow-sm border border-gray-100"
                      : "hover:text-gray-600 hover:bg-gray-100",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </button>
              );
            })}
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className={cn(
                "h-12 w-12 rounded-2xl border flex items-center justify-center flex-shrink-0 bg-white transition-colors",
                isFilterDropdownOpen || !activeFilters.includes("all") || !activeTierFilters.includes("all")
                  ? "border-primary-500 text-primary-600 shadow-sm bg-primary-50"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm"
              )}
              title="Advanced Filters"
            >
              <Filter className="h-5 w-5" />
            </button>

            {/* Advance Filters Dropdown popover */}
            {isFilterDropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+0.5rem)] w-56 bg-white border border-gray-100 shadow-xl rounded-2xl p-2 z-[100] animate-fade-in max-h-96 overflow-y-auto">
                <div className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-50 mb-1">
                  Status
                </div>
                {FILTER_TABS.map((option) => (
                  <button
                    key={`adv-${option.id}`}
                    onClick={() => toggleAdvancedFilter(option.id, 'status')}
                    className="w-full text-left px-3 py-2 text-sm font-semibold rounded-xl flex items-center justify-between transition-colors hover:bg-gray-50"
                  >
                    <span className={activeFilters.includes(option.id) ? "text-primary-600" : "text-gray-600"}>
                      {option.label}
                    </span>
                    {activeFilters.includes(option.id) && (
                      <CheckCircle2 className="h-4 w-4 text-primary-500" />
                    )}
                  </button>
                ))}

                <div className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-50 mb-1 mt-2">
                  Owner Tier
                </div>
                {[
                  { id: "all", label: "All Tiers", className: "text-gray-600" },
                  { id: "free", label: "Free", className: "text-[#8B4513]" },
                  { id: "pro", label: "Pro", className: "text-[#d99a06]" },
                  { id: "premier", label: "Premier", className: "text-purple-700 font-bold" },
                  { id: "official", label: "Official", className: "bg-primary-500 text-black px-2 py-0.5 rounded-md font-bold" }
                ].map((option) => (
                  <button
                    key={`tier-${option.id}`}
                    onClick={() => toggleAdvancedFilter(option.id, 'tier')}
                    className="w-full text-left px-3 py-2 text-sm font-semibold rounded-xl flex items-center justify-between transition-colors hover:bg-gray-50"
                  >
                    <span className={activeTierFilters.includes(option.id) ? "text-primary-600" : option.className}>
                      {option.label}
                    </span>
                    {activeTierFilters.includes(option.id) && (
                      <CheckCircle2 className="h-4 w-4 text-primary-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedListings.length > 0 && (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary-50 border border-primary-200 shadow-sm animate-fade-in">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600">
            {selectedListings.length} listing(s) selected
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <PermissionGate permission="APPROVE_LISTING">
              <Button size="sm" className="bg-success text-white hover:bg-success-dark border-none">
                <CheckCircle2 className="h-4 w-4 mr-2" /> Approve
              </Button>
            </PermissionGate>
            <PermissionGate permission="REJECT_LISTING">
              <Button size="sm" className="bg-danger text-white hover:bg-danger-dark border-none">
                <XCircle className="h-4 w-4 mr-2" /> Reject
              </Button>
            </PermissionGate>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelectedListings([])}
              className="text-gray-500 hover:bg-gray-200"
            >
              Clear Selection
            </Button>
          </div>
        </div>
      )}

      {/* Main Table Content */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <ListingsTable
          listings={currentItems}
          selectedListings={selectedListings}
          onToggleSelection={toggleSelection}
          onViewDetails={setSelectedDetail}
          onApprove={(id: string) => console.log('Approve', id)}
          onReject={(id: string) => console.log('Reject', id)}
          onSuspend={(id: string) => console.log('Suspend', id)}
          onUnsuspend={(id: string) => console.log('Unsuspend', id)}
          onReinstate={(id: string) => console.log('Reinstate', id)}
          onDelete={(id: string) => console.log('Delete', id)}
          onFlagRisk={(id: string) => console.log('Flag', id)}
          onSort={handleSort}
          sortConfig={sortConfig}
        />

        {/* Pagination Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50/50">
          <p className="text-[11px] font-semibold text-gray-500">
            Showing <span className="font-bold text-gray-800">{currentItems.length}</span> of <span className="font-bold text-gray-800">{processedListings.length}</span> queries
          </p>
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-[11px] font-semibold text-gray-500 mx-2">
              Page <span className="font-bold text-gray-900">{currentPage}</span> of {Math.max(1, totalPages)}
            </span>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal Component */}
      <ListingDetailModal
        listing={selectedDetail}
        isOpen={!!selectedDetail}
        onClose={() => setSelectedDetail(null)}
      />
    </div>
  );
}
