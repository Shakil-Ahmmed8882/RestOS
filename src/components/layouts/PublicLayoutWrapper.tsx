"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { PublicHeader } from "@/components/layouts/PublicHeader";
import { PublicFooter } from "@/components/layouts/PublicFooter";
import { Container } from "@/components/layouts/Container";
import {
  MultipageModalProvider,
  useMultipageModalContextHelper,
  useMultipageModalSelector,
} from "@/components/rest-os-ui/modal/multipage-modal/provider/MultipageModalContext";
import { getActivePage } from "@/components/rest-os-ui/modal/multipage-modal/utils/getActivePage";
import { pageVariants } from "@/components/rest-os-ui/modal/multipage-modal/utils/animateVariants";
import { useScrollLock } from "@/components/rest-os-ui/utils/scroll/useScrollLock";
import { useEscapeHandler } from "@/components/rest-os-ui/utils/events/useEscapeHelper";
import { Page } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import { SignInForm } from "@/modules/auth/sections/sign-in/SignInForm";
import { SignUpForm } from "@/modules/auth/sections/sign-up/SignUpForm";
import { ForgotPasswordForm } from "@/modules/auth/sections/forgot-password/ForgotPasswordForm";
import { CreateBlogModalSection } from "@/modules/blog/create/sections/CreateBlogModalSection";

// Auth + cross-feature pages defined once — passed to getActivePage for matching
const AUTH_PAGES = (
  <>
    <Page id="sign-in"><SignInForm /></Page>
    <Page id="sign-up"><SignUpForm /></Page>
    <Page id="forgot-password"><ForgotPasswordForm /></Page>
    <Page id="blog-create" maxWidth="max-w-[680px]"><CreateBlogModalSection /></Page>
  </>
);

// This renders the actual modal portal — lives inside MultipageModalProvider
// so it reads the shared controller via useMultipageModalSelector
function AuthModalPortal() {
  const { isOpen, currentPageId, canGoBack, direction, goBack, close } = useMultipageModalSelector();
  const activePage = getActivePage(AUTH_PAGES, currentPageId);

  useScrollLock(isOpen);
  useEscapeHandler(isOpen, canGoBack, goBack, close);

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      <AnimatePresence>
        {isOpen && activePage && (
          <motion.div
            key="auth-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99999] bg-black/40"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && activePage && (
          <motion.div
            key="auth-modal-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999999] overflow-y-auto"
            onClick={close}
          >
            <div className="flex min-h-full w-full items-start justify-center p-3 md:py-10 pointer-events-none">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentPageId}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  tabIndex={-1}
                  className={`relative w-full rounded-2xl p-7 bg-background pointer-events-auto my-auto outline-none ${activePage.props.maxWidth ?? "max-w-[750px]"}`}
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  {canGoBack && activePage.props.backTitle && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="!mb-3 z-10 flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-medium text-foreground bg-muted dark:bg-slate-800 hover:bg-muted/80 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="size-3.5" />
                      <span>{activePage.props.backTitle}</span>
                    </button>
                  )}
                  {activePage.props.children}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body,
  );
}

// Creates the single controller and provides it to the entire layout tree
export function PublicLayoutWrapper({ children }: { children: ReactNode }) {
  const controller = useMultipageModalContextHelper({ initialPageId: "sign-in" });

  return (
    <MultipageModalProvider value={controller}>
      <Container>
        <div className="flex min-h-screen flex-col bg-theme text-foreground ">
          <PublicHeader />
          <main className="flex-1">{children}</main>
          <PublicFooter />
        </div>
      </Container>
      {/* Portal lives inside provider — shares the same controller via context */}
      <AuthModalPortal />
    </MultipageModalProvider>
  );
}
