// ============================================
// URBAN GRAVITY - ADD LISTING MODAL
// Create official listings with Region/LGA selection
// ============================================

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  X,
  Building2,
  MapPin,
  Loader2,
  Upload,
  Plus,
  Trash2,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { LAGOS_LGAS } from "@/types";

// ==================== VALIDATION SCHEMA ====================
const listingSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  propertyType: z.enum([
    "APARTMENT",
    "HOUSE",
    "DUPLEX",
    "STUDIO",
    "OFFICE",
    "SHOP",
    "WAREHOUSE",
    "LAND",
  ]),
  listingType: z.enum(["RENT", "SALE", "SHORTLET"]),
  price: z.number().min(1, "Price is required"),
  bedrooms: z.number().nullable(),
  bathrooms: z.number().min(1, "At least 1 bathroom required"),
  size: z.number().min(1, "Size is required"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  lgaId: z.string().min(1, "LGA is required"),
  regionId: z.string().min(1, "Region is required"),
  amenities: z.array(z.string()),
});

type ListingFormData = z.infer<typeof listingSchema>;

// ==================== REGIONS DATA ====================
const LAGOS_REGIONS_DATA = [
  {
    id: "reg-001",
    name: "Lagos Island",
    lgas: ["Lagos Island", "Eti-Osa", "Ibeju-Lekki"],
  },
  {
    id: "reg-002",
    name: "Lagos Mainland",
    lgas: ["Lagos Mainland", "Surulere", "Yaba", "Mushin", "Oshodi-Isolo"],
  },
  {
    id: "reg-003",
    name: "Ikeja",
    lgas: ["Ikeja", "Kosofe", "Shomolu", "Agege", "Ifako-Ijaiye"],
  },
  { id: "reg-004", name: "Ikorodu", lgas: ["Ikorodu"] },
  {
    id: "reg-005",
    name: "Badagry",
    lgas: ["Badagry", "Ojo", "Amuwo-Odofin", "Ajeromi-Ifelodun", "Apapa"],
  },
  { id: "reg-006", name: "Epe", lgas: ["Epe"] },
  { id: "reg-007", name: "Alimosho", lgas: ["Alimosho"] },
];

const PROPERTY_TYPES = [
  { value: "APARTMENT", label: "Apartment" },
  { value: "HOUSE", label: "House" },
  { value: "DUPLEX", label: "Duplex" },
  { value: "STUDIO", label: "Studio" },
  { value: "OFFICE", label: "Office Space" },
  { value: "SHOP", label: "Shop" },
  { value: "WAREHOUSE", label: "Warehouse" },
  { value: "LAND", label: "Land" },
];

const LISTING_TYPES = [
  { value: "RENT", label: "For Rent" },
  { value: "SALE", label: "For Sale" },
  { value: "SHORTLET", label: "Shortlet" },
];

const AMENITIES = [
  "Swimming Pool",
  "Gym",
  "Security",
  "24/7 Power",
  "Water Supply",
  "Parking Space",
  "Serviced",
  "Elevator",
  "Air Conditioning",
  "Balcony",
  "Garden",
  "Boys Quarters",
  "CCTV",
  "Gated Community",
  "Waterfront",
];

// ==================== PROPS ====================
interface AddListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

// ==================== COMPONENT ====================
export function AddListingModal({
  isOpen,
  onClose,
  onSuccess,
}: AddListingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      bedrooms: null,
      amenities: [],
    },
  });

  const selectedRegion = watch("regionId");
  const selectedPropertyType = watch("propertyType");

  // Get LGAs for selected region
  const availableLgas =
    LAGOS_REGIONS_DATA.find((r) => r.id === selectedRegion)?.lgas ?? [];

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const onSubmit = async (data: ListingFormData) => {
    setIsSubmitting(true);

    try {
      // Include amenities and images
      const payload = {
        ...data,
        amenities: selectedAmenities,
        images,
      };

      console.log("Creating listing:", payload);

      // TODO: API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success
      reset();
      setSelectedAmenities([]);
      setImages([]);
      setStep(1);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Failed to create listing:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setSelectedAmenities([]);
    setImages([]);
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-xl bg-surface-raised border border-sidebar-border shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Add Official Listing
              </h2>
              <p className="text-sm text-gray-400">Step {step} of 3</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-sidebar-hover transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-sidebar-border">
          <div
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">
                  Basic Information
                </h3>

                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Property Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Luxury 4 Bedroom Duplex with Pool"
                    className={cn(
                      "w-full rounded-lg border bg-surface py-3 px-4 text-white",
                      "placeholder:text-gray-500 focus:outline-none focus:ring-2",
                      errors.title
                        ? "border-danger focus:border-danger focus:ring-danger/20"
                        : "border-sidebar-border focus:border-primary-500 focus:ring-primary-500/20",
                    )}
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-sm text-danger">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Property Type & Listing Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Property Type
                    </label>
                    <select
                      className="w-full rounded-lg border border-sidebar-border bg-surface py-3 px-4 text-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      {...register("propertyType")}
                    >
                      <option value="">Select type</option>
                      {PROPERTY_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.propertyType && (
                      <p className="text-sm text-danger">
                        {errors.propertyType.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Listing Type
                    </label>
                    <select
                      className="w-full rounded-lg border border-sidebar-border bg-surface py-3 px-4 text-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      {...register("listingType")}
                    >
                      <option value="">Select type</option>
                      {LISTING_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.listingType && (
                      <p className="text-sm text-danger">
                        {errors.listingType.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Price (₦)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 5000000"
                    className="w-full rounded-lg border border-sidebar-border bg-surface py-3 px-4 text-white placeholder:text-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    {...register("price", { valueAsNumber: true })}
                  />
                  {errors.price && (
                    <p className="text-sm text-danger">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                {/* Bedrooms, Bathrooms, Size */}
                <div className="grid grid-cols-3 gap-4">
                  {selectedPropertyType &&
                    !["OFFICE", "SHOP", "WAREHOUSE", "LAND"].includes(
                      selectedPropertyType,
                    ) && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                          Bedrooms
                        </label>
                        <input
                          type="number"
                          min="0"
                          className="w-full rounded-lg border border-sidebar-border bg-surface py-3 px-4 text-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                          {...register("bedrooms", { valueAsNumber: true })}
                        />
                      </div>
                    )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="w-full rounded-lg border border-sidebar-border bg-surface py-3 px-4 text-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      {...register("bathrooms", { valueAsNumber: true })}
                    />
                    {errors.bathrooms && (
                      <p className="text-sm text-danger">
                        {errors.bathrooms.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Size (m²)
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="w-full rounded-lg border border-sidebar-border bg-surface py-3 px-4 text-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      {...register("size", { valueAsNumber: true })}
                    />
                    {errors.size && (
                      <p className="text-sm text-danger">
                        {errors.size.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe the property in detail..."
                    className="w-full rounded-lg border border-sidebar-border bg-surface py-3 px-4 text-white placeholder:text-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-sm text-danger">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">
                  Location Details
                </h3>

                {/* Region Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Region
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {LAGOS_REGIONS_DATA.map((region) => (
                      <button
                        key={region.id}
                        type="button"
                        onClick={() => {
                          setValue("regionId", region.id);
                          setValue("lgaId", ""); // Reset LGA when region changes
                        }}
                        className={cn(
                          "p-4 rounded-lg border text-left transition-all",
                          selectedRegion === region.id
                            ? "border-primary-500 bg-primary-500/10 text-primary-400"
                            : "border-sidebar-border hover:border-primary-500/50 text-gray-300",
                        )}
                      >
                        <p className="font-medium">{region.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {region.lgas.length} LGAs
                        </p>
                      </button>
                    ))}
                  </div>
                  {errors.regionId && (
                    <p className="text-sm text-danger">
                      {errors.regionId.message}
                    </p>
                  )}
                </div>

                {/* LGA Selection */}
                {selectedRegion && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Local Government Area (LGA)
                    </label>
                    <select
                      className="w-full rounded-lg border border-sidebar-border bg-surface py-3 px-4 text-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      {...register("lgaId")}
                    >
                      <option value="">Select LGA</option>
                      {availableLgas.map((lga) => (
                        <option key={lga} value={lga}>
                          {lga}
                        </option>
                      ))}
                    </select>
                    {errors.lgaId && (
                      <p className="text-sm text-danger">
                        {errors.lgaId.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Full Address */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Full Address
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 12 Banana Island Road, Ikoyi"
                    className="w-full rounded-lg border border-sidebar-border bg-surface py-3 px-4 text-white placeholder:text-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    {...register("address")}
                  />
                  {errors.address && (
                    <p className="text-sm text-danger">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* Map Placeholder */}
                <div className="rounded-lg border border-sidebar-border bg-sidebar-hover h-48 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Map integration coming soon</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Amenities & Images */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">
                  Amenities & Images
                </h3>

                {/* Amenities */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Amenities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {AMENITIES.map((amenity) => (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm transition-colors",
                          selectedAmenities.includes(amenity)
                            ? "bg-primary-600 text-white"
                            : "bg-sidebar-hover text-gray-400 hover:text-white",
                        )}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Property Images
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-lg overflow-hidden bg-sidebar-hover"
                      >
                        <img
                          src={image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setImages(images.filter((_, i) => i !== index))
                          }
                          className="absolute top-2 right-2 p-1 rounded-full bg-danger text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}

                    {images.length < 6 && (
                      <button
                        type="button"
                        onClick={() =>
                          setImages([...images, "https://placehold.co/400x300"])
                        }
                        className="aspect-video rounded-lg border-2 border-dashed border-sidebar-border hover:border-primary-500 flex flex-col items-center justify-center text-gray-500 hover:text-primary-400 transition-colors"
                      >
                        <Upload className="h-6 w-6 mb-1" />
                        <span className="text-xs">Add Image</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Upload up to 6 images. First image will be the cover.
                  </p>
                </div>

                {/* Summary */}
                <div className="p-4 rounded-lg bg-sidebar-hover">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">
                    Listing Summary
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-400">
                      <span className="text-white">
                        {selectedAmenities.length}
                      </span>{" "}
                      amenities selected
                    </p>
                    <p className="text-gray-400">
                      <span className="text-white">{images.length}</span> images
                      added
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-sidebar-border">
            <div>
              {step > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              {step < 3 ? (
                <Button type="button" onClick={() => setStep(step + 1)}>
                  Continue
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Listing
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
