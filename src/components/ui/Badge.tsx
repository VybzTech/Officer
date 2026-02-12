// ============================================
// URBAN GRAVITY - BADGE COMPONENT
// ============================================

import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
}

export function Badge({
  className,
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  ...props
}: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    default: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    primary: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    danger: 'bg-danger/10 text-danger border-danger/20',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };

  const sizes = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    md: 'px-2 py-1 text-xs',
  };

  const dotColors: Record<BadgeVariant, string> = {
    default: 'bg-gray-400',
    primary: 'bg-primary-400',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    info: 'bg-blue-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
}

// Predefined status badges
export function StatusBadge({ status }: { status: string }) {
  const statusMap: Record<string, { variant: BadgeVariant; label: string }> = {
    ACTIVE: { variant: 'success', label: 'Active' },
    PENDING: { variant: 'warning', label: 'Pending' },
    APPROVED: { variant: 'success', label: 'Approved' },
    REJECTED: { variant: 'danger', label: 'Rejected' },
    SUSPENDED: { variant: 'danger', label: 'Suspended' },
    DEACTIVATED: { variant: 'default', label: 'Deactivated' },
    OPEN: { variant: 'info', label: 'Open' },
    IN_REVIEW: { variant: 'warning', label: 'In Review' },
    RESOLVED: { variant: 'success', label: 'Resolved' },
    CLOSED: { variant: 'default', label: 'Closed' },
    HELD: { variant: 'warning', label: 'Held' },
    RELEASED: { variant: 'success', label: 'Released' },
    REFUNDED: { variant: 'info', label: 'Refunded' },
    DISPUTED: { variant: 'danger', label: 'Disputed' },
  };

  const config = statusMap[status] ?? { variant: 'default' as BadgeVariant, label: status };

  return <Badge variant={config.variant} dot>{config.label}</Badge>;
}

// Subscription tier badge
export function TierBadge({ tier }: { tier: 'FREE' | 'PRO' | 'PREMIER' }) {
  const tierMap: Record<string, { variant: BadgeVariant; label: string }> = {
    FREE: { variant: 'default', label: 'Free' },
    PRO: { variant: 'primary', label: 'Pro' },
    PREMIER: { variant: 'warning', label: 'Premier' },
  };

  const config = tierMap[tier];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}

// Role badge
export function RoleBadge({ role }: { role: string }) {
  const roleMap: Record<string, { variant: BadgeVariant; label: string }> = {
    SUPER_ADMIN: { variant: 'danger', label: 'Super Admin' },
    OFFICER: { variant: 'primary', label: 'Officer' },
    REGIONAL_OFFICER: { variant: 'info', label: 'Regional Officer' },
    SUPPORT: { variant: 'default', label: 'Support' },
  };

  const config = roleMap[role] ?? { variant: 'default' as BadgeVariant, label: role };

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
