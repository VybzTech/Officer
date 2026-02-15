// ============================================
// URBAN GRAVITY - ADD OFFICIAL LISTING
// Create and manage official platform listings
// ============================================

import { useState, useEffect } from "react";
import {
  Building2,
  Plus,
  Image,
  MapPin,
  DollarSign,
  Home,
  Users,
  Zap,
  Upload,
  Save,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import Toggle from "@/components/ui/Toggle";
import { cn } from "@/utils/cn";
import Loader from "@/components/ui/Loader";

const LISTING_TYPES = [
  { id: "apartment", label: "Apartment", icon: Home },
  { id: "house", label: "House", icon: Building2 },
  { id: "duplex", label: "Duplex", icon: Home },
  { id: "studio", label: "Studio", icon: Home },
];

const AMENITIES = [
  "WiFi",
  "Parking",
  "Generator",
  "Swimming Pool",
  "Gym",
  "Security Gate",
  "Air Conditioning",
  "Balcony",
  "Kitchen Appliances",
  "Laundry",
];

const STEPS = ["Details", "Location", "Media", "Amenities", "Review"];

export function AddOfficialListingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("apartment");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    bedrooms: 2,
    bathrooms: 1,
    price: "",
    region: "reg-001",
    lga: "lga-001",
    address: "",
    amenities: [] as string[],
    images: [] as string[],
    featured: false,
  });

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(0);
      setFormData({
        title: "",
        description: "",
        bedrooms: 2,
        bathrooms: 1,
        price: "",
        region: "reg-001",
        lga: "lga-001",
        address: "",
        amenities: [],
        images: [],
        featured: false,
      });
    }, 2000);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Plus className="h-8 w-8 text-primary-500" />
          Add Official Listing
        </h1>
        <p className="text-gray-500 mt-1">
          Create and publish new listings on behalf of verified landlords
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {STEPS.map((step, idx) => (
          <div key={step} className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setCurrentStep(idx)}
              className={cn(
                "h-10 w-10 rounded-full font-bold text-sm transition-all",
                idx <= currentStep
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {idx + 1}
            </button>
            <span
              className={cn(
                "text-xs font-bold",
                idx <= currentStep ? "text-gray-900" : "text-gray-500"
              )}
            >
              {step}
            </span>
            {idx < STEPS.length - 1 && (
              <ArrowRight className="h-4 w-4 text-gray-300 mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Card padding="lg">
        {currentStep === 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Details</h2>

            <Input
              label="Listing Title"
              placeholder="e.g., Luxury 3BR with Garden in Lekki"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {LISTING_TYPES.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        "p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2",
                        selectedType === type.id
                          ? "border-primary-500 bg-primary-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-bold">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Bedrooms
                </label>
                <select
                  value={formData.bedrooms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bedrooms: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 outline-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} Bedroom{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Bathrooms
                </label>
                <select
                  value={formData.bathrooms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bathrooms: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 outline-none"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} Bathroom{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                placeholder="Detailed property description, features, and highlights..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 outline-none"
              />
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Location Details</h2>

            <Input
              label="Monthly Rent (₦)"
              icon={DollarSign}
              placeholder="e.g., 850000"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Region
                </label>
                <select
                  value={formData.region}
                  onChange={(e) =>
                    setFormData({ ...formData, region: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 outline-none"
                >
                  <option value="reg-001">Lagos Island</option>
                  <option value="reg-002">Lagos Mainland</option>
                  <option value="reg-003">Ikeja</option>
                  <option value="reg-004">Ikorodu</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  LGA
                </label>
                <select
                  value={formData.lga}
                  onChange={(e) =>
                    setFormData({ ...formData, lga: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 outline-none"
                >
                  <option value="lga-001">Agege</option>
                  <option value="lga-008">Eti-Osa</option>
                  <option value="lga-011">Ikeja</option>
                </select>
              </div>
            </div>

            <Input
              label="Street Address"
              icon={MapPin}
              placeholder="e.g., 23 Admiralty Way, Lekki"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Media</h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Image className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-900">
                Upload Property Images
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Min 4 images, Max 20. JPG, PNG supported
              </p>
              <Button className="mt-4" leftIcon={<Upload className="h-4 w-4" />}>
                Choose Files
              </Button>
            </div>

            <div>
              <label className="flex items-center gap-3">
                <Toggle checked={formData.featured} onChange={(c) => setFormData({ ...formData, featured: c })} />
                <span className="text-sm font-bold text-gray-900">
                  Feature this listing on homepage
                </span>
              </label>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AMENITIES.map((amenity) => (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={cn(
                    "p-3 rounded-lg border-2 transition-all font-bold text-sm",
                    selectedAmenities.includes(amenity)
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 bg-white text-gray-900 hover:border-gray-300"
                  )}
                >
                  {amenity}
                </button>
              ))}
            </div>

            <Card padding="md" className="bg-info-50 border-info-200">
              <div className="flex gap-3">
                <Zap className="h-5 w-5 text-info-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-info-700">
                  Listings with 8+ amenities have 45% higher engagement
                </p>
              </div>
            </Card>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Review Listing</h2>

            <div className="space-y-3 bg-gray-50 -mx-4 -my-4 p-6">
              <div>
                <p className="text-xs font-medium text-gray-500">TITLE</p>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  {formData.title || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">TYPE</p>
                <Badge className="mt-1 text-xs">
                  {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
                </Badge>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">BEDROOMS</p>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  {formData.bedrooms}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">MONTHLY RENT</p>
                <p className="text-sm font-bold text-primary-600 mt-1">
                  ₦{formData.price || "0"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">LOCATION</p>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  {formData.address || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">AMENITIES</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedAmenities.length > 0 ? (
                    selectedAmenities.map((a) => (
                      <Badge key={a} variant="outline" className="text-xs">
                        {a}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500">None selected</p>
                  )}
                </div>
              </div>
            </div>

            <Card padding="md" className="bg-success-50 border-success-200">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-success-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-success-700">
                  Ready to publish! This listing will be live immediately.
                </p>
              </div>
            </Card>
          </div>
        )}
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 0}
        >
          Previous
        </Button>

        {currentStep === STEPS.length - 1 ? (
          <Button
            variant="primary"
            loading={isLoading}
            onClick={handleSubmit}
            leftIcon={<Save className="h-4 w-4" />}
          >
            Publish Listing
          </Button>
        ) : (
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export default AddOfficialListingPage;