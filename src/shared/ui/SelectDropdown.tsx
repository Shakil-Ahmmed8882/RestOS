import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import React from "react";

export default function SelectDropdown({
  options,
  onChange,
  buttonLabel = "Open Menu",
  buttonProps = {},
  dropdownProps = {},
}) {
  return (
    <Dropdown {...dropdownProps}>
      <DropdownTrigger>
        <Button variant="bordered" className="w-full md:w-full my-4 md:my-0" {...buttonProps}>
          {buttonLabel}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        onAction={(key) => onChange(key)} 
        aria-label="Dropdown Menu"
      >
        {options.map((option) => (
          <DropdownItem key={option.title} textValue={option.title}>
            <span className="opacity-70">{option.icon} {option.title}</span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
