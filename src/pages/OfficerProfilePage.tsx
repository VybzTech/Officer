import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit2,
  Save,
  X,
  Camera,
  CheckCircle2,
  AlertCircle,
  Hash,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/utils/cn";

// --- Sub-components ---

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <Card padding="md" className="bg-slate-50/50 border-slate-100">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="text-xl font-bold text-slate-900 mt-1">{value}</p>
  </Card>
);

const MetaInfo = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
    <div className="p-2 bg-slate-50 rounded-lg">
      <Icon className="h-4 w-4 text-slate-400" />
    </div>
    <div>
      <p className="text-[10px] font-medium text-slate-400 uppercase leading-none mb-1">{label}</p>
      <p className="text-sm font-bold text-slate-700 leading-none">{value}</p>
    </div>
  </div>
);

// --- Main Page ---

export function OfficerProfilePage() {
  const { officer } = useAuthStore();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: officer?.firstName || "John",
    lastName: officer?.lastName || "Doe",
    email: officer?.email || "j.doe@urbangravity.com",
    phone: officer?.phone || "+234 810 000 0000",
    bio: "Senior Verification Officer | Specializing in Lagos Island Division",
    avatar: officer?.avatarUrl || null,
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API Call
    await new Promise((r) => setTimeout(r, 1200));
    setIsSaving(false);
    setIsEditMode(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account Profile</h1>
          <p className="text-slate-500">Manage your identity and platform credentials</p>
        </div>
        {!isEditMode && (
          <Button
            variant="outline"
            className="rounded-xl border-slate-200"
            leftIcon={<Edit2 className="h-4 w-4" />}
            onClick={() => setIsEditMode(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Meta */}
        <div className="space-y-6">
          <Card className="text-center relative overflow-hidden" padding="lg">
            {isSaving && <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex items-center justify-center font-bold text-primary-600">Updating...</div>}
            
            <div className="relative inline-block mx-auto">
              <div className={cn(
                "h-32 w-32 rounded-3xl flex items-center justify-center overflow-hidden border-4 transition-all",
                isEditMode ? "border-dashed border-primary-300" : "border-primary-50 bg-slate-100"
              )}>
                {formData.avatar ? (
                  <img src={formData.avatar} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-slate-300" />
                )}
              </div>
              {isEditMode && (
                <button className="absolute -bottom-2 -right-2 bg-primary-600 text-white p-2.5 rounded-2xl shadow-lg hover:bg-primary-700 transition-transform active:scale-95">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-bold text-slate-900">
                {formData.firstName} {formData.lastName}
              </h2>
              <Badge variant="secondary" className="mt-2 bg-emerald-50 text-emerald-700 border-emerald-100">
                <CheckCircle2 className="h-3 w-3 mr-1" /> Verified Officer
              </Badge>
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-3">
            <MetaInfo icon={Hash} label="Officer ID" value={`OFF-${officer?.id?.slice(-6).toUpperCase() || "772109"}`} />
            <MetaInfo icon={ShieldCheck} label="Access Level" value={officer?.role || "SENIOR OFFICER"} />
            <MetaInfo icon={Calendar} label="Join Date" value="Nov 12, 2023" />
          </div>
        </div>

        {/* Right Column: Details & Stats */}
        <div className="lg:col-span-2 space-y-8">
          <Card padding="lg">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Personal Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isEditMode ? (
                <>
                  <Input label="First Name" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  <Input label="Last Name" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                  <Input label="Email" icon={Mail} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  <Input label="Phone" icon={Phone} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Professional Bio</label>
                    <textarea 
                      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500/20 outline-none min-h-[100px]"
                      value={formData.bio}
                      onChange={e => setFormData({...formData, bio: e.target.value})}
                    />
                  </div>
                </>
              ) : (
                <>
                  <DetailItem label="Email Address" value={formData.email} />
                  <DetailItem label="Phone Number" value={formData.phone} />
                  <div className="md:col-span-2">
                    <DetailItem label="About" value={formData.bio} />
                  </div>
                </>
              )}
            </div>

            {isEditMode && (
              <div className="mt-8 flex gap-3 justify-end border-t border-slate-50 pt-6">
                <Button variant="outline" onClick={() => setIsEditMode(false)} leftIcon={<X className="h-4 w-4" />}>Cancel</Button>
                <Button variant="primary" loading={isSaving} onClick={handleSave} leftIcon={<Save className="h-4 w-4" />}>Save Changes</Button>
              </div>
            )}
          </Card>

          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">Impact Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Approvals" value="428" />
              <StatCard label="Reviews" value="1.2k" />
              <StatCard label="Resolved" value="89" />
              <StatCard label="Avg. Speed" value="2.3h" />
            </div>
          </section>

          <div className="flex gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Account Privacy:</strong> Some profile details are visible to other verified officers and system admins for auditing purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-1">{label}</p>
      <p className="text-slate-700 font-medium">{value}</p>
    </div>
  );
}

export default OfficerProfilePage;