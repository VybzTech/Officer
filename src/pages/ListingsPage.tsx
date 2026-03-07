import { useState, useMemo } from "react";
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
      if (activeTab !== "all" && listing.status.toLowerCase() !== activeTab) {
        return false;
      }
      if (
        searchQuery &&
        !listing.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !listing.address.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !listing.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [activeTab, searchQuery, sortConfig]);

  // Pagination slice
  const totalPages = Math.ceil(processedListings.length / itemsPerPage);
  const currentItems = processedListings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSelection = (id: string) => {
    setSelectedListings((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleApprove = (id: string) => {
    console.log("Approving listing:", id);
    // API call mock implementation internally
  };

  const handleReject = (id: string) => {
    console.log("Rejecting listing:", id);
  };

  const handleSuspend = (id: string) => {
    console.log("Suspending listing:", id);
  };

  const handleFlagRisk = (id: string) => {
    console.log("Flagging risk:", id);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BigHeader useHubot className="text-3xl">Listings Management</BigHeader>

      <PermissionGate permission="CREATE_OFFICIAL_LISTING">
        <Button
          iconSize={20}
          icon={Building2}
          className="bg-primary-500 flex items-center gap-2 text-gray-900 border-b-[5px] border-primary-700 active:border-b-0 active:translate-y-[5px] transition-all"
        >
          Add Official Listing
        </Button>
      </PermissionGate>

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
            className="w-full h-12 rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
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

          <button
            className="h-12 w-12 rounded-2xl border border-gray-200 flex items-center justify-center flex-shrink-0 bg-white hover:bg-gray-50 text-gray-600 shadow-sm transition-colors"
            title="Advanced Filters"
          >
            <Filter className="h-5 w-5" />
          </button>
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
              <Button size="sm" className="bg-success text-white hover:bg-success-dark">
                <CheckCircle2 className="h-4 w-4 mr-2" /> Approve
              </Button>
            </PermissionGate>
            <PermissionGate permission="REJECT_LISTING">
              <Button size="sm" className="bg-danger text-white hover:bg-danger-dark">
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
          onApprove={handleApprove}
          onReject={handleReject}
          onSuspend={handleSuspend}
          onFlagRisk={handleFlagRisk}
          onSort={handleSort}
          sortConfig={sortConfig}
        />

        {/* Pagination Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Showing {currentItems.length} of {processedListings.length} queries
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="w-10 p-0 flex justify-center border-gray-200 text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="h-9 w-9 flex items-center justify-center text-xs font-bold text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm">
              {currentPage}
            </span>
            <span className="text-xs font-semibold text-gray-400">of {Math.max(1, totalPages)}</span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="w-10 p-0 flex justify-center border-gray-200 text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
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
