// ============================================
// URBAN GRAVITY - APP CONFIGURATION PAGE
// Manage application settings and configurations
// ============================================

import { useEffect, useState } from "react";
import {
  Settings,
  Shield,
  Bell,
  CreditCard,
  Layers,
  RefreshCw,
  Save,
  Search,
  Info,
  Clock,
  User,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import Toggle from "@/components/ui/Toggle";
import { useDataStore } from "@/stores/dataStore";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/format";
import Loader from "@/components/ui/Loader";
import type { AppConfig } from "@/data/mockDatabase";

const CATEGORY_ICONS = {
  GENERAL: Settings,
  SECURITY: Shield,
  NOTIFICATIONS: Bell,
  PAYMENTS: CreditCard,
  FEATURES: Layers,
};

const CATEGORY_COLORS = {
  GENERAL: { bg: "bg-gray-100", text: "text-gray-600" },
  SECURITY: { bg: "bg-error/10", text: "text-error" },
  NOTIFICATIONS: { bg: "bg-primary-100", text: "text-primary-600" },
  PAYMENTS: { bg: "bg-success/10", text: "text-success" },
  FEATURES: { bg: "bg-info/10", text: "text-info" },
};

export function AppConfigPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const { appConfigs, isLoading, isActionLoading, fetchAppConfigs, updateAppConfig } = useDataStore();
  const { officer } = useAuthStore();

  useEffect(() => {
    fetchAppConfigs();
  }, [fetchAppConfigs]);

  const categories = Array.from(new Set(appConfigs.map((c) => c.category)));

  const filteredConfigs = appConfigs.filter((config) => {
    const matchesSearch =
      config.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || config.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (config: AppConfig) => {
    setEditingId(config.id);
    setEditValue(config.value);
  };

  const handleSave = async (id: string) => {
    if (officer) {
      await updateAppConfig(id, editValue, officer.id);
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue("");
  };

  if (isLoading.appConfigs) {
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
          <h1 className="text-2xl font-bold text-gray-900">App Configuration</h1>
          <p className="text-gray-500 mt-1">
            Manage system-wide application settings
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => fetchAppConfigs()}
          leftIcon={<RefreshCw className="h-4 w-4" />}
        >
          Refresh
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "primary" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat as keyof typeof CATEGORY_ICONS];
          return (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "primary" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              leftIcon={<Icon className="h-4 w-4" />}
            >
              {cat.charAt(0) + cat.slice(1).toLowerCase()}
            </Button>
          );
        })}
      </div>

      {/* Search */}
      <div className="max-w-md">
        <Input
          placeholder="Search configurations..."
          icon={Search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputSize="sm"
        />
      </div>

      {/* Configuration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredConfigs.map((config) => {
          const Icon = CATEGORY_ICONS[config.category];
          const colors = CATEGORY_COLORS[config.category];
          const isEditing = editingId === config.id;
          const isSaving = isActionLoading[`config-${config.id}`];
          const isBoolean = config.value === "true" || config.value === "false";

          return (
            <Card key={config.id} padding="md">
              <div className="flex items-start gap-4">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0",
                  colors.bg
                )}>
                  <Icon className={cn("h-5 w-5", colors.text)} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                      {config.key}
                    </code>
                    <Badge variant="default" className="text-xs">
                      {config.category}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-500 mb-3">{config.description}</p>

                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      {isBoolean ? (
                        <Toggle
                          checked={editValue === "true"}
                          onChange={(checked) => setEditValue(checked ? "true" : "false")}
                          label={editValue === "true" ? "Enabled" : "Disabled"}
                        />
                      ) : (
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          inputSize="sm"
                          className="flex-1"
                        />
                      )}
                      <Button
                        size="sm"
                        onClick={() => handleSave(config.id)}
                        loading={isSaving}
                        leftIcon={<Save className="h-3 w-3" />}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isBoolean ? (
                          <Badge variant={config.value === "true" ? "success" : "default"}>
                            {config.value === "true" ? "Enabled" : "Disabled"}
                          </Badge>
                        ) : (
                          <span className="font-medium text-gray-900">{config.value}</span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(config)}
                      >
                        Edit
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(config.updatedAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {config.updatedBy}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredConfigs.length === 0 && (
        <Card padding="lg" className="text-center">
          <Settings className="h-12 w-12 text-gray-300 mx-auto" />
          <p className="text-gray-500 mt-4">No configurations found</p>
        </Card>
      )}

      {/* Info Banner */}
      <Card padding="md" className="bg-info/5 border-info/20">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-info-dark">Configuration Changes</p>
            <p className="text-sm text-gray-600 mt-1">
              Changes to configuration settings are logged in the audit trail and may require
              application restart to take effect. Critical security settings require 2FA verification.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AppConfigPage;
