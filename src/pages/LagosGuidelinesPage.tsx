import { useState } from "react";
import {
  MapPin,
  Building2,
  Users,
  Shield,
  DollarSign,
  Scale,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

// --- Data Constants ---

const REGIONS = [
  { id: "reg-01", name: "Lagos Island", lgas: ["Lagos Island", "Eti-Osa"] },
  { id: "reg-02", name: "Lagos Mainland", lgas: ["Surulere", "Apapa", "Yaba", "Mushin", "Shomolu"] },
  { id: "reg-03", name: "Ikeja Division", lgas: ["Ikeja", "Alimosho", "Oshodi-Isolo", "Kosofe"] },
  { id: "reg-04", name: "Ikorodu Division", lgas: ["Ikorodu"] },
  { id: "reg-05", name: "Badagry Division", lgas: ["Badagry", "Ojo", "Amuwo-Odofin"] },
  { id: "reg-06", name: "Epe Division", lgas: ["Epe", "Ibeju-Lekki"] },
];

const COMPLIANCE_PILLARS = [
  {
    title: "Property Registration",
    desc: "Verification via Lagos Land Registry",
    icon: Building2,
    items: ["C of O or Registered Deed", "Survey records (Alausa)", "Land Use Charge receipts"],
  },
  {
    title: "Tenancy Rights",
    desc: "Lagos State Tenancy Law 2011",
    icon: Shield,
    items: ["Max 1-year advance rent", "6-month notice for yearly tenants", "Mandatory written receipts"],
  },
  {
    title: "Landlord KYC",
    desc: "Proof of Identity & Ownership",
    icon: Users,
    items: ["Valid National ID/Passport", "BVN & Address Verification", "Tax Clearance Certificate"],
  },
  {
    title: "Financial Integrity",
    desc: "CBN/EFCC Compliance",
    icon: DollarSign,
    items: ["No cash payments >₦500k", "Electronic transaction trail", "AML Reporting compliance"],
  },
];

const RED_FLAGS = [
  "Properties in 'Excised' land without full titles",
  "Demanding >1 year rent upfront for new tenants",
  "Refusal to issue standardized Lagos rent receipts",
  "Landlords avoiding BVN/Identity verification",
  "Properties listed in 'Committed Acquisition' zones",
];

// --- Page Component ---

export function LagosGuidelinesPage() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-primary-50 text-primary-700">Lagos State Only</Badge>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="h-7 w-7 text-primary-600" />
            Regional Guidelines
          </h1>
          <p className="text-slate-500 mt-1">Lagos State regulatory framework and compliance standards.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="py-1 px-3">Law: Tenancy Act 2011</Badge>
          <Badge variant="outline" className="py-1 px-3">Update: Jan 2026</Badge>
        </div>
      </header>

      {/* Region Selector */}
      <section>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Coverage Zones</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRegion(activeRegion === r.id ? null : r.id)}
              className={cn(
                "p-4 rounded-xl border text-left transition-all duration-200",
                activeRegion === r.id 
                  ? "bg-primary-600 border-primary-600 text-white shadow-lg" 
                  : "bg-white border-slate-200 text-slate-600 hover:border-primary-300"
              )}
            >
              <p className="font-bold text-sm truncate">{r.name}</p>
              <p className={cn("text-[10px] mt-1", activeRegion === r.id ? "text-primary-100" : "text-slate-400")}>
                {r.lgas.length} LGAs
              </p>
            </button>
          ))}
        </div>
        
        {/* Expanded LGAs */}
        {activeRegion && (
          <Card className="mt-4 bg-slate-50 border-none" padding="md">
            <div className="flex flex-wrap gap-2">
              {REGIONS.find(r => r.id === activeRegion)?.lgas.map(lga => (
                <Badge key={lga} className="bg-white text-slate-700 border-slate-200">
                  {lga}
                </Badge>
              ))}
            </div>
          </Card>
        )}
      </section>

      {/* Compliance Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COMPLIANCE_PILLARS.map((p) => {
          const Icon = p.icon;
          return (
            <Card key={p.title} padding="lg" className="hover:border-primary-200 transition-colors">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{p.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">{p.desc}</p>
                  <ul className="space-y-2">
                    {p.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          );
        })}
      </section>

      {/* Critical Alerts (Red Flags) */}
      <section className="bg-red-50 border border-red-100 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="h-6 w-6 text-red-600" />
          <h2 className="text-xl font-bold text-red-900">Compliance Red Flags</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
          {RED_FLAGS.map((flag, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
              <span className="h-5 w-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                {i + 1}
              </span>
              <p className="text-sm font-medium text-red-800">{flag}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Resources */}
      <Card className="bg-slate-900 text-white border-none" padding="lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <Scale className="h-10 w-10 text-primary-400" />
            <div>
              <p className="font-bold">Officer Legal Support</p>
              <p className="text-sm text-slate-400">Need a legal opinion on a Lagos land title?</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-primary-600 hover:bg-primary-500 rounded-lg font-bold text-sm transition-colors">
            Request Title Search
          </button>
        </div>
      </Card>
    </div>
  );
}

export default LagosGuidelinesPage;