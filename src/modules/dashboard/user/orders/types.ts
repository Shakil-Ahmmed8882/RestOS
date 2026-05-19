import type { MyOrder, MyOrdersSummaryData } from "@/redux/featureApi/orderApi";

export type OrderStatusFilter = "pending" | "confirmed" | "canceled" | "all";

export type { MyOrder, MyOrdersSummaryData };
