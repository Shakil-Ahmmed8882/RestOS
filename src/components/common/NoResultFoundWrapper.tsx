import * as React from "react";
import { Icon } from "@iconify/react";

interface NoResultFoundWrapperProps {
  data: unknown[] | undefined | null;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function NoResultFoundWrapper({
  data,
  title = "Nothing here yet",
  description,
  children,
}: NoResultFoundWrapperProps) {
  if (data && data.length > 0) return <>{children}</>;
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <Icon icon="solar:inbox-linear" className="h-14 w-14 text-muted-foreground" />
      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
}
