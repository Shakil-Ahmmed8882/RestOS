import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import React, { ReactNode } from "react";

type PopoverWrapperProps = {
  children: ReactNode; // The content inside the popover
  triggerElement: ReactNode | string; // The trigger element for the popover
};

export default function PopoverWrapper({
  children,
  triggerElement,
}: PopoverWrapperProps) {
  return (
    <Popover placement="bottom" showArrow={true} shouldCloseOnBlur={false}>
      <PopoverTrigger>
        {typeof triggerElement === "string" ? (
          <Button>{triggerElement}</Button>
        ) : (
          <span tabIndex={0} style={{ cursor: "pointer" }}>
            {triggerElement}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent className="shadow-none scroll-hide">
        <div
          className="px-1 py-2"
          style={{
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {children}
        </div>
      </PopoverContent>
    </Popover>
  );
}
