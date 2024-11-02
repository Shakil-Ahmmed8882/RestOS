import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button
  } from "@nextui-org/react";
  import React, { ReactNode } from "react";
  
  interface DropdownWrapperProps {
    trigger?: ReactNode; // Custom trigger element, defaults to Button
    children: ReactNode; // Dropdown content restricted to `DropdownItem` or wrapped as such
    showArrow?: boolean; // Optionally show the dropdown arrow
  }
  
  export default function DropdownWrapper({
    trigger = <Button variant="ghost" disableRipple>Open Menu</Button>, // Default trigger
    children,
    showArrow = true,
  }: DropdownWrapperProps) {
    // Ensure only DropdownItem or compatible components are passed
    const renderChildren = React.Children.map(children, (child) =>
      React.isValidElement(child) && child.type === DropdownItem
        ? child
        : <DropdownItem>{child}</DropdownItem>
    );
  
    return (
      <Dropdown
        showArrow={showArrow}
        radius="sm"
        classNames={{
          base: "before:bg-default-200", // change arrow background
          content: "p-0 border-small border-divider bg-background",
        }}
      >
        <DropdownTrigger>
          {trigger}
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Custom dropdown content"
          className="p-3"
        >
          {/* Use React.Fragment to ensure a single non-null element is returned */}
          <React.Fragment>
            {renderChildren}
          </React.Fragment>
        </DropdownMenu>
      </Dropdown>
    );
  }
  