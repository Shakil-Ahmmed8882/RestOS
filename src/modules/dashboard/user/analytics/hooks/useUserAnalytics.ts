"use client";

import { useCallback, useEffect, useState } from "react";
import { useGetMyAnalyticsQuery } from "@/redux/featureApi/analyticsApi";

const STORAGE_KEY = "user-analytics:days";
const ALLOWED = [7, 30, 90, 365] as const;
type AllowedDays = (typeof ALLOWED)[number];

const isAllowed = (n: number): n is AllowedDays =>
  (ALLOWED as readonly number[]).includes(n);

function readInitialDays(): AllowedDays {
  if (typeof window === "undefined") return 30;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return 30;
    const parsed = Number(raw);
    return isAllowed(parsed) ? parsed : 30;
  } catch {
    return 30;
  }
}

export function useUserAnalytics() {
  const [days, setDaysState] = useState<AllowedDays>(30);

  useEffect(() => {
    setDaysState(readInitialDays());
  }, []);

  const setDays = useCallback((next: number) => {
    const safe: AllowedDays = isAllowed(next) ? next : 30;
    setDaysState(safe);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(safe));
    } catch {
      // ignore quota / private-mode errors
    }
  }, []);

  const query = useGetMyAnalyticsQuery(days, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const analytics = query.data?.data;

  return {
    days,
    setDays,
    analytics,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  };
}

export type UseUserAnalyticsReturn = ReturnType<typeof useUserAnalytics>;
