import { useState, useMemo } from "react";
import {
  Shield,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Flag,
  BookOpen,
  Search,
  ChevronDown,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

// --- Types & Constants ---

interface ViolationCategory {
  id: string;
  name: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  action: string;
  examples: string[];
}

const VIOLATION_CATEGORIES: ViolationCategory[] = [
  {
    id: "fraud",
    name: "Fraud & Scam",
    description: "Fake listings, payment scams, identity theft",
    severity: "critical",
    action: "Immediate Suspension",
    examples: ["Duplicate photos", "Off-platform payment", "Fake docs"],
  },
  // ... other categories stay the same
];

const SEVERITY_MAP = {
  critical: "bg-danger-100 text-danger-700",
  high: "bg-warning-100 text-warning-700",
  medium: "bg-info-100 text-info-700",
  low: "bg-success-100 text-success-700",
};

// --- Sub-Components ---

const StatCard = ({ label, value, icon: Icon }: any) => (
  <Card padding="md">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
      </div>
      <Icon className="h-5 w-5 text-gray-300" />
    </div>
  </Card>
);

const ViolationItem = ({ category, isExpanded, onToggle }: any) => (
  <Card
    padding="md"
    className={cn(
      "cursor-pointer transition-all hover:shadow-md",
      isExpanded && "ring-2 ring-primary-500"
    )}
    onClick={onToggle}
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-gray-900">{category.name}</h3>
          <Badge className={SEVERITY_MAP[category.severity as keyof typeof SEVERITY_MAP]}>
            {category.severity.toUpperCase()}
          </Badge>
        </div>
        <p className="text-sm text-gray-500">{category.description}</p>
      </div>
      <ChevronDown className={cn("h-5 w-5 text-gray-400 transition-transform", isExpanded && "rotate-180")} />
    </div>

    {isExpanded && (
      <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 animate-in fade-in slide-in-from-top-1">
        <div>
          <p className="font-bold text-gray-900 mb-2 text-sm">Examples:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {category.examples.map((ex: string, idx: number) => (
              <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                <Flag className="h-3 w-3 text-gray-400" /> {ex}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-50 -mx-4 -mb-4 p-3 rounded-b-lg border-t border-gray-100">
          <p className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Enforcement: <span className="text-danger-600">{category.action}</span>
          </p>
        </div>
      </div>
    )}
  </Card>
);

// --- Main Component ---

export function ModerationGuidePage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return VIOLATION_CATEGORIES.filter(
      (cat) => cat.name.toLowerCase().includes(query) || cat.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary-600" />
            Moderation Policy
          </h1>
          <p className="text-gray-500 mt-1">Enforcement standards and operational workflows.</p>
        </div>
        <Input
          placeholder="Search policies..."
          icon={Search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
      </header>

      {/* Stats Overview */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Reports" value="342" icon={Flag} />
        <StatCard label="Resolved" value="328" icon={CheckCircle2} />
        <StatCard label="Pending" value="14" icon={AlertCircle} />
        <StatCard label="Appeals" value="8" icon={XCircle} />
      </section>

      {/* Categories */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Violation Categories</h2>
        <div className="space-y-3">
          {filteredCategories.map((cat) => (
            <ViolationItem
              key={cat.id}
              category={cat}
              isExpanded={expandedId === cat.id}
              onToggle={() => setExpandedId(expandedId === cat.id ? null : cat.id)}
            />
          ))}
        </div>
      </section>

      {/* Workflow & Policy Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Operational Workflow" className="h-full">
            {/* Logic for the vertical timeline goes here */}
        </Card>

        <div className="space-y-6">
          <Card className="bg-blue-50/50 border-blue-100">
            <h3 className="font-bold text-blue-900 mb-2">The Appeal Process</h3>
            <p className="text-sm text-blue-800 mb-3">Users have 14 days to contest decisions.</p>
            <ul className="text-sm text-blue-800 space-y-1 list-disc pl-4">
              <li>Manual review by senior staff</li>
              <li>Evidence reconsideration</li>
              <li>Final resolution within 72h</li>
            </ul>
          </Card>

          <Card className="bg-emerald-50/50 border-emerald-100">
            <h3 className="font-bold text-emerald-900 mb-2">Best Practices</h3>
            <p className="text-sm text-emerald-800">Neutrality is our priority. Always document the specific community guideline violated when issuing a ban.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ModerationGuidePage;