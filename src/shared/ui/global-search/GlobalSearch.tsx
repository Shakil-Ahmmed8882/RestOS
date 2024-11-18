// src/components/GlobalSearch/GlobalSearch.tsx

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

import SearchResults from "./SearchResults";
import SearchInput from "./SearchInput";
import SearchError from "./SearchError";
import SearchLoading from "./SearchLoading";
import useDebounce from "../../../🔗Hook/useDebounce";
import { useGetAllSearchResultsQuery } from "../../../redux/features/search/search.api";
import ModalWrapper from "../wrapper/ModalWrapper";
import CustomPagination from "../CustomPagination";
import { hasValidResults } from "./utils";
import NotFound from "../../../module/dashboard/adminDashboard/blog-management/blog-analytics/components/NotFound";


export default function GlobalSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useGetAllSearchResultsQuery([
    { name: "searchTerm", value: debouncedSearchTerm },
    { name: "limit", value: 2 },
    { name: "page", value: page },
  ]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchTerm]);

  const handleSearch = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && searchTerm.trim()) {
        setIsModalOpen(false);
        navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      }
    },
    [searchTerm, navigate]
  );

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <ModalWrapper
      title="Search anything you like"
      triggerElement={<BsSearch className="cursor-pointer size-5" />}
      size="3xl"
      isOpen={isModalOpen}
      onOpen={handleOpen}
      onClose={handleClose}
    >
      <div className="space-y-4">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchInputRef={searchInputRef}
          handleSearch={handleSearch}
        />

        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading && <SearchLoading />}
          {isError && <SearchError />}
          {data && data.data && hasValidResults(data.data) ? (
            <SearchResults handleClose={handleClose} results={data.data} />
          ) : (
            <div className="h-[50vh] mt-24">
              <NotFound/>
            </div>
          )}
        </div>

        <CustomPagination
          currentPage={page}
          limit={data?.meta?.limit}
          onPageChange={setPage}
          total={data?.meta?.total}
        />
      </div>
    </ModalWrapper>
  );
}
