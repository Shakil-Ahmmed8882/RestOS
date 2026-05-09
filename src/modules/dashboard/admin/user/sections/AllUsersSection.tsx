"use client";

import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/modules/dashboard/shared/sections/DataTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetAllUsersQuery, useDeleteUserMutation } from "@/redux/featureApi/userApi";
import { UserAnalyticsSection } from "@/modules/dashboard/admin/user/sections/UserAnalyticsSection";
import { AddUserForm } from "@/modules/dashboard/admin/user/sections/AddUserForm";
import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";

interface UserRow {
  _id: string;
  name: string;
  email: string;
  role?: string;
  photo?: string;
  createdAt?: string;
  status?: string;
}

export function AllUsersSection() {
  const router = useRouter();
  const [addUserOpen, setAddUserOpen] = useState(false);
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();
  const rows: UserRow[] = Array.isArray((data as any)?.data)
    ? (data as any)?.data
    : (data as any)?.data?.result ?? [];

  const handleViewUser = (userId: string) => {
    router.push(`/admin/dashboard/all-users/${userId}`);
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
              <p className="font-medium">{row.original.name}</p>
              <p className="text-xs text-muted-foreground">{row.original.email}</p>
            </div>
          </button>
        ),
      },
      {
        header: "Role",
        accessorKey: "role",
        cell: ({ row }) => (
          <Badge variant={row.original.role === "ADMIN" ? "default" : "secondary"}>
            {row.original.role?.toLowerCase() ?? "user"}
          </Badge>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <Badge variant={row.original.status === "ACTIVE" ? "default" : "destructive"}>
            {row.original.status?.toLowerCase() ?? "active"}
          </Badge>
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
            >
              <Icon icon="solar:eye-linear" className="h-4 w-4" />
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
            >
              <Icon icon="solar:trash-bin-trash-linear" className="h-4 w-4 text-destructive" />
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

      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setAddUserOpen(true)}
          className="rounded-full text-white"
        >
          <Icon icon="solar:plus-circle-linear" className="h-5 w-5 mr-2" />
          Add User
        </Button>
      </div>

      <DataTable columns={columns} data={rows} isLoading={isLoading} emptyMessage="No users yet." />

      <MultipageModal open={addUserOpen} initialPageId="basic-info" onOpenChange={setAddUserOpen} >
        <MultipageModal.Page id="basic-info" >
          <AddUserForm />
        </MultipageModal.Page>
      </MultipageModal>
    </>
  );
}
