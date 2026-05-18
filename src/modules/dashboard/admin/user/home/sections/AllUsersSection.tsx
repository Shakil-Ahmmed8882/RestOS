"use client";

import { useCallback, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/modules/dashboard/shared/sections/DataTable";
// import { RoleSelector } from "@/modules/dashboard/admin/user/components/RoleSelector";
import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import {
  useLazyGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleStatusMutation,
} from "@/redux/featureApi/userApi";
// import { UserAnalyticsSection } from "@/modules/dashboard/admin/user/sections/UserAnalyticsSection";
// import { AddUserForm } from "@/modules/dashboard/admin/user/sections/AddUserForm";
// import { AddUserSuccess } from "@/modules/dashboard/admin/user/sections/AddUserSuccess";
import {
  InfiniteScrollSentinel,
  useInfiniteScrollController,
  type FetchPage,
} from "@/components/rest-os-ui/infinite-scroll";
import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";
import { SectionErrorBoundary } from "@/components/rest-os-ui/layouts/wrapper/SectionErrorBoundary";
import { usePrefetchUser } from "@/modules/dashboard/admin/user/details/hooks/usePrefetchUser";
import { UserAnalyticsSection } from "./UserAnalyticsSection";
import { AddUserForm } from "./AddUserForm";
import { AddUserSuccess } from "./AddUserSuccess";
import { RoleSelector } from "../components/RoleSelector";

const PAGE_SIZE = 10;

interface UserRow {
  _id: string;
  name: string;
  email: string;
  role?: string;
  photo?: string;
  createdAt?: string;
}

export function AllUsersSection() {
  return (
    <SectionErrorBoundary>
      <AllUsersSectionInner />
    </SectionErrorBoundary>
  );
}

function AllUsersSectionInner() {
  const router = useRouter();
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [triggerGetUsers] = useLazyGetAllUsersQuery();
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();
  const [updateRoleStatus] = useUpdateUserRoleStatusMutation();
  const [optimisticRoles, setOptimisticRoles] = useState<Record<string, string>>({});
  const { prefetchUser } = usePrefetchUser();

  const fetchUsersPage: FetchPage<UserRow> = useCallback(
    async (page) => {
      const response: any = await triggerGetUsers(
        [
          { name: "page", value: String(page) },
          { name: "limit", value: String(PAGE_SIZE) },
        ],
        false,
      ).unwrap();

      const payload = response?.data;
      const items: UserRow[] = Array.isArray(payload)
        ? payload
        : payload?.result ?? [];

      const meta = payload?.meta;
      const hasMore =
        typeof meta?.totalPages === "number"
          ? page < meta.totalPages
          : items.length === PAGE_SIZE;

      return { items, hasMore };
    },
    [triggerGetUsers],
  );

  const {
    items,
    status,
    error,
    hasMore,
    loadMore,
    retry,
    prependItem,
    removeItem,
  } = useInfiniteScrollController<UserRow>({ fetchPage: fetchUsersPage });

  const isInitialLoading = status === "loading" && items.length === 0;
  const isLoadingMore = status === "loading" && items.length > 0;

  const displayRows = useMemo(
    () =>
      items.map((row) => ({
        ...row,
        role: optimisticRoles[row._id] ?? row.role,
      })),
    [items, optimisticRoles],
  );

  const handleViewUser = (userId: string) => {
    router.push(`/admin/dashboard/all-users/${userId}`);
  };

  const handleRoleChange = async (userId: string, newRole: "USER" | "ADMIN") => {
    const originalRole = items.find((r) => r._id === userId)?.role;

    setOptimisticRoles((prev) => ({ ...prev, [userId]: newRole }));

    try {
      await updateRoleStatus({ id: userId, data: { role: newRole } }).unwrap();
      toast.success(`Role updated to ${newRole.toLowerCase()}`);
    } catch (e: any) {
      setOptimisticRoles((prev) => {
        const next = { ...prev };
        if (originalRole) next[userId] = originalRole;
        else delete next[userId];
        return next;
      });
      toast.error(e?.data?.message ?? "Failed to update role");
      throw e;
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
            onMouseEnter={() => prefetchUser(row.original._id)}
            onFocus={() => prefetchUser(row.original._id)}
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
            currentRole={(row.original.role?.toUpperCase() as "USER" | "ADMIN") ?? "USER"}
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
              onMouseEnter={() => prefetchUser(row.original._id)}
              onFocus={() => prefetchUser(row.original._id)}
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
                  removeItem((u) => u._id === row.original._id);
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
    [deleteUser, deleting, router, removeItem, prefetchUser],
  );

  return (
    <>
      <UserAnalyticsSection />

      <div className="flex justify-end mb-6">
        <Button
          onClick={() => setAddUserOpen(true)}
          className="rounded-full text-white shadow-sm hover:shadow-md transition-all"
        >
          <Icon icon="solar:plus-circle-linear" className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={displayRows}
        isLoading={isInitialLoading}
        emptyMessage="No users yet."
        skeletonConfig={[
          { type: "user" },
          { type: "badge" },
          { type: "text", width: 72 },
          { type: "actions", count: 2 },
        ]}
        skeletonRows={PAGE_SIZE}
      />

      {isLoadingMore && (
        <div className="mt-3 flex items-center justify-center gap-3 rounded-xl bg-white dark:bg-zinc-900/50 px-4 py-3">
          <BaseSkeleton className="h-4 w-4 rounded-full" />
          <span className="text-xs text-muted-foreground">Loading more users...</span>
        </div>
      )}

      {status === "error" && (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-red-50 dark:bg-red-500/10 px-4 py-3">
          <span className="text-xs text-red-600 dark:text-red-400">
            {(error as any)?.data?.message ?? "Failed to load more users."}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={retry}
            className="h-7 text-xs text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20"
          >
            Retry
          </Button>
        </div>
      )}

      <InfiniteScrollSentinel
        onIntersect={loadMore}
        enabled={hasMore && status === "idle"}
        observer={{ rootMargin: "300px" }}
      />

      <MultipageModal
        open={addUserOpen}
        onOpenChange={setAddUserOpen}
        initialPageId="add-user"
      >
        <MultipageModal.Page id="add-user" maxWidth="max-w-[700px]">
          <AddUserForm
            successPageId="add-user-success"
            callbacks={{
              // Post-success optimistic update: splice the confirmed
              // server row into the top of the local list instead of
              // refetching / invalidating the cache.
              onCreated: (user) => prependItem(user as UserRow),
            }}
          />
        </MultipageModal.Page>

        <MultipageModal.Page id="add-user-success" maxWidth="max-w-[500px]">
          <AddUserSuccess />
        </MultipageModal.Page>
      </MultipageModal>
    </>
  );
}
