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
import { getInitials } from "@/utils/format";
import Input from "@/components/ui/Input";
import logoImg from "@/assets/images/ug-logo.png"; // Importing the logo

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { officer, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // derived breadcrumbs
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentNav = pathSegments[0]
    ? pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1)
    : "Dashboard";
  const currentSubNav = pathSegments[1]
    ? pathSegments[1].charAt(0).toUpperCase() + pathSegments[1].slice(1)
    : "";

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: "verification",
      message: "New verification request: Janet O.",
      time: "2m ago",
      unread: true,
    },
    {
      id: 2,
      type: "upgrade",
      message: "Lekki Pro upgrade pending approval",
      time: "15m ago",
      unread: true,
    },
    {
      id: 3,
      type: "dispute",
      message: "Dispute #TX-891 requires mediation",
      time: "1h ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-100 bg-white px-6 lg:px-8 sticky top-0 z-40 font-hubot">
      {/* Left Section: Context & Breadcrumbs */}
      <div className="flex items-center gap-6">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-400 hover:text-primary-500 rounded-xl hover:bg-gray-50 transition-all"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Global Search Bar */}
        <div className="hidden md:block w-[400px]">
          <Input
            placeholder="Search listings, users or regions..."
            icon={Search}
            inputSize="sm"
            className="bg-gray-50 border-transparent hover:bg-white hover:border-gray-200 focus:bg-white focus:border-primary-500 transition-all"
          />
        </div>
      </div>

      {/* Right Section: System Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Breadcrumbs / Welcome Message */}
        <div className="hidden xl:flex flex-col items-end mr-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {currentNav}{" "}
            {currentSubNav && (
              <span className="text-gray-300">/ {currentSubNav}</span>
            )}
          </p>
          <p className="text-sm font-semibold text-gray-800">
            Welcome, {officer ? officer.firstName : "Officer"}
          </p>
        </div>

        <div className="h-6 w-px bg-gray-100 mx-2 hidden sm:block"></div>

        {/* Notifications Hub */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileMenuOpen(false);
            }}
            className={cn(
              "relative p-2.5 rounded-xl transition-all duration-300",
              notificationsOpen
                ? "bg-primary-50 text-primary-600"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50",
            )}
            title="Notifications"
          >
            <Bell className="h-5 w-5" strokeWidth={2.5} />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger ring-2 ring-white text-[9px] font-black text-white shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Premium Notifications Dropdown */}
          {notificationsOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setNotificationsOpen(false)}
              />
              <div className="absolute right-0 top-full mt-3 z-50 w-96 rounded-2xl border border-gray-100 bg-white shadow-premium-lg animate-scale-in overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-gray-50 bg-gray-50/50">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">Notifications</h3>
                    <span className="bg-primary-500 text-sidebar text-[10px] font-black px-2 py-0.5 rounded-full">
                      {unreadCount} NEW
                    </span>
                  </div>
                  <button className="text-[11px] font-bold text-primary-600 hover:text-primary-700 uppercase tracking-wider">
                    Clear All
                  </button>
                </div>
                <div className="max-h-[420px] overflow-y-auto sidebar-scroll">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex items-start gap-4 p-5 hover:bg-gray-50 cursor-pointer transition-colors relative group",
                        notification.unread && "bg-primary-50/30",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0 shadow-sm transition-transform group-hover:scale-110",
                          notification.type === "verification" &&
                            "bg-success/10 text-success-dark",
                          notification.type === "upgrade" &&
                            "bg-primary-500/10 text-primary-600",
                          notification.type === "dispute" &&
                            "bg-danger/10 text-danger-dark",
                        )}
                      >
                        <Bell className="h-5 w-5" strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "text-sm font-semibold leading-relaxed",
                            notification.unread
                              ? "text-gray-900"
                              : "text-gray-500",
                          )}
                        >
                          {notification.message}
                        </p>
                        <p className="text-[11px] font-bold text-gray-400 mt-1.5 uppercase tracking-tighter">
                          {notification.time}
                        </p>
                      </div>
                      {notification.unread && (
                        <div className="h-2 w-2 rounded-full bg-primary-500 mt-2 shadow-glow-sm" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-50 bg-gray-50/20">
                  <button className="w-full py-3 text-xs font-bold text-gray-500 hover:text-primary-600 rounded-xl transition-all hover:bg-white hover:shadow-sm">
                    VIEW SYSTEM LOGS
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Professional Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileMenuOpen(!profileMenuOpen);
              setNotificationsOpen(false);
            }}
            className={cn(
              "flex items-center gap-3 p-1 rounded-2xl transition-all duration-300",
              profileMenuOpen ? "bg-gray-100" : "hover:bg-gray-50",
            )}
          >
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 text-sidebar font-extrabold text-sm shadow-sm ring-2 ring-white overflow-hidden">
                {/* Use Logo as Avatar for now if no user avatar */}
                <img
                  src={logoImg}
                  alt="UG"
                  className="h-full w-full object-cover p-1"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-success"></div>
            </div>
            <div className="hidden lg:block text-left mr-1">
              <p className="text-xs font-bold text-gray-900 uppercase tracking-tight">
                {officer
                  ? `${officer.firstName} ${officer.lastName}`
                  : "Officer"}
              </p>
              <p className="text-[10px] font-bold text-primary-500 tracking-widest leading-none mt-1">
                {officer?.role.replace("_", " ") ?? "OFFICER"}
              </p>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-gray-400 transition-transform duration-300",
                profileMenuOpen && "rotate-180",
              )}
            />
          </button>

          {/* Premium Account Dropdown */}
          {profileMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setProfileMenuOpen(false)}
              />
              <div className="absolute right-0 top-full mt-3 z-50 w-64 rounded-2xl border border-gray-100 bg-white shadow-premium-lg animate-scale-in p-2">
                <div className="p-4 mb-2 bg-gray-50/50 rounded-xl border border-gray-50">
                  <p className="text-sm font-extrabold text-gray-900 tracking-tight">
                    {officer
                      ? `${officer.firstName} ${officer.lastName}`
                      : "Officer Account"}
                  </p>
                  <p className="text-xs font-medium text-gray-500 mt-1 truncate">
                    {officer?.email}
                  </p>
                </div>

                <div className="space-y-1">
                  {[
                    {
                      label: "Profile Settings",
                      icon: User,
                      path: "/account/profile",
                    },
                    {
                      label: "Security & 2FA",
                      icon: Shield,
                      path: "/account/security",
                    },
                    {
                      label: "Global Config",
                      icon: Settings,
                      path: "/config/app",
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setProfileMenuOpen(false);
                        navigate(item.path);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-600 hover:text-primary-600 rounded-xl hover:bg-primary-50 transition-all group"
                    >
                      <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="h-px bg-gray-50 my-2 mx-2"></div>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-bold text-danger hover:bg-danger/5 rounded-xl transition-all group"
                >
                  <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Safety Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
