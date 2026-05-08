"use client";

import { useMemo } from "react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/modules/dashboard/shared/sections/DataTable";
import { useGetAllUsersQuery, useDeleteUserMutation } from "@/redux/featureApi/userApi";

interface UserRow {
  _id: string;
  name: string;
  email: string;
  role?: string;
  photo?: string;
  createdAt?: string;
}

export function AllUsersSection() {
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();
  const rows: UserRow[] = (data as any)?.data ?? [];

  const columns = useMemo<ColumnDef<UserRow>[]>(
    () => [
      {
        header: "User",
        accessorKey: "name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={row.original.photo} />
              <AvatarFallback>{row.original.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{row.original.name}</p>
              <p className="text-xs text-muted-foreground">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        header: "Role",
        accessorKey: "role",
        cell: ({ row }) => <Badge variant={row.original.role === "admin" ? "default" : "secondary"}>{row.original.role ?? "user"}</Badge>,
      },
      {
        header: "Joined",
        accessorKey: "createdAt",
        cell: ({ row }) => row.original.createdAt ? new Date(row.original.createdAt).toLocaleDateString() : "—",
      },
      {
        header: "",
        id: "actions",
        cell: ({ row }) => (
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
          >
            <Icon icon="solar:trash-bin-trash-linear" className="h-4 w-4 text-destructive" />
          </Button>
        ),
      },
    ],
    [deleteUser, deleting],
  );

  return <DataTable columns={columns} data={rows} isLoading={isLoading} emptyMessage="No users yet." />;
}
