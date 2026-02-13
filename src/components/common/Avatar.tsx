interface AvatarProps {
  src?: string;
  firstName?: string;
  lastName?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  verified?: boolean;
}

const sz: Record<string, string> = { xs: 'w-8 h-8 text-xs', sm: 'w-10 h-10 text-sm', md: 'w-12 h-12 text-base', lg: 'w-16 h-16 text-lg', xl: 'w-24 h-24 text-2xl' };

export default function Avatar({ src, firstName, lastName, size = 'md', border, verified }: AvatarProps) {
  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'UG';
  return (
    <div className="relative inline-flex">
      <div className={`${sz[size]} rounded-full overflow-hidden flex items-center justify-center font-bold ${border ? 'ring-2 ring-[#FFCA08] ring-offset-2' : ''} ${src ? '' : 'bg-[#FFCA08] text-[#1A1A1A]'}`}>
        {src ? <img src={src} alt={`${firstName} ${lastName}`} className="w-full h-full object-cover" /> : <span>{initials}</span>}
      </div>
      {verified && (
        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
      )}
    </div>
  );
}
