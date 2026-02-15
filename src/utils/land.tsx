import type { e, p } from "node_modules/@faker-js/faker/dist/airline-Dz1uGqgJ";
import { useState } from "react";

export function LandUseCalculator() {
  const [val, setVal] = useState({ marketValue: 0, propType: "residential" });
  
  // Rates as per Lagos State LUC Law
  const rates: any = { residential: 0.0007, commercial: 0.007, industrial: 0.0025 };
  const reliefRate = 0.40; // 40% general relief
  
  const annualCharge = val.marketValue * reliefRate * (rates[val.propType] || 0);

  return (
    <Card className="bg-slate-900 text-white overflow-hidden" padding="lg">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-emerald-500 rounded-lg"><FileText className="h-4 w-4 text-white" /></div>
        <h3 className="font-bold tracking-tight">LUC Estimator (Lagos)</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase">Property Market Value (₦)</label>
          <input 
            type="number" 
            className="w-full bg-slate-800 border-none rounded-xl mt-1 p-3 text-emerald-400 font-mono text-lg outline-none ring-1 ring-slate-700 focus:ring-emerald-500"
            placeholder="e.g. 50,000,000"
            onChange={(e) => setVal({...val, marketValue: Number(e.target.value)})}
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {Object.keys(rates).map(type => (
            <button 
              key={type}
              onClick={() => setVal({...val, propType: type})}
              className={cn(
                "py-2 rounded-lg text-[10px] font-bold uppercase transition-all",
                val.propType === type ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400"
              )}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-800 mt-4">
          <p className="text-xs text-slate-400">Estimated Annual Charge</p>
          <p className="text-3xl font-black text-white mt-1">
            ₦{annualCharge.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </Card>
  );
}