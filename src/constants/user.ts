import type { TierLevel } from "@/types/enums";

export const TIER_CONFIG: Record<TierLevel, {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  price: { monthly: number; yearly: number };
  features: string[];
}> = {
  FREE: {
    name: "Free",
    icon: "🏠",
    color: "#96705B",
    bgColor: "#96705B15",
    price: { monthly: 0, yearly: 0 },
    features: [
      "10 daily swipes",
      "Basic property search",
      "Limited filters",
      "Email support",
    ],
  },
  PRO: {
    name: "Pro",
    icon: "⭐",
    color: "#FFD43B",
    bgColor: "#FFD43B20",
    price: { monthly: 4950, yearly: 49500 },
    features: [
      "50 daily swipes",
      "Advanced filters",
      "View who liked you",
      "Priority support",
      "Boost properties",
      "Verified badge",
    ],
  },
  PREMIUM: {
    name: "Premium",
    icon: "💎",
    color: "#6665DD",
    bgColor: "#6665DD15",
    price: { monthly: 38250, yearly: 382500 },
    features: [
      "Unlimited swipes",
      "All Pro features",
      "Dedicated support",
      "Top placement",
      "Advanced analytics",
      "Priority matching",
    ],
  },
};

export const TIER_LIMITS = {
  TENANT: {
    FREE: { dailySwipes: 10, canViewLikes: false, canViewFavorites: true, canViewTopPicks: false, canBoost: false, canMessage: true, canSeeWhoLikedYou: false },
    PRO: { dailySwipes: 50, canViewLikes: true, canViewFavorites: true, canViewTopPicks: true, canBoost: true, canMessage: true, canSeeWhoLikedYou: true },
    PREMIUM: { dailySwipes: 999, canViewLikes: true, canViewFavorites: true, canViewTopPicks: true, canBoost: true, canMessage: true, canSeeWhoLikedYou: true },
  },
  LANDLORD: {
    FREE: { dailySwipes: 10, canViewFullProfiles: false, canViewDetailedLikes: false, canBoost: false, maxActiveListings: 2, canUpdateListingUnlimited: false },
    PRO: { dailySwipes: 50, canViewFullProfiles: true, canViewDetailedLikes: true, canBoost: true, maxActiveListings: 10, canUpdateListingUnlimited: true },
    PREMIUM: { dailySwipes: 999, canViewFullProfiles: true, canViewDetailedLikes: true, canBoost: true, maxActiveListings: 999, canUpdateListingUnlimited: true },
  },
} as const;

export const AMENITIES = [
  "WiFi", "Gym", "Parking", "Security", "Pool", "Garden",
  "Laundry", "AC", "Elevator", "Generator", "Water Supply",
  "CCTV", "Playground", "Balcony", "Storage",
] as const;

export const LAGOS_AREAS = [
  "Lekki", "Victoria Island", "Ikoyi", "Ajah", "Yaba",
  "Surulere", "Ikeja", "Maryland", "Gbagada", "Magodo",
  "Ogba", "Berger", "Ikorodu", "Oshodi", "Festac",
] as const;

export const BUILDING_TYPES = [
  "Apartment", "Flat", "Duplex", "Bungalow", "Terrace",
  "Semi-Detached", "Detached", "Studio", "Penthouse", "Mini Flat",
] as const;
