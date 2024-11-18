// src/components/GlobalSearch/SearchInput.tsx

import React from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../../../assets/icons/Icons";

const SearchInput = ({
  searchTerm,
  setSearchTerm,
  searchInputRef,
  handleSearch,
}: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchInputRef: React.RefObject<HTMLInputElement>;
  handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}) => (
  <Input
    onKeyDown={handleSearch}
    startContent={<SearchIcon className="size-5" />}
    placeholder="Search.."
    onChange={(e) => setSearchTerm(e.target.value)}
    value={searchTerm}
    ref={searchInputRef}
    className="pb-3 pt-1"
  />
);

export default SearchInput;
