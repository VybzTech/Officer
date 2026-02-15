import { Input, Button } from "@/components";
import type { Card } from "@/components/ui/Card";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

export function DisputeSubmission() {
  const [history] = useState([
    { id: 1, event: "Dispute Opened", date: "Feb 10, 2026", status: "Open" },
    { id: 2, event: "Evidence Requested", date: "Feb 12, 2026", status: "Pending" },
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form */}
      <Card className="lg:col-span-2" padding="lg">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Initiate Dispute</h2>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
            <p className="text-xs text-red-800 leading-relaxed">
              Filing a dispute will freeze the escrowed funds (₦4,200,000.00) until an arbiter reviews the case.
            </p>
          </div>
          <Input label="Transaction Reference" placeholder="UG-TX-9901..." />
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Reason for Dispute</label>
            <textarea className="w-full p-3 rounded-xl border border-slate-200 min-h-[120px]" placeholder="Describe the breach of agreement..." />
          </div>
          <Button variant="primary" className="w-full bg-red-600 hover:bg-red-700">Submit Dispute</Button>
        </div>
      </Card>

      {/* History Log */}
      <Card padding="md">
        <h3 className="font-bold text-slate-900 mb-4">Case History</h3>
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="relative pl-6 pb-4 border-l-2 border-slate-100 last:border-none">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-white border-2 border-primary-500" />
              <p className="text-sm font-bold text-slate-800 leading-none">{item.event}</p>
              <p className="text-[10px] text-slate-400 mt-1">{item.date}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 