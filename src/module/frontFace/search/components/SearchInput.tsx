import React, { forwardRef } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../../../../assets/icons/Icons";

type SearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  inputClassNames?: {
    input?: string;
    inputWrapper?: string;
  };
};

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      onSubmit,
      placeholder = "Search...",
      size = "lg",
      className = "",
      inputClassNames = {
        input: "text-2xl h-16",
        inputWrapper: "h-16",
      },
    },
    ref
  ) => {
    return (
      <form onSubmit={onSubmit} className={className}>
        <Input
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          startContent={
            <SearchIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          size={size}
          classNames={inputClassNames}
        />
      </form>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
