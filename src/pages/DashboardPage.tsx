// ============================================
// URBAN GRAVITY - DASHBOARD PAGE
// Premium management interface for officers
// ============================================

import { useState } from "react";
import {
  Building2,
  Users,
  UserCheck,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  Wallet,
  Calendar,
  Filter,
  MoreVertical,
  Plus,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { PermissionGate } from "@/components/guards";
import { cn } from "@/utils/cn";
import { formatNaira } from "@/utils/format";

// ==================== MOCK DATA ====================
const STATS = [
  {
    label: "Total Listings",
    value: "2,847",
    change: "+12.5%",
    trend: "up" as const,
    icon: Building2,
    color: "primary",
    description: "Managed properties in Lagos",
  },
  {
    label: "Landlord Requests",
    value: "142",
    change: "+8.2%",
    trend: "up" as const,
    icon: Users,
    color: "success",
    description: "Pending verification calls",
  },
  {
    label: "Tier Upgrades",
    value: "28",
    change: "+15.3%",
    trend: "up" as const,
    icon: TrendingUp,
    color: "info",
    description: "Pro & Premier transitions",
  },
  {
    label: "Dispute Cases",
    value: "04",
    change: "-25%",
    trend: "down" as const,
    icon: AlertTriangle,
    color: "danger",
    description: "Requiring officer mediation",
  },
];

const PENDING_ACTIONS = [
  {
    id: 1,
    type: "verification",
    title: "Janet O. Adesanya",
    subtitle: "Landlord • Ikeja LGA",
    time: "2 mins ago",
    priority: "high",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    type: "listing",
    title: "3 Bedroom with Pool & Garden",
    subtitle: "Listing #8942 • Lekki",
    time: "14 mins ago",
    priority: "medium",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    type: "upgrade",
    title: "Adebayo Global Ltd",
    subtitle: "Free → Premier • Victoria Island",
    time: "1 hour ago",
    priority: "high",
    image:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    type: "dispute",
    title: "Transaction #TX-0912",
    subtitle: "Payment Conflict • Surulere",
    time: "2 hours ago",
    priority: "medium",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop",
  },
];

const RECENT_ACTIVITY = [
  {
    id: 1,
    action: "Approved",
    target: "Verification #821",
    officer: "You",
    time: "5m",
    status: "success",
  },
  {
    id: 2,
    action: "Rejected",
    target: "Listing #902",
    officer: "You",
    time: "12m",
    status: "danger",
  },
  {
    id: 3,
    action: "Released",
    target: "Escrow #NG-112",
    officer: "Officer Chidi",
    time: "45m",
    status: "success",
  },
  {
    id: 4,
    action: "Flagged",
    target: "User @fake_agent",
    officer: "System AI",
    time: "1h",
    status: "warning",
  },
];

const REGIONAL_STATS = [
  { name: "Ikeja", value: 45, growth: "+12%", color: "bg-primary-500" },
  { name: "Lekki", value: 78, growth: "+24%", color: "bg-success" },
  { name: "Victoria Island", value: 34, growth: "+5%", color: "bg-blue-500" },
  { name: "Surulere", value: 22, growth: "+8%", color: "bg-warning" },
];

// ==================== COMPONENT ====================
export function DashboardPage() {
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  });

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Dashboard Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary-600 font-bold uppercase tracking-[0.2em] text-[10px]">
            <Calendar className="h-3 w-3" />
            <span>{currentDate}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {greeting}, Officer{" "}
            <span className="text-primary-500">Adesanya</span>.
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl">
            Lagos system status is{" "}
            <span className="text-success-dark font-bold underline decoration-success/30 decoration-2 underline-offset-4">
              Optimal
            </span>
            . There are{" "}
            <span className="text-gray-900 font-bold">14 pending tasks</span>{" "}
            requiring your attention today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="md" icon={Filter}>
            Filters
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            className="shadow-premium shadow-primary-500/20"
          >
            Official Listing
          </Button>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => (
          <Card
            key={stat.label}
            hover
            className={cn(
              "group overflow-hidden border-l-4",
              stat.color === "primary" && "border-l-primary-500",
              stat.color === "success" && "border-l-success",
              stat.color === "info" && "border-l-blue-500",
              stat.color === "danger" && "border-l-danger",
            )}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-gray-500 transition-colors">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    {stat.value}
                  </h3>
                  <span
                    className={cn(
                      "text-xs font-bold flex items-center gap-0.5",
                      stat.trend === "up" ? "text-success" : "text-danger",
                    )}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {stat.change}
                  </span>
                </div>
              </div>
              <div
                className={cn(
                  "p-3 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
                  stat.color === "primary" &&
                    "bg-primary-50 text-primary-600 shadow-glow-sm",
                  stat.color === "success" && "bg-success/10 text-success-dark",
                  stat.color === "info" && "bg-blue-50 text-blue-600",
                  stat.color === "danger" && "bg-danger/10 text-danger-dark",
                )}
              >
                <stat.icon className="h-6 w-6" strokeWidth={2.5} />
              </div>
            </div>
            <p className="mt-4 text-xs font-medium text-gray-500 leading-relaxed">
              {stat.description}
            </p>
            {/* Background Glow Effect */}
            <div
              className={cn(
                "absolute -bottom-8 -right-8 h-24 w-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500",
                stat.color === "primary" && "bg-primary-500",
                stat.color === "success" && "bg-success",
                stat.color === "info" && "bg-blue-500",
                stat.color === "danger" && "bg-danger",
              )}
            ></div>
          </Card>
        ))}
      </div>

      {/* 3. Main Operational View */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Pending Tasks List */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary-500" />
              Priority Task Queue
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="font-bold text-primary-600 hover:text-primary-700"
            >
              View All Queue
            </Button>
          </div>

          <div className="space-y-4">
            {PENDING_ACTIONS.map((action, idx) => (
              <div
                key={action.id}
                className="premium-card p-4 group flex items-center justify-between hover:translate-x-1 animate-slide-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={action.image}
                      alt=""
                      className="h-14 w-14 rounded-xl object-cover ring-2 ring-gray-100 group-hover:ring-primary-100 transition-all shadow-sm"
                    />
                    <div
                      className={cn(
                        "absolute -top-1 -right-1 h-3 w-3 rounded-full ring-2 ring-white shadow-sm",
                        action.priority === "high"
                          ? "bg-danger animate-pulse"
                          : "bg-warning",
                      )}
                    ></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">
                      {action.title}
                    </h4>
                    <p className="text-xs font-medium text-gray-500 mt-0.5">
                      {action.subtitle}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                        <Clock className="h-3 w-3" />
                        {action.time}
                      </span>
                      <Badge
                        variant={
                          action.type === "verification" ? "primary" : "info"
                        }
                        size="sm"
                      >
                        {action.type}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 rounded-lg"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={ArrowUpRight}
                    className="h-9 px-4 rounded-lg"
                  >
                    Resolve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Activity & Region Intelligence */}
        <div className="space-y-8">
          {/* Recent Performance / Activity */}
          <Card className="bg-sidebar text-white border-none shadow-premium-lg overflow-hidden relative">
            {/* Mesh Background */}
            <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none"></div>

            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary-500" />
                Live Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="h-12 w-12 rounded-xl bg-primary-500 flex items-center justify-center text-sidebar font-extrabold text-xl shadow-glow-sm">
                  82%
                </div>
                <div>
                  <p className="text-sm font-bold text-white tracking-tight">
                    Resolution Yield
                  </p>
                  <p className="text-xs text-gray-400 font-medium">
                    +15.2% than yesterday
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  System Activity
                </h4>
                {RECENT_ACTIVITY.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 group cursor-pointer"
                  >
                    <div
                      className={cn(
                        "mt-1 h-2 w-2 rounded-full ring-4 shadow-sm transition-all group-hover:scale-125",
                        log.status === "success"
                          ? "bg-success ring-success/10"
                          : log.status === "danger"
                            ? "bg-danger ring-danger/10"
                            : "bg-warning ring-warning/10",
                      )}
                    ></div>
                    <div className="flex-1">
                      <p className="text-xs font-bold leading-tight group-hover:text-primary-400 transition-colors">
                        <span className="text-gray-400 font-medium">
                          [{log.time}]
                        </span>{" "}
                        {log.action} {log.target}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-tighter">
                        Executed by {log.officer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Region Intelligence */}
          <Card padding="md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Lagos Intel</span>
                <Badge variant="primary">LIVE</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {REGIONAL_STATS.map((region) => (
                <div key={region.name} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-700">
                      {region.name}
                    </span>
                    <span className="font-extrabold text-gray-900">
                      {region.value}{" "}
                      <span className="text-success ml-1">{region.growth}</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000 ease-out",
                        region.color,
                      )}
                      style={{ width: `${(region.value / 80) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 4. Financial Escrow Overview (Gated) */}
      <PermissionGate permission="VIEW_ESCROW">
        <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-100 h-full">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-sidebar text-primary-500 flex items-center justify-center shadow-premium">
                  <Wallet className="h-7 w-7" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">
                    Escrow Intelligence Center
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    Real-time liquidity across assigned LGAs
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Audit Logs
                </Button>
                <Button variant="secondary" size="sm" icon={ArrowUpRight}>
                  Withdrawals
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  label: "Total Assets Held",
                  value: "₦45,210,500.00",
                  color: "text-gray-900",
                },
                {
                  label: "Pending Releases",
                  value: "₦12,500,000.00",
                  color: "text-primary-600",
                },
                {
                  label: "Today's Payouts",
                  value: "₦8,204,000.00",
                  color: "text-success-dark",
                },
                {
                  label: "Disputed Funds",
                  value: "₦1,850,000.00",
                  color: "text-danger-dark",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="space-y-2 group cursor-pointer hover:translate-y--1 transition-transform"
                >
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                    {item.label}
                  </p>
                  <p
                    className={cn(
                      "text-2xl font-black tracking-tight",
                      item.color,
                    )}
                  >
                    {item.value}
                  </p>
                  <div className="h-0.5 w-8 bg-gray-200 group-hover:w-full group-hover:bg-primary-500 transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </PermissionGate>
    </div>
  );
}
