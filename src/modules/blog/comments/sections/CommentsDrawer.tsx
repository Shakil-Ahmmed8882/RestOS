"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { SideDrawer } from "@/components/rest-os-ui/drawer";
import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import { CommentsProvider } from "../context/CommentsContext";
import { CommentsSection } from "./CommentsSection";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blogId: string | null;
  blogTitle?: string;
};

/**
 * Comments live in a side drawer by default. The header's expand control
 * lifts the *same* comments into the shared MultipageModal — a roomier,
 * centered, full-height surface. Both views share one CommentsProvider so
 * the data, optimistic rows, and mutation state stay in sync; only the
 * scroll position is independent. The modal owns its own open/close,
 * scroll-lock and ESC handling, so closing it simply drops back to the
 * drawer underneath.
 */
export function CommentsDrawer(props: Props) {
  const { open, onOpenChange, blogId, blogTitle } = props;
  const [expanded, setExpanded] = useState(false);

  const isOpen = open && Boolean(blogId);

  // Collapse the modal whenever the whole comments surface is dismissed,
  // so re-opening the drawer for another blog always starts in drawer view.
  const handleDrawerOpenChange = (next: boolean) => {
    if (!next) setExpanded(false);
    onOpenChange(next);
  };

  if (!blogId) {
    return (
      <SideDrawer
        open={isOpen}
        onOpenChange={handleDrawerOpenChange}
        title="Comments"
        description={blogTitle}
        widthClass="max-w-lg"
      >
        {null}
      </SideDrawer>
    );
  }

  return (
    <CommentsProvider blogId={blogId}>
      <SideDrawer
        open={isOpen}
        onOpenChange={handleDrawerOpenChange}
        title="Comments"
        description={blogTitle}
        widthClass="max-w-lg"
        headerActions={
          <button
            type="button"
            onClick={() => setExpanded(true)}
            aria-label="Open comments in full view"
            title="Expand"
            className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-zinc-100 dark:hover:bg-white/[0.06] transition-colors"
          >
            <Icon icon="solar:maximize-square-3-linear" className="h-5 w-5" />
          </button>
        }
      >
        <div className="p-4 sm:p-5">
          <CommentsSection />
        </div>
      </SideDrawer>

      <MultipageModal
        open={isOpen && expanded}
        onOpenChange={(next) => !next && setExpanded(false)}
        initialPageId="comments-full"
      >
        <MultipageModal.Page id="comments-full" maxWidth="max-w-2xl">
          <CommentsSection />
        </MultipageModal.Page>
      </MultipageModal>
    </CommentsProvider>
  );
}
