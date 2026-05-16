"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import { useMultipageModalSelector } from "@/components/rest-os-ui/modal/multipage-modal/provider/MultipageModalContext";
import { BaseButton } from "@/components/rest-os-ui/buttons/BaseButton";

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
    <div className="bg-theme rounded-2xl p-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon icon="solar:shield-admin-linear" className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
            Change User Role
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Select the role to assign to this user
          </p>
        </div>
      </div>

      {/* Role options */}
      <div className="space-y-3 mb-8">
        {ROLES.map((role) => {
          const isCurrent = currentRole === role.value;
          const isSelected = selected === role.value;

          return (
            <button
              key={role.value}
              type="button"
              onClick={() => setSelected(role.value)}
              disabled={saving}
              className={`w-full rounded-2xl px-5 py-5 text-left transition-all duration-200 disabled:cursor-not-allowed ${
                isSelected
                  ? "bg-primary/[0.06] dark:bg-primary/[0.12] shadow-lg shadow-primary/8 dark:shadow-primary/15"
                  : "bg-gray-50 dark:bg-white/[0.03] hover:bg-gray-100/80 dark:hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Radio */}
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

                {/* Icon box */}
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? "bg-primary/15 dark:bg-primary/25"
                      : "bg-gray-100 dark:bg-white/[0.07]"
                  }`}
                >
                  <Icon
                    icon={role.cardIcon}
                    className={`h-5 w-5 transition-colors ${
                      isSelected ? "text-primary" : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`font-semibold transition-colors ${
                        isSelected
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {role.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-200/80 dark:bg-white/[0.08] text-gray-500 dark:text-gray-400">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="ghost"
          onClick={close}
          disabled={saving}
          className="flex-1 h-11 bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.1] border-0 shadow-none rounded-xl font-medium"
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={!hasChanged || saving}
          loading={saving}
          className="flex-1 h-11 text-white rounded-xl font-medium shadow-sm hover:shadow-md transition-shadow"
        >
          {saving ? "Saving..." : hasChanged ? "Change Role" : "No Changes"}
        </Button>
      </div>
    </div>
  );
}

function RoleSuccessPage({ newRole }: { newRole: Role }) {
  const { close } = useMultipageModalSelector();
  const role = ROLES.find((r) => r.value === newRole)!;

  return (
    <div className="bg-theme rounded-2xl px-10 py-14 flex overflow-hidden flex-col items-center text-center">
      {/* Icon */}
      <div className="relative mb-7">
        <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl scale-[1.4]" />
        <div className="relative h-24 w-24 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center">
          <Icon icon="solar:check-circle-bold" className="h-12 w-12 text-green-500" />
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
        Role Updated
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
        User role has been changed to{" "}
        <span className="font-medium text-gray-700 dark:text-gray-200 inline-flex items-center gap-1.5">
          <Icon icon={role.cardIcon} className="h-3.5 w-3.5" />
          {role.label}
        </span>
      </p>

      <BaseButton
        size="lg"
        intent="primary"
        onClick={close}
        className="text-white px-10 w-full rounded-xl"
      >
        Done
      </BaseButton>
    </div>
  );
}

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
          className={`flex items-center gap-1.5 cursor-pointer ${
            currentRole === "ADMIN" ? "text-white" : ""
          }`}
        >
          <Icon icon={roleDef?.badgeIcon ?? "solar:user-bold"} className="h-3.5 w-3.5" />
          <span className="capitalize">{roleDef?.label?.toLowerCase() ?? "user"}</span>
        </Badge>
      </button>

      <MultipageModal open={isOpen} onOpenChange={setIsOpen} initialPageId="role-select">
        <MultipageModal.Page id="role-select" maxWidth="max-w-[600px]">
          <RoleSelectPage currentRole={currentRole} onConfirm={handleConfirm} />
        </MultipageModal.Page>

        <MultipageModal.Page id="role-success" maxWidth="max-w-[500px]">
          <RoleSuccessPage newRole={confirmedRole} />
        </MultipageModal.Page>
      </MultipageModal>
    </>
  );
}
