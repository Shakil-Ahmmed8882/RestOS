import type { BlogStatus } from "@/redux/featureApi/blogApi";
import type { BlogItem } from "@/modules/blog/types/blog.types";

export type MyBlogTabKey = "all" | BlogStatus;

export type { BlogItem, BlogStatus };

export const MY_BLOG_TABS: { key: MyBlogTabKey; label: string; icon: string }[] = [
  { key: "all", label: "All", icon: "solar:document-text-bold-duotone" },
  { key: "approved", label: "Approved", icon: "solar:check-circle-bold-duotone" },
  { key: "pending", label: "Pending", icon: "solar:clock-circle-bold-duotone" },
];
