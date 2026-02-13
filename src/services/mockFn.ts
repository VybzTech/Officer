import { faker } from "@faker-js/faker";

// ==================== TYPES ====================

export type UserRole =
  | "LANDLORD"
  | "TENANT"
  | "AGENT"
  | "OFFICER"
  | "ADMIN"
  | "SUPER_ADMIN";
export type VerificationStatus =
  | "VERIFIED"
  | "UNVERIFIED"
  | "PENDING"
  | "REJECTED";
export type ListingStatus =
  | "ACTIVE"
  | "PENDING"
  | "SOLD"
  | "RENTED"
  | "REJECTED";
export type DisputeStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "ESCALATED"
  | "CLOSED";
export type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type Region =
  | "Lagos Island"
  | "Lagos Mainland"
  | "Ikeja"
  | "Lekki"
  | "Victoria Island"
  | "Ikoyi"
  | "Ajah"
  | "Surulere";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  tier: "FREE" | "BASIC" | "PREMIUM" | "PRO";
  status: VerificationStatus;
  avatarUrl: string;
  createdAt: string;
  lastActive: string;
  region: Region;
  is2FAEnabled: boolean;
}

export interface Listing {
  id: string;
  title: string;
  address: string;
  price: number;
  type: "RENT" | "SALE" | "LEASE";
  status: ListingStatus;
  ownerId: string;
  ownerName: string;
  images: string[];
  createdAt: string;
  views: number;
  region: Region;
}

export interface Dispute {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  status: DisputeStatus;
  priority: Priority;
  complainantId: string;
  complainantName: string;
  respondentId: string;
  respondentName: string;
  category: "PAYMENT" | "DAMAGE" | "CONTRACT" | "HARASSMENT" | "OTHER";
  createdAt: string;
  updatedAt: string;
  assignedTo?: string; // Officer ID
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
  status: "SUCCESS" | "FAILURE";
}

// ==================== GENERATE MOCK DATA ====================

// Initialize faker with a consistent seed for reproducibility
faker.seed(12345);

const REGIONS: Region[] = [
  "Lagos Island",
  "Lagos Mainland",
  "Ikeja",
  "Lekki",
  "Victoria Island",
  "Ikoyi",
  "Ajah",
  "Surulere",
];

const generateUser = (role: UserRole): User => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  role,
  tier: faker.helpers.arrayElement(["FREE", "BASIC", "PREMIUM", "PRO"]),
  status: faker.helpers.arrayElement([
    "VERIFIED",
    "UNVERIFIED",
    "PENDING",
    "REJECTED",
  ]),
  avatarUrl: faker.image.avatar(),
  createdAt: faker.date.past().toISOString(),
  lastActive: faker.date.recent().toISOString(),
  region: faker.helpers.arrayElement(REGIONS),
  is2FAEnabled: faker.datatype.boolean(),
});

const USERS: User[] = [
  ...Array.from({ length: 20 }, () => generateUser("LANDLORD")),
  ...Array.from({ length: 30 }, () => generateUser("TENANT")),
  ...Array.from({ length: 5 }, () => generateUser("AGENT")),
];

const LISTINGS: Listing[] = Array.from({ length: 40 }, () => {
  const owner = faker.helpers.arrayElement(
    USERS.filter((u) => u.role === "LANDLORD" || u.role === "AGENT"),
  );
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(3),
    address: faker.location.streetAddress({ useFullAddress: true }),
    price: parseFloat(faker.commerce.price({ min: 500000, max: 150000000 })),
    type: faker.helpers.arrayElement(["RENT", "SALE", "LEASE"]),
    status: faker.helpers.arrayElement([
      "ACTIVE",
      "PENDING",
      "SOLD",
      "RENTED",
      "REJECTED",
    ]),
    ownerId: owner.id,
    ownerName: `${owner.firstName} ${owner.lastName}`,
    images: [faker.image.urlLoremFlickr({ category: "house" })],
    createdAt: faker.date.past().toISOString(),
    views: faker.number.int({ min: 10, max: 5000 }),
    region: owner.region,
  };
});

const DISPUTES: Dispute[] = Array.from({ length: 15 }, () => {
  const complainant = faker.helpers.arrayElement(USERS);
  const respondent = faker.helpers.arrayElement(
    USERS.filter((u) => u.id !== complainant.id),
  );
  return {
    id: faker.string.uuid(),
    ticketNumber: `TX-${faker.number.int({ min: 1000, max: 9999 })}`,
    title: faker.lorem.sentence(5),
    description: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement([
      "OPEN",
      "IN_PROGRESS",
      "RESOLVED",
      "ESCALATED",
      "CLOSED",
    ]),
    priority: faker.helpers.arrayElement(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
    complainantId: complainant.id,
    complainantName: `${complainant.firstName} ${complainant.lastName}`,
    respondentId: respondent.id,
    respondentName: `${respondent.firstName} ${respondent.lastName}`,
    category: faker.helpers.arrayElement([
      "PAYMENT",
      "DAMAGE",
      "CONTRACT",
      "HARASSMENT",
      "OTHER",
    ]),
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
    updatedAt: faker.date.recent({ days: 5 }).toISOString(),
  };
});

const ACTIVITY_LOGS: ActivityLog[] = Array.from({ length: 100 }, () => {
  const user = faker.helpers.arrayElement(USERS);
  return {
    id: faker.string.uuid(),
    userId: user.id,
    userName: `${user.firstName} ${user.lastName}`,
    action: faker.helpers.arrayElement([
      "LOGIN",
      "LOGOUT",
      "UPDATE_PROFILE",
      "CREATE_LISTING",
      "VIEW_CONTACT",
      "SUBMIT_DISPUTE",
    ]),
    resource: faker.string.uuid(),
    timestamp: faker.date.recent({ days: 7 }).toISOString(),
    ipAddress: faker.internet.ip(),
    status: faker.helpers.arrayElement([
      "SUCCESS",
      "SUCCESS",
      "SUCCESS",
      "FAILURE",
    ]),
  };
});

// ==================== MOCK DB STORE ====================
// This acts as a singleton in-memory database
export const mockDb = {
  users: USERS,
  listings: LISTINGS,
  disputes: DISPUTES,
  activityLogs: ACTIVITY_LOGS,

  // Helper to simulate updates
  updateUser: (id: string, updates: Partial<User>) => {
    const index = USERS.findIndex((u) => u.id === id);
    if (index !== -1) {
      USERS[index] = { ...USERS[index], ...updates } as User;
      return USERS[index];
    }
    throw new Error("User not found");
  },

  updateDispute: (id: string, updates: Partial<Dispute>) => {
    const index = DISPUTES.findIndex((d) => d.id === id);
    if (index !== -1) {
      DISPUTES[index] = { ...DISPUTES[index], ...updates } as Dispute;
      return DISPUTES[index];
    }
    throw new Error("Dispute not found");
  },
};
