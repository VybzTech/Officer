import type { ReactNode } from "react";
import type { Permission, Role } from "@/types/index";
import { usePermissions } from "@/hooks/usePermissions";

interface Props {
  permission: Permission;
  role: Role;
  children: ReactNode;
}

export function PermissionGate({
  permission,
  role,
  children,
}: Props) {
  const { hasPermission } = usePermissions(role);

  if (!hasPermission(permission)) return null;

  return <>{children}</>;
}