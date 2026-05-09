import * as React from "react";

interface CustomSuspenseProps {
  isLoading: boolean;
  fallback: React.ReactNode;
  children: React.ReactNode;
}

export function CustomSuspense({ isLoading, fallback, children }: CustomSuspenseProps) {
  return <>{isLoading ? fallback : children}</>;
}
