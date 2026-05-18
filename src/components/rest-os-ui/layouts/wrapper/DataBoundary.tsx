"use client";

import { ReactNode } from "react";
import { SectionErrorBoundary } from "./SectionErrorBoundary";

type DataBoundaryProps = {
  /**
   * Loading flag from the data hook (RTK Query `isLoading`).
   * On true, renders `skeleton` instead of children.
   */
  isLoading?: boolean;
  /**
   * Error flag from the data hook (RTK Query `isError`) or any truthy error.
   * On truthy, throws into the boundary so the error fallback shows.
   */
  isError?: boolean | unknown;
  /**
   * Skeleton shown while loading. Pass the section-shaped skeleton so the
   * layout doesn't jump — no global spinners.
   */
  skeleton?: ReactNode;
  /**
   * Optional override for the error fallback. Defaults to the primary-tinted
   * "Something went wrong" card with a retry button.
   */
  errorFallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  /**
   * Optional callback invoked when the user clicks "Try again". Use this to
   * refetch the underlying query (e.g. `refetch` from RTK Query).
   */
  onReset?: () => void;
  children: ReactNode;
};

/**
 * DataBoundary
 * - Wraps a data-fetching surface with an error boundary (primary-tinted)
 *   and a scoped skeleton fallback.
 * - Wrap the smallest sensible region — never the whole page.
 * - Pair with the section's own skeleton so reloads show the page shape, not
 *   a blanket spinner.
 */
export function DataBoundary({
  isLoading,
  isError,
  skeleton,
  errorFallback,
  onReset,
  children,
}: DataBoundaryProps) {
  return (
    <SectionErrorBoundary fallback={errorFallback} onReset={onReset}>
      <DataBoundaryInner isLoading={isLoading} isError={isError} skeleton={skeleton}>
        {children}
      </DataBoundaryInner>
    </SectionErrorBoundary>
  );
}

function DataBoundaryInner({
  isLoading,
  isError,
  skeleton,
  children,
}: Pick<DataBoundaryProps, "isLoading" | "isError" | "skeleton" | "children">) {
  if (isError) {
    const err =
      isError instanceof Error
        ? isError
        : new Error(
            typeof isError === "object" && isError && "message" in (isError as any)
              ? String((isError as any).message)
              : "Failed to load",
          );
    throw err;
  }
  if (isLoading) return <>{skeleton ?? null}</>;
  return <>{children}</>;
}
