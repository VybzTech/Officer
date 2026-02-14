// ============================================
// URBAN GRAVITY - TIER SETTINGS PAGE
// Manage subscription tier configurations
// ============================================

import { useEffect, useState } from "react";
import {
  Crown,
  Star,
  Sparkles,
  Users,
  Home,
  Phone,
  Shield,
  Headphones,
  Check,
  Edit3,
  RefreshCw,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useDataStore } from "@/stores/dataStore";
import { cn } from "@/utils/cn";
import { formatNaira } from "@/utils/format";
import Loader from "@/components/ui/Loader";
import type { TierConfig } from "@/data/mockDatabase";

const TIER_ICONS = {
  FREE: Star,
  PRO: Crown,
  PREMIER: Sparkles,
};

const TIER_COLORS = {
  FREE: {
    bg: "bg-gray-100",
    text: "text-gray-600",
    border: "border-gray-200",
    badge: "default" as const,
  },
  PRO: {
    bg: "bg-primary-50",
    text: "text-primary-600",
    border: "border-primary-200",
    badge: "warning" as const,
  },
  PREMIER: {
    bg: "bg-gradient-to-br from-primary-500 to-primary-600",
    text: "text-white",
    border: "border-primary-500",
    badge: "success" as const,
  },
};

export function TierSettingsPage() {
  const { tierConfigs, isLoading, fetchTierConfigs } = useDataStore();

  useEffect(() => {
    fetchTierConfigs();
  }, [fetchTierConfigs]);

  const totalAccounts = 73; // Mock data - would come from analytics

  if (isLoading.tierConfigs) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tier Settings</h1>
          <p className="text-gray-500 mt-1">
            Manage subscription tiers, features, and pricing
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => fetchTierConfigs()}
          leftIcon={<RefreshCw className="h-4 w-4" />}
        >
          Refresh
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tierConfigs.map((tier) => {
          const TierIcon = TIER_ICONS[tier.tier];
          const colors = TIER_COLORS[tier.tier];
          const isPremier = tier.tier === "PREMIER";

          return (
            <Card
              key={tier.id}
              padding="md"
              className={cn(
                isPremier && "text-white",
                colors.border,
                "border-2",
              )}
              style={
                isPremier
                  ? { background: "linear-gradient(135deg, #FFCA08, #D4A906)" }
                  : undefined
              }
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={cn(
                      "text-sm",
                      isPremier ? "text-white/80" : "text-gray-500",
                    )}
                  >
                    {tier.name} Accounts
                  </p>
                  <p
                    className={cn(
                      "text-2xl font-bold mt-1",
                      isPremier ? "text-white" : "text-gray-900",
                    )}
                  >
                    {Math.floor(Math.random() * 50) + 10}
                  </p>
                </div>
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    isPremier ? "bg-white/20" : colors.bg,
                  )}
                >
                  <TierIcon
                    className={cn(
                      "h-5 w-5",
                      isPremier ? "text-white" : colors.text,
                    )}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Tier Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {tierConfigs.map((tier) => (
          <TierCard key={tier.id} tier={tier} />
        ))}
      </div>

      {/* Feature Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">
                    Feature
                  </th>
                  {tierConfigs.map((tier) => (
                    <th
                      key={tier.id}
                      className="text-center py-3 px-4 font-medium text-gray-900"
                    >
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 px-4 text-gray-600 flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Listing Limit
                  </td>
                  {tierConfigs.map((tier) => (
                    <td
                      key={tier.id}
                      className="text-center py-3 px-4 font-medium text-gray-900"
                    >
                      {tier.listingLimit === -1
                        ? "Unlimited"
                        : tier.listingLimit}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-600 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contacts/Month
                  </td>
                  {tierConfigs.map((tier) => (
                    <td
                      key={tier.id}
                      className="text-center py-3 px-4 font-medium text-gray-900"
                    >
                      {tier.contactsPerMonth === -1
                        ? "Unlimited"
                        : tier.contactsPerMonth}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-600 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Verification Priority
                  </td>
                  {tierConfigs.map((tier) => (
                    <td key={tier.id} className="text-center py-3 px-4">
                      <Badge
                        variant={
                          tier.verificationPriority === "HIGH"
                            ? "success"
                            : tier.verificationPriority === "MEDIUM"
                              ? "warning"
                              : "default"
                        }
                      >
                        {tier.verificationPriority}
                      </Badge>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-600 flex items-center gap-2">
                    <Headphones className="h-4 w-4" />
                    Support Level
                  </td>
                  {tierConfigs.map((tier) => (
                    <td key={tier.id} className="text-center py-3 px-4">
                      <Badge
                        variant={
                          tier.supportLevel === "DEDICATED"
                            ? "success"
                            : tier.supportLevel === "PRIORITY"
                              ? "warning"
                              : "default"
                        }
                      >
                        {tier.supportLevel}
                      </Badge>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TierCard({ tier }: { tier: TierConfig }) {
  const TierIcon = TIER_ICONS[tier.tier];
  const colors = TIER_COLORS[tier.tier];
  const isPremier = tier.tier === "PREMIER";

  return (
    <Card
      className={cn(
        "relative overflow-hidden",
        isPremier && "ring-2 ring-primary-500",
      )}
    >
      {isPremier && (
        <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          POPULAR
        </div>
      )}

      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl",
              colors.bg,
            )}
          >
            <TierIcon className={cn("h-6 w-6", colors.text)} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{tier.name}</h3>
            <Badge variant={tier.isActive ? "success" : "default"}>
              {tier.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>

        <div className="mb-6">
          <span className="text-3xl font-bold text-gray-900">
            {tier.price === 0 ? "Free" : formatNaira(tier.price)}
          </span>
          {tier.price > 0 && (
            <span className="text-gray-500 text-sm">/month</span>
          )}
        </div>

        <div className="space-y-3 mb-6">
          {tier.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10">
                <Check className="h-3 w-3 text-success" />
              </div>
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Listings</p>
              <p className="font-semibold text-gray-900">
                {tier.listingLimit === -1 ? "Unlimited" : tier.listingLimit}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Contacts</p>
              <p className="font-semibold text-gray-900">
                {tier.contactsPerMonth === -1
                  ? "Unlimited"
                  : `${tier.contactsPerMonth}/mo`}
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full mt-4"
          leftIcon={<Edit3 className="h-4 w-4" />}
        >
          Edit Tier
        </Button>
      </CardContent>
    </Card>
  );
}

export default TierSettingsPage;
