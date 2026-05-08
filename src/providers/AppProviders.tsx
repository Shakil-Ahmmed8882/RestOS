"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { ReduxProvider } from "@/redux/provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
        <Toaster position="top-right" richColors />
      </ThemeProvider>
    </ReduxProvider>
  );
}
