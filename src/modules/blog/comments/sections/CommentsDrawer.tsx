"use client";

import { SideDrawer } from "@/components/rest-os-ui/drawer";
import { CommentsProvider } from "../context/CommentsContext";
import { CommentsSection } from "./CommentsSection";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blogId: string | null;
  blogTitle?: string;
};

export function CommentsDrawer(props: Props) {
  const { open, onOpenChange, blogId, blogTitle } = props;

  return (
    <SideDrawer
      open={open && Boolean(blogId)}
      onOpenChange={onOpenChange}
      title="Comments"
      description={blogTitle}
      widthClass="max-w-lg"
      
    >
      {blogId && (
        <CommentsProvider blogId={blogId}>
          <div className="p-4 sm:p-5">
            <CommentsSection />
          </div>
        </CommentsProvider>
      )}
    </SideDrawer>
  );
}
