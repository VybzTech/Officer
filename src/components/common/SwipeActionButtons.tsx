import { Heart, X, Star, Undo2, Info } from 'lucide-react';

export default function SwipeActionButtons({ onRevert, onDislike, onFavorite, onLike, onViewDetails, canRevert }: { onRevert?: () => void; onDislike: () => void; onFavorite: () => void; onLike: () => void; onViewDetails?: () => void; canRevert?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-4">
      {onRevert && (
        <button onClick={onRevert} disabled={!canRevert} className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer ${canRevert ? 'bg-[#b1836a] text-white hover:scale-105' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}>
          <Undo2 size={18} />
        </button>
      )}
      <button onClick={onDislike} className="w-[68px] h-[68px] rounded-full bg-white border border-[#E0E0E0] shadow-lg flex items-center justify-center text-[#F44336] hover:scale-105 active:scale-95 transition-all cursor-pointer"><X size={28} /></button>
      <button onClick={onFavorite} className="w-[84px] h-[84px] rounded-full bg-[#FFCA08] shadow-xl flex items-center justify-center text-[#1A1A1A] hover:scale-105 active:scale-95 transition-all cursor-pointer"><Star size={32} fill="currentColor" /></button>
      <button onClick={onLike} className="w-[68px] h-[68px] rounded-full bg-white border border-[#E0E0E0] shadow-lg flex items-center justify-center text-[#4CAF50] hover:scale-105 active:scale-95 transition-all cursor-pointer"><Heart size={28} fill="currentColor" /></button>
      {onViewDetails && <button onClick={onViewDetails} className="w-12 h-12 rounded-full bg-white border border-[#E0E0E0] shadow-md flex items-center justify-center text-[#5e57e9] hover:scale-105 active:scale-95 transition-all cursor-pointer"><Info size={18} /></button>}
    </div>
  );
}
