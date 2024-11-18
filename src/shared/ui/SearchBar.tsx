import { Input } from "@nextui-org/react";
import React, { ChangeEvent, useState } from "react";
import { CiSearch } from "react-icons/ci";

interface SearchBarProps {
  onChange: (value: string) => void;
  placeholder?: string;
  px?: string;

}

const SearchBar = ({ onChange, placeholder = "Search" , px="px-2 " }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onChange(value);
  };

  return (
    <div className={`${px} focus-within:border-gray-400 rounded-lg transition-all duration-200 flex items-center gap-2`}>
      
      <SearchInput
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;

// SearchInput component now only accepts onChange as a prop
interface SearchInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
}

const SearchInput = ({ onChange, value, placeholder }: SearchInputProps) => {
  return (
    <Input
      onChange={onChange}
      startContent={<CiSearch />}
      value={value}
      placeholder={placeholder}
      color="default" // Adjust as necessary
      size="md" // Adjust as necessary
      className="h-10 w-full !p-0 rounded-md !border-none  px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
};


