import { NavLink } from "react-router-dom";
import { type LucideIcon } from "lucide-react";
import { PermissionGate } from "@/components/guards";
import { cn } from "@/utils/cn";
import type { Permission } from "@/types";

// ==================== TYPES ====================
interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  permission?: Permission;
  permissions?: Permission[];
  badge?: string | number;
  isNew?: boolean;
}

// ==================== NAV ITEM COMPONENT ====================
export function NavItemComponent({
  item,
  collapsed,
  isActive,
}: {
  item: NavItem;
  collapsed: boolean;
  isActive: boolean;
}) {
  const Icon = item.icon;

  const linkContent = (
    <NavLink
      to={item.path}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        collapsed && "justify-center px-0 py-3 mx-2",
        isActive
          ? "bg-primary-500/10 text-primary-500 border border-primary-500/20 shadow-sm"
          : "text-gray-400 hover:text-white hover:bg-sidebar-hover/50",
      )}
      title={collapsed ? item.label : undefined}
    >
      <div
        className={cn(
          "relative flex items-center justify-center transition-transform duration-200 group-active:scale-95",
          isActive
            ? "text-primary-500"
            : "group-hover:text-white group-hover:scale-110",
        )}
      >
        <Icon
          className="h-5 w-5 flex-shrink-0"
          strokeWidth={isActive ? 1.75 : 1.25}
        />
        {isActive && !collapsed && (
          <div className="absolute -left-3 h-4 w-1 bg-primary-500 rounded-r-full"></div>
        )}
      </div>

      {!collapsed && (
        <>
          <span className="flex-1 truncate tracking-tight">{item.label}</span>

          {/* Badge */}
          {item.badge && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-lg bg-danger px-1.5 text-[10px] font-bold text-white shadow-sm ring-1 ring-white/10">
              {item.badge}
            </span>
          )}

          {/* New indicator - Premium Dot */}
          {item.isNew && (
            <div className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse shadow-[0_0_8px_rgba(249,193,28,0.5)]"></div>
          )}
        </>
      )}
    </NavLink>
  );

  // Wrap in permission gate if item has permission
  if (item.permission) {
    return (
      <li>
        <PermissionGate permission={item.permission} silent>
          {linkContent}
        </PermissionGate>
      </li>
    );
  }

  return <li>{linkContent}</li>;
}
