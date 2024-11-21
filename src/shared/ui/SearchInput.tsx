import { Input } from "@nextui-org/react";
import React from "react";
import { SearchIcon } from "../../assets/icons/Icons";


type SearchInputProps = {
  placeholder?: string; 
  onChange: (p:string) => void; 
  startIcon?: React.ReactNode; 
  className?: string; 
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>; 
};

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...", 
  onChange,
  startIcon = <SearchIcon />, 
  className = "",
}) => {
  return (
    <section>
      <Input
        placeholder={placeholder}
        className={`!bg-transparent ${className}`}
        startContent={startIcon}
        onChange={(e) => onChange(e.target.value)}
      />
    </section>
  );
};

export default SearchInput;
