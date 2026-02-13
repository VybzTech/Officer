import ugLogo from '@/assets/images/ug-logo.png';

export default function ScreenHeader({ firstText, secondText, action }: { firstText: string; secondText: string; action?: { icon: React.ComponentType<{ size: number }>; onClick: () => void } }) {
  return (
    <div className="flex items-center justify-between py-4 px-6">
      <div className="flex items-center gap-3">
        <img src={ugLogo} alt="UG" className="w-9 h-9 object-contain" />
        <h1 className="text-xl font-bold"><span className="text-[#1A1A1A]">{firstText}</span><span className="text-[#FFCA08]">{secondText}</span></h1>
      </div>
      {action && <button onClick={action.onClick} className="p-2.5 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"><action.icon size={20} /></button>}
    </div>
  );
}
