import { useState } from "react";
import {
  Shield,
  Smartphone,
  Mail,
  Copy,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  QrCode,
  Lock,
  Trash2,
  Eye,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import Toggle from "@/components/ui/Toggle";
import { cn } from "@/utils/cn";

// --- Types & Mock Data ---

const BACKUP_CODES = [
  "ACDE-47FG-2345", "BCDE-47FG-3456", "CCDE-47FG-4567",
  "DCDE-47FG-5678", "ECDE-47FG-6789", "FCDE-47FG-7890",
];

const TRUSTED_DEVICES = [
  { id: 1, name: "Chrome on Windows 11", lastUsed: "Active now", trusted: true },
  { id: 2, name: "iPhone 15 Pro Max", lastUsed: "2 days ago", trusted: true },
];

// --- Sub-components ---

const MethodCard = ({ id, name, desc, icon: Icon, isActive, onSetup }: any) => (
  <Card
    padding="md"
    className={cn(
      "border-2 transition-all",
      isActive ? "border-primary-500 bg-primary-50/30" : "border-slate-100 opacity-70"
    )}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={cn("p-3 rounded-xl", isActive ? "bg-primary-500 text-white" : "bg-slate-100 text-slate-400")}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">{name}</h3>
          <p className="text-xs text-slate-500">{desc}</p>
        </div>
      </div>
      {isActive ? (
        <Badge className="bg-primary-100 text-primary-700 border-none">Active</Badge>
      ) : (
        <Button variant="outline" size="sm" onClick={onSetup}>Setup</Button>
      )}
    </div>
  </Card>
);

// --- Main Page ---

export function TwoFactorSettingsPage() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [revealCodes, setRevealCodes] = useState(false);
  const [otp, setOtp] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary-600" />
            Two-Factor Auth (2FA)
          </h1>
          <p className="text-slate-500 mt-1 text-sm">Add a second layer of security to prevent unauthorized access.</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-100 p-2 px-4 rounded-2xl">
          <span className="text-xs font-bold text-slate-600 uppercase">Protection</span>
          <Toggle checked={is2FAEnabled} onChange={setIs2FAEnabled} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column: Active Methods */}
        <div className="lg:col-span-3 space-y-6">
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Primary Methods</h2>
            <MethodCard 
              name="Authenticator App" 
              desc="Google Authenticator, Authy, or Microsoft Authenticator" 
              icon={Smartphone} 
              isActive={true} 
            />
            <MethodCard 
              name="SMS Verification" 
              desc="Receive a 6-digit code via text message" 
              icon={Mail} 
              isActive={false} 
            />
          </section>

          {/* Setup Interaction */}
          <Card padding="lg" className="border-dashed border-2 border-primary-200 bg-primary-50/20">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-primary-100">
                <QrCode className="h-32 w-32 text-slate-800" />
              </div>
              <div className="max-w-xs">
                <h3 className="font-bold text-slate-900">Link Authenticator</h3>
                <p className="text-xs text-slate-500 mt-1">Scan the QR code or use the secret key: <code className="text-primary-600 font-bold bg-white px-1">UG-992-KLA</code></p>
              </div>
              <div className="w-full max-w-[240px]">
                <Input 
                  placeholder="Enter 6-digit code" 
                  className="text-center text-xl tracking-[0.5em] font-bold h-12"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button variant="primary" className="w-full mt-3">Activate App</Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Backup & Devices */}
        <div className="lg:col-span-2 space-y-6">
          <Card padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <Lock className="h-4 w-4 text-slate-400" /> Backup Codes
              </h2>
              <button className="text-slate-400 hover:text-primary-600 transition-colors">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            <div className="relative group">
              <div className={cn(
                "grid grid-cols-1 gap-2 transition-all duration-300",
                !revealCodes && "blur-md select-none pointer-events-none"
              )}>
                {BACKUP_CODES.map((code) => (
                  <div key={code} className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100 font-mono text-xs">
                    <span>{code}</span>
                    <button onClick={() => copyToClipboard(code)}>
                      {copied === code ? <CheckCircle2 className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3 text-slate-300" />}
                    </button>
                  </div>
                ))}
              </div>
              
              {!revealCodes && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button variant="outline" size="sm" className="bg-white" leftIcon={<Eye className="h-4 w-4"/>} onClick={() => setRevealCodes(true)}>
                    Reveal Codes
                  </Button>
                </div>
              )}
            </div>
            <p className="text-[10px] text-slate-400 mt-4 leading-relaxed">
              * Store these codes in a password manager. They allow access if you lose your phone.
            </p>
          </Card>

          <section className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Trusted Devices</h3>
            {TRUSTED_DEVICES.map(device => (
              <div key={device.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                <div>
                  <p className="text-sm font-bold text-slate-700">{device.name}</p>
                  <p className="text-[10px] text-slate-400">{device.lastUsed}</p>
                </div>
                <button className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4"/></button>
              </div>
            ))}
          </section>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
            <p className="text-xs text-amber-800 leading-normal">
              <strong>Mandatory Policy:</strong> 2FA is required for all senior officers. Disabling this may lock your account until manual verification is performed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TwoFactorSettingsPage;