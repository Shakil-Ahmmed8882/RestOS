"use client";

import { useMemo, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useGetPaymentHistoryQuery } from "@/redux/featureApi/paymentApi";
import { useGetAllOrderSummaryQuery } from "@/redux/featureApi/orderApi";
import type { PaymentDoc, PaymentStatus, PurchasesFilter } from "@/modules/dashboard/user/purchases/types";

interface OrderSummaryShape {
  totalPurchasePrice?: number;
  totalPurchaseCount?: number;
  totalOrderPrice?: number | string;
  totalOrderCount?: number;
}

export function usePurchasedList() {
  const user = useAppSelector((s) => s.auth.user);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<PurchasesFilter>("completed");
  const limit = 10;

  const historyQuery = useGetPaymentHistoryQuery({ page, limit });
  const summaryQuery = useGetAllOrderSummaryQuery(
    { userId: user?.id ?? "" },
    { skip: !user?.id },
  );

  const allRows: PaymentDoc[] = useMemo(() => historyQuery.data?.data ?? [], [historyQuery.data]);
  const meta = historyQuery.data?.meta;

  const filtered = useMemo(() => {
    if (filter === "all") return allRows;
    return allRows.filter((row) => row?.status === (filter as PaymentStatus));
  }, [allRows, filter]);

  const counts = useMemo(() => {
    return allRows.reduce(
      (acc, row) => {
        const status = (row?.status ?? "") as PaymentStatus;
        if (status === "completed") acc.completed += 1;
        else if (status === "pending") acc.pending += 1;
        acc.all += 1;
        return acc;
      },
      { completed: 0, pending: 0, all: 0 },
    );
  }, [allRows]);

  const summaryRaw = (summaryQuery.data as { data?: OrderSummaryShape } | undefined)?.data;
  const summary = {
    totalPurchasePrice: Number(summaryRaw?.totalPurchasePrice ?? 0),
    totalPurchaseCount: Number(summaryRaw?.totalPurchaseCount ?? 0),
    totalOrderPrice: Number(summaryRaw?.totalOrderPrice ?? 0),
    totalOrderCount: Number(summaryRaw?.totalOrderCount ?? 0),
  };

  return {
    user,
    rows: filtered,
    allRows,
    counts,
    summary,
    meta,
    filter,
    setFilter,
    page,
    setPage,
    isLoading: historyQuery.isLoading,
    isError: historyQuery.isError,
    refetch: historyQuery.refetch,
    isSummaryLoading: summaryQuery.isLoading,
  };
}
