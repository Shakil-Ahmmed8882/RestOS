"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface RoleSelectorProps {
  currentRole: string;
  onRoleChange: (role: "USER" | "ADMIN") => Promise<void> | void;
  disabled?: boolean;
}

export function RoleSelector({
  currentRole,
  onRoleChange,
  disabled = false,
}: RoleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const roles = [
    { value: "USER", label: "User", icon: "solar:user-linear" },
    { value: "ADMIN", label: "Admin", icon: "solar:shield-admin-linear" },
  ];

  const selectedRole = roles.find((r) => r.value === currentRole?.toUpperCase());

  const handleRoleChange = async (newRole: "USER" | "ADMIN") => {
    if (newRole === currentRole?.toUpperCase()) return;

    setIsChanging(true);
    try {
      await onRoleChange(newRole);
      setIsOpen(false);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex items-center gap-2 px-2 py-1.5 rounded-lg  hover:bg-gray-100 dark:hover:bg-white/[0.08] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled || isChanging}
          title="Change user role"
        >
          <Badge
            variant={currentRole?.toUpperCase() === "ADMIN" ? "default" : "secondary"}
            className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
          >
            {selectedRole && (
              <Icon icon={selectedRole.icon} className="h-3.5 w-3.5" />
            )}
            <span>{selectedRole?.label?.toLowerCase() ?? "user"}</span>
            <Icon
              icon="solar:chevron-down-linear"
              className={`h-3 w-3 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </Badge>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[160px] bg-white dark:bg-gray-800">
        <div className="px-2 py-1.5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Change Role
          </p>
        </div>
        <DropdownMenuSeparator />

        {roles.map((role) => {
          const isSelected = currentRole?.toUpperCase() === role.value;
          return (
            <DropdownMenuItem
              key={role.value}
              onClick={() => handleRoleChange(role.value as "USER" | "ADMIN")}
              disabled={isSelected || isChanging}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Icon icon={role.icon} className="h-4 w-4" />
              <span className="flex-1">{role.label}</span>
              {isSelected && (
                <Icon icon="solar:check-circle-linear" className="h-4 w-4 text-primary" />
              )}
              {isChanging && role.value !== currentRole?.toUpperCase() && (
                <Icon icon="solar:loading-3-linear" className="h-4 w-4 animate-spin text-primary" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
