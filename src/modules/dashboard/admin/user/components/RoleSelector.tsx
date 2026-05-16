"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import { useMultipageModalSelector } from "@/components/rest-os-ui/modal/multipage-modal/provider/MultipageModalContext";

const ROLES = [
  {
    value: "USER",
    label: "User",
    badgeIcon: "solar:user-bold",
    cardIcon: "solar:user-linear",
    description: "Standard access with limited permissions",
  },
  {
    value: "ADMIN",
    label: "Admin",
    badgeIcon: "solar:shield-check-bold",
    cardIcon: "solar:shield-check-linear",
    description: "Full platform access and management rights",
  },
] as const;

type Role = "USER" | "ADMIN";

// ── Inner select page — lives inside MultipageModal ──────────────────────────
function RoleSelectPage({
  currentRole,
  onConfirm,
}: {
  currentRole: Role;
  onConfirm: (role: Role) => Promise<void>;
}) {
  const { close, goTo } = useMultipageModalSelector();
  const [selected, setSelected] = useState<Role>(currentRole);
  const [saving, setSaving] = useState(false);

  const hasChanged = selected !== currentRole;

  const handleConfirm = async () => {
    if (!hasChanged) return;
    setSaving(true);
    try {
      await onConfirm(selected);
      goTo("role-success");
    } catch {
      // error toast handled by caller
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 bg-white p-8 rounded-lg shadow-sm dark:bg-gray-900 ">
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b  border-gray-100 dark:border-white/[0.06]">
        <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon icon="solar:shield-admin-linear" className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white">Change User Role</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Select the role to assign to this user
          </p>
        </div>
      </div>

      {/* Role options */}
      <div className="space-y-3">
        {ROLES.map((role) => {
          const isCurrent = currentRole === role.value;
          const isSelected = selected === role.value;

          return (
            <button
              key={role.value}
              type="button"
              onClick={() => setSelected(role.value)}
              disabled={saving}
              className={`w-full rounded-xl border-2 px-4 py-4 text-left transition-all duration-200 disabled:cursor-not-allowed ${
                isSelected
                  ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-sm"
                  : "border-gray-200 dark:border-white/[0.08] hover:border-primary/30 hover:bg-gray-50/80 dark:hover:bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Radio circle */}
                <div
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {isSelected && (
                    <Icon icon="solar:check-linear" className="h-3 w-3 text-white" />
                  )}
                </div>

                {/* Role icon */}
                <div
                  className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? "bg-primary/15 dark:bg-primary/20"
                      : "bg-gray-100 dark:bg-white/[0.06]"
                  }`}
                >
                  <Icon
                    icon={role.cardIcon}
                    className={`h-5 w-5 transition-colors ${
                      isSelected
                        ? "text-primary"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {role.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/[0.08] text-gray-500 dark:text-gray-400">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {role.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <Button
          variant="outline"
          onClick={close}
          disabled={saving}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={!hasChanged || saving}
          loading={saving}
          className="flex-1 text-white"
        >
          {saving ? "Saving..." : hasChanged ? "Change Role" : "No Changes"}
        </Button>
      </div>
    </div>
  );
}

// ── Success page ─────────────────────────────────────────────────────────────
function RoleSuccessPage({ newRole }: { newRole: Role }) {
  const { close } = useMultipageModalSelector();
  const role = ROLES.find((r) => r.value === newRole)!;

  return (
    <div className="flex flex-col space-y-6  p-8 rounded-lg shadow-sm  items-center text-center py-12 ">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-green-500/15 blur-xl scale-150" />
        <div className="relative h-20 w-20 rounded-full bg-green-50 dark:bg-green-500/10 border-2 border-green-200 dark:border-green-500/20 flex items-center justify-center">
          <Icon icon="solar:check-circle-bold" className="h-10 w-10 text-green-500" />
        </div>
      </div>

      <div className="space-y-1.5 pt-3">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Role Updated</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          User role has been changed to{" "}
          <span className="font-medium text-gray-700 dark:text-gray-200 inline-flex items-center gap-1">
            <Icon icon={role.cardIcon} className="h-3.5 w-3.5" />
            {role.label}
          </span>
        </p>
      </div>

      <Button onClick={close} className="mt-2 text-white px-8">
        Done
      </Button>
    </div>
  );
}

// ── Public component ─────────────────────────────────────────────────────────
interface RoleSelectorProps {
  currentRole: Role;
  onRoleChange: (role: Role) => Promise<void>;
  disabled?: boolean;
}

export function RoleSelector({ currentRole, onRoleChange, disabled = false }: RoleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmedRole, setConfirmedRole] = useState<Role>(currentRole);

  const roleDef = ROLES.find((r) => r.value === currentRole);

  const handleConfirm = async (newRole: Role) => {
    await onRoleChange(newRole);
    setConfirmedRole(newRole);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        disabled={disabled}
        className="inline-flex items-center px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/[0.08] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Change user role"
      >
        <Badge
          variant={currentRole === "ADMIN" ? "default" : "secondary"}
          className="flex items-center gap-1.5 cursor-pointer"
        >
          <Icon icon={roleDef?.badgeIcon ?? "solar:user-bold"} className="h-3.5 w-3.5" />
          <span className="capitalize">{roleDef?.label?.toLowerCase() ?? "user"}</span>
        </Badge>
      </button>

      <MultipageModal
        open={isOpen}
        onOpenChange={setIsOpen}
        initialPageId="role-select"
      >
        
        <MultipageModal.Page id="role-select" maxWidth="max-w-[600px]">
          <RoleSelectPage currentRole={currentRole} onConfirm={handleConfirm} />
        </MultipageModal.Page>

        <MultipageModal.Page id="role-success" maxWidth="max-w-[600px]">
          <RoleSuccessPage newRole={confirmedRole} />
        </MultipageModal.Page>
      </MultipageModal>
    </>
  );
}
