import { CheckCircle, Clock, XCircle } from 'lucide-react';

const STATUS_CONFIG: Record<string, { color: string; bg: string; label: string; icon?: React.ReactNode }> = {
  ACTIVE: { color: 'text-green-700', bg: 'bg-green-100', label: 'Active', icon: <CheckCircle size={12} /> },
  PENDING: { color: 'text-orange-700', bg: 'bg-orange-100', label: 'Pending', icon: <Clock size={12} /> },
  PENDING_REVIEW: { color: 'text-orange-700', bg: 'bg-orange-100', label: 'Pending Review', icon: <Clock size={12} /> },
  VERIFIED: { color: 'text-green-700', bg: 'bg-green-100', label: 'Verified', icon: <CheckCircle size={12} /> },
  UNVERIFIED: { color: 'text-gray-600', bg: 'bg-gray-100', label: 'Unverified' },
  REJECTED: { color: 'text-red-700', bg: 'bg-red-100', label: 'Rejected', icon: <XCircle size={12} /> },
  RENTED: { color: 'text-blue-700', bg: 'bg-blue-100', label: 'Rented' },
  ARCHIVED: { color: 'text-gray-600', bg: 'bg-gray-100', label: 'Archived' },
  DRAFT: { color: 'text-gray-600', bg: 'bg-gray-100', label: 'Draft' },
  PAUSED: { color: 'text-yellow-700', bg: 'bg-yellow-100', label: 'Paused' },
  APPROVED: { color: 'text-green-700', bg: 'bg-green-100', label: 'Approved', icon: <CheckCircle size={12} /> },
  SUSPENDED: { color: 'text-red-700', bg: 'bg-red-100', label: 'Suspended' },
};

export function StatusBadge({ status }: { status: string }) {
  const c = STATUS_CONFIG[status] || { color: 'text-gray-600', bg: 'bg-gray-100', label: status };
  return <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${c.color} ${c.bg}`}>{c.icon}{c.label}</span>;
}

const TIER: Record<string, string> = { FREE: 'bg-[#96705B]/10 text-[#96705B]', PRO: 'bg-[#FFD43B]/20 text-[#B8960F]', PREMIUM: 'bg-[#6665DD]/10 text-[#6665DD]' };

export function TierBadge({ tier }: { tier: string }) {
  return <span className={`inline-flex text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${TIER[tier] || TIER.FREE}`}>{tier}</span>;
}
