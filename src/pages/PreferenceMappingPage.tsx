// ============================================
// URBAN GRAVITY - PREFERENCE MAPPING
// Tenant preference analysis and visualization
// ============================================

import { useState, useEffect } from "react";
import {
  MapPin,
  Users,
  Home,
  Zap,
  Search,
  Filter,
  TrendingUp,
  BarChart3,
  Heart,
  Briefcase,
  DollarSign,
  Grid3x3,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";
import Loader from "@/components/ui/Loader";

const PREFERENCE_SEGMENTS = [
  {
    id: "seg-001",
    name: "Budget-Conscious Professionals",
    size: 342,
    avgBudget: "₦450,000-₦650,000",
    topPreferences: ["Ikeja", "Lekki", "Surulere"],
    propertyTypes: ["2BR Apartment", "3BR Bungalow"],
    amenities: ["WiFi", "Generator", "Parking"],
    demandTrend: "+12%",
  },
  {
    id: "seg-002",
    name: "Young Professionals (Premium)",
    size: 284,
    avgBudget: "₦1,000,000-₦1,800,000",
    topPreferences: ["Victoria Island", "Lekki Phase 1", "Ikoyi"],
    propertyTypes: ["Luxury Apartment", "Penthouse"],
    amenities: ["Swimming Pool", "Gym", "Concierge"],
    demandTrend: "+28%",
  },
  {
    id: "seg-003",
    name: "Family-Oriented",
    size: 456,
    avgBudget: "₦750,000-₦1,200,000",
    topPreferences: ["Lekki", "Ikorodu", "Ajah"],
    propertyTypes: ["4BR House", "Duplex"],
    amenities: ["School nearby", "Park", "Security"],
    demandTrend: "+8%",
  },
  {
    id: "seg-004",
    name: "Business Owners & Executives",
    size: 178,
    avgBudget: "₦2,000,000+",
    topPreferences: ["VI", "Ikoyi", "Banana Island"],
    propertyTypes: ["Executive Penthouse", "Villa"],
    amenities: ["Helipad", "Wine Cellar", "Home Theater"],
    demandTrend: "+35%",
  },
];

const PROPERTY_PREFERENCES = [
  { type: "2BR Apartment", demand: 89, percentage: "28%" },
  { type: "3BR House", demand: 76, percentage: "24%" },
  { type: "1BR Studio", demand: 62, percentage: "19%" },
  { type: "Luxury Apartment", demand: 54, percentage: "17%" },
  { type: "Penthouse", demand: 38, percentage: "12%" },
];

const AMENITY_DEMAND = [
  { name: "WiFi/Internet", demand: 94 },
  { name: "Parking", demand: 89 },
  { name: "Generator", demand: 87 },
  { name: "Swimming Pool", demand: 71 },
  { name: "Gym/Fitness", demand: 68 },
  { name: "Security Gate", demand: 92 },
  { name: "Balcony/Terrace", demand: 64 },
  { name: "Kitchen Appliances", demand: 78 },
];

const LGA_DEMAND = [
  { lga: "Lekki (Eti-Osa)", demand: 96, population: "2,847" },
  { lga: "Victoria Island (Lagos Island)", demand: 88, population: "1,924" },
  { lga: "Ikeja", demand: 74, population: "1,642" },
  { lga: "Surulere", demand: 61, population: "892" },
  { lga: "Ikorodu", demand: 58, population: "756" },
  { lga: "Ajah (Ibeju-Lekki)", demand: 67, population: "1,204" },
  { lga: "Mushin", demand: 42, population: "534" },
  { lga: "Badagry", demand: 28, population: "267" },
];

export function PreferenceMappingPage() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"segments" | "lgas" | "amenities">("segments");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

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
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="h-8 w-8 text-primary-500" />
          Preference Mapping
        </h1>
        <p className="text-gray-500 mt-1">
          Analyze tenant preferences, demand patterns, and market segmentation
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Preferences Tracked", value: "1,260", icon: Heart },
          { label: "Segments Identified", value: "4", icon: Grid3x3 },
          { label: "Top LGA", value: "Lekki", icon: MapPin },
          { label: "Avg Budget", value: "₦1.2M", icon: DollarSign },
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

      {/* View Mode Selector */}
      <div className="flex items-center gap-2">
        {[
          { id: "segments", label: "Segments" },
          { id: "lgas", label: "LGA Demand" },
          { id: "amenities", label: "Amenities" },
        ].map((mode) => (
          <Button
            key={mode.id}
            variant={viewMode === mode.id ? "primary" : "outline"}
            size="sm"
            onClick={() => setViewMode(mode.id as typeof viewMode)}
          >
            {mode.label}
          </Button>
        ))}
      </div>

      {/* SEGMENTS VIEW */}
      {viewMode === "segments" && (
        <div className="space-y-4">
          {PREFERENCE_SEGMENTS.map((segment) => (
            <Card
              key={segment.id}
              padding="md"
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                selectedSegment === segment.id && "ring-2 ring-primary-500"
              )}
              onClick={() =>
                setSelectedSegment(
                  selectedSegment === segment.id ? null : segment.id
                )
              }
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {segment.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge variant="outline">{segment.size} Users</Badge>
                      <Badge variant="success">{segment.demandTrend}</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-50 -mx-4 px-4 py-3 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">AVG BUDGET</p>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      {segment.avgBudget}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">TOP LGAS</p>
                    <p className="text-xs font-bold text-gray-700 mt-1">
                      {segment.topPreferences.slice(0, 2).join(", ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">PROPERTY TYPES</p>
                    <p className="text-xs font-bold text-gray-700 mt-1">
                      {segment.propertyTypes[0]}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">TOP AMENITY</p>
                    <p className="text-xs font-bold text-gray-700 mt-1">
                      {segment.amenities[0]}
                    </p>
                  </div>
                </div>

                {selectedSegment === segment.id && (
                  <div className="pt-3 border-t border-gray-100 space-y-3 animate-fade-in">
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-2">
                        ALL PREFERENCES
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          ...segment.topPreferences,
                          ...segment.propertyTypes,
                          ...segment.amenities,
                        ].map((pref, idx) => (
                          <Badge key={idx} variant="default" className="text-xs">
                            {pref}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="primary" size="sm" className="flex-1">
                        View Analytics
                      </Button>
                      <Button variant="outline" size="sm">
                        Target Campaign
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* LGA DEMAND VIEW */}
      {viewMode === "lgas" && (
        <div className="space-y-4">
          <Card padding="md">
            <div className="space-y-3">
              {LGA_DEMAND.map((lga) => (
                <div key={lga.lga} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-gray-900">{lga.lga}</h4>
                      <span className="text-sm font-bold text-primary-600">
                        {lga.demand}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary-400 to-primary-600 h-full rounded-full"
                        style={{ width: `${lga.demand}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {lga.population} active listings
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* AMENITIES VIEW */}
      {viewMode === "amenities" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AMENITY_DEMAND.map((amenity) => (
            <Card key={amenity.name} padding="md">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900">{amenity.name}</h4>
                  <span className="text-sm font-bold text-primary-600">
                    {amenity.demand}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      amenity.demand >= 80
                        ? "bg-success-500"
                        : amenity.demand >= 60
                          ? "bg-primary-500"
                          : "bg-warning-500"
                    )}
                    style={{ width: `${amenity.demand}%` }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Insights Banner */}
      <Card padding="md" className="bg-info-50 border-info-200">
        <div className="flex gap-3">
          <BarChart3 className="h-5 w-5 text-info-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-info-900">Segment Insights</p>
            <p className="text-sm text-info-700 mt-1">
              Young Professionals segment shows highest growth at 28% week-over-week.
              Consider expanding luxury apartment listings in Lekki Phase 1 and VI.
              Bundle amenities with WiFi + Parking for 94% tenant satisfaction.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PreferenceMappingPage;