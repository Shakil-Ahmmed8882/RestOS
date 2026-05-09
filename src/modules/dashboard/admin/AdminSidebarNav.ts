import type { DashboardNavGroup } from "@/components/layouts/DashboardSidebar";

export const ADMIN_NAV: DashboardNavGroup[] = [
  {
    // title: "Overview",
    title: "",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: "solar:widget-bold-duotone" },
      { label: "Analytics", href: "/admin/dashboard/blog-analytics", icon: "solar:chart-square-bold-duotone" },
      { label: "All users", href: "/admin/dashboard/all-users", icon: "solar:users-group-rounded-linear" },
          { label: "All foods", href: "/admin/dashboard/all-foods", icon: "solar:dish-linear" },
    ],
  },
  // {
  //   title: "Users",
  //   items: [
  //     { label: "All users", href: "/admin/dashboard/all-users", icon: "solar:users-group-rounded-linear" },
  //     // { label: "Activity log", href: "/admin/dashboard/activity-log", icon: "solar:history-linear" },
  //   ],
  // },
  // {
  //   title: "Food",
  //   items: [
  //     { label: "All foods", href: "/admin/dashboard/all-foods", icon: "solar:dish-linear" },
  //     { label: "Add food", href: "/admin/dashboard/add-food", icon: "solar:add-square-linear" },
  //     { label: "Categories", href: "/admin/dashboard/categories", icon: "solar:folder-linear" },
  //     { label: "Discounts", href: "/admin/dashboard/discounts", icon: "solar:tag-price-linear" },
  //   ],
  // },
  // {
  //   title: "Orders",
  //   items: [
  //     { label: "All orders", href: "/admin/dashboard/all-orders", icon: "solar:bag-3-linear" },
  //     { label: "Pending", href: "/admin/dashboard/pending-orders", icon: "solar:hourglass-linear" },
  //     { label: "Purchased", href: "/admin/dashboard/purchaed-orders", icon: "solar:bag-check-linear" },
  //     { label: "History", href: "/admin/dashboard/order-history", icon: "solar:archive-linear" },
  //   ],
  // },
  // {
  //   title: "Blogs",
  //   items: [
  //     { label: "All posts", href: "/admin/dashboard/all-blog-posts", icon: "solar:document-text-linear" },
  //     { label: "Categories", href: "/admin/dashboard/blog-categories", icon: "solar:folder-2-linear" },
  //   ],
  // },
  // {
  //   title: "Recipes",
  //   items: [
  //     { label: "All recipes", href: "/admin/dashboard/all-recipes", icon: "solar:chef-hat-linear" },
  //     { label: "Add recipe", href: "/admin/dashboard/add-recipe", icon: "solar:add-circle-linear" },
  //     { label: "Categories", href: "/admin/dashboard/recipe-categories", icon: "solar:folder-3-linear" },
  //   ],
  // },
  // {
  //   title: "Account",
  //   items: [{ label: "Profile", href: "/admin/dashboard/profile", icon: "solar:user-circle-linear" }],
  // },
];
