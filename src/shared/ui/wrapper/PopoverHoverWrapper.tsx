import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
  } from "@nextui-org/react";
  import React, { ReactNode, useState } from "react";
  
  type PopHoverWrapperProps = {
    children?: ReactNode;
    triggerElement: ReactNode | string;
    title?: string;
  };
  
  export default function PopHoverWrapperProps({
    children,
    triggerElement,
    title,
  }: PopHoverWrapperProps) {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <Popover
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="top"
        showArrow
        shouldCloseOnBlur={true}
      >
        <PopoverTrigger>
          <span
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            style={{ cursor: "pointer" }}
          >
            {typeof triggerElement === "string" ? (
              <Button size="sm">{triggerElement}</Button>
            ) : (
              triggerElement
            )}
          </span>
        </PopoverTrigger>
  
        <PopoverContent>
          <div
            style={{
              padding: "8px",
              maxWidth: "200px",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {title && !children ? (
              <span>{title}</span>
            ) : (
              children
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  }
  