export default function FilterTabs({ filters, active, onChange, counts }: { filters: string[]; active: string; onChange: (f: string) => void; counts?: Record<string, number> }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
      {filters.map((f) => (
        <button key={f} onClick={() => onChange(f)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
            f === active ? 'bg-[#FFCA08] text-[#1A1A1A]' : 'bg-[#F5F5F5] text-[#666] hover:bg-[#E0E0E0]'
          }`}>
          {f}
          {counts?.[f] !== undefined && counts[f] > 0 && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${f === active ? 'bg-[#1A1A1A]/10' : 'bg-[#E0E0E0] text-[#999]'}`}>{counts[f]}</span>
          )}
        </button>
      ))}
    </div>
  );
}
