"use client";

import type { ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import no_content_icon from "@/components/inhouse/placeholder/no-results-found-wrapper/no_content_icon.svg";
import Image from "next/image";
import { NoPaymentIcon } from "./NoPaymentIcon";

// ============================================================
// NoResultFoundWrapper
// Wraps any list: renders children when data is non-empty,
// renders a fallback placeholder when data is empty.
//
// Variants add new built-in empty states without breaking the
// existing default usage. Add more variants here as needed.
// ============================================================

export type NoResultFoundVariant = "default" | "variants1";

type NoResultFoundWrapperProps<T> = {
  data: T[];
  children: ReactNode;
  /** Completely replace the placeholder UI */
  fallback?: ReactNode;
  /** Built-in empty-state preset */
  variant?: NoResultFoundVariant;
  /** Override the placeholder icon (shown when no custom fallback) */
  icon?: ReactNode;
  /** Override the placeholder title */
  title?: string;
  /** Override the placeholder message */
  message?: string;
  showTryAgain?: boolean;
  className?: string;
};

interface VariantConfig {
  icon: ReactNode;
  title: string;
  message: string;
  titleClassName: string;
  messageClassName: string;
}

const VARIANTS: Record<NoResultFoundVariant, VariantConfig> = {
  default: {
    icon: (
      <Image src={no_content_icon} alt="No results" width={100} height={100} />
    ),
    title: "No results found",
    message: "Please try again later",
    titleClassName: "text-[#141414] text-[28px] font-bold leading-snug",
    messageClassName: "text-[#666] text-sm leading-relaxed",
  },
  variants1: {
    icon: <NoPaymentIcon />,
    title: "No payments yet",
    message: "Once your jobs are completed, you'll see your earnings here",
    titleClassName: "text-black text-[24px] font-bold leading-[1.4]",
    messageClassName: "text-[#666] text-base leading-6",
  },
};

export function NoResultFoundWrapper<T>(props: NoResultFoundWrapperProps<T>) {
  const {
    data,
    children,
    fallback,
    variant = "variants1",
    icon,
    title,
    message,
    showTryAgain = false,
    className = "",
  } = props;

  if (data.length > 0) return <>{children}</>;

  if (fallback) return <>{fallback}</>;

  const config = VARIANTS[variant];
  const resolvedIcon = icon ?? config.icon;
  const resolvedTitle = title ?? config.title;
  const resolvedMessage = message ?? config.message;

  return (
    <div
      className={`flex flex-col items-center justify-center gap-5 py-16 px-6 font-proxima-nova ${className}`}
    >
      {/* Icon */}
      <div className="flex items-center justify-center">{resolvedIcon}</div>

      {/* Text */}
      <div className="flex flex-col items-center gap-2 text-center max-w-md">
        <p className={config.titleClassName}>{resolvedTitle}</p>
        <p className={config.messageClassName}>{resolvedMessage}</p>
      </div>

      {/* Try Again */}
      {showTryAgain && (
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-[60px]
							text-white bg-primary cursor-pointer text-sm font-semibold font-proxima-nova
							hover:bg-primary/80 hover:text-white transition-colors duration-200"
        >
          <RotateCcw className="size-4" />
          Try Again
        </button>
      )}
    </div>
  );
}

/*
HOW TO USE:
======================================

Default variant (used everywhere already — unchanged):

  <NoResultFoundWrapper data={users} title="No missed clock-ins">
    {children}
  </NoResultFoundWrapper>

New built-in variant — payments empty state:

  <NoResultFoundWrapper data={payments} variant="noPayment">
    {children}
  </NoResultFoundWrapper>

You can still override title/message/icon on any variant:

  <NoResultFoundWrapper
    data={payments}
    variant="noPayment"
    title="Custom title"
  >
    {children}
  </NoResultFoundWrapper>

To add another variant (3, 4, ...), add a new entry to the
VARIANTS map above — no consumer changes required.
*/
