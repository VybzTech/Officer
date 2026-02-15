// ==================== NAV GROUP COMPONENT ====================
import { type LucideIcon } from "lucide-react";
import { PermissionGate } from "@/components/guards";
import type { Permission } from "@/types";
import { NavItemComponent } from "./NavItem";

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
interface NavGroup {
  label: string;
  items: NavItem[];
  permission?: Permission;
}

export function NavGroupComponent({
  group,
  collapsed,
  currentPath,
}: {
  group: NavGroup;
  collapsed: boolean;
  currentPath: string;
}) {
  const content = (
    <div className="space-y-1.5">
      {/* Group Label */}
      {!collapsed && (
        <h3 className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600/80">
          {group.label}
        </h3>
      )}

      {/* Group Items */}
      <ul className="space-y-1">
        {group.items.map((item) => (
          <NavItemComponent
            key={item.path}
            item={item}
            collapsed={collapsed}
            isActive={currentPath === item.path}
          />
        ))}
      </ul>
    </div>
  );

  // Wrap in permission gate if group has permission
  if (group.permission) {
    return (
      <PermissionGate permission={group.permission} silent>
        {content}
      </PermissionGate>
    );
  }

  return content;
}
