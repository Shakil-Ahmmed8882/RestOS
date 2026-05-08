"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { ReduxProvider } from "@/redux/provider";
import { AuthModalProvider } from "@/modules/auth/context/AuthModalContext";
import { AuthModal } from "@/modules/auth/AuthModal";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <AuthModalProvider>
          {children}
          <AuthModal />
          <Toaster position="top-right" richColors />
        </AuthModalProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
