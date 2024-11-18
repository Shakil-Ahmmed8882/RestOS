import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {  AnimatePresence } from "framer-motion";

import { useGetAllSearchResultsQuery } from "../../../redux/features/search/search.api";
import useDebounce from "../../../🔗Hook/useDebounce";
import Container from "../../../shared/layouts/Container";
import CustomPagination from "../../../shared/ui/CustomPagination";
import RenderSearchResults from "./components/SearchResults";
import MotionWrapper from "../../shared/MotionWrapper";
import SearchInput from "./components/SearchInput";

const GlobalSearchResultsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    if (query) {
      setSearchTerm(query);
    }
  }, [location]);

  const { data, isLoading, isError } = useGetAllSearchResultsQuery([
    { name: "searchTerm", value: debouncedSearchTerm },
    { name: "limit", value: 9 },
    { name: "page", value: page },
  ]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-8">
      <Container>
        <MotionWrapper className="py-12">
          <SearchInput
            ref={searchInputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSubmit={handleSearch}
            placeholder="Search for items..."
            className="max-w-4xl mx-auto"
            inputClassNames={{
              input: "text-lg h-12",
              inputWrapper: "h-12",
            }}
          />
        </MotionWrapper>

        <AnimatePresence mode="wait" key={debouncedSearchTerm}>
          {isLoading && (
            <MotionWrapper className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primaryColor"></div>
            </MotionWrapper>
          )}

          {isError && (
            <MotionWrapper className="text-center text-red-500 text-xl">
              Something went wrong. Please try again.
            </MotionWrapper>
          )}

          {data && data.data && data.data.length > 0 ? (
            <MotionWrapper className="min-h-[50vh]">
              <RenderSearchResults results={data.data} />
            </MotionWrapper>
          ) : (
            !isLoading &&
            debouncedSearchTerm && (
              <MotionWrapper className="flex items-center justify-center h-64 text-center text-gray-500 text-xl">
                <>No results found. Try a different search term.</>
              </MotionWrapper>
            )
          )}
        </AnimatePresence>

        {data && data.meta && (
          <MotionWrapper className="mt-12">
            <CustomPagination
              currentPage={page}
              limit={data.meta.limit}
              onPageChange={setPage}
              total={data.meta.total}
            />
          </MotionWrapper>
        )}
      </Container>
    </section>
  );
};

export default GlobalSearchResultsPage;
