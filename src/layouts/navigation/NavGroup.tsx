// ==================== NAV GROUP COMPONENT ====================
import { PermissionGate } from "@/components/guards";
import { NavItemComponent } from "./NavItem";
import type { NavGroup } from "@/types";

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
        <h3 className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-600/60">
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
