import { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Shield,
  LogOut,
  Smartphone,
  Globe,
  Monitor,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

// --- Types & Constants ---

const RECENT_LOGINS = [
  { id: 1, device: "Chrome on Windows", location: "Ikeja, Lagos", ip: "197.210.45.123", time: "Active now", status: "current", icon: Monitor },
  { id: 2, device: "Safari on iPhone", location: "Victoria Island", ip: "197.210.45.124", time: "Yesterday, 14:20", status: "normal", icon: Smartphone },
  { id: 3, device: "Firefox on macOS", location: "Lekki, Lagos", ip: "197.210.45.125", time: "2 days ago", status: "normal", icon: Globe },
];

// --- Helper Components ---

const PasswordInput = ({ label, value, onChange, placeholder }: any) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        label={label}
        type={show ? "text" : "password"}
        icon={Lock}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-9 p-1 text-slate-400 hover:text-slate-600 transition-colors"
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
};

// --- Main Page ---

export function SecuritySettingsPage() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: "", new: "", confirm: "" });

  const getStrength = (pwd: string) => {
    if (!pwd) return { level: 0, label: "Empty", color: "bg-slate-200", text: "text-slate-500", width: "w-0" };
    if (pwd.length < 8) return { level: 1, label: "Weak", color: "bg-red-500", text: "text-red-600", width: "w-1/4" };
    if (!/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) return { level: 2, label: "Fair", color: "bg-amber-500", text: "text-amber-600", width: "w-1/2" };
    if (!/[!@#$%^&*]/.test(pwd)) return { level: 3, label: "Good", color: "bg-blue-500", text: "text-blue-600", width: "w-3/4" };
    return { level: 4, label: "Strong", color: "bg-emerald-500", text: "text-emerald-600", width: "w-full" };
  };

  const strength = getStrength(passwordData.new);

  const handleUpdatePassword = async () => {
    if (passwordData.new !== passwordData.confirm) return alert("Passwords do not match");
    setIsChangingPassword(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsChangingPassword(false);
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-primary-50 rounded-xl">
            <Lock className="h-7 w-7 text-primary-600" />
          </div>
          Security Settings
        </h1>
        <p className="text-slate-500 mt-2">Protect your account with robust credentials and session monitoring.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Security Overview */}
        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-none shadow-xl" padding="lg">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Trust Score</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-extrabold text-emerald-400">96</span>
              <span className="text-slate-500 font-bold">/100</span>
            </div>
            <p className="text-sm text-slate-300 mt-2">Your account status is <strong>Excellent</strong>.</p>
            
            <div className="mt-6 space-y-3">
              {["2FA Enabled", "Identity Verified", "Strong Password"].map(item => (
                <div key={item} className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card padding="md" className="bg-blue-50/50 border-blue-100">
            <div className="flex gap-3">
              <Shield className="h-5 w-5 text-blue-600 shrink-0" />
              <div>
                <p className="text-sm font-bold text-blue-900">Security Tip</p>
                <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                  Avoid using common words or birthdays. Use a manager like 1Password or Bitwarden.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Actions */}
        <div className="md:col-span-2 space-y-8">
          {/* Password Section */}
          <Card padding="lg">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Change Password</h2>
            <div className="space-y-5">
              <PasswordInput 
                label="Current Password" 
                value={passwordData.current} 
                onChange={(e: any) => setPasswordData({ ...passwordData, current: e.target.value })} 
              />
              
              <div className="space-y-2">
                <PasswordInput 
                  label="New Password" 
                  value={passwordData.new} 
                  onChange={(e: any) => setPasswordData({ ...passwordData, new: e.target.value })} 
                />
                {passwordData.new && (
                  <div className="pt-1">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Strength</span>
                      <span className={cn("text-xs font-bold", strength.text)}>{strength.label}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={cn("h-full transition-all duration-500", strength.color, strength.width)} />
                    </div>
                  </div>
                )}
              </div>

              <PasswordInput 
                label="Confirm New Password" 
                value={passwordData.confirm} 
                onChange={(e: any) => setPasswordData({ ...passwordData, confirm: e.target.value })} 
              />

              <Button 
                variant="primary" 
                className="w-full h-11"
                onClick={handleUpdatePassword}
                loading={isChangingPassword}
              >
                Update Credentials
              </Button>
            </div>
          </Card>

          {/* Sessions Section */}
          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Active Sessions</h2>
              <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">Sign Out Others</Button>
            </div>
            
            <div className="space-y-3">
              {RECENT_LOGINS.map((session) => {
                const Icon = session.icon;
                return (
                  <div key={session.id} className={cn(
                    "flex items-center justify-between p-4 rounded-xl border transition-all",
                    session.status === 'current' ? "bg-primary-50/30 border-primary-100 shadow-sm" : "border-slate-100 hover:bg-slate-50"
                  )}>
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "p-2.5 rounded-lg",
                        session.status === 'current' ? "bg-primary-100 text-primary-600" : "bg-slate-100 text-slate-400"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900 text-sm">{session.device}</p>
                          {session.status === 'current' && <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-2 py-0">Current</Badge>}
                        </div>
                        <p className="text-xs text-slate-500">{session.location} • {session.ip}</p>
                        <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">{session.time}</p>
                      </div>
                    </div>
                    {session.status !== 'current' && (
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SecuritySettingsPage;