"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

type Props = {
  /** Bold subject inserted into the title. e.g. "this food" */
  subject?: string;
  /** Override the title outright. Falls back to "Delete {subject}?". */
  title?: string;
  /** Item name shown in the body sentence as the bolded noun. */
  itemName: string;
  /** Optional override for the body sentence; receives the name span already styled. */
  description?: React.ReactNode;
  /** Confirm button label. Default: "Yes, delete it". */
  confirmLabel?: string;
  /** Icon shown in the hero. Default: shield warning. */
  icon?: string;
  /** Already-in-flight signal — disables both buttons, shows spinner in confirm. */
  isLoading?: boolean;
  /** Called when user clicks confirm. Throw / reject to keep modal open. */
  onConfirm: () => void | Promise<void>;
  /** Called when user clicks cancel or backdrop. */
  onCancel: () => void;
};

/**
 * Reusable destructive confirmation section.
 *
 * Rendered inside any MultipageModal.Page. The parent owns the mutation
 * and the optimistic cache patch — this component only collects intent.
 *
 * Theme: uses `primary` tokens so it tracks the app's accent (currently
 * pink). Avoids hardcoded red. Hierarchy still reads "destructive" via
 * the icon (shield-warning) and the strong primary CTA on the right.
 */
export function ConfirmDestructiveSection(props: Props) {
  const {
    subject = "this item",
    title,
    itemName,
    description,
    confirmLabel = "Yes, delete it",
    icon = "solar:shield-warning-bold-duotone",
    isLoading = false,
    onConfirm,
    onCancel,
  } = props;

  const heading = title ?? `Delete ${subject}?`;

  return (
    <div className="space-y-6 text-foreground">
      <div className="flex flex-col items-center text-center gap-4 pt-2">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/15 blur-xl" />
          <div className="relative h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon icon={icon} className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-semibold text-foreground">{heading}</h2>
          <p className="text-sm text-muted-foreground max-w-[380px]">
            {description ?? (
              <>
                <span className="font-semibold text-foreground">{itemName}</span>{" "}
                will be permanently removed. This action cannot be undone.
              </>
            )}
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isLoading}
          size="lg"
          className="rounded-full text-foreground hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={() => void onConfirm()}
          disabled={isLoading}
          size="lg"
          className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground min-w-[180px] px-7 shadow-sm shadow-primary/30"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <Icon
                icon="solar:refresh-linear"
                className="h-4 w-4 animate-spin"
              />
              Deleting
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Icon icon="solar:trash-bin-trash-bold" className="h-4 w-4" />
              {confirmLabel}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
