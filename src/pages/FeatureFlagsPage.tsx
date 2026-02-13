// ============================================
// URBAN GRAVITY - FEATURE FLAGS PAGE
// Manage feature toggles for the platform
// ============================================

import { useEffect, useState } from "react";
import {
  ToggleLeft,
  ToggleRight,
  Search,
  Filter,
  RefreshCw,
  Users,
  Clock,
  Info,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Toggle from "@/components/ui/Toggle";
import { useDataStore } from "@/stores/dataStore";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/format";
import Loader from "@/components/ui/Loader";

export function FeatureFlagsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { featureFlags, isLoading, isActionLoading, fetchFeatureFlags, toggleFeatureFlag } = useDataStore();
  const { officer } = useAuthStore();

  useEffect(() => {
    fetchFeatureFlags();
  }, [fetchFeatureFlags]);

  const filteredFlags = featureFlags.filter((flag) =>
    flag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flag.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = async (id: string, currentValue: boolean) => {
    await toggleFeatureFlag(id, !currentValue);
  };

  const enabledCount = featureFlags.filter((f) => f.isEnabled).length;
  const disabledCount = featureFlags.filter((f) => !f.isEnabled).length;

  if (isLoading.featureFlags) {
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
          <h1 className="text-2xl font-bold text-gray-900">Feature Flags</h1>
          <p className="text-gray-500 mt-1">
            Control feature availability across the platform
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => fetchFeatureFlags()}
          leftIcon={<RefreshCw className="h-4 w-4" />}
        >
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Flags</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{featureFlags.length}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              <ToggleLeft className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Enabled</p>
              <p className="text-2xl font-bold text-success mt-1">{enabledCount}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Disabled</p>
              <p className="text-2xl font-bold text-gray-500 mt-1">{disabledCount}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
              <XCircle className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search feature flags..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputSize="sm"
          />
        </div>
      </div>

      {/* Feature Flags List */}
      <div className="space-y-4">
        {filteredFlags.map((flag) => {
          const isToggling = isActionLoading[`flag-${flag.id}`];

          return (
            <Card key={flag.id} padding="none" className="overflow-hidden">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0",
                    flag.isEnabled
                      ? "bg-success/10 text-success"
                      : "bg-gray-100 text-gray-400"
                  )}>
                    {flag.isEnabled ? (
                      <ToggleRight className="h-6 w-6" />
                    ) : (
                      <ToggleLeft className="h-6 w-6" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{flag.name}</h3>
                      <code className="px-2 py-0.5 rounded bg-gray-100 text-xs font-mono text-gray-600">
                        {flag.key}
                      </code>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{flag.description}</p>

                    <div className="flex items-center gap-6 mt-3">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>
                          Enabled for: {flag.enabledFor.length > 0
                            ? flag.enabledFor.join(", ")
                            : "No roles"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>Updated {formatDate(flag.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Toggle
                    checked={flag.isEnabled}
                    onChange={() => handleToggle(flag.id, flag.isEnabled)}
                    disabled={isToggling}
                    label={flag.isEnabled ? "Enabled" : "Disabled"}
                  />
                </div>
              </div>

              {/* Info Banner */}
              {flag.isEnabled && (
                <div className="px-6 py-3 bg-success/5 border-t border-success/10 flex items-center gap-2">
                  <Info className="h-4 w-4 text-success" />
                  <span className="text-sm text-success-dark">
                    This feature is currently active for {flag.enabledFor.length} role(s)
                  </span>
                </div>
              )}
            </Card>
          );
        })}

        {filteredFlags.length === 0 && (
          <Card padding="lg" className="text-center">
            <ToggleLeft className="h-12 w-12 text-gray-300 mx-auto" />
            <p className="text-gray-500 mt-4">No feature flags found</p>
          </Card>
        )}
      </div>
    </div>
  );
}

export default FeatureFlagsPage;
