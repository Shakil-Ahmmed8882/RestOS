"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Icon } from "@iconify/react";
import { ReduxProvider } from "@/redux/provider";

function ToastStatusIcon({ icon }: { icon: string }) {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
      <Icon icon={icon} className="h-3 w-3" />
    </span>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
        <Toaster
          position="bottom-right"
          icons={{
            success: <ToastStatusIcon icon="mdi:check-bold" />,
            error: <ToastStatusIcon icon="mdi:close-thick" />,
          }}
          toastOptions={{
            classNames: {
              toast:
                "bg-white text-zinc-900 dark:bg-white dark:text-zinc-900 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)] ring-1 ring-zinc-200/60 rounded-xl",
              title: "text-zinc-900 text-sm font-semibold",
              description: "text-zinc-500 text-xs",
              actionButton: "bg-primary text-primary-foreground",
              cancelButton: "bg-silk-with-hover text-zinc-700",
            },
          }}
        />
      </ThemeProvider>
    </ReduxProvider>
  );
}
