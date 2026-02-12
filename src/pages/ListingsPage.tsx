// ============================================
// URBAN GRAVITY - LISTINGS PAGE
// Manage property listings
// ============================================

import { useState } from "react";
import {
  Building2,
  Search,
  Filter,
  MoreVertical,
  Eye,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MapPin,
  Bed,
  Bath,
  Square,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, StatusBadge, TierBadge } from "@/components/ui/Badge";
import { PermissionGate, SecureAction } from "@/components/guards";
import { cn } from "@/utils/cn";
import { formatNaira, formatRelativeTime } from "@/utils/format";
import type { ListingStatus, ListingType, PropertyType } from "@/types";

// Mock data
const MOCK_LISTINGS = [
  {
    id: "1",
    title: "Luxury 4 Bedroom Duplex with Pool",
    propertyType: "DUPLEX" as PropertyType,
    listingType: "RENT" as ListingType,
    status: "PENDING" as ListingStatus,
    price: 5000000,
    bedrooms: 4,
    bathrooms: 5,
    size: 450,
    address: "12 Banana Island Road, Ikoyi",
    lgaName: "Eti-Osa",
    ownerName: "Adebayo Properties Ltd",
    ownerType: "LANDLORD" as const,
    ownerTier: "PREMIER" as const,
    images: ["https://placehold.co/400x300"],
    isVerified: false,
    createdAt: "2024-02-10T10:00:00Z",
  },
  {
    id: "2",
    title: "3 Bedroom Apartment with BQ",
    propertyType: "APARTMENT" as PropertyType,
    listingType: "RENT" as ListingType,
    status: "APPROVED" as ListingStatus,
    price: 2500000,
    bedrooms: 3,
    bathrooms: 3,
    size: 250,
    address: "45 Admiralty Way, Lekki Phase 1",
    lgaName: "Eti-Osa",
    ownerName: "Lagos Homes Agency",
    ownerType: "AGENT" as const,
    ownerTier: "PRO" as const,
    images: ["https://placehold.co/400x300"],
    isVerified: true,
    createdAt: "2024-02-09T14:30:00Z",
  },
  {
    id: "3",
    title: "Self-Contained Studio Apartment",
    propertyType: "STUDIO" as PropertyType,
    listingType: "RENT" as ListingType,
    status: "PENDING" as ListingStatus,
    price: 500000,
    bedrooms: 1,
    bathrooms: 1,
    size: 45,
    address: "8 Herbert Macaulay Way, Yaba",
    lgaName: "Yaba",
    ownerName: "John Okoro",
    ownerType: "LANDLORD" as const,
    ownerTier: "FREE" as const,
    images: ["https://placehold.co/400x300"],
    isVerified: false,
    createdAt: "2024-02-08T09:15:00Z",
  },
  {
    id: "4",
    title: "5 Bedroom Detached House",
    propertyType: "HOUSE" as PropertyType,
    listingType: "SALE" as ListingType,
    status: "REJECTED" as ListingStatus,
    price: 150000000,
    bedrooms: 5,
    bathrooms: 6,
    size: 600,
    address: "23 Osborne Road, Ikoyi",
    lgaName: "Eti-Osa",
    ownerName: "Premium Estates",
    ownerType: "AGENT" as const,
    ownerTier: "PREMIER" as const,
    images: ["https://placehold.co/400x300"],
    isVerified: true,
    createdAt: "2024-02-07T16:45:00Z",
  },
  {
    id: "5",
    title: "Commercial Office Space",
    propertyType: "OFFICE" as PropertyType,
    listingType: "RENT" as ListingType,
    status: "SUSPENDED" as ListingStatus,
    price: 8000000,
    bedrooms: null,
    bathrooms: 2,
    size: 300,
    address: "Plot 15, Adeola Odeku Street, VI",
    lgaName: "Lagos Island",
    ownerName: "Commercial Props Ltd",
    ownerType: "LANDLORD" as const,
    ownerTier: "PRO" as const,
    images: ["https://placehold.co/400x300"],
    isVerified: true,
    createdAt: "2024-02-06T11:20:00Z",
  },
];

const FILTER_TABS = [
  { id: "all", label: "All Listings", count: 2847 },
  { id: "pending", label: "Pending", count: 47 },
  { id: "approved", label: "Approved", count: 2650 },
  { id: "rejected", label: "Rejected", count: 89 },
  { id: "suspended", label: "Suspended", count: 61 },
];

export function ListingsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedListings, setSelectedListings] = useState<string[]>([]);

  const filteredListings = MOCK_LISTINGS.filter((listing) => {
    if (activeTab !== "all" && listing.status.toLowerCase() !== activeTab) {
      return false;
    }
    if (
      searchQuery &&
      !listing.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const toggleSelection = (id: string) => {
    setSelectedListings((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleApprove = (id: string) => {
    console.log("Approving listing:", id);
    // TODO: API call
  };

  const handleReject = (id: string) => {
    console.log("Rejecting listing:", id);
    // TODO: API call
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Listings</h1>
          <p className="text-gray-400 mt-1">
            Manage and moderate property listings
          </p>
        </div>
        <PermissionGate permission="CREATE_OFFICIAL_LISTING">
          <Button leftIcon={<Building2 className="h-4 w-4" />}>
            Add Official Listing
          </Button>
        </PermissionGate>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 rounded-lg border border-sidebar-border bg-surface-raised pl-10 pr-4 text-white placeholder:text-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        {/* Filter Button */}
        <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
          Filters
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              activeTab === tab.id
                ? "bg-primary-600 text-white"
                : "bg-sidebar-hover text-gray-400 hover:text-white",
            )}
          >
            {tab.label}
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-xs",
                activeTab === tab.id ? "bg-white/20" : "bg-sidebar-border",
              )}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedListings.length > 0 && (
        <div className="flex items-center gap-4 p-4 rounded-lg bg-primary-500/10 border border-primary-500/20">
          <span className="text-sm text-primary-400">
            {selectedListings.length} listing(s) selected
          </span>
          <div className="flex items-center gap-2">
            <PermissionGate permission="APPROVE_LISTING">
              <Button size="sm" variant="success">
                Approve Selected
              </Button>
            </PermissionGate>
            <PermissionGate permission="REJECT_LISTING">
              <Button size="sm" variant="danger">
                Reject Selected
              </Button>
            </PermissionGate>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelectedListings([])}
            >
              Clear Selection
            </Button>
          </div>
        </div>
      )}

      {/* Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredListings.map((listing) => (
          <Card key={listing.id} padding="none" className="overflow-hidden">
            {/* Image */}
            <div className="relative h-48 bg-sidebar-hover">
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <StatusBadge status={listing.status} />
                {listing.isVerified && (
                  <Badge variant="success" size="sm">
                    Verified
                  </Badge>
                )}
              </div>
              <div className="absolute top-3 right-3">
                <input
                  type="checkbox"
                  checked={selectedListings.includes(listing.id)}
                  onChange={() => toggleSelection(listing.id)}
                  className="h-5 w-5 rounded border-2 border-white/50 bg-black/30 text-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="absolute bottom-3 left-3">
                <Badge variant="primary" size="sm">
                  {listing.listingType === "RENT" ? "For Rent" : "For Sale"}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Title & Price */}
                <div>
                  <h3 className="font-semibold text-white line-clamp-1">
                    {listing.title}
                  </h3>
                  <p className="text-lg font-bold text-primary-400 mt-1">
                    {formatNaira(listing.price)}
                    {listing.listingType === "RENT" && (
                      <span className="text-sm text-gray-500">/year</span>
                    )}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="line-clamp-1">{listing.address}</span>
                </div>

                {/* Features */}
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  {listing.bedrooms && (
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      {listing.bedrooms}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    {listing.bathrooms}
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    {listing.size}m²
                  </div>
                </div>

                {/* Owner Info */}
                <div className="flex items-center justify-between pt-3 border-t border-sidebar-border">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-sidebar-hover flex items-center justify-center text-xs font-medium text-gray-400">
                      {listing.ownerName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm text-white">{listing.ownerName}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">
                          {listing.ownerType}
                        </span>
                        <TierBadge tier={listing.ownerTier} />
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatRelativeTime(listing.createdAt)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>

                  {listing.status === "PENDING" && (
                    <>
                      <PermissionGate permission="APPROVE_LISTING">
                        <Button
                          variant="success"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleApprove(listing.id)}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </PermissionGate>
                      <PermissionGate permission="REJECT_LISTING">
                        <Button
                          variant="danger"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleReject(listing.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </PermissionGate>
                    </>
                  )}

                  {listing.status === "APPROVED" && (
                    <PermissionGate permission="SUSPEND_LISTING">
                      <Button variant="outline" size="sm" className="flex-1">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Suspend
                      </Button>
                    </PermissionGate>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          Showing {filteredListings.length} of {MOCK_LISTINGS.length} listings
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="px-3 py-1 text-sm text-white bg-primary-600 rounded-lg">
            1
          </span>
          <Button variant="ghost" size="sm">
            2
          </Button>
          <Button variant="ghost" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
