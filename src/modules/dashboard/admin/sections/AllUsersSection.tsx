"use client";

import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/modules/dashboard/shared/sections/DataTable";
import { RoleSelector } from "@/modules/dashboard/admin/components/RoleSelector";
import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import { useGetAllUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from "@/redux/featureApi/userApi";
import { UserAnalyticsSection } from "@/modules/dashboard/admin/sections/UserAnalyticsSection";
import { AddUserFormBasic } from "@/modules/dashboard/admin/sections/AddUserForm";

interface UserRow {
  _id: string;
  name: string;
  email: string;
  role?: string;
  photo?: string;
  createdAt?: string;
}

export function AllUsersSection() {
  const router = useRouter();
  const [addUserOpen, setAddUserOpen] = useState(false);
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const rows: UserRow[] = Array.isArray((data as any)?.data)
    ? (data as any)?.data
    : (data as any)?.data?.result ?? [];

  const handleViewUser = (userId: string) => {
    router.push(`/admin/dashboard/all-users/${userId}`);
  };

  const handleRoleChange = async (userId: string, newRole: "USER" | "ADMIN") => {
    try {
      await updateUser({
        id: userId,
        data: { role: newRole },
      }).unwrap();
      toast.success(`User role updated to ${newRole.toLowerCase()}`);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to update user role");
    }
  };

  const columns = useMemo<ColumnDef<UserRow>[]>(
    () => [
      {
        header: "User",
        accessorKey: "name",
        cell: ({ row }) => (
          <button
            onClick={() => handleViewUser(row.original._id)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity w-full text-left"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={row.original.photo} />
              <AvatarFallback>{row.original.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{row.original.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{row.original.email}</p>
            </div>
          </button>
        ),
      },
      {
        header: "Role",
        accessorKey: "role",
        cell: ({ row }) => (
          <RoleSelector
            currentRole={row.original.role || "USER"}
            onRoleChange={(newRole) => handleRoleChange(row.original._id, newRole)}
          />
        ),
      },
      {
        header: "Joined",
        accessorKey: "createdAt",
        cell: ({ row }) =>
          row.original.createdAt
            ? new Date(row.original.createdAt).toLocaleDateString("en-US", {
                year: "2-digit",
                month: "short",
                day: "numeric",
              })
            : "—",
      },
      {
        header: "",
        id: "actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleViewUser(row.original._id)}
              title="View details"
              className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-white/[0.08]"
            >
              <Icon icon="solar:eye-linear" className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={async () => {
                const ok = window.confirm(`Delete ${row.original.name}?`);
                if (!ok) return;
                try {
                  await deleteUser(row.original._id).unwrap();
                  toast.success("User deleted");
                } catch (e: any) {
                  toast.error(e?.data?.message ?? "Failed to delete");
                }
              }}
              disabled={deleting}
              title="Delete user"
              className="h-8 w-8 hover:bg-red-50 dark:hover:bg-red-500/10"
            >
              <Icon
                icon="solar:trash-bin-trash-linear"
                className="h-4 w-4 text-red-500 dark:text-red-400"
              />
            </Button>
          </div>
        ),
      },
    ],
    [deleteUser, deleting, router],
  );

  return (
    <>
      <UserAnalyticsSection />

      <div className="flex justify-end mb-6">
        <Button
          onClick={() => setAddUserOpen(true)}
          className="rounded-full text-white shadow-sm hover:shadow-md transition-all"
        >
          <Icon icon="solar:plus-circle-linear" className="h-4.5 w-4.5 mr-2" />
          Add User
        </Button>
      </div>

      <DataTable columns={columns} data={rows} isLoading={isLoading} emptyMessage="No users yet." />

      <MultipageModal open={addUserOpen} onOpenChange={setAddUserOpen} initialPageId="basic-info">
        <MultipageModal.Page id="basic-info" maxWidth="max-w-[600px]">
          <AddUserFormBasic />
        </MultipageModal.Page>
      </MultipageModal>
    </>
  );
}
