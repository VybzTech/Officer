// ============================================
// URBAN GRAVITY - SIDEBAR NAVIGATION
// ============================================

import { useLocation } from "react-router-dom";
import { Lock, Unlock, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { NavGroupComponent } from "./NavGroup";
import { NAVIGATION } from "@/utils/nav";

// ==================== PROPS ====================
interface SidebarProps {
  collapsed: boolean;
  locked: boolean;
  onToggle: () => void;
  onHoverChange: (isHovering: boolean) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

// ==================== COMPONENT ====================
export function Sidebar({
  collapsed,
  locked,
  onToggle,
  onHoverChange,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border shadow-xl",
        "transform transition-all duration-300 ease-in-out",
        "lg:relative lg:translate-x-0 relative",
        collapsed ? "w-20" : "w-72",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      {/* Desktop Toggle / Lock Pin - Absolute Right */}
      <button
        onClick={onToggle}
        className={cn(
          "hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 p-2 rounded-full border border-sidebar-border bg-sidebar shadow-premium z-50 transition-all hover:scale-110",
          locked ? "text-primary-500 border-primary-500/50" : "text-gray-400"
        )}
        title={locked ? "Unlock Sidebar" : "Lock Sidebar"}
      >
        {locked ? (
          <Lock className="h-4 w-4" />
        ) : (
          <Unlock className="h-4 w-4" />
        )}
      </button>

      {/* Navigation */}
      <nav className={`${collapsed ? "px-0" : "px-4"} flex-1 overflow-y-auto sidebar-scroll py-8 space-y-8 scroll-smooth`}>
        {NAVIGATION.map((group) => (
          <NavGroupComponent
            key={group.label}
            group={group}
            collapsed={collapsed}
            currentPath={location.pathname}
          />
        ))}
      </nav>

      {/* Mobile Close */}
      <button
        onClick={onMobileClose}
        className="lg:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-sidebar-hover transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
    </aside>
  );
}


