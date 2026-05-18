import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

type Props = {
  /** Renders a title + description shape above the section skeleton. */
  withHeader?: boolean;
  /** Slot for the section-specific skeleton (foods grid, table, etc). */
  children?: React.ReactNode;
};

/**
 * PageShellSkeleton: an inline page-shape placeholder used by route-level
 * `loading.tsx` files so a reload shows the page outline rather than a
 * blanket spinner. Pair with a section-specific skeleton as `children`.
 */
export function PageShellSkeleton({ withHeader = true, children }: Props) {
  return (
    <>
      {withHeader && (
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <BaseSkeleton className="h-7 w-44" />
            <BaseSkeleton className="h-4 w-72" />
          </div>
        </div>
      )}
      {children}
    </>
  );
}
