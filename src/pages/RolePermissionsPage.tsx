// ============================================
// URBAN GRAVITY - ROLE PERMISSIONS
// Manage role-based access control
// ============================================

import { useState, useEffect } from "react";
import {
  Lock,
  Users,
  Shield,
  CheckCircle2,
  XCircle,
  Edit2,
  Plus,
  Search,
  Eye,
  Settings,
  Copy,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import Toggle from "@/components/ui/Toggle";
import { cn } from "@/utils/cn";
import Loader from "@/components/ui/Loader";

const ROLES = [
  {
    id: "super_admin",
    name: "Super Admin",
    description: "Full platform access and control",
    color: "danger",
    userCount: 2,
  },
  {
    id: "officer",
    name: "Officer",
    description: "Manage listings, verifications, and disputes",
    color: "primary",
    userCount: 12,
  },
  {
    id: "moderator",
    name: "Moderator",
    description: "Content moderation and user management",
    color: "info",
    userCount: 5,
  },
  {
    id: "analyst",
    name: "Analyst",
    description: "View reports and analytics only",
    color: "success",
    userCount: 3,
  },
];

const PERMISSIONS = [
  { category: "Users", permissions: [
    { id: "users.view", label: "View users" },
    { id: "users.verify", label: "Verify users" },
    { id: "users.suspend", label: "Suspend users" },
    { id: "users.edit", label: "Edit user info" },
  ]},
  { category: "Listings", permissions: [
    { id: "listings.view", label: "View listings" },
    { id: "listings.approve", label: "Approve listings" },
    { id: "listings.reject", label: "Reject listings" },
    { id: "listings.suspend", label: "Suspend listings" },
  ]},
  { category: "Disputes", permissions: [
    { id: "disputes.view", label: "View disputes" },
    { id: "disputes.resolve", label: "Resolve disputes" },
    { id: "disputes.escalate", label: "Escalate disputes" },
  ]},
  { category: "Transactions", permissions: [
    { id: "transactions.view", label: "View transactions" },
    { id: "transactions.approve", label: "Approve transactions" },
    { id: "transactions.refund", label: "Process refunds" },
  ]},
  { category: "Reports", permissions: [
    { id: "reports.view", label: "View reports" },
    { id: "reports.export", label: "Export reports" },
    { id: "reports.create", label: "Create custom reports" },
  ]},
  { category: "Admin", permissions: [
    { id: "admin.settings", label: "Modify settings" },
    { id: "admin.logs", label: "View audit logs" },
    { id: "admin.config", label: "Edit configuration" },
  ]},
];

const ROLE_PERMISSIONS = {
  super_admin: [
    "users.view", "users.verify", "users.suspend", "users.edit",
    "listings.view", "listings.approve", "listings.reject", "listings.suspend",
    "disputes.view", "disputes.resolve", "disputes.escalate",
    "transactions.view", "transactions.approve", "transactions.refund",
    "reports.view", "reports.export", "reports.create",
    "admin.settings", "admin.logs", "admin.config",
  ],
  officer: [
    "users.view", "users.verify",
    "listings.view", "listings.approve", "listings.reject",
    "disputes.view", "disputes.resolve",
    "transactions.view", "transactions.approve",
    "reports.view", "reports.export",
  ],
  moderator: [
    "users.view", "users.suspend",
    "listings.view", "listings.suspend",
    "disputes.view",
  ],
  analyst: [
    "users.view",
    "listings.view",
    "reports.view", "reports.export",
  ],
};

export function RolePermissionsPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editPermissions, setEditPermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleEditRole = (roleId: string) => {
    setSelectedRole(roleId);
    setEditPermissions(ROLE_PERMISSIONS[roleId as keyof typeof ROLE_PERMISSIONS] || []);
    setIsEditMode(true);
  };

  const handleSavePermissions = () => {
    setIsEditMode(false);
  };

  const togglePermission = (permId: string) => {
    setEditPermissions((prev) =>
      prev.includes(permId)
        ? prev.filter((p) => p !== permId)
        : [...prev, permId]
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Lock className="h-8 w-8 text-primary-500" />
            Role Permissions
          </h1>
          <p className="text-gray-500 mt-1">
            Manage role-based access control and permissions
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
          Create New Role
        </Button>
      </div>

      {/* Roles Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ROLES.map((role) => (
          <Card
            key={role.id}
            padding="md"
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              selectedRole === role.id && "ring-2 ring-primary-500"
            )}
            onClick={() => {
              setIsEditMode(false);
              setSelectedRole(selectedRole === role.id ? null : role.id);
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{role.name}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {role.description}
                </p>
              </div>
              <Badge
                className={cn(
                  role.color === "danger" && "bg-danger-100 text-danger-700",
                  role.color === "primary" && "bg-primary-100 text-primary-700",
                  role.color === "info" && "bg-info-100 text-info-700",
                  role.color === "success" && "bg-success-100 text-success-700"
                )}
              >
                {role.userCount} users
              </Badge>
            </div>

            {selectedRole === role.id && !isEditMode && (
              <div className="mt-3 pt-3 border-t border-gray-100 animate-fade-in">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  leftIcon={<Edit2 className="h-3 w-3" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditRole(role.id);
                  }}
                >
                  Edit Permissions
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Permission Editor */}
      {isEditMode && selectedRole && (
        <Card padding="lg" className="border-2 border-primary-200 bg-primary-50">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Edit Permissions: {ROLES.find((r) => r.id === selectedRole)?.name}
          </h2>

          <div className="space-y-6 max-h-96 overflow-y-auto">
            {PERMISSIONS.map((category) => (
              <div key={category.category}>
                <h3 className="font-bold text-gray-900 mb-3">
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.permissions.map((perm) => (
                    <label
                      key={perm.id}
                      className="flex items-center gap-3 p-2 rounded hover:bg-white/50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={editPermissions.includes(perm.id)}
                        onChange={() => togglePermission(perm.id)}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {perm.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 pt-4 border-t border-primary-200">
            <Button
              variant="primary"
              onClick={handleSavePermissions}
              className="flex-1"
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsEditMode(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="ghost"
              leftIcon={<Copy className="h-4 w-4" />}
            />
          </div>
        </Card>
      )}

      {/* Detailed Permissions Table */}
      {selectedRole && !isEditMode && (
        <Card padding="lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Current Permissions
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-2 px-3 font-bold text-gray-900">
                    Category
                  </th>
                  <th className="text-left py-2 px-3 font-bold text-gray-900">
                    Permission
                  </th>
                  <th className="text-center py-2 px-3 font-bold text-gray-900">
                    Granted
                  </th>
                </tr>
              </thead>
              <tbody>
                {PERMISSIONS.map((category) =>
                  category.permissions.map((perm, idx) => {
                    const isGranted = editPermissions.includes(perm.id) || 
                      ROLE_PERMISSIONS[selectedRole as keyof typeof ROLE_PERMISSIONS]?.includes(perm.id);
                    return (
                      <tr
                        key={perm.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-3">
                          {idx === 0 && (
                            <Badge variant="outline">{category.category}</Badge>
                          )}
                        </td>
                        <td className="py-3 px-3 font-medium text-gray-900">
                          {perm.label}
                        </td>
                        <td className="py-3 px-3 text-center">
                          {isGranted ? (
                            <CheckCircle2 className="h-5 w-5 text-success-600 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-gray-300 mx-auto" />
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Best Practices */}
      <Card padding="md" className="bg-info-50 border-info-200">
        <div className="flex gap-3">
          <Shield className="h-5 w-5 text-info-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-info-900">Permission Best Practices</p>
            <ul className="text-sm text-info-700 mt-2 space-y-1">
              <li>• Follow the principle of least privilege</li>
              <li>• Regularly audit role permissions</li>
              <li>• Separate sensitive operations from routine tasks</li>
              <li>• Require 2FA for admin operations</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default RolePermissionsPage;