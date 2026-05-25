"use client";

import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  useIsItemSavedQuery,
  useSaveItemMutation,
  useUnsaveItemMutation,
  type SaveType,
} from "@/redux/featureApi/saveApi";
import { useAppSelector } from "@/redux/hooks";

type Variant = "default" | "icon" | "ghost";
type Size = "sm" | "md" | "lg";

export type SaveButtonProps = {
  type: SaveType;
  itemId: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  stopPropagation?: boolean;
};

const sizeMap: Record<Size, { box: string; icon: string; text: string }> = {
  sm: { box: "h-8 w-8", icon: "h-4 w-4", text: "text-xs" },
  md: { box: "h-9 w-9", icon: "h-5 w-5", text: "text-sm" },
  lg: { box: "h-11 w-11", icon: "h-6 w-6", text: "text-base" },
};

export function SaveButton({
  type,
  itemId,
  variant = "default",
  size = "md",
  className,
  stopPropagation = true,
}: SaveButtonProps) {
  const token = useAppSelector((s) => s.auth.token);
  const enabled = !!token && !!itemId;

  const { data } = useIsItemSavedQuery(
    { type, itemId },
    { skip: !enabled },
  );
  const [save, saveState] = useSaveItemMutation();
  const [unsave, unsaveState] = useUnsaveItemMutation();

  const isSaved = !!data?.data?.isSaved;
  const isPending = saveState.isLoading || unsaveState.isLoading;
  const s = sizeMap[size];

  const onClick = async (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!token) {
      toast.error("Please sign in to save items.");
      return;
    }
    if (isPending) return;
    try {
      if (isSaved) {
        await unsave({ type, itemId }).unwrap();
        toast.success("Removed from saved");
      } else {
        await save({ type, itemId }).unwrap();
        toast.success("Saved to your collection");
      }
    } catch (err) {
      const e = err as { status?: number; data?: { message?: string } };
      if (e?.status === 409) return;
      toast.error(e?.data?.message ?? "Action failed. Try again.");
    }
  };

  const label = isSaved ? "Unsave" : "Save";
  const iconName = isSaved ? "solar:bookmark-bold" : "solar:bookmark-linear";

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={isPending}
        aria-pressed={isSaved}
        aria-label={label}
        title={label}
        className={cn(
          "inline-flex items-center justify-center rounded-full backdrop-blur-md shadow-md",
          "ring-1 ring-white/15 transition-all duration-200",
          "active:scale-90 disabled:opacity-60",
          isSaved
            ? "bg-primary text-primary-foreground ring-primary/40 hover:bg-primary/90"
            : "bg-black/55 text-white hover:bg-black/70",
          s.box,
          className,
        )}
      >
        <Icon icon={iconName} className={s.icon} />
      </button>
    );
  }

  if (variant === "ghost") {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={isPending}
        aria-pressed={isSaved}
        aria-label={label}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors",
          "disabled:opacity-60",
          isSaved
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground",
          s.text,
          className,
        )}
      >
        <Icon icon={iconName} className={s.icon} />
        <span>{isSaved ? "Saved" : "Save"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      aria-pressed={isSaved}
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition-colors",
        "disabled:opacity-60",
        isSaved
          ? "bg-primary/10 text-primary hover:bg-primary/15"
          : "bg-silk-with-hover text-foreground",
        s.text,
        className,
      )}
    >
      <Icon icon={iconName} className={s.icon} />
      <span>{isSaved ? "Saved" : "Save"}</span>
    </button>
  );
}
