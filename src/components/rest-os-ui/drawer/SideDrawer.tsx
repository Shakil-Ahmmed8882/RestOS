"use client";

import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useScrollLock } from "@/components/rest-os-ui/utils/scroll/useScrollLock";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  /** Tailwind width class for the panel. Default: max-w-md */
  widthClass?: string;
  /** Right or left side. Default: right. */
  side?: "right" | "left";
};

/**
 * Lightweight right-side drawer / sheet.
 *
 * - Backdrop click + ESC close.
 * - Body scroll-locked while open.
 * - Slides in from the configured side.
 * - Renders into a portal so it sits above any scroll containers.
 */
export function SideDrawer(props: Props) {
  const {
    open,
    onOpenChange,
    title,
    description,
    children,
    widthClass = "max-w-md",
    side = "right",
  } = props;

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (typeof document === "undefined") return null;

  const initialX = side === "right" ? "100%" : "-100%";
  const sideClass = side === "right" ? "right-0" : "left-0";

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-[99999] bg-black/40"
            aria-hidden
          />
          <motion.aside
            key="drawer-panel"
            role="dialog"
            aria-modal="true"
            initial={{ x: initialX }}
            animate={{ x: 0 }}
            exit={{ x: initialX }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className={`fixed top-0 ${sideClass} z-[999999] h-full w-full ${widthClass} bg-background dark:bg-zinc-950 shadow-[0_0_40px_rgba(0,0,0,0.25)] flex flex-col`}
          >
            {(title || description) && (
              <header className="flex items-start justify-between gap-3 px-5 py-4 border-b border-zinc-100 dark:border-white/[0.06]">
                <div className="min-w-0">
                  {title && (
                    <h2 className="text-base font-semibold text-foreground truncate">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {description}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  aria-label="Close"
                  className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
                >
                  <Icon icon="solar:close-circle-linear" className="h-5 w-5" />
                </button>
              </header>
            )}

            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
