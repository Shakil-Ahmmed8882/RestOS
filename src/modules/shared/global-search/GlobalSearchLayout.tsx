"use client";

import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import { useGlobalSearchSelector } from "./context/GlobalSearchContext";
import { SearchInput } from "./components/SearchInput";
import { SearchResultsSection } from "./sections/SearchResultsSection";
import { SearchIdleSection } from "./sections/SearchIdleSection";
import { SearchFooterSection } from "./sections/SearchFooterSection";

export function GlobalSearchLayout() {
  const { isOpen, close, status } = useGlobalSearchSelector();

  const handleOpenChange = (next: boolean) => {
    if (!next) close();
  };

  return (
    <MultipageModal open={isOpen} onOpenChange={handleOpenChange} initialPageId="search">
      <MultipageModal.Page id="search" maxWidth="max-w-2xl">
        <div className="relative w-full overflow-hidden rounded-2xl bg-white dark:bg-zinc-900/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
          <SearchInput />
          {status === "idle" ? <SearchIdleSection /> : <SearchResultsSection />}
          <SearchFooterSection />
        </div>
      </MultipageModal.Page>
    </MultipageModal>
  );
}
