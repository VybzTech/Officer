import { useState } from "react";
import { ShieldCheck, Upload, FileText, CheckCircle, AlertTriangle, Fingerprint } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { cn } from "@/utils";

export function IdentityVerificationPage() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<{id?: File, selfie?: File}>({});

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 bg-primary-50 rounded-2xl mb-2">
          <ShieldCheck className="h-10 w-10 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Officer Verification</h1>
        <p className="text-slate-500">Government regulations require identity verification for all escrow officers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { s: 1, t: "ID Document", d: "Passport or NIMC" },
          { s: 2, t: "Liveness Check", d: "Face Verification" },
          { s: 3, t: "Final Review", d: "Admin Approval" },
        ].map((item) => (
          <div key={item.s} className={cn(
            "p-4 rounded-xl border-2 transition-all",
            step === item.s ? "border-primary-500 bg-white shadow-md" : "border-slate-100 bg-slate-50 opacity-60"
          )}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary-600">Step 0{item.s}</p>
            <h3 className="font-bold text-slate-900">{item.t}</h3>
            <p className="text-xs text-slate-500">{item.d}</p>
          </div>
        ))}
      </div>

      <Card padding="lg" className="border-none shadow-xl ring-1 ring-slate-200">
        {step === 1 && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:border-primary-400 transition-colors cursor-pointer bg-slate-50/50">
              <Upload className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="font-bold text-slate-700">Upload Government ID</p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG or PDF (Max 10MB)</p>
              <input type="file" className="hidden" id="id-upload" />
              <Button variant="outline" className="mt-6" onClick={() => document.getElementById('id-upload')?.click()}>
                Select Document
              </Button>
            </div>
            <div className="flex justify-end">
              <Button variant="primary" onClick={() => setStep(2)}>Continue to Liveness</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="text-center space-y-6 py-8">
            <div className="h-48 w-48 bg-slate-900 rounded-full mx-auto flex items-center justify-center border-4 border-primary-500 relative overflow-hidden">
               <Fingerprint className="h-20 w-20 text-white/20 animate-pulse" />
            </div>
            <p className="text-sm text-slate-600 max-w-xs mx-auto">Position your face within the frame and ensure you are in a well-lit environment.</p>
            <Button variant="primary" className="w-full max-w-xs" onClick={() => setStep(3)}>Capture Photo</Button>
          </div>
        )}
      </Card>
    </div>
  );
}