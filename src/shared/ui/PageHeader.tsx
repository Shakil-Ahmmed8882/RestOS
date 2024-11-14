import React from "react";
import { Input } from "@nextui-org/react";
import SelectDropdown from "./SelectDropdown";
import { SearchIcon } from "../../assets/icons/Icons";



interface PageHeaderProps {
    title?: string;             // Optional title
    subtitle?: string;          // Optional subtitle
    searchPlaceholder: string;
    dropdownOptions: { title: string; icon: string }[]; // Array with objects having title and icon
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDropdownChange: (value: any) => void;
    buttonLabel: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>; // Optional input props
    buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>; // Optional button props
    dropdownProps?: React.HTMLProps<HTMLDivElement>; // Optional dropdown props
  }

const PageHeader = ({
  title = '',
  subtitle = '',
  searchPlaceholder,
  dropdownOptions,
  onSearchChange,
  onDropdownChange,
  buttonLabel,
  inputProps,
  buttonProps,
  py = "py-16",
  dropdownProps,
}) => {
  return (
    <div className="relative overflow-hidden mb-10">
      <div className="absolute inset-0 bg-gradient-to-r from-[#fff] to-[#fffcfd] animate-gradient-x"></div>
      <div className={`${py} relative z-10 max-w-7xl mx-auto  px-6 text-center`}>
        {title&& <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>}
        {subtitle && <p className="text-xl text-[gray] pb-6 mx-auto md:w-3/4">
          {subtitle}
        </p>}
        <div className="md:flex gap-3 md:w-2/3 mx-auto">
          <div className="w-full">
            <Input
              placeholder={searchPlaceholder}
              className="!bg-transparent"
              color="success"
              startContent={<SearchIcon />}
              onChange={onSearchChange}
              {...inputProps}
            />
          </div>
          <div className="flex">
            <SelectDropdown
              options={dropdownOptions}
              onChange={onDropdownChange}
              buttonLabel={buttonLabel}
              buttonProps={buttonProps}
              dropdownProps={dropdownProps}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
