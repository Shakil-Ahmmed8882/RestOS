"use client";

import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import { SmoothResizeWrapper } from "@/components/common/wrapper/animation";
import { useGlobalSearchSelector } from "./context/GlobalSearchContext";
import { SearchInput } from "./components/SearchInput";
import { SearchResultsSection } from "./sections/SearchResultsSection";
import { SearchFooterSection } from "./sections/SearchFooterSection";

export function GlobalSearchLayout() {
  const { isOpen, close } = useGlobalSearchSelector();

  const handleOpenChange = (next: boolean) => {
    if (!next) close();
  };

  return (
    <MultipageModal
      open={isOpen}
      onOpenChange={handleOpenChange}
      initialPageId="search"
      className="!p-0"
    >
      <MultipageModal.Page id="search" maxWidth="max-w-2xl">
        {/* No inner shell — the MultipageModal panel already provides
            the rounded background. We just compose the search content. */}
        <div className="relative w-full">
          <SearchInput />
          <SmoothResizeWrapper duration={260} fadeContent>
            <SearchResultsSection />
          </SmoothResizeWrapper>
          <SearchFooterSection />
        </div>
      </MultipageModal.Page>
    </MultipageModal>
  );
}
