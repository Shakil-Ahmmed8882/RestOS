"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import userApi from "@/redux/featureApi/userApi";
import { useAppDispatch } from "@/redux/hooks";

export const usePrefetchUser = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const prefetchUser = useCallback(
    (userId: string) => {
      if (!userId) return;
      dispatch(
        userApi.endpoints.getSingleUser.initiate(userId, { forceRefetch: false }),
      );
      router.prefetch(`/admin/dashboard/all-users/${userId}`);
    },
    [dispatch, router],
  );

  return { prefetchUser };
};
