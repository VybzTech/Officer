import { ROLE_PERMISSIONS } from "@/types/index";
import type { Permission, Role } from "@/types/index";

export function usePermissions(role: Role) {
  function hasPermission(permission: Permission) {
    return ROLE_PERMISSIONS[role]?.includes(permission);
  }

  return { hasPermission };
}