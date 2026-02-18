// ============================================
// URBAN GRAVITY - SIDEBAR NAVIGATION
// ============================================

import { useLocation } from "react-router-dom";
import {
  PlusSquare,
  Landmark,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/utils/cn";
import { NavGroupComponent } from "./NavGroup";
import { NAVIGATION } from "@/utils/nav";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import logo from "@/assets/images/ug-logo.png";
import ComboText from "@/components/ui/ComboText";

// ==================== PROPS ====================
interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

// ==================== COMPONENT ====================
export function Sidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border shadow-xl",
        "transform transition-all duration-300 ease-in-out",
        "lg:relative lg:translate-x-0",
        collapsed ? "w-20" : "w-72",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      {/* Brand Header */}
      <div className="flex h-20 items-center justify-between px-6 border-b border-sidebar-border bg-sidebar/50 backdrop-blur-sm">
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center w-full",
          )}
        >
          {/* Logo */}
          <div className="relative group">
            <OptimizedImage
              className="animate-scale-in"
              src={logo}
              alt="Urban Gravity"
              width={55}
              height={55}
            />
            {/* <div className="absolute -inset-1 bg-gradient-to-tr from-primary-500 to-yellow-300 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 shadow-glow-sm">
              <Landmark className="h-6 w-6 text-sidebar" strokeWidth={2.5} />
            </div> */}
          </div>

          {!collapsed && (
            <ComboText
              firstText={"Urban"}
              secondText={"Gravity"}
              fontFamily="hubot"
              fontWeight="bold"
              size={19}
              gap={1}
              className="tracking-tighter"
            />
            
            
          )}
        </div>

        {/* Mobile Close */}
        <button
          onClick={onMobileClose}
          className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-sidebar-hover transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Desktop Toggle */}
        <button
          onClick={onToggle}
          className={cn(
            "hidden lg:flex p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-sidebar-hover transition-all border border-transparent hover:border-sidebar-border",
            collapsed &&
            "absolute -right-3 top-8 bg-sidebar border border-sidebar-border shadow-lg z-10",
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className={`${collapsed ? "px-0" : "px-4"} flex-1 overflow-y-auto sidebar-scroll py-6 space-y-8 scroll-smooth`}>
        {NAVIGATION.map((group) => (
          <NavGroupComponent
            key={group.label}
            group={group}
            collapsed={collapsed}
            currentPath={location.pathname}
          />
        ))}
      </nav>

      {/* Officer Profile & Version */}
      <div className="mt-auto border-t border-sidebar-border bg-sidebar/50 px-6 py-4 pb-8">
        {/* {officer && (
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl p-2 transition-colors duration-200",
              !collapsed && "hover:bg-sidebar-hover cursor-pointer",
            )}
          >
            <div className="relative flex-shrink-0">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 text-sidebar font-bold text-sm shadow-md">
                {officer.firstName.charAt(0)}
                {officer.lastName.charAt(0)}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-sidebar bg-success shadow-sm"></div>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0 animate-fade-in">
                <p className="text-sm font-semibold text-white truncate leading-tight">
                  {officer.firstName} {officer.lastName}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Shield className="h-3 w-3 text-primary-500" />
                  <p className="text-xs font-medium text-gray-500 truncate uppercase tracking-tighter">
                    {officer.role.replace("_", " ")}
                  </p>
                </div>
              </div>
            )}
          </div>
        )} */}
        {/* Quick Actions (Only when not collapsed) */}
        {!collapsed && (
          <div className="">
            <button className="w-full flex items-center justify-center gap-2 btn-primary shadow-lg shadow-primary-500/10 active:scale-95 group">
              <PlusSquare className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Create Official Listing</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}


