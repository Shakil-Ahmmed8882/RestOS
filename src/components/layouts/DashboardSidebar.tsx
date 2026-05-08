"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: string;
}

export interface DashboardNavGroup {
  title: string;
  items: DashboardNavItem[];
}

export function DashboardSidebar({
  brand,
  groups,
  variant,
}: {
  brand: string;
  groups: DashboardNavGroup[];
  variant: "admin" | "user";
}) {
  const pathname = usePathname();
  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-gray-200 dark:border-gray-800 bg-card md:flex">
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 dark:border-gray-800 px-5">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Icon icon="solar:chef-hat-bold-duotone" className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-bold leading-tight">RestOS</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{brand}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {groups.map((group) => (
          <div key={group.title} className="space-y-1">
            <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{group.title}</p>
            {group.items.map((item) => {
              const active = pathname === item.href || (item.href !== `/${variant}/dashboard` && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
                    active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  <Icon icon={item.icon} className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
          <Icon icon="solar:home-2-linear" className="h-4 w-4" />
          Back to website
        </Link>
      </div>
    </aside>
  );
}
