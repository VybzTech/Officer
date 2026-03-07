import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Shield,
  Search,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/utils/cn";
import logoImg from "@/assets/images/ug-logo.png";
import ComboText from "@/components/ui/ComboText";

interface HeaderProps {
  onMenuClick: () => void;
  sidebarCollapsed: boolean;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchHovered, setSearchHovered] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { officer, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Derived breadcrumbs
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Mock notifications
  const notifications = [
    { id: 1, type: "verification", message: "New verification request: Janet O.", time: "2m ago", unread: true },
    { id: 2, type: "upgrade", message: "Lekki Pro upgrade pending approval", time: "15m ago", unread: true },
    { id: 3, type: "dispute", message: "Dispute #TX-891 requires mediation", time: "1h ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-100 bg-white px-6 sticky top-0 z-50 font-hubot">
      {/* Left Section: Logo & Mobile Toggle */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-400 hover:text-primary-500 rounded-xl hover:bg-gray-50 transition-all"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/dashboard")}>
            <img src={logoImg} alt="Urban Gravity" className="h-8 w-8 object-contain" />
            <ComboText
              firstText="Urban"
              secondText="Gravity"
              fontFamily="hubot"
              fontWeight="bold"
              size={18}
              gap={1}
              className="tracking-tighter hidden sm:block"
            />
          </div>
        </div>

        {/* Middle Navigation - Breadcrumbs */}
        <nav className="hidden lg:flex items-center gap-2">
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const label = segment.replace(/_/g, " ").charAt(0).toUpperCase() + segment.slice(1);
            return (
              <div key={path} className="flex items-center gap-2">
                <button
                  onClick={() => navigate(path)}
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-[0.15em] transition-all hover:text-primary-500",
                    isLast ? "text-primary-600" : "text-gray-400"
                  )}
                >
                  {label}
                </button>
                {!isLast && <span className="text-gray-300 text-[10px] font-black mr-2">/</span>}
              </div>
            );
          })}
          {pathSegments.length === 0 && (
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary-600">
              Dashboard
            </span>
          )}
        </nav>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-4">
        {/* Expanding Search Bar */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => setSearchHovered(true)}
          onMouseLeave={() => setSearchHovered(false)}
        >
          <div className={cn(
            "flex flex-row-reverse items-center bg-gray-50 rounded-full transition-all duration-300 overflow-hidden border border-transparent shadow-sm",
            (searchExpanded || searchHovered) ? "w-64 pl-2 border-gray-200 bg-white shadow-sm" : "w-10"
          )}>
            <button
              onClick={() => setSearchExpanded(!searchExpanded)}
              className="p-2.5 text-gray-400 hover:text-primary-500 transition-colors flex-shrink-0"
            >
              <Search className="h-4 w-4" strokeWidth={3} />
            </button>
            <input
              type="text"
              placeholder="Search Listings/Users..."
              className={cn(
                "bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-xs font-semibold w-full transition-opacity duration-300 placeholder:text-gray-300 px-3",
                (searchExpanded || searchHovered) ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            />
          </div>
        </div>

        <div className="h-6 w-px bg-gray-100 mx-1 hidden sm:block"></div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileMenuOpen(false);
            }}
            className={cn(
              "relative p-2 rounded-xl transition-all duration-300",
              notificationsOpen ? "bg-primary-50 text-primary-600 shadow-inner" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50",
            )}
          >
            <Bell className="h-5 w-5" strokeWidth={2.5} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-danger ring-2 ring-white text-[8px] font-black text-white shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown for Notifications */}
          {notificationsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
              <div className="absolute right-0 top-full mt-3 z-50 w-80 rounded-2xl border border-gray-100 bg-white shadow-premium-lg animate-scale-in overflow-hidden">
                <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-gray-900">Activity</h3>
                  <span className="text-[10px] font-bold text-primary-600 cursor-pointer">CLEAR ALL</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-4 flex gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
                      <div className={cn(
                        "h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100",
                        n.unread && "bg-primary-100 text-primary-600"
                      )}>
                        <Bell className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800 leading-snug">{n.message}</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileMenuOpen(!profileMenuOpen);
              setNotificationsOpen(false);
            }}
            className={cn(
              "flex items-center gap-3 p-0.5 pr-2 rounded-full transition-all duration-300",
              profileMenuOpen ? "bg-gray-100" : "hover:bg-gray-50",
            )}
          >
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white shadow-sm flex items-center justify-center text-white font-black text-xs">
              {officer ? officer.firstName.charAt(0) : "O"}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-[10px] font-black uppercase text-gray-900 tracking-tight leading-none">
                {officer ? `${officer.firstName} ${officer.lastName}` : "Officer"}
              </p>
              <p className="text-[9px] font-bold text-primary-600 tracking-widest uppercase mt-1 leading-none">
                {officer?.role.replace("_", " ") ?? "OFFICER"}
              </p>
            </div>
            <ChevronDown className={cn("h-3 w-3 text-gray-400 transition-transform", profileMenuOpen && "rotate-180")} />
          </button>

          {/* Profile Dropdown */}
          {profileMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-3 z-50 w-56 rounded-2xl border border-gray-100 bg-white shadow-premium-lg animate-scale-in p-2">
                {[
                  { label: "Profile", icon: User, path: "/account/profile" },
                  { label: "Security", icon: Shield, path: "/account/security" },
                  { label: "Settings", icon: Settings, path: "/config/app" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setProfileMenuOpen(false);
                      navigate(item.path);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:text-primary-600 rounded-xl hover:bg-primary-50 transition-all group"
                  >
                    <item.icon className="h-4 w-4 group-hover:scale-110" />
                    {item.label}
                  </button>
                ))}
                <div className="h-px bg-gray-50 my-1 mx-2" />
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-bold text-danger hover:bg-danger/5 rounded-xl transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
