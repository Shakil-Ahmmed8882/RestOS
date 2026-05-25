import type { DashboardNavGroup } from "@/components/layouts/DashboardSidebar";

export const USER_NAV: DashboardNavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/user/dashboard", icon: "solar:widget-bold-duotone" },
      { label: "Featured recipes", href: "/user/dashboard/featured-recipes", icon: "solar:chef-hat-linear" },
    ],
  },
  {
    title: "Activity",
    items: [
      { label: "Orders", href: "/user/dashboard/orderlist", icon: "solar:bag-3-linear" },
      { label: "Purchases", href: "/user/dashboard/purchasedList", icon: "solar:bag-check-linear" },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "My blogs", href: "/user/dashboard/my-blogs", icon: "solar:document-text-linear" },
      { label: "Saved", href: "/user/dashboard/saved", icon: "solar:bookmark-linear" },
    ],
  },
  {
    title: "Account",
    items: [{ label: "Profile", href: "/user/dashboard/profile", icon: "solar:user-circle-linear" }],
  },
];
