// ============================================
// URBAN GRAVITY - CENTRALIZED MOCK DATABASE
// Single source of truth for all mock data
// ============================================

import { faker } from "@faker-js/faker";

// Initialize faker with consistent seed
faker.seed(12345);

// ==================== ENUMS & TYPES ====================

export type UserRole = "LANDLORD" | "TENANT" | "AGENT" | "OFFICER" | "SUPER_ADMIN";
export type VerificationStatus = "VERIFIED" | "UNVERIFIED" | "PENDING" | "REJECTED";
export type SubscriptionTier = "FREE" | "PRO" | "PREMIER";
export type ListingStatus = "ACTIVE" | "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED" | "SOLD" | "RENTED";
export type DisputeStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "ESCALATED" | "CLOSED";
export type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type EscrowStatus = "PENDING" | "HELD" | "RELEASED" | "REFUNDED" | "DISPUTED";
export type TransactionType = "DEPOSIT" | "WITHDRAWAL" | "TRANSFER" | "REFUND" | "PAYOUT";
export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

// Lagos Regions
export const LAGOS_REGIONS = [
  { id: "reg-001", name: "Lagos Island", code: "LI" },
  { id: "reg-002", name: "Lagos Mainland", code: "LM" },
  { id: "reg-003", name: "Ikeja Division", code: "IK" },
  { id: "reg-004", name: "Ikorodu Division", code: "IKD" },
  { id: "reg-005", name: "Badagry Division", code: "BD" },
  { id: "reg-006", name: "Epe Division", code: "EP" },
] as const;

export const LAGOS_LGAS = [
  { id: "lga-001", name: "Agege", regionId: "reg-003", population: 461743 },
  { id: "lga-002", name: "Ajeromi-Ifelodun", regionId: "reg-002", population: 687316 },
  { id: "lga-003", name: "Alimosho", regionId: "reg-003", population: 1277714 },
  { id: "lga-004", name: "Amuwo-Odofin", regionId: "reg-002", population: 318166 },
  { id: "lga-005", name: "Apapa", regionId: "reg-002", population: 217362 },
  { id: "lga-006", name: "Badagry", regionId: "reg-005", population: 241093 },
  { id: "lga-007", name: "Epe", regionId: "reg-006", population: 181409 },
  { id: "lga-008", name: "Eti-Osa", regionId: "reg-001", population: 287785 },
  { id: "lga-009", name: "Ibeju-Lekki", regionId: "reg-006", population: 117481 },
  { id: "lga-010", name: "Ifako-Ijaiye", regionId: "reg-003", population: 427878 },
  { id: "lga-011", name: "Ikeja", regionId: "reg-003", population: 313196 },
  { id: "lga-012", name: "Ikorodu", regionId: "reg-004", population: 535619 },
  { id: "lga-013", name: "Kosofe", regionId: "reg-003", population: 665393 },
  { id: "lga-014", name: "Lagos Island", regionId: "reg-001", population: 209437 },
  { id: "lga-015", name: "Lagos Mainland", regionId: "reg-002", population: 317720 },
  { id: "lga-016", name: "Mushin", regionId: "reg-002", population: 633009 },
  { id: "lga-017", name: "Ojo", regionId: "reg-005", population: 609173 },
  { id: "lga-018", name: "Oshodi-Isolo", regionId: "reg-003", population: 621509 },
  { id: "lga-019", name: "Shomolu", regionId: "reg-002", population: 402673 },
  { id: "lga-020", name: "Surulere", regionId: "reg-002", population: 503975 },
] as const;

// ==================== INTERFACES ====================

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  tier: SubscriptionTier;
  verificationStatus: VerificationStatus;
  avatarUrl: string;
  createdAt: string;
  lastActive: string;
  regionId: string;
  lgaId: string;
  is2FAEnabled: boolean;
  isOnline: boolean;
  preferences?: UserPreferences;
  documents?: UserDocument[];
}

export interface UserPreferences {
  minBudget: number;
  maxBudget: number;
  preferredLgas: string[];
  propertyTypes: string[];
  bedrooms: number[];
  amenities: string[];
}

export interface UserDocument {
  id: string;
  type: "NIN" | "BVN" | "UTILITY_BILL" | "PROPERTY_TITLE" | "CAC" | "TAX_CLEARANCE";
  url: string;
  status: VerificationStatus;
  uploadedAt: string;
}

export interface Officer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "OFFICER" | "SUPER_ADMIN";
  assignedRegions: string[];
  assignedLgas: string[];
  is2FAEnabled: boolean;
  createdAt: string;
  lastActive: string;
  avatarUrl: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  address: string;
  price: number;
  type: "RENT" | "SALE" | "SHORTLET";
  propertyType: "APARTMENT" | "HOUSE" | "DUPLEX" | "STUDIO" | "OFFICE" | "SHOP" | "LAND";
  status: ListingStatus;
  ownerId: string;
  ownerName: string;
  ownerType: "LANDLORD" | "AGENT";
  images: string[];
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
  views: number;
  regionId: string;
  lgaId: string;
  bedrooms?: number;
  bathrooms?: number;
  size?: number;
  amenities: string[];
  isVerified: boolean;
  isFeatured: boolean;
}

export interface Dispute {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  status: DisputeStatus;
  priority: Priority;
  category: "PAYMENT" | "PROPERTY" | "DAMAGE" | "CONTRACT" | "HARASSMENT" | "FRAUD" | "SERVICE" | "OTHER";
  complainantId: string;
  complainantName: string;
  complainantType: UserRole;
  respondentId?: string;
  respondentName?: string;
  respondentType?: UserRole;
  listingId?: string;
  escrowId?: string;
  evidence: string[];
  assignedTo?: string;
  resolution?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userType: UserRole;
  currentTier: SubscriptionTier;
  documents: UserDocument[];
  status: RequestStatus;
  notes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  lgaName: string;
  propertyCount: number;
}

export interface SubscriptionUpgrade {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  currentTier: SubscriptionTier;
  requestedTier: SubscriptionTier;
  amount: number;
  paymentReference?: string;
  status: RequestStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  createdAt: string;
}

export interface EscrowAccount {
  id: string;
  transactionRef: string;
  tenantId: string;
  tenantName: string;
  landlordId: string;
  landlordName: string;
  listingId: string;
  listingTitle: string;
  amount: number;
  status: EscrowStatus;
  releaseConditions?: string;
  releasedAt?: string;
  releasedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  reference: string;
  type: TransactionType;
  amount: number;
  currency: "NGN";
  status: "SUCCESS" | "PENDING" | "FAILED";
  userId: string;
  userName: string;
  escrowId?: string;
  description: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

export interface PayoutRequest {
  id: string;
  userId: string;
  userName: string;
  bankName: string;
  accountNumber: string;
  amount: number;
  status: RequestStatus;
  escrowId?: string;
  disputeId?: string;
  requestedAt: string;
  reviewedBy?: string;
  approvedBy?: string;
  processedAt?: string;
}

export interface RefundRequest {
  id: string;
  disputeId: string;
  escrowId: string;
  userId: string;
  userName: string;
  amount: number;
  reason: string;
  status: RequestStatus;
  createdAt: string;
  processedAt?: string;
  processedBy?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole | "OFFICER" | "SUPER_ADMIN";
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  status: "SUCCESS" | "FAILURE";
}

export interface AuditLog {
  id: string;
  officerId: string;
  officerName: string;
  action: string;
  targetType: string;
  targetId: string;
  previousValue?: string;
  newValue?: string;
  ipAddress: string;
  timestamp: string;
}

export interface ApiLog {
  id: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  statusCode: number;
  responseTime: number;
  userId?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  requestBody?: string;
  responseBody?: string;
}

export interface ErrorLog {
  id: string;
  service: "UG-Core" | "UG-App" | "UG-Officer";
  errorType: string;
  message: string;
  stackTrace?: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  userId?: string;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  timestamp: string;
}

export interface Session {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole | "OFFICER" | "SUPER_ADMIN";
  ipAddress: string;
  userAgent: string;
  location?: string;
  createdAt: string;
  lastActivity: string;
  expiresAt: string;
  isActive: boolean;
}

export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  isEnabled: boolean;
  enabledFor: UserRole[];
  createdAt: string;
  updatedAt: string;
}

export interface TierConfig {
  id: string;
  tier: SubscriptionTier;
  name: string;
  price: number;
  features: string[];
  listingLimit: number;
  contactsPerMonth: number;
  verificationPriority: "LOW" | "MEDIUM" | "HIGH";
  supportLevel: "BASIC" | "PRIORITY" | "DEDICATED";
  isActive: boolean;
}

export interface AppConfig {
  id: string;
  key: string;
  value: string;
  category: "GENERAL" | "SECURITY" | "NOTIFICATIONS" | "PAYMENTS" | "FEATURES";
  description: string;
  updatedAt: string;
  updatedBy: string;
}

export interface Notification {
  id: string;
  type: "VERIFICATION" | "UPGRADE" | "DISPUTE" | "ESCROW" | "SYSTEM" | "ALERT";
  title: string;
  message: string;
  userId?: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

// ==================== DATA GENERATORS ====================

const generateUser = (role: UserRole, index: number): User => {
  const region = faker.helpers.arrayElement(LAGOS_REGIONS);
  const lgasInRegion = LAGOS_LGAS.filter(l => l.regionId === region.id);
  const lga = faker.helpers.arrayElement(lgasInRegion);

  return {
    id: `user-${role.toLowerCase()}-${index.toString().padStart(3, "0")}`,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    phone: `+234 ${faker.string.numeric(3)} ${faker.string.numeric(3)} ${faker.string.numeric(4)}`,
    role,
    tier: faker.helpers.arrayElement<SubscriptionTier>(["FREE", "PRO", "PREMIER"]),
    verificationStatus: faker.helpers.arrayElement<VerificationStatus>(["VERIFIED", "UNVERIFIED", "PENDING", "REJECTED"]),
    avatarUrl: faker.image.avatar(),
    createdAt: faker.date.past({ years: 2 }).toISOString(),
    lastActive: faker.date.recent({ days: 7 }).toISOString(),
    regionId: region.id,
    lgaId: lga.id,
    is2FAEnabled: faker.datatype.boolean(),
    isOnline: faker.datatype.boolean({ probability: 0.3 }),
    preferences: role === "TENANT" ? {
      minBudget: faker.number.int({ min: 200000, max: 500000 }),
      maxBudget: faker.number.int({ min: 1000000, max: 10000000 }),
      preferredLgas: faker.helpers.arrayElements(LAGOS_LGAS.map(l => l.id), { min: 1, max: 5 }),
      propertyTypes: faker.helpers.arrayElements(["APARTMENT", "HOUSE", "DUPLEX", "STUDIO"], { min: 1, max: 3 }),
      bedrooms: faker.helpers.arrayElements([1, 2, 3, 4, 5], { min: 1, max: 3 }),
      amenities: faker.helpers.arrayElements(["PARKING", "SECURITY", "GYM", "POOL", "GENERATOR"], { min: 1, max: 4 }),
    } : undefined,
    documents: faker.datatype.boolean() ? [
      {
        id: faker.string.uuid(),
        type: "NIN",
        url: faker.internet.url(),
        status: faker.helpers.arrayElement<VerificationStatus>(["VERIFIED", "PENDING"]),
        uploadedAt: faker.date.past().toISOString(),
      }
    ] : [],
  };
};

const generateListing = (owners: User[], index: number): Listing => {
  const owner = faker.helpers.arrayElement(owners);
  const region = LAGOS_REGIONS.find(r => r.id === owner.regionId)!;
  const lga = LAGOS_LGAS.find(l => l.id === owner.lgaId)!;

  return {
    id: `listing-${index.toString().padStart(4, "0")}`,
    title: `${faker.helpers.arrayElement(["Luxury", "Modern", "Spacious", "Cozy", "Executive"])} ${faker.helpers.arrayElement(["2", "3", "4", "5"])} Bedroom ${faker.helpers.arrayElement(["Apartment", "Flat", "Duplex", "House"])}`,
    description: faker.lorem.paragraphs(2),
    address: `${faker.location.streetAddress()}, ${lga.name}, Lagos`,
    price: faker.number.int({ min: 500000, max: 50000000 }),
    type: faker.helpers.arrayElement(["RENT", "SALE", "SHORTLET"]),
    propertyType: faker.helpers.arrayElement(["APARTMENT", "HOUSE", "DUPLEX", "STUDIO", "OFFICE"]),
    status: faker.helpers.arrayElement<ListingStatus>(["ACTIVE", "PENDING", "APPROVED", "REJECTED", "SUSPENDED"]),
    ownerId: owner.id,
    ownerName: `${owner.firstName} ${owner.lastName}`,
    ownerType: owner.role === "AGENT" ? "AGENT" : "LANDLORD",
    images: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () =>
      faker.image.urlLoremFlickr({ category: "house", width: 800, height: 600 })
    ),
    createdAt: faker.date.past({ years: 1 }).toISOString(),
    views: faker.number.int({ min: 50, max: 5000 }),
    regionId: region.id,
    lgaId: lga.id,
    bedrooms: faker.number.int({ min: 1, max: 6 }),
    bathrooms: faker.number.int({ min: 1, max: 4 }),
    size: faker.number.int({ min: 50, max: 500 }),
    amenities: faker.helpers.arrayElements(["PARKING", "SECURITY", "GYM", "POOL", "GENERATOR", "AC", "WATER_HEATER", "FITTED_KITCHEN"], { min: 2, max: 6 }),
    isVerified: faker.datatype.boolean({ probability: 0.6 }),
    isFeatured: faker.datatype.boolean({ probability: 0.1 }),
  };
};

const generateDispute = (users: User[], index: number): Dispute => {
  const complainant = faker.helpers.arrayElement(users);
  const respondent = faker.helpers.arrayElement(users.filter(u => u.id !== complainant.id));

  return {
    id: `dispute-${index.toString().padStart(4, "0")}`,
    ticketNumber: `TX-${faker.string.numeric(4)}`,
    title: faker.lorem.sentence(5),
    description: faker.lorem.paragraphs(2),
    status: faker.helpers.arrayElement<DisputeStatus>(["OPEN", "IN_PROGRESS", "RESOLVED", "ESCALATED", "CLOSED"]),
    priority: faker.helpers.arrayElement<Priority>(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
    category: faker.helpers.arrayElement(["PAYMENT", "PROPERTY", "DAMAGE", "CONTRACT", "HARASSMENT", "FRAUD", "SERVICE", "OTHER"]),
    complainantId: complainant.id,
    complainantName: `${complainant.firstName} ${complainant.lastName}`,
    complainantType: complainant.role,
    respondentId: respondent.id,
    respondentName: `${respondent.firstName} ${respondent.lastName}`,
    respondentType: respondent.role,
    evidence: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => faker.internet.url()),
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
    updatedAt: faker.date.recent({ days: 5 }).toISOString(),
  };
};

// ==================== GENERATE ALL DATA ====================

// Users
const LANDLORDS = Array.from({ length: 25 }, (_, i) => generateUser("LANDLORD", i));
const TENANTS = Array.from({ length: 40 }, (_, i) => generateUser("TENANT", i));
const AGENTS = Array.from({ length: 8 }, (_, i) => generateUser("AGENT", i));
const ALL_USERS = [...LANDLORDS, ...TENANTS, ...AGENTS];

// Officers
const OFFICERS: Officer[] = [
  {
    id: "officer-001",
    firstName: "Adebayo",
    lastName: "Ogundimu",
    email: "admin@urbangravity.ng",
    phone: "+234 803 456 7890",
    role: "SUPER_ADMIN",
    assignedRegions: LAGOS_REGIONS.map(r => r.id),
    assignedLgas: LAGOS_LGAS.map(l => l.id),
    is2FAEnabled: true,
    createdAt: "2023-01-01T00:00:00Z",
    lastActive: new Date().toISOString(),
    avatarUrl: faker.image.avatar(),
  },
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `officer-${(i + 2).toString().padStart(3, "0")}`,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email({ provider: "urbangravity.ng" }).toLowerCase(),
    phone: `+234 ${faker.string.numeric(3)} ${faker.string.numeric(3)} ${faker.string.numeric(4)}`,
    role: "OFFICER" as const,
    assignedRegions: faker.helpers.arrayElements(LAGOS_REGIONS.map(r => r.id), { min: 1, max: 3 }),
    assignedLgas: faker.helpers.arrayElements(LAGOS_LGAS.map(l => l.id), { min: 3, max: 8 }),
    is2FAEnabled: faker.datatype.boolean({ probability: 0.7 }),
    createdAt: faker.date.past({ years: 1 }).toISOString(),
    lastActive: faker.date.recent({ days: 3 }).toISOString(),
    avatarUrl: faker.image.avatar(),
  })),
];

// Listings
const LISTINGS = Array.from({ length: 50 }, (_, i) =>
  generateListing([...LANDLORDS, ...AGENTS], i)
);

// Disputes
const DISPUTES = Array.from({ length: 20 }, (_, i) => generateDispute(ALL_USERS, i));

// Verification Requests
const VERIFICATION_REQUESTS: VerificationRequest[] = Array.from({ length: 15 }, (_, i) => {
  const user = faker.helpers.arrayElement(ALL_USERS.filter(u => u.verificationStatus === "PENDING" || u.verificationStatus === "UNVERIFIED"));
  const lga = LAGOS_LGAS.find(l => l.id === user.lgaId)!;

  return {
    id: `vr-${i.toString().padStart(4, "0")}`,
    userId: user.id,
    userName: `${user.firstName} ${user.lastName}`,
    userEmail: user.email,
    userType: user.role,
    currentTier: user.tier,
    documents: [
      { id: faker.string.uuid(), type: "NIN", url: faker.internet.url(), status: "PENDING", uploadedAt: faker.date.past().toISOString() },
      { id: faker.string.uuid(), type: "UTILITY_BILL", url: faker.internet.url(), status: "PENDING", uploadedAt: faker.date.past().toISOString() },
    ],
    status: faker.helpers.arrayElement<RequestStatus>(["PENDING", "APPROVED", "REJECTED"]),
    createdAt: faker.date.recent({ days: 14 }).toISOString(),
    lgaName: lga.name,
    propertyCount: user.role === "LANDLORD" ? faker.number.int({ min: 1, max: 10 }) : 0,
  };
});

// Subscription Upgrades
const SUBSCRIPTION_UPGRADES: SubscriptionUpgrade[] = Array.from({ length: 12 }, (_, i) => {
  const user = faker.helpers.arrayElement(ALL_USERS.filter(u => u.tier !== "PREMIER"));
  const currentTier = user.tier;
  const requestedTier: SubscriptionTier = currentTier === "FREE" ? "PRO" : "PREMIER";

  return {
    id: `upgrade-${i.toString().padStart(4, "0")}`,
    userId: user.id,
    userName: `${user.firstName} ${user.lastName}`,
    userEmail: user.email,
    currentTier,
    requestedTier,
    amount: requestedTier === "PRO" ? 25000 : 75000,
    paymentReference: faker.datatype.boolean() ? `PAY-${faker.string.alphanumeric(10).toUpperCase()}` : undefined,
    status: faker.helpers.arrayElement<RequestStatus>(["PENDING", "APPROVED", "REJECTED"]),
    createdAt: faker.date.recent({ days: 10 }).toISOString(),
  };
});

// Escrow Accounts
const ESCROW_ACCOUNTS: EscrowAccount[] = Array.from({ length: 25 }, (_, i) => {
  const tenant = faker.helpers.arrayElement(TENANTS);
  const landlord = faker.helpers.arrayElement(LANDLORDS);
  const listing = faker.helpers.arrayElement(LISTINGS.filter(l => l.ownerId === landlord.id) || LISTINGS);

  return {
    id: `escrow-${i.toString().padStart(4, "0")}`,
    transactionRef: `ESC-${faker.string.alphanumeric(8).toUpperCase()}`,
    tenantId: tenant.id,
    tenantName: `${tenant.firstName} ${tenant.lastName}`,
    landlordId: landlord.id,
    landlordName: `${landlord.firstName} ${landlord.lastName}`,
    listingId: listing.id,
    listingTitle: listing.title,
    amount: faker.number.int({ min: 500000, max: 5000000 }),
    status: faker.helpers.arrayElement<EscrowStatus>(["PENDING", "HELD", "RELEASED", "REFUNDED", "DISPUTED"]),
    createdAt: faker.date.past({ years: 1 }).toISOString(),
    updatedAt: faker.date.recent({ days: 30 }).toISOString(),
  };
});

// Transactions
const TRANSACTIONS: Transaction[] = Array.from({ length: 100 }, (_, i) => {
  const user = faker.helpers.arrayElement(ALL_USERS);

  return {
    id: `txn-${i.toString().padStart(5, "0")}`,
    reference: `TXN-${faker.string.alphanumeric(12).toUpperCase()}`,
    type: faker.helpers.arrayElement<TransactionType>(["DEPOSIT", "WITHDRAWAL", "TRANSFER", "REFUND", "PAYOUT"]),
    amount: faker.number.int({ min: 10000, max: 5000000 }),
    currency: "NGN",
    status: faker.helpers.arrayElement(["SUCCESS", "PENDING", "FAILED"]),
    userId: user.id,
    userName: `${user.firstName} ${user.lastName}`,
    description: faker.finance.transactionDescription(),
    createdAt: faker.date.past({ years: 1 }).toISOString(),
  };
});

// Payout Requests
const PAYOUT_REQUESTS: PayoutRequest[] = Array.from({ length: 10 }, (_, i) => {
  const user = faker.helpers.arrayElement([...LANDLORDS, ...AGENTS]);

  return {
    id: `payout-${i.toString().padStart(4, "0")}`,
    userId: user.id,
    userName: `${user.firstName} ${user.lastName}`,
    bankName: faker.helpers.arrayElement(["GTBank", "First Bank", "UBA", "Access Bank", "Zenith Bank"]),
    accountNumber: faker.string.numeric(10),
    amount: faker.number.int({ min: 100000, max: 2000000 }),
    status: faker.helpers.arrayElement<RequestStatus>(["PENDING", "APPROVED", "REJECTED"]),
    requestedAt: faker.date.recent({ days: 7 }).toISOString(),
  };
});

// Refund Requests
const REFUND_REQUESTS: RefundRequest[] = Array.from({ length: 8 }, (_, i) => {
  const dispute = faker.helpers.arrayElement(DISPUTES);
  const escrow = faker.helpers.arrayElement(ESCROW_ACCOUNTS);
  const user = faker.helpers.arrayElement(TENANTS);

  return {
    id: `refund-${i.toString().padStart(4, "0")}`,
    disputeId: dispute.id,
    escrowId: escrow.id,
    userId: user.id,
    userName: `${user.firstName} ${user.lastName}`,
    amount: faker.number.int({ min: 50000, max: 1000000 }),
    reason: faker.lorem.sentence(),
    status: faker.helpers.arrayElement<RequestStatus>(["PENDING", "APPROVED", "REJECTED"]),
    createdAt: faker.date.recent({ days: 14 }).toISOString(),
  };
});

// Activity Logs
const ACTIVITY_LOGS: ActivityLog[] = Array.from({ length: 200 }, (_, i) => {
  const user = faker.helpers.arrayElement([...ALL_USERS, ...OFFICERS]);

  return {
    id: `activity-${i.toString().padStart(5, "0")}`,
    userId: user.id,
    userName: `${user.firstName} ${user.lastName}`,
    userRole: "role" in user && user.role === "SUPER_ADMIN" ? "SUPER_ADMIN" : "role" in user ? user.role : "OFFICER",
    action: faker.helpers.arrayElement(["LOGIN", "LOGOUT", "VIEW_LISTING", "CREATE_LISTING", "UPDATE_PROFILE", "SUBMIT_DISPUTE", "MAKE_PAYMENT"]),
    resource: faker.helpers.arrayElement(["LISTING", "PROFILE", "DISPUTE", "PAYMENT", "SESSION"]),
    ipAddress: faker.internet.ip(),
    userAgent: faker.internet.userAgent(),
    timestamp: faker.date.recent({ days: 7 }).toISOString(),
    status: faker.helpers.arrayElement(["SUCCESS", "SUCCESS", "SUCCESS", "FAILURE"]),
  };
});

// Audit Logs (Officer actions)
const AUDIT_LOGS: AuditLog[] = Array.from({ length: 50 }, (_, i) => {
  const officer = faker.helpers.arrayElement(OFFICERS);

  return {
    id: `audit-${i.toString().padStart(5, "0")}`,
    officerId: officer.id,
    officerName: `${officer.firstName} ${officer.lastName}`,
    action: faker.helpers.arrayElement(["APPROVE_LISTING", "REJECT_LISTING", "SUSPEND_USER", "RELEASE_ESCROW", "RESOLVE_DISPUTE", "UPDATE_CONFIG"]),
    targetType: faker.helpers.arrayElement(["LISTING", "USER", "ESCROW", "DISPUTE", "CONFIG"]),
    targetId: faker.string.uuid(),
    ipAddress: faker.internet.ip(),
    timestamp: faker.date.recent({ days: 30 }).toISOString(),
  };
});

// API Logs
const API_LOGS: ApiLog[] = Array.from({ length: 100 }, (_, i) => ({
  id: `api-${i.toString().padStart(5, "0")}`,
  endpoint: faker.helpers.arrayElement(["/api/users", "/api/listings", "/api/auth/login", "/api/disputes", "/api/escrow"]),
  method: faker.helpers.arrayElement(["GET", "POST", "PUT", "DELETE"]),
  statusCode: faker.helpers.arrayElement([200, 201, 400, 401, 403, 404, 500]),
  responseTime: faker.number.int({ min: 50, max: 2000 }),
  ipAddress: faker.internet.ip(),
  userAgent: faker.internet.userAgent(),
  timestamp: faker.date.recent({ days: 7 }).toISOString(),
}));

// Error Logs
const ERROR_LOGS: ErrorLog[] = Array.from({ length: 30 }, (_, i) => ({
  id: `error-${i.toString().padStart(5, "0")}`,
  service: faker.helpers.arrayElement<"UG-Core" | "UG-App" | "UG-Officer">(["UG-Core", "UG-App", "UG-Officer"]),
  errorType: faker.helpers.arrayElement(["TypeError", "NetworkError", "ValidationError", "AuthError", "DatabaseError"]),
  message: faker.lorem.sentence(),
  severity: faker.helpers.arrayElement<"LOW" | "MEDIUM" | "HIGH" | "CRITICAL">(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  resolved: faker.datatype.boolean({ probability: 0.6 }),
  timestamp: faker.date.recent({ days: 14 }).toISOString(),
}));

// Sessions
const SESSIONS: Session[] = Array.from({ length: 50 }, (_, i) => {
  const user = faker.helpers.arrayElement([...ALL_USERS, ...OFFICERS]);
  const isOfficer = OFFICERS.some(o => o.id === user.id);

  return {
    id: `session-${i.toString().padStart(5, "0")}`,
    userId: user.id,
    userName: `${user.firstName} ${user.lastName}`,
    userRole: isOfficer ? (user as Officer).role : (user as User).role,
    ipAddress: faker.internet.ip(),
    userAgent: faker.internet.userAgent(),
    location: `${faker.location.city()}, Nigeria`,
    createdAt: faker.date.recent({ days: 7 }).toISOString(),
    lastActivity: faker.date.recent({ days: 1 }).toISOString(),
    expiresAt: faker.date.future({ years: 0.1 }).toISOString(),
    isActive: faker.datatype.boolean({ probability: 0.4 }),
  };
});

// Feature Flags
const FEATURE_FLAGS: FeatureFlag[] = [
  { id: "ff-001", key: "AI_MATCHING", name: "AI Property Matching", description: "Enable AI-powered property recommendations", isEnabled: true, enabledFor: ["TENANT", "LANDLORD", "AGENT"], createdAt: "2024-01-01T00:00:00Z", updatedAt: new Date().toISOString() },
  { id: "ff-002", key: "ESCROW_V2", name: "Escrow 2.0", description: "New escrow system with milestone payments", isEnabled: false, enabledFor: ["LANDLORD", "AGENT"], createdAt: "2024-01-01T00:00:00Z", updatedAt: new Date().toISOString() },
  { id: "ff-003", key: "VIDEO_TOURS", name: "Video Property Tours", description: "Allow video uploads for listings", isEnabled: true, enabledFor: ["LANDLORD", "AGENT"], createdAt: "2024-01-01T00:00:00Z", updatedAt: new Date().toISOString() },
  { id: "ff-004", key: "INSTANT_CHAT", name: "Instant Messaging", description: "Real-time chat between users", isEnabled: true, enabledFor: ["TENANT", "LANDLORD", "AGENT"], createdAt: "2024-01-01T00:00:00Z", updatedAt: new Date().toISOString() },
  { id: "ff-005", key: "PREMIUM_ANALYTICS", name: "Premium Analytics", description: "Advanced analytics for premium users", isEnabled: true, enabledFor: ["LANDLORD", "AGENT"], createdAt: "2024-01-01T00:00:00Z", updatedAt: new Date().toISOString() },
];

// Tier Configurations
const TIER_CONFIGS: TierConfig[] = [
  { id: "tier-001", tier: "FREE", name: "Free", price: 0, features: ["5 Listing Views/day", "Basic Search", "Email Support"], listingLimit: 1, contactsPerMonth: 5, verificationPriority: "LOW", supportLevel: "BASIC", isActive: true },
  { id: "tier-002", tier: "PRO", name: "Pro", price: 25000, features: ["Unlimited Views", "Advanced Search", "Priority Support", "Verified Badge"], listingLimit: 10, contactsPerMonth: 50, verificationPriority: "MEDIUM", supportLevel: "PRIORITY", isActive: true },
  { id: "tier-003", tier: "PREMIER", name: "Premier", price: 75000, features: ["All Pro Features", "Featured Listings", "Dedicated Manager", "API Access"], listingLimit: -1, contactsPerMonth: -1, verificationPriority: "HIGH", supportLevel: "DEDICATED", isActive: true },
];

// App Configurations
const APP_CONFIGS: AppConfig[] = [
  { id: "config-001", key: "MAINTENANCE_MODE", value: "false", category: "GENERAL", description: "Enable maintenance mode", updatedAt: new Date().toISOString(), updatedBy: "officer-001" },
  { id: "config-002", key: "REQUIRE_2FA_OFFICERS", value: "true", category: "SECURITY", description: "Require 2FA for all officers", updatedAt: new Date().toISOString(), updatedBy: "officer-001" },
  { id: "config-003", key: "MAX_UPLOAD_SIZE_MB", value: "10", category: "GENERAL", description: "Maximum file upload size in MB", updatedAt: new Date().toISOString(), updatedBy: "officer-001" },
  { id: "config-004", key: "EMAIL_NOTIFICATIONS", value: "true", category: "NOTIFICATIONS", description: "Enable email notifications", updatedAt: new Date().toISOString(), updatedBy: "officer-001" },
  { id: "config-005", key: "ESCROW_FEE_PERCENTAGE", value: "2.5", category: "PAYMENTS", description: "Escrow service fee percentage", updatedAt: new Date().toISOString(), updatedBy: "officer-001" },
];

// Notifications
const NOTIFICATIONS: Notification[] = Array.from({ length: 20 }, (_, i) => ({
  id: `notif-${i.toString().padStart(4, "0")}`,
  type: faker.helpers.arrayElement(["VERIFICATION", "UPGRADE", "DISPUTE", "ESCROW", "SYSTEM", "ALERT"]),
  title: faker.lorem.sentence(4),
  message: faker.lorem.sentence(10),
  isRead: faker.datatype.boolean({ probability: 0.6 }),
  createdAt: faker.date.recent({ days: 7 }).toISOString(),
}));

// ==================== MOCK DATABASE EXPORT ====================

export const mockDatabase = {
  // Users
  users: ALL_USERS,
  landlords: LANDLORDS,
  tenants: TENANTS,
  agents: AGENTS,
  officers: OFFICERS,

  // Listings
  listings: LISTINGS,

  // Disputes & Reports
  disputes: DISPUTES,

  // Requests
  verificationRequests: VERIFICATION_REQUESTS,
  subscriptionUpgrades: SUBSCRIPTION_UPGRADES,
  payoutRequests: PAYOUT_REQUESTS,
  refundRequests: REFUND_REQUESTS,

  // Financial
  escrowAccounts: ESCROW_ACCOUNTS,
  transactions: TRANSACTIONS,

  // Logs
  activityLogs: ACTIVITY_LOGS,
  auditLogs: AUDIT_LOGS,
  apiLogs: API_LOGS,
  errorLogs: ERROR_LOGS,

  // Sessions
  sessions: SESSIONS,

  // Config
  featureFlags: FEATURE_FLAGS,
  tierConfigs: TIER_CONFIGS,
  appConfigs: APP_CONFIGS,

  // Misc
  notifications: NOTIFICATIONS,
  regions: LAGOS_REGIONS,
  lgas: LAGOS_LGAS,

  // ==================== MUTATION HELPERS ====================

  updateUser(id: string, updates: Partial<User>): User {
    const index = ALL_USERS.findIndex(u => u.id === id);
    if (index === -1) throw new Error("User not found");
    ALL_USERS[index] = { ...ALL_USERS[index], ...updates };
    return ALL_USERS[index];
  },

  updateListing(id: string, updates: Partial<Listing>): Listing {
    const index = LISTINGS.findIndex(l => l.id === id);
    if (index === -1) throw new Error("Listing not found");
    LISTINGS[index] = { ...LISTINGS[index], ...updates };
    return LISTINGS[index];
  },

  updateDispute(id: string, updates: Partial<Dispute>): Dispute {
    const index = DISPUTES.findIndex(d => d.id === id);
    if (index === -1) throw new Error("Dispute not found");
    DISPUTES[index] = { ...DISPUTES[index], ...updates };
    return DISPUTES[index];
  },

  updateEscrow(id: string, updates: Partial<EscrowAccount>): EscrowAccount {
    const index = ESCROW_ACCOUNTS.findIndex(e => e.id === id);
    if (index === -1) throw new Error("Escrow not found");
    ESCROW_ACCOUNTS[index] = { ...ESCROW_ACCOUNTS[index], ...updates };
    return ESCROW_ACCOUNTS[index];
  },

  updateVerificationRequest(id: string, updates: Partial<VerificationRequest>): VerificationRequest {
    const index = VERIFICATION_REQUESTS.findIndex(v => v.id === id);
    if (index === -1) throw new Error("Verification request not found");
    VERIFICATION_REQUESTS[index] = { ...VERIFICATION_REQUESTS[index], ...updates };
    return VERIFICATION_REQUESTS[index];
  },

  updateSubscriptionUpgrade(id: string, updates: Partial<SubscriptionUpgrade>): SubscriptionUpgrade {
    const index = SUBSCRIPTION_UPGRADES.findIndex(s => s.id === id);
    if (index === -1) throw new Error("Subscription upgrade not found");
    SUBSCRIPTION_UPGRADES[index] = { ...SUBSCRIPTION_UPGRADES[index], ...updates };
    return SUBSCRIPTION_UPGRADES[index];
  },

  updatePayoutRequest(id: string, updates: Partial<PayoutRequest>): PayoutRequest {
    const index = PAYOUT_REQUESTS.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Payout request not found");
    PAYOUT_REQUESTS[index] = { ...PAYOUT_REQUESTS[index], ...updates };
    return PAYOUT_REQUESTS[index];
  },

  updateFeatureFlag(id: string, updates: Partial<FeatureFlag>): FeatureFlag {
    const index = FEATURE_FLAGS.findIndex(f => f.id === id);
    if (index === -1) throw new Error("Feature flag not found");
    FEATURE_FLAGS[index] = { ...FEATURE_FLAGS[index], ...updates, updatedAt: new Date().toISOString() };
    return FEATURE_FLAGS[index];
  },

  updateAppConfig(id: string, updates: Partial<AppConfig>): AppConfig {
    const index = APP_CONFIGS.findIndex(c => c.id === id);
    if (index === -1) throw new Error("App config not found");
    APP_CONFIGS[index] = { ...APP_CONFIGS[index], ...updates, updatedAt: new Date().toISOString() };
    return APP_CONFIGS[index];
  },

  // Add new activity log
  addActivityLog(log: Omit<ActivityLog, "id">): ActivityLog {
    const newLog = { ...log, id: `activity-${Date.now()}` };
    ACTIVITY_LOGS.unshift(newLog);
    return newLog;
  },

  // Add new audit log
  addAuditLog(log: Omit<AuditLog, "id">): AuditLog {
    const newLog = { ...log, id: `audit-${Date.now()}` };
    AUDIT_LOGS.unshift(newLog);
    return newLog;
  },
};

export default mockDatabase;
