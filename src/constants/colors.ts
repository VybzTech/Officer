export const COLORS = {
  // Primary Brand Colors
  primary: "#FFCA08",
  primaryDark: "#E6BF22",
  primaryLight: "#FFE066",
  primaryLighter: "#FFED99",
  primaryPale: "#FFF7D650",
  mustard: "#f4c03dff",

  // Semantic Colors
  secondary: "#1A1A1A",
  accent: "#FF6B35",
  success: "#4CAF50",
  warning: "#FF9800",
  error: "#F44336",
  info: "#2196F3",
  brownFade: "#96705B99",
  brown: "#96705B",

  // Neutral/UI Colors
  background: "#FFFFFF",
  backgroundSecondary: "#F5F5F5",
  backgroundTertiary: "#FAFAFA",
  surface: "#FFFFFF",
  surfaceElevated: "#FAFAFA",

  // Text Colors
  text: "#1A1A1A",
  textSecondary: "#666666",
  textTertiary: "#999999",
  textDisabled: "#CCCCCC",
  textOnPrimary: "#1A1A1A", // Dark text on yellow background
  textOnDark: "#FFFFFF",

  // Border Colors
  border: "#E0E0E0",
  borderLight: "#F0F0F0",
  divider: "#EEEEEE",

  // Status Colors for Tiers
  tier: {
    unverified: "#999999",
    verified: "#4CAF50",
    pro: "#FFD43B",
    premium: "#FF6B35",
  },

  // User Based
  user: {
    male: "#2196F3",
    female: "#ff3f75ff",
  },

  // Property Status
  propertyStatus: {
    active: "#4CAF50",
    inactive: "#999999",
    rented: "#2196F3",
    archived: "#757575",
  },

  // Swipe Actions
  swipe: {
    like: "#4CAF50",
    dislike: "#F44336",
    favorite: "#FFD43B",
  },

  // Dark Mode
  dark: {
    background: "#121212",
    backgroundSecondary: "#1E1E1E",
    surface: "#1E1E1E",
    text: "#FFFFFF",
    textSecondary: "#B3B3B3",
    border: "#333333",
  },
} as const;