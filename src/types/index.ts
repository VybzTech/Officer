// ============================================
// URBAN GRAVITY OFFICER DASHBOARD - TYPE DEFINITIONS
// ============================================

import type { LucideIcon } from "lucide-react";

// ==================== NAVIGATION TYPES ====================
export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  permission?: Permission;
  permissions?: Permission[];
  badge?: string | number;
  isNew?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
  permission?: Permission;
}


// ==================== ROLES ====================
export type Role = 'SUPER_ADMIN' | 'OFFICER' | 'REGIONAL_OFFICER' | 'SUPPORT';

export const ROLE_HIERARCHY: Record<Role, number> = {
  SUPER_ADMIN: 100,
  OFFICER: 75,
  REGIONAL_OFFICER: 50,
  SUPPORT: 25,
} as const;

// ==================== PERMISSIONS ====================
export type Permission =
  // Overview
  | 'VIEW_DASHBOARD'
  | 'VIEW_REGIONAL_METRICS'
  | 'VIEW_AI_INSIGHTS'

  // Market Management
  | 'VIEW_LISTINGS'
  | 'APPROVE_LISTING'
  | 'REJECT_LISTING'
  | 'SUSPEND_LISTING'
  | 'CREATE_OFFICIAL_LISTING'
  | 'VIEW_LANDLORDS'
  | 'VIEW_TENANTS'
  | 'VIEW_AGENTS'
  | 'SUSPEND_USER'
  | 'UNSUSPEND_USER'
  | 'DELETE_USER'

  // Moderation & Control
  | 'VIEW_VERIFICATION_REQUESTS'
  | 'APPROVE_VERIFICATION'
  | 'REJECT_VERIFICATION'
  | 'VIEW_SUBSCRIPTION_UPGRADES'
  | 'APPROVE_SUBSCRIPTION_UPGRADE'
  | 'REJECT_SUBSCRIPTION_UPGRADE'
  | 'VIEW_DISPUTES'
  | 'RESOLVE_DISPUTE'
  | 'VIEW_REPORTS'
  | 'RESOLVE_REPORT'

  // Financial Control
  | 'VIEW_ESCROW'
  | 'RELEASE_ESCROW'
  | 'HOLD_ESCROW'
  | 'REFUND_ESCROW'
  | 'VIEW_TRANSACTIONS'
  | 'APPROVE_PAYOUT'
  | 'REJECT_PAYOUT'

  // Regional Control
  | 'VIEW_REGIONS'
  | 'MANAGE_REGIONS'
  | 'VIEW_LGAS'
  | 'MANAGE_LGAS'
  | 'VIEW_LGA_ACTIVITY'

  // System Observability
  | 'VIEW_API_LOGS'
  | 'VIEW_AUDIT_LOGS'
  | 'VIEW_ACTIVITY_LOGS'
  | 'VIEW_ERROR_LOGS'

  // Platform Configuration
  | 'VIEW_APP_CONFIG'
  | 'MANAGE_APP_CONFIG'
  | 'VIEW_TIER_SETTINGS'
  | 'MANAGE_TIER_SETTINGS'
  | 'VIEW_ROLE_MATRIX'
  | 'MANAGE_ROLE_MATRIX'
  | 'VIEW_FEATURE_FLAGS'
  | 'MANAGE_FEATURE_FLAGS'

  // Account
  | 'VIEW_PROFILE'
  | 'UPDATE_PROFILE'
  | 'MANAGE_2FA'
  | 'VIEW_SESSIONS'
  | 'TERMINATE_SESSIONS';

// Permission mapping per role
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_ADMIN: [
    // Has ALL permissions
    'VIEW_DASHBOARD', 'VIEW_REGIONAL_METRICS', 'VIEW_AI_INSIGHTS',
    'VIEW_LISTINGS', 'APPROVE_LISTING', 'REJECT_LISTING', 'SUSPEND_LISTING', 'CREATE_OFFICIAL_LISTING',
    'VIEW_LANDLORDS', 'VIEW_TENANTS', 'VIEW_AGENTS', 'SUSPEND_USER', 'UNSUSPEND_USER', 'DELETE_USER',
    'VIEW_VERIFICATION_REQUESTS', 'APPROVE_VERIFICATION', 'REJECT_VERIFICATION',
    'VIEW_SUBSCRIPTION_UPGRADES', 'APPROVE_SUBSCRIPTION_UPGRADE', 'REJECT_SUBSCRIPTION_UPGRADE',
    'VIEW_DISPUTES', 'RESOLVE_DISPUTE', 'VIEW_REPORTS', 'RESOLVE_REPORT',
    'VIEW_ESCROW', 'RELEASE_ESCROW', 'HOLD_ESCROW', 'REFUND_ESCROW',
    'VIEW_TRANSACTIONS', 'APPROVE_PAYOUT', 'REJECT_PAYOUT',
    'VIEW_REGIONS', 'MANAGE_REGIONS', 'VIEW_LGAS', 'MANAGE_LGAS', 'VIEW_LGA_ACTIVITY',
    'VIEW_API_LOGS', 'VIEW_AUDIT_LOGS', 'VIEW_ACTIVITY_LOGS', 'VIEW_ERROR_LOGS',
    'VIEW_APP_CONFIG', 'MANAGE_APP_CONFIG', 'VIEW_TIER_SETTINGS', 'MANAGE_TIER_SETTINGS',
    'VIEW_ROLE_MATRIX', 'MANAGE_ROLE_MATRIX', 'VIEW_FEATURE_FLAGS', 'MANAGE_FEATURE_FLAGS',
    'VIEW_PROFILE', 'UPDATE_PROFILE', 'MANAGE_2FA', 'VIEW_SESSIONS', 'TERMINATE_SESSIONS',
  ],
  OFFICER: [
    'VIEW_DASHBOARD', 'VIEW_REGIONAL_METRICS', 'VIEW_AI_INSIGHTS',
    'VIEW_LISTINGS', 'APPROVE_LISTING', 'REJECT_LISTING', 'SUSPEND_LISTING', 'CREATE_OFFICIAL_LISTING',
    'VIEW_LANDLORDS', 'VIEW_TENANTS', 'VIEW_AGENTS', 'SUSPEND_USER', 'UNSUSPEND_USER',
    'VIEW_VERIFICATION_REQUESTS', 'APPROVE_VERIFICATION', 'REJECT_VERIFICATION',
    'VIEW_SUBSCRIPTION_UPGRADES', 'APPROVE_SUBSCRIPTION_UPGRADE', 'REJECT_SUBSCRIPTION_UPGRADE',
    'VIEW_DISPUTES', 'RESOLVE_DISPUTE', 'VIEW_REPORTS', 'RESOLVE_REPORT',
    'VIEW_ESCROW', 'RELEASE_ESCROW', 'HOLD_ESCROW',
    'VIEW_TRANSACTIONS', 'APPROVE_PAYOUT',
    'VIEW_REGIONS', 'VIEW_LGAS', 'VIEW_LGA_ACTIVITY',
    'VIEW_AUDIT_LOGS', 'VIEW_ACTIVITY_LOGS',
    'VIEW_APP_CONFIG', 'VIEW_TIER_SETTINGS', 'VIEW_ROLE_MATRIX', 'VIEW_FEATURE_FLAGS',
    'VIEW_PROFILE', 'UPDATE_PROFILE', 'MANAGE_2FA', 'VIEW_SESSIONS',
  ],
  REGIONAL_OFFICER: [
    'VIEW_DASHBOARD', 'VIEW_REGIONAL_METRICS',
    'VIEW_LISTINGS', 'APPROVE_LISTING', 'REJECT_LISTING',
    'VIEW_LANDLORDS', 'VIEW_TENANTS', 'VIEW_AGENTS',
    'VIEW_VERIFICATION_REQUESTS', 'APPROVE_VERIFICATION', 'REJECT_VERIFICATION',
    'VIEW_SUBSCRIPTION_UPGRADES',
    'VIEW_DISPUTES', 'VIEW_REPORTS',
    'VIEW_ESCROW', 'VIEW_TRANSACTIONS',
    'VIEW_REGIONS', 'VIEW_LGAS', 'VIEW_LGA_ACTIVITY',
    'VIEW_ACTIVITY_LOGS',
    'VIEW_PROFILE', 'UPDATE_PROFILE', 'MANAGE_2FA',
  ],
  SUPPORT: [
    'VIEW_DASHBOARD',
    'VIEW_LISTINGS', 'VIEW_LANDLORDS', 'VIEW_TENANTS', 'VIEW_AGENTS',
    'VIEW_VERIFICATION_REQUESTS', 'VIEW_SUBSCRIPTION_UPGRADES',
    'VIEW_DISPUTES', 'VIEW_REPORTS',
    'VIEW_PROFILE', 'UPDATE_PROFILE',
  ],
};

// ==================== USER TYPES ====================
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING' | 'DEACTIVATED';
export type VerificationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
export type SubscriptionTier = 'FREE' | 'PRO' | 'PREMIER';
export type UserType = 'TENANT' | 'LANDLORD' | 'AGENT';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  userType: UserType;
  status: UserStatus;
  verificationStatus: VerificationStatus;
  subscriptionTier: SubscriptionTier;
  regionId: string | null;
  lgaId: string | null;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
}

// ==================== OFFICER TYPES ====================
export interface Officer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
  status: UserStatus;
  assignedRegions: string[];
  assignedLgas: string[];
  permissions: Permission[];
  twoFactorEnabled: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OfficerSession {
  id: string;
  officerId: string;
  ipAddress: string;
  userAgent: string;
  location: string | null;
  createdAt: string;
  expiresAt: string;
  lastActivityAt: string;
  isCurrent: boolean;
}

// ==================== REGION/LGA TYPES (LAGOS) ====================
export interface Region {
  id: string;
  name: string;
  code: string;
  description: string | null;
  lgaIds: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LGA {
  id: string;
  name: string;
  code: string;
  regionId: string;
  isActive: boolean;
  population: number | null;
  area: number | null;
  createdAt: string;
  updatedAt: string;
}

// Lagos Regions and LGAs
export const LAGOS_REGIONS: readonly string[] = [
  'Lagos Island',
  'Lagos Mainland',
  'Ikeja',
  'Ikorodu',
  'Badagry',
  'Epe',
] as const;

export const LAGOS_LGAS: readonly string[] = [
  'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
  'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
  'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
  'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere',
] as const;

// ==================== LISTING TYPES ====================
export type ListingStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED' | 'ARCHIVED';
export type ListingType = 'RENT' | 'SALE' | 'SHORTLET';
export type PropertyType = 'APARTMENT' | 'HOUSE' | 'DUPLEX' | 'STUDIO' | 'OFFICE' | 'SHOP' | 'WAREHOUSE' | 'LAND';

export interface Listing {
  id: string;
  title: string;
  description: string;
  propertyType: PropertyType;
  listingType: ListingType;
  status: ListingStatus;
  price: number;
  currency: 'NGN';
  bedrooms: number | null;
  bathrooms: number | null;
  size: number | null;
  address: string;
  lgaId: string;
  regionId: string;
  ownerId: string;
  ownerType: 'LANDLORD' | 'AGENT';
  images: string[];
  amenities: string[];
  isVerified: boolean;
  isFeatured: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  approvedAt: string | null;
  approvedBy: string | null;
}

// ==================== REQUEST TYPES ====================
export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
export type RequestType = 'VERIFICATION' | 'SUBSCRIPTION_UPGRADE' | 'LISTING_APPROVAL' | 'PAYOUT';

export interface VerificationRequest {
  id: string;
  userId: string;
  userType: UserType;
  status: RequestStatus;
  documents: string[];
  notes: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionUpgradeRequest {
  id: string;
  userId: string;
  currentTier: SubscriptionTier;
  requestedTier: SubscriptionTier;
  status: RequestStatus;
  paymentReference: string | null;
  amount: number;
  reviewedBy: string | null;
  reviewedAt: string | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
}

// ==================== DISPUTE/REPORT TYPES ====================
export type DisputeStatus = 'OPEN' | 'IN_REVIEW' | 'RESOLVED' | 'ESCALATED' | 'CLOSED';
export type DisputeCategory = 'PAYMENT' | 'PROPERTY' | 'FRAUD' | 'SERVICE' | 'OTHER';

export interface Dispute {
  id: string;
  reporterId: string;
  reportedId: string | null;
  listingId: string | null;
  category: DisputeCategory;
  status: DisputeStatus;
  title: string;
  description: string;
  evidence: string[];
  assignedTo: string | null;
  resolution: string | null;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
}

// ==================== ESCROW TYPES ====================
export type EscrowStatus = 'PENDING' | 'HELD' | 'RELEASED' | 'REFUNDED' | 'DISPUTED';

export interface EscrowAccount {
  id: string;
  transactionId: string;
  tenantId: string;
  landlordId: string;
  listingId: string;
  amount: number;
  currency: 'NGN';
  status: EscrowStatus;
  releaseConditions: string | null;
  releasedAt: string | null;
  releasedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

// ==================== AUDIT LOG TYPES ====================
export type AuditAction =
  | 'LOGIN' | 'LOGOUT' | 'LOGIN_FAILED'
  | 'CREATE' | 'UPDATE' | 'DELETE'
  | 'APPROVE' | 'REJECT' | 'SUSPEND' | 'UNSUSPEND'
  | 'ESCROW_RELEASE' | 'ESCROW_HOLD' | 'ESCROW_REFUND'
  | 'PERMISSION_CHANGE' | 'ROLE_CHANGE'
  | 'CONFIG_CHANGE' | 'FEATURE_FLAG_TOGGLE';

export interface AuditLog {
  id: string;
  officerId: string;
  action: AuditAction;
  targetType: string;
  targetId: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

// ==================== FEATURE FLAGS ====================
export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  isEnabled: boolean;
  enabledFor: Role[];
  createdAt: string;
  updatedAt: string;
}

// ==================== API RESPONSE TYPES ====================
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string | null;
  errors: string[] | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ==================== AUTH TYPES ====================
export type AuthStep = 'LOGIN' | 'TWO_FACTOR' | 'AUTHENTICATED';

export interface AuthState {
  officer: Officer | null;
  isAuthenticated: boolean;
  authStep: AuthStep;
  sessionId: string | null;
  regionScope: Region[];
  lgaScope: LGA[];
  permissions: Permission[];
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface TwoFactorPayload {
  code: string;
  sessionToken: string;
}
