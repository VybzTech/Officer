// ============================================
// URBAN GRAVITY - AGENTS PAGE
// Premium agent management interface
// ============================================

import { useState, useEffect, useRef } from "react";
import {
  Search,
  Briefcase,
  Shield,
  Mail,
  Phone,
  MapPin,
  MoreVertical,
  Star,
  Crown,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Users,
  TrendingUp,
  SlidersHorizontal,
  X,
  ChevronDown,
  Eye,
  MessageSquare,
  Link2,
  Flag,
  Ban,
  ArrowUpCircle,
} from "lucide-react";
import { BigHeader } from "@/components/ui/Typography";
import { cn } from "@/utils/cn";
import { getInitials } from "@/utils/format";
import toast from "react-hot-toast";

// ==================== MOCK DATA ====================

const MOCK_AGENTS = [
  {
    id: "agt-001",
    firstName: "Emeka",
    lastName: "Okonkwo",
    email: "emeka.okonkwo@premiumestates.ng",
    phone: "+234 803 456 7890",
    role: "AGENT",
    tier: "PREMIER" as const,
    status: "VERIFIED" as const,
    region: "Lekki / Victoria Island",
    lgaId: "lga-005",
    avatarUrl: null,
    joinedDate: "2023-01-15",
    listingsCount: 48,
    verifiedListings: 42,
    activeDeals: 7,
    rating: 4.8,
    escrowManaged: 12500000,
    riskScore: 12,
    isRiskFlagged: false,
  },
  {
    id: "agt-002",
    firstName: "Amaka",
    lastName: "Nwosu",
    email: "amaka.n@lagosrealty.com",
    phone: "+234 802 345 6789",
    role: "AGENT",
    tier: "PRO" as const,
    status: "VERIFIED" as const,
    region: "Ikeja Division",
    lgaId: "lga-003",
    avatarUrl: null,
    joinedDate: "2023-06-20",
    listingsCount: 31,
    verifiedListings: 28,
    activeDeals: 4,
    rating: 4.5,
    escrowManaged: 7800000,
    riskScore: 23,
    isRiskFlagged: false,
  },
  {
    id: "agt-003",
    firstName: "Tobi",
    lastName: "Adeleke",
    email: "tobi.adeleke@gmail.com",
    phone: "+234 808 901 2345",
    role: "AGENT",
    tier: "FREE" as const,
    status: "PENDING" as const,
    region: "Lagos Mainland",
    lgaId: "lga-002",
    avatarUrl: null,
    joinedDate: "2024-02-10",
    listingsCount: 8,
    verifiedListings: 3,
    activeDeals: 1,
    rating: 3.9,
    escrowManaged: 1200000,
    riskScore: 61,
    isRiskFlagged: true,
  },
  {
    id: "agt-004",
    firstName: "Premium",
    lastName: "Estates Ltd",
    email: "info@premiumestates-ng.com",
    phone: "+234 901 234 5678",
    role: "AGENT",
    tier: "PREMIER" as const,
    status: "VERIFIED" as const,
    region: "Lagos Island / VI",
    lgaId: "lga-006",
    avatarUrl: null,
    joinedDate: "2022-09-05",
    listingsCount: 127,
    verifiedListings: 121,
    activeDeals: 23,
    rating: 4.9,
    escrowManaged: 45000000,
    riskScore: 4,
    isRiskFlagged: false,
  },
  {
    id: "agt-005",
    firstName: "Fatima",
    lastName: "Ibrahim",
    email: "fatima.i@northlagos.ng",
    phone: "+234 705 678 9012",
    role: "AGENT",
    tier: "PRO" as const,
    status: "VERIFIED" as const,
    region: "Kosofe / Mainland East",
    lgaId: "lga-008",
    avatarUrl: null,
    joinedDate: "2023-11-14",
    listingsCount: 22,
    verifiedListings: 19,
    activeDeals: 3,
    rating: 4.3,
    escrowManaged: 4500000,
    riskScore: 18,
    isRiskFlagged: false,
  },
  {
    id: "agt-006",
    firstName: "Chike",
    lastName: "Eze",
    email: "chike.eze@realestate.ng",
    phone: "+234 812 345 6789",
    role: "AGENT",
    tier: "FREE" as const,
    status: "SUSPENDED" as const,
    region: "Surulere / Ajeromi",
    lgaId: "lga-001",
    avatarUrl: null,
    joinedDate: "2024-01-03",
    listingsCount: 5,
    verifiedListings: 1,
    activeDeals: 0,
    rating: 2.8,
    escrowManaged: 0,
    riskScore: 88,
    isRiskFlagged: true,
  },
];

const STATS = [
  { label: "Total Agents", value: 247, icon: Briefcase, color: "primary" },
  { label: "Verified", value: 198, icon: CheckCircle2, color: "success" },
  { label: "Active Deals", value: 84, icon: TrendingUp, color: "info" },
  { label: "Risk Flagged", value: 12, icon: AlertTriangle, color: "danger" },
];

const TIER_CONFIG = {
  FREE: { icon: Star, color: "text-gray-500", bg: "bg-gray-100", label: "Free" },
  PRO: { icon: Crown, color: "text-amber-600", bg: "bg-amber-50", label: "Pro" },
  PREMIER: { icon: Sparkles, color: "text-primary-600", bg: "bg-primary-50", label: "Premier" },
};

const STATUS_CONFIG = {
  VERIFIED: { color: "bg-success/15 text-success border-success/30", dot: "bg-success" },
  PENDING: { color: "bg-warning/15 text-warning border-warning/30", dot: "bg-warning" },
  SUSPENDED: { color: "bg-danger/15 text-danger border-danger/30", dot: "bg-danger" },
  REJECTED: { color: "bg-gray-100 text-gray-500 border-gray-200", dot: "bg-gray-400" },
};

type Agent = typeof MOCK_AGENTS[0];
type AgentTier = "FREE" | "PRO" | "PREMIER";

// ==================== CONTEXT MENU ====================

interface ContextMenuProps {
  agent: Agent;
  onClose: () => void;
}

function AgentContextMenu({ agent, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const actions = [
    { icon: Eye, label: "View Profile", action: () => toast.success(`Viewing ${agent.firstName}'s profile`) },
    { icon: Building2, label: "View Listings", action: () => toast.success(`Loading ${agent.firstName}'s listings`) },
    { icon: MessageSquare, label: "Send Message", action: () => toast.success("Opening message composer") },
    { icon: Link2, label: "View Backlinks", action: () => toast.success("Loading backlinks") },
    { icon: ArrowUpCircle, label: "Upgrade Tier", action: () => toast.success("Opening tier upgrade") },
    ...(agent.isRiskFlagged
      ? []
      : [{ icon: Flag, label: "Flag Risk", action: () => toast.error(`${agent.firstName} flagged for review`) }]),
    ...(agent.status === "SUSPENDED"
      ? [{ icon: CheckCircle2, label: "Reinstate Agent", action: () => toast.success("Agent reinstated") }]
      : [{ icon: Ban, label: "Suspend Agent", action: () => toast.error(`${agent.firstName} suspended`) }]),
  ];

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-0 z-50 w-52 rounded-2xl border border-gray-100 bg-white shadow-premium overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-gray-50">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          Agent Actions
        </p>
      </div>
      {actions.map((action, i) => (
        <button
          key={i}
          onClick={() => {
            action.action();
            onClose();
          }}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
            action.label === "Suspend Agent" || action.label === "Flag Risk"
              ? "text-danger hover:bg-danger/5"
              : "text-gray-700 hover:bg-gray-50"
          )}
        >
          <action.icon className="h-4 w-4 shrink-0 opacity-70" />
          {action.label}
        </button>
      ))}
    </div>
  );
}

// ==================== AGENT CARD ====================

function AgentCard({ agent }: { agent: Agent }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const tierConfig = TIER_CONFIG[agent.tier];
  const statusConfig = STATUS_CONFIG[agent.status] ?? STATUS_CONFIG.PENDING;
  const TierIcon = tierConfig.icon;

  const riskColor =
    agent.riskScore >= 70
      ? "text-danger bg-danger/10"
      : agent.riskScore >= 40
        ? "text-warning bg-warning/10"
        : "text-success bg-success/10";

  const initials = getInitials(agent.firstName, agent.lastName);

  return (
    <div
      className={cn(
        "group relative bg-white rounded-3xl border p-5 shadow-sm hover:shadow-premium transition-all duration-300 hover:-translate-y-1 flex flex-col",
        agent.isRiskFlagged ? "border-danger/30 bg-danger/[0.02]" : "border-gray-100"
      )}
    >
      {/* Risk badge */}
      {agent.isRiskFlagged && (
        <div className="absolute top-4 right-4">
          <span className="flex items-center gap-1 text-[10px] font-bold text-danger bg-danger/10 px-2 py-1 rounded-full border border-danger/20">
            <AlertTriangle className="h-3 w-3" />
            RISK
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="relative shrink-0">
          <div
            className={cn(
              "h-14 w-14 rounded-2xl flex items-center justify-center font-bold text-lg",
              agent.tier === "PREMIER"
                ? "bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-glow-sm"
                : agent.tier === "PRO"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-gray-100 text-gray-700"
            )}
          >
            {initials}
          </div>
          {/* Tier badge */}
          <div
            className={cn(
              "absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center shadow-sm border-2 border-white",
              tierConfig.bg
            )}
          >
            <TierIcon className={cn("h-2.5 w-2.5", tierConfig.color)} />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 leading-tight truncate">
            {agent.firstName} {agent.lastName}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border",
                statusConfig.color
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", statusConfig.dot)} />
              {agent.status}
            </span>
          </div>
        </div>

        {/* More menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 text-gray-300 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          {menuOpen && (
            <AgentContextMenu agent={agent} onClose={() => setMenuOpen(false)} />
          )}
        </div>
      </div>

      {/* Contact info */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Mail className="h-3 w-3 shrink-0 text-gray-400" />
          <span className="truncate">{agent.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Phone className="h-3 w-3 shrink-0 text-gray-400" />
          <span>{agent.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <MapPin className="h-3 w-3 shrink-0 text-gray-400" />
          <span className="truncate">{agent.region}</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-gray-50 rounded-xl p-2 text-center">
          <p className="text-sm font-bold text-gray-900">{agent.listingsCount}</p>
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mt-0.5">Listings</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-2 text-center">
          <p className="text-sm font-bold text-gray-900">{agent.activeDeals}</p>
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mt-0.5">Active</p>
        </div>
        <div className={cn("rounded-xl p-2 text-center", riskColor)}>
          <p className="text-sm font-bold">{agent.riskScore}</p>
          <p className="text-[10px] font-medium uppercase tracking-wide mt-0.5 opacity-80">Risk</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-auto">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={cn(
                "h-3 w-3",
                s <= Math.floor(agent.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"
              )}
            />
          ))}
          <span className="ml-1 text-xs font-bold text-gray-700">{agent.rating}</span>
        </div>

        <button
          onClick={() => toast.success(`Viewing ${agent.firstName}'s full profile`)}
          className="text-xs font-bold text-primary-600 hover:text-primary-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
        >
          <Eye className="h-3 w-3" />
          Profile
        </button>
      </div>
    </div>
  );
}

// ==================== MAIN PAGE ====================

export function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<AgentTier | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [showFilters, setShowFilters] = useState(false);
  const [riskOnly, setRiskOnly] = useState(false);

  const filteredAgents = MOCK_AGENTS.filter((agent) => {
    const term = searchQuery.toLowerCase();
    const matchesSearch =
      agent.firstName.toLowerCase().includes(term) ||
      agent.lastName.toLowerCase().includes(term) ||
      agent.email.toLowerCase().includes(term) ||
      agent.region.toLowerCase().includes(term);
    const matchesTier = tierFilter === "ALL" || agent.tier === tierFilter;
    const matchesStatus = statusFilter === "ALL" || agent.status === statusFilter;
    const matchesRisk = !riskOnly || agent.isRiskFlagged;
    return matchesSearch && matchesTier && matchesStatus && matchesRisk;
  });

  const tierCounts = {
    FREE: MOCK_AGENTS.filter((a) => a.tier === "FREE").length,
    PRO: MOCK_AGENTS.filter((a) => a.tier === "PRO").length,
    PREMIER: MOCK_AGENTS.filter((a) => a.tier === "PREMIER").length,
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <BigHeader subtitle="Manage certified agents, performance metrics and verification status">
          Agent Management
        </BigHeader>

        <div className="flex items-center gap-3">
          {riskOnly && (
            <button
              onClick={() => setRiskOnly(false)}
              className="flex items-center gap-1.5 text-xs font-bold text-danger bg-danger/10 px-3 py-2 rounded-xl border border-danger/20 hover:bg-danger/15 transition-colors"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              Risk Filter Active
              <X className="h-3 w-3 ml-1" />
            </button>
          )}
          <button
            onClick={() => setRiskOnly(!riskOnly)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all",
              riskOnly
                ? "bg-danger text-white border-danger shadow-sm"
                : "bg-white border-gray-200 text-gray-600 hover:border-danger/50 hover:text-danger"
            )}
          >
            <Flag className="h-4 w-4" />
            Risk View
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-premium transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  {stat.label}
                </p>
                <p className="text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={cn(
                  "h-11 w-11 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform",
                  stat.color === "primary" && "bg-primary-50 text-primary-600",
                  stat.color === "success" && "bg-success/10 text-success",
                  stat.color === "info" && "bg-blue-50 text-blue-600",
                  stat.color === "danger" && "bg-danger/10 text-danger"
                )}
              >
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search agents by name, email or region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 h-10 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-500/10 outline-none transition-all placeholder:text-gray-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Tier quick filters */}
            {(["ALL", "FREE", "PRO", "PREMIER"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                className={cn(
                  "flex items-center gap-1.5 px-3 h-9 rounded-xl text-xs font-bold transition-all",
                  tierFilter === t
                    ? t === "ALL"
                      ? "bg-gray-900 text-white"
                      : t === "PREMIER"
                        ? "bg-primary-500 text-white shadow-glow-sm"
                        : t === "PRO"
                          ? "bg-amber-500 text-white"
                          : "bg-gray-500 text-white"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100"
                )}
              >
                {t !== "ALL" && (() => {
                  const cfg = TIER_CONFIG[t as AgentTier];
                  const Icon = cfg.icon;
                  return <Icon className="h-3 w-3" />;
                })()}
                {t === "ALL" ? "All Tiers" : t}
                {t !== "ALL" && (
                  <span className="ml-0.5 opacity-70">
                    ({tierCounts[t as AgentTier]})
                  </span>
                )}
              </button>
            ))}

            {/* Advanced filters */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-1.5 px-3 h-9 rounded-xl text-xs font-bold border transition-all",
                showFilters ? "bg-primary-50 border-primary-200 text-primary-600" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              )}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
              <ChevronDown className={cn("h-3 w-3 transition-transform", showFilters && "rotate-180")} />
            </button>
          </div>
        </div>

        {/* Advanced filter panel */}
        {showFilters && (
          <div className="px-4 pb-4 pt-0 border-t border-gray-50 flex flex-wrap gap-3 items-center animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status:</span>
              {["ALL", "VERIFIED", "PENDING", "SUSPENDED"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    "px-3 h-7 rounded-lg text-xs font-semibold transition-all",
                    statusFilter === s ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          Showing <span className="font-bold text-gray-900">{filteredAgents.length}</span> of{" "}
          <span className="font-bold text-gray-900">{MOCK_AGENTS.length}</span> agents
        </p>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-400" />
          <span className="text-xs font-medium text-gray-400">247 platform agents</span>
        </div>
      </div>

      {/* Agent Grid */}
      {filteredAgents.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center">
          <Briefcase className="h-10 w-10 text-gray-200 mx-auto" />
          <p className="text-gray-400 font-medium mt-3">No agents match your filters</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setTierFilter("ALL");
              setStatusFilter("ALL");
              setRiskOnly(false);
            }}
            className="mt-4 text-sm font-bold text-primary-600 hover:text-primary-700"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AgentsPage;
