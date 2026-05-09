import * as React from "react";

interface ShowIfProps {
  condition: boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function ShowIf({ condition, fallback = null, children }: ShowIfProps) {
  return <>{condition ? children : fallback}</>;
}
