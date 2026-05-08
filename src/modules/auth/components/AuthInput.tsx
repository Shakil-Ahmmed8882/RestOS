"use client";

import { Input } from "@/components/ui/input";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, ...props }, ref) => (
    <Input
      ref={ref}
      className={cn(
        "placeholder:text-gray-400 border-gray-400 rounded-full",
        className
      )}
      {...props}
    />
  )
);

AuthInput.displayName = "AuthInput";
