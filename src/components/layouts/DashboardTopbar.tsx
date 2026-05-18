"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCredentials } from "@/redux/slices/authSlice";
import { SearchTriggerButton } from "@/modules/shared/global-search";


export function DashboardTopbar({ title }: { title?: string }) {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    
    dispatch(clearCredentials());
    if (typeof document !== "undefined") {
      document.cookie = "accessToken=; path=/; max-age=0";
      window.localStorage.removeItem("accessToken");
    }
    router.push("/");
    
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 bg-background/80 px-6 backdrop-blur">
      <h1 className="text-lg font-semibold tracking-tight">{title ?? "Dashboard"}</h1>
      <div className="flex flex-1 justify-center px-4">
        <SearchTriggerButton variant="pill" />
      </div>
      <div className="flex items-center gap-2">
        <span className="md:hidden">
          <SearchTriggerButton variant="icon" />
        </span>
        {mounted && (
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
            <Icon icon={theme === "dark" ? "solar:sun-linear" : "solar:moon-linear"} className="h-5 w-5" />
          </Button>
        )}
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Icon icon="solar:bell-linear" className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3 rounded-full border border-gray-200 dark:border-gray-800 bg-card py-1 pl-1 pr-3">
          <Avatar className="h-7 w-7">
            <AvatarImage src={user?.photoURL ?? undefined} />
            <AvatarFallback>{user?.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium">{user?.name ?? "Guest"}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Sign out">
          <Icon icon="solar:logout-2-linear" className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
