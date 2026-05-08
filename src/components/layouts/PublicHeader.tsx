"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layouts/Container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCredentials } from "@/redux/slices/authSlice";
import { ShowIf } from "@/components/common/ShowIf";
import { USER_ROLE } from "@/constants/roles";
import { signOutFirebase } from "@/modules/auth/services/firebase-auth.service";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Food", href: "/food" },
  { label: "Blog", href: "/blog" },
  { label: "Recipes", href: "/recipe/new" },
  { label: "FAQ", href: "/faq" },
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const cartCount = useAppSelector((s) => s.cart.items.reduce((n, i) => n + i.quantity, 0));
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await signOutFirebase();
    } catch {
      /* ignore */
    }
    dispatch(clearCredentials());
    if (typeof document !== "undefined") {
      document.cookie = "accessToken=; path=/; max-age=0";
      window.localStorage.removeItem("accessToken");
    }
    router.push("/");
  };

  const dashboardHref = user?.role === USER_ROLE.ADMIN ? "/admin/dashboard" : "/user/dashboard";

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Icon icon="solar:chef-hat-bold-duotone" className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">RestOS</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                pathname === item.href ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" aria-label="Search">
            <Link href="/menu">
              <Icon icon="solar:magnifer-linear" className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Cart" className="relative">
            <Link href="/cart">
              <Icon icon="solar:bag-3-linear" className="h-5 w-5" />
              <ShowIf condition={cartCount > 0}>
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              </ShowIf>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Icon icon={theme === "dark" ? "solar:sun-linear" : "solar:moon-linear"} className="h-5 w-5" />
          </Button>

          <ShowIf
            condition={!!user}
            fallback={
              <div className="hidden gap-2 sm:flex">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/sign-in">Sign in</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/sign-up">Sign up</Link>
                </Button>
              </div>
            }
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-ring">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.photoURL ?? undefined} alt={user?.name ?? "user"} />
                    <AvatarFallback>{user?.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="space-y-0.5">
                  <p className="text-sm font-semibold">{user?.name ?? "Account"}</p>
                  <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(dashboardHref)}>
                  <Icon icon="solar:widget-linear" className="mr-2 h-4 w-4" /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/user/dashboard/profile")}>
                  <Icon icon="solar:user-linear" className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <Icon icon="solar:logout-2-linear" className="mr-2 h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ShowIf>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            <Icon icon={open ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"} className="h-5 w-5" />
          </Button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border/60 bg-background md:hidden"
          >
            <Container className="flex flex-col gap-1 py-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                >
                  {item.label}
                </Link>
              ))}
              <ShowIf condition={!user}>
                <div className="mt-2 flex gap-2 pt-2">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link href="/sign-in" onClick={() => setOpen(false)}>
                      Sign in
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="flex-1">
                    <Link href="/sign-up" onClick={() => setOpen(false)}>
                      Sign up
                    </Link>
                  </Button>
                </div>
              </ShowIf>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
