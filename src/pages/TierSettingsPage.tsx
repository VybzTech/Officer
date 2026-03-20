// ============================================
// URBAN GRAVITY - TIER SETTINGS PAGE
// Premium subscription tier management
// ============================================

import { useEffect, useState } from "react";
import {
  Crown,
  Star,
  Sparkles,
  Home,
  Phone,
  Shield,
  Headphones,
  Check,
  Edit3,
  RefreshCw,
  Users,
  TrendingUp,
  Lock,
  Zap,
  X,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { BigHeader } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useDataStore } from "@/stores/dataStore";
import { cn } from "@/utils/cn";
import { formatNaira } from "@/utils/format";
import Loader from "@/components/ui/Loader";
import type { TierConfig } from "@/data/mockDatabase";
import toast from "react-hot-toast";

// ==================== CONFIG ====================

const TIER_META = {
  FREE: {
    icon: Star,
    gradient: "from-gray-100 to-gray-50",
    border: "border-gray-200",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-500",
    accentColor: "bg-gray-400",
    badgeVariant: "default" as const,
    userCount: 1847,
    growth: "+8%",
    description: "Entry level for individual landlords getting started on the platform.",
    highlight: false,
  },
  PRO: {
    icon: Crown,
    gradient: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    accentColor: "bg-amber-400",
    badgeVariant: "warning" as const,
    userCount: 642,
    growth: "+24%",
    description: "For active landlords managing multiple properties with premium tools.",
    highlight: false,
  },
  PREMIER: {
    icon: Sparkles,
    gradient: "from-primary-600 to-primary-800",
    border: "border-primary-500",
    iconBg: "bg-white/20",
    iconColor: "text-white",
    accentColor: "bg-primary-400",
    badgeVariant: "primary" as const,
    userCount: 193,
    growth: "+41%",
    description: "Top-tier for agencies and enterprise landlords with unlimited access.",
    highlight: true,
  },
};

const COMPARISON_ROWS = [
  { label: "Listing Limit", icon: Home, key: "listingLimit" as const, format: (v: number) => v === -1 ? "Unlimited" : String(v) },
  { label: "Contacts/Month", icon: Phone, key: "contactsPerMonth" as const, format: (v: number) => v === -1 ? "Unlimited" : `${v}/mo` },
  { label: "Verification Priority", icon: Shield, key: "verificationPriority" as const, format: (v: string) => v },
  { label: "Support Level", icon: Headphones, key: "supportLevel" as const, format: (v: string) => v },
];

// ==================== EDIT MODAL ====================

function EditTierModal({ tier, onClose }: { tier: TierConfig; onClose: () => void }) {
  const meta = TIER_META[tier.tier];
  const TierIcon = meta.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-premium-lg w-full max-w-lg mx-4 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className={cn("p-6 flex items-center justify-between", tier.tier === "PREMIER" ? "bg-gradient-to-r from-primary-600 to-primary-800" : "bg-gray-50 border-b border-gray-100")}>
          <div className="flex items-center gap-3">
            <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", meta.iconBg)}>
              <TierIcon className={cn("h-5 w-5", meta.iconColor)} />
            </div>
            <div>
              <h2 className={cn("font-bold text-lg", tier.tier === "PREMIER" ? "text-white" : "text-gray-900")}>
                Edit {tier.name} Tier
              </h2>
              <p className={cn("text-xs font-medium", tier.tier === "PREMIER" ? "text-white/70" : "text-gray-500")}>
                Configuration & Limits
              </p>
            </div>
          </div>
          <button onClick={onClose} className={cn("p-2 rounded-xl transition-colors", tier.tier === "PREMIER" ? "text-white/70 hover:text-white hover:bg-white/10" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100")}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Price (₦/month)</label>
              <input
                type="number"
                defaultValue={tier.price}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm font-medium focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Listing Limit (-1 = ∞)</label>
              <input
                type="number"
                defaultValue={tier.listingLimit}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm font-medium focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Contacts/Month (-1 = ∞)</label>
              <input
                type="number"
                defaultValue={tier.contactsPerMonth}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm font-medium focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Status</label>
              <div className={cn("flex items-center gap-2 h-10 px-3 rounded-xl border cursor-pointer", tier.isActive ? "border-success/40 bg-success/5" : "border-gray-200 bg-gray-50")}>
                {tier.isActive ? <ToggleRight className="h-5 w-5 text-success" /> : <ToggleLeft className="h-5 w-5 text-gray-400" />}
                <span className={cn("text-sm font-medium", tier.isActive ? "text-success" : "text-gray-500")}>
                  {tier.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-warning/5 border border-warning/20 rounded-xl flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600">
              Changing tier limits will <strong>immediately affect</strong> all {meta.userCount.toLocaleString()} existing users on this plan.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => {
                toast.success(`${tier.name} tier updated successfully`);
                onClose();
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== TIER CARD ====================

function TierCard({ tier, onEdit }: { tier: TierConfig; onEdit: () => void }) {
  const meta = TIER_META[tier.tier];
  const TierIcon = meta.icon;
  const isPremier = tier.tier === "PREMIER";

  return (
    <div className={cn(
      "relative rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-premium group",
      isPremier
        ? "bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 border-primary-500 shadow-glow-sm"
        : `bg-gradient-to-br ${meta.gradient} ${meta.border}`
    )}>
      {/* Most Popular badge */}
      {isPremier && (
        <div className="absolute top-4 right-4">
          <span className="flex items-center gap-1 text-[10px] font-bold text-primary-700 bg-white px-2.5 py-1 rounded-full">
            <Zap className="h-2.5 w-2.5" />
            MOST POPULAR
          </span>
        </div>
      )}

      <div className="p-6">
        {/* Icon + Name */}
        <div className="flex items-center gap-3 mb-5">
          <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-sm", meta.iconBg)}>
            <TierIcon className={cn("h-6 w-6", meta.iconColor)} />
          </div>
          <div>
            <h3 className={cn("font-extrabold text-lg tracking-tight", isPremier ? "text-white" : "text-gray-900")}>
              {tier.name}
            </h3>
            <Badge variant={tier.isActive ? "success" : "default"} className="text-[10px]">
              {tier.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>

        {/* Price */}
        <div className="mb-5">
          <div className="flex items-baseline gap-1">
            <span className={cn("text-4xl font-black tracking-tighter", isPremier ? "text-white" : "text-gray-900")}>
              {tier.price === 0 ? "Free" : formatNaira(tier.price)}
            </span>
            {tier.price > 0 && (
              <span className={cn("text-sm font-medium", isPremier ? "text-white/60" : "text-gray-400")}>/mo</span>
            )}
          </div>
          <p className={cn("text-xs mt-1 leading-relaxed", isPremier ? "text-white/70" : "text-gray-500")}>
            {meta.description}
          </p>
        </div>

        {/* User stats */}
        <div className={cn("flex items-center justify-between p-3 rounded-2xl mb-5", isPremier ? "bg-white/10" : "bg-white/70 border border-white/60")}>
          <div className="flex items-center gap-2">
            <Users className={cn("h-4 w-4", isPremier ? "text-white/60" : "text-gray-400")} />
            <span className={cn("text-sm font-bold", isPremier ? "text-white" : "text-gray-900")}>
              {meta.userCount.toLocaleString()}
            </span>
            <span className={cn("text-xs", isPremier ? "text-white/60" : "text-gray-400")}>users</span>
          </div>
          <span className={cn("text-xs font-bold flex items-center gap-1", isPremier ? "text-emerald-300" : "text-success")}>
            <TrendingUp className="h-3 w-3" />
            {meta.growth}
          </span>
        </div>

        {/* Features */}
        <div className="space-y-2.5 mb-6">
          {tier.features.slice(0, 5).map((feature, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className={cn("h-5 w-5 rounded-full flex items-center justify-center shrink-0", isPremier ? "bg-white/20" : "bg-success/10")}>
                <Check className={cn("h-3 w-3", isPremier ? "text-white" : "text-success")} />
              </div>
              <span className={cn("text-sm font-medium", isPremier ? "text-white/90" : "text-gray-700")}>{feature}</span>
            </div>
          ))}
          {tier.features.length > 5 && (
            <button className={cn("flex items-center gap-1 text-xs font-bold pl-7", isPremier ? "text-white/60 hover:text-white" : "text-primary-500 hover:text-primary-600")}>
              +{tier.features.length - 5} more features
              <ChevronRight className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Key limits */}
        <div className={cn("grid grid-cols-2 gap-3 p-4 rounded-2xl mb-5", isPremier ? "bg-white/10" : "bg-white/70 border border-white/60")}>
          <div>
            <p className={cn("text-[10px] font-bold uppercase tracking-wider", isPremier ? "text-white/50" : "text-gray-400")}>Listings</p>
            <p className={cn("font-extrabold text-sm mt-0.5", isPremier ? "text-white" : "text-gray-900")}>
              {tier.listingLimit === -1 ? "∞ Unlimited" : tier.listingLimit}
            </p>
          </div>
          <div>
            <p className={cn("text-[10px] font-bold uppercase tracking-wider", isPremier ? "text-white/50" : "text-gray-400")}>Contacts</p>
            <p className={cn("font-extrabold text-sm mt-0.5", isPremier ? "text-white" : "text-gray-900")}>
              {tier.contactsPerMonth === -1 ? "∞ Unlimited" : `${tier.contactsPerMonth}/mo`}
            </p>
          </div>
        </div>

        {/* Edit button */}
        <button
          onClick={onEdit}
          className={cn(
            "w-full flex items-center justify-center gap-2 h-10 rounded-2xl text-sm font-bold transition-all",
            isPremier
              ? "bg-white text-primary-700 hover:bg-white/90"
              : "bg-white border border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50"
          )}
        >
          <Edit3 className="h-4 w-4" />
          Edit Tier
        </button>
      </div>
    </div>
  );
}

// ==================== COMPARISON TABLE ====================

function ComparisonTable({ tierConfigs }: { tierConfigs: TierConfig[] }) {
  const renderValue = (tier: TierConfig, row: typeof COMPARISON_ROWS[0]) => {
    const val = tier[row.key] as any;
    const formatted = row.format(val);

    if (row.key === "verificationPriority") {
      return (
        <Badge variant={val === "HIGH" ? "success" : val === "MEDIUM" ? "warning" : "default"}>
          {formatted}
        </Badge>
      );
    }
    if (row.key === "supportLevel") {
      return (
        <Badge variant={val === "DEDICATED" ? "success" : val === "PRIORITY" ? "warning" : "default"}>
          {formatted}
        </Badge>
      );
    }
    return <span className="font-semibold text-gray-900">{formatted}</span>;
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-50 flex items-center gap-3">
        <div className="h-8 w-8 rounded-xl bg-primary-50 flex items-center justify-center">
          <Lock className="h-4 w-4 text-primary-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Feature Comparison</h3>
          <p className="text-xs text-gray-400">Side-by-side tier capabilities</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-40">Feature</th>
              {tierConfigs.map((tier) => {
                const meta = TIER_META[tier.tier];
                const TierIcon = meta.icon;
                const isPremier = tier.tier === "PREMIER";
                return (
                  <th key={tier.id} className="text-center py-4 px-6">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className={cn("h-8 w-8 rounded-xl flex items-center justify-center", isPremier ? "bg-primary-500" : meta.iconBg)}>
                        <TierIcon className={cn("h-4 w-4", isPremier ? "text-white" : meta.iconColor)} />
                      </div>
                      <span className="text-sm font-bold text-gray-900">{tier.name}</span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.key} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <row.icon className="h-4 w-4 text-gray-400 shrink-0" />
                    {row.label}
                  </div>
                </td>
                {tierConfigs.map((tier) => (
                  <td key={tier.id} className="py-4 px-6 text-center text-sm">
                    {renderValue(tier, row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==================== MAIN PAGE ====================

export function TierSettingsPage() {
  const { tierConfigs, isLoading, fetchTierConfigs } = useDataStore();
  const [editingTier, setEditingTier] = useState<TierConfig | null>(null);

  useEffect(() => {
    fetchTierConfigs();
  }, [fetchTierConfigs]);

  if (isLoading.tierConfigs) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader size="lg" />
      </div>
    );
  }

  const totalUsers = Object.values(TIER_META).reduce((sum, m) => sum + m.userCount, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <BigHeader subtitle="Configure subscription tiers, pricing, features and limits">
          Tier Settings
        </BigHeader>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Platform Users</p>
            <p className="text-2xl font-extrabold text-gray-900">{totalUsers.toLocaleString()}</p>
          </div>
          <button
            onClick={() => { fetchTierConfigs(); toast.success("Tier configs refreshed"); }}
            className="flex items-center gap-2 h-10 px-4 rounded-2xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stat overview tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tierConfigs.map((tier) => {
          const meta = TIER_META[tier.tier];
          const TierIcon = meta.icon;
          const isPremier = tier.tier === "PREMIER";

          return (
            <div
              key={tier.id}
              className={cn(
                "relative rounded-2xl border p-4 overflow-hidden transition-all hover:shadow-premium group",
                isPremier
                  ? "bg-gradient-to-br from-primary-600 to-primary-800 border-primary-500"
                  : `bg-gradient-to-br ${meta.gradient} ${meta.border}`
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={cn("text-[11px] font-bold uppercase tracking-wider", isPremier ? "text-white/60" : "text-gray-400")}>
                    {tier.name} Accounts
                  </p>
                  <p className={cn("text-3xl font-extrabold tracking-tight mt-1", isPremier ? "text-white" : "text-gray-900")}>
                    {meta.userCount.toLocaleString()}
                  </p>
                  <p className={cn("text-xs font-bold flex items-center gap-1 mt-1", isPremier ? "text-emerald-300" : "text-success")}>
                    <TrendingUp className="h-3 w-3" />
                    {meta.growth} this month
                  </p>
                </div>
                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", isPremier ? "bg-white/20" : meta.iconBg)}>
                  <TierIcon className={cn("h-6 w-6", isPremier ? "text-white" : meta.iconColor)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tier Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {tierConfigs.map((tier) => (
          <TierCard
            key={tier.id}
            tier={tier}
            onEdit={() => setEditingTier(tier)}
          />
        ))}
      </div>

      {/* Comparison Table */}
      <ComparisonTable tierConfigs={tierConfigs} />

      {/* Edit Modal */}
      {editingTier && (
        <EditTierModal tier={editingTier} onClose={() => setEditingTier(null)} />
      )}
    </div>
  );
}

export default TierSettingsPage;
