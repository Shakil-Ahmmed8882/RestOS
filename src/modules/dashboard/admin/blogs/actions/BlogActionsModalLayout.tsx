"use client";

import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import { useBlogActionsSelector } from "./context/BlogActionsContext";
import { EditBlogModalSection } from "./sections/EditBlogModalSection";
import { DeleteBlogModalSection } from "./sections/DeleteBlogModalSection";

export function BlogActionsModalLayout() {
  const { isOpen, mode, target, close } = useBlogActionsSelector();

  if (!target) return null;

  const handleOpenChange = (next: boolean) => {
    if (!next) close();
  };

  const initialPageId = mode === "delete" ? "blog-delete" : "blog-edit";

  return (
    <MultipageModal
      open={isOpen}
      onOpenChange={handleOpenChange}
      initialPageId={initialPageId}
    >
      <MultipageModal.Page id="blog-edit" maxWidth="max-w-[720px]">
        <EditBlogModalSection blogId={target.blogId} />
      </MultipageModal.Page>

      <MultipageModal.Page id="blog-delete" maxWidth="max-w-[460px]">
        <DeleteBlogModalSection
          blogId={target.blogId}
          blogTitle={target.blogTitle}
        />
      </MultipageModal.Page>
    </MultipageModal>
  );
}
