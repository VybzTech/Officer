import { useState } from "react";
import {
  Lock,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  Shield,
  Info,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

// --- Configuration & Data ---

const STATUS_THEMES = {
  initial: "bg-slate-100 text-slate-600 border-slate-200",
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  active: "bg-blue-100 text-blue-700 border-blue-200",
  confirmed: "bg-indigo-100 text-indigo-700 border-indigo-200",
  ready: "bg-emerald-100 text-emerald-700 border-emerald-200",
  completed: "bg-green-100 text-green-800 border-green-200",
};

const ESCROW_POLICIES = [
  {
    title: "Hold Period",
    description: "Standard 7-14 day hold after transaction completion",
    icon: Clock,
    details: ["7 days standard", "14 days for new users", "30 days for disputes"],
  },
  {
    title: "Security Deposit",
    description: "Protects against property damage",
    icon: DollarSign,
    details: ["1-2 months rent", "Held in secure escrow", "14-day release window"],
  },
  {
    title: "Platform Protection",
    description: "Secure fund handling guarantees",
    icon: Shield,
    details: ["Bank-level encryption", "Segregated accounts", "Regular audits"],
  },
  {
    title: "Release Terms",
    description: "Conditions for fund disbursement",
    icon: CheckCircle2,
    details: ["Mutual move-in confirmation", "Zero active disputes", "Hold period met"],
  },
];

const TRANSACTION_FLOW = [
  { stage: "Agreement Signed", desc: "Terms agreed by both parties", status: "initial" },
  { stage: "Funds Deposited", desc: "Tenant transfers to escrow", status: "pending" },
  { stage: "Escrow Hold", desc: "Funds secured during wait period", status: "active" },
  { stage: "Move-in Confirmed", desc: "Condition verification", status: "confirmed" },
  { stage: "Funds Released", desc: "Transfer to landlord", status: "completed" },
];

// --- Shared Sub-Components ---

const PolicyCard = ({ policy: P }: { policy: typeof ESCROW_POLICIES[0] }) => (
  <Card padding="lg" className="h-full">
    <div className="flex items-start gap-3 mb-4">
      <div className="p-2 bg-primary-50 rounded-lg">
        <P.icon className="h-5 w-5 text-primary-600" />
      </div>
      <div>
        <h3 className="font-bold text-gray-900 leading-tight">{P.title}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{P.description}</p>
      </div>
    </div>
    <ul className="space-y-2 ml-1">
      {P.details.map((detail, i) => (
        <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary-400" />
          {detail}
        </li>
      ))}
    </ul>
  </Card>
);

// --- Main Page Component ---

export function EscrowPolicyPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* Header Section */}
      <header className="border-b border-gray-100 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary-600 rounded-xl">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Escrow Policy</h1>
        </div>
        <p className="text-gray-500 text-lg">
          Operational framework for secure fund management and dispute resolution.
        </p>
      </header>

      {/* Overview Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Funds in Escrow", value: "₦2.4B", trend: "+12%" },
          { label: "Active Disputes", value: "28", trend: "-8%" },
          { label: "Avg Hold Period", value: "9.2 Days", trend: "Stable" },
          { label: "Success Rate", value: "99.2%", trend: "+0.3%" },
        ].map((m) => (
          <Card key={m.label} padding="md" className="border-l-4 border-l-primary-500">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{m.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-gray-900">{m.value}</span>
              <span className="text-xs font-medium text-success-600">{m.trend}</span>
            </div>
          </Card>
        ))}
      </div>



      {/* Policies Grid */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Shield className="h-5 w-5 text-gray-400" /> Core Guidelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ESCROW_POLICIES.map((p) => <PolicyCard key={p.title} policy={p} />)}
        </div>
      </section>

      {/* Workflow Visualization */}
      <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">Standard Transaction Lifecycle</h2>
        <div className="relative flex flex-col md:flex-row justify-between gap-8">
          {TRANSACTION_FLOW.map((step, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center text-center relative z-10">
              <div className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center border-2 mb-4 font-bold shadow-sm",
                STATUS_THEMES[step.status as keyof typeof STATUS_THEMES]
              )}>
                {idx + 1}
              </div>
              <h4 className="font-bold text-gray-900 text-sm">{step.stage}</h4>
              <p className="text-xs text-gray-500 mt-1 px-4">{step.desc}</p>
              
              {idx < TRANSACTION_FLOW.length - 1 && (
                <ChevronRight className="hidden md:block absolute -right-4 top-4 text-gray-300 h-5 w-5" />
              )}
            </div>
          ))}
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-gray-200 -z-0" />
        </div>
      </section>

      {/* Fee Table & Notices */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden" padding="none">
          <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-900">Fee Structure</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 uppercase text-[10px] tracking-widest border-b border-gray-100">
                <th className="py-3 px-6">Transaction</th>
                <th className="py-3 px-6">Fee</th>
                <th className="py-3 px-6">Cap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { type: "Escrow Deposit", fee: "0.5%", cap: "₦25,000" },
                { type: "Refund Processing", fee: "1.0%", cap: "₦50,000" },
                { type: "Dispute Resolution", fee: "Flat", cap: "₦5,000" },
              ].map((f, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-700">{f.type}</td>
                  <td className="py-4 px-6 text-primary-600 font-bold">{f.fee}</td>
                  <td className="py-4 px-6 text-gray-500">{f.cap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div className="space-y-4">
          <div className="p-5 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-bold text-amber-900">Auto-Release Rule</p>
              <p className="text-amber-800 mt-1 leading-relaxed">
                Funds are automatically released 14 days after move-in if no dispute is filed.
              </p>
            </div>
          </div>
          <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl flex gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-bold text-blue-900">Need Support?</p>
              <p className="text-blue-800 mt-1">escrow@urbangravity.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EscrowPolicyPage;