import { type HTMLAttributes } from "react";
import { CheckCircle, Clock, XCircle, Shield, Star, Crown } from "lucide-react";
import { cn } from "@/utils/cn";

type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md" | "lg";
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-700 border-gray-200",
    primary: "bg-primary-50 text-primary-700 border-primary-100",
    success: "bg-success-light/10 text-success-dark border-success-light/20",
    warning: "bg-warning-light/10 text-warning-dark border-warning-light/20",
    danger: "bg-danger-light/10 text-danger-dark border-danger-light/20",
    info: "bg-blue-50 text-blue-700 border-blue-100",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-0.5 text-[11px]",
    lg: "px-3 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-bold uppercase tracking-wider rounded-full border transition-colors",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

const STATUS_CONFIG: Record<
  string,
  { variant: BadgeVariant; label: string; icon?: any }
> = {
  ACTIVE: { variant: "success", label: "Active", icon: CheckCircle },
  PENDING: { variant: "warning", label: "Pending", icon: Clock },
  PENDING_REVIEW: { variant: "warning", label: "In Review", icon: Clock },
  VERIFIED: { variant: "primary", label: "Verified", icon: Shield },
  UNVERIFIED: { variant: "default", label: "Unverified" },
  REJECTED: { variant: "danger", label: "Rejected", icon: XCircle },
  RENTED: { variant: "info", label: "Rented" },
  ARCHIVED: { variant: "default", label: "Archived" },
  DRAFT: { variant: "default", label: "Draft" },
  PAUSED: { variant: "warning", label: "Paused" },
  APPROVED: { variant: "success", label: "Approved", icon: CheckCircle },
  SUSPENDED: { variant: "danger", label: "Suspended", icon: XCircle },
};

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const config = STATUS_CONFIG[status] || { variant: "default", label: status };
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={cn("gap-1.5", className)}>
      {Icon && <Icon className="h-3 w-3" strokeWidth={3} />}
      {config.label}
    </Badge>
  );
}

const TIER_CONFIG: Record<string, { className: string; icon: any }> = {
  FREE: {
    className: "bg-gray-100 text-gray-500 border-gray-200",
    icon: Star,
  },
  PRO: {
    className: "bg-primary-500 text-sidebar border-primary-600 shadow-glow-sm",
    icon: Shield,
  },
  PREMIER: {
    className:
      "bg-gradient-to-r from-sidebar to-gray-800 text-primary-500 border-sidebar shadow-premium",
    icon: Crown,
  },
};

export function TierBadge({
  tier,
  className,
}: {
  tier: string;
  className?: string;
}) {
  const config = TIER_CONFIG[tier] || TIER_CONFIG.FREE;
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[10px] font-extrabold px-2 py-1 rounded-lg uppercase tracking-[0.1em] border transition-all duration-300",
        config.className,
        className,
      )}
    >
      <Icon className="h-3 w-3" strokeWidth={3} />
      {tier}
    </span>
  );
}
