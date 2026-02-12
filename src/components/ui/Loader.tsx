export default function Loader({ size = 'md', fullScreen }: { size?: 'sm' | 'md' | 'lg'; fullScreen?: boolean }) {
  const s = { sm: 'w-5 h-5 border-2', md: 'w-8 h-8 border-3', lg: 'w-12 h-12 border-4' };
  const spinner = <div className={`${s[size]} rounded-full animate-spin border-[#FFCA08] border-t-transparent`} />;
  if (fullScreen) return <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">{spinner}</div>;
  return <div className="flex items-center justify-center py-8">{spinner}</div>;
}
