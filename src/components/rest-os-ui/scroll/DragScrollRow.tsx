"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Horizontal click-and-drag scroller.
 *
 * - Wheel still works natively.
 * - Mouse: click-hold inside the row and drag horizontally.
 * - Touch: native horizontal scroll (no JS interference).
 * - Click suppression: once the pointer has moved beyond ~5px during a
 *   drag, the next click that bubbles up is swallowed in the capture
 *   phase. This is what stops a `<button onClick={…}>` child from firing
 *   when the user was clearly dragging instead of clicking.
 *
 * Pointer events are used so the bound is on the row itself — releasing
 * outside the row still ends the drag.
 */

const DRAG_THRESHOLD_PX = 5;

export function DragScrollRow({ children, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startScrollLeft = useRef(0);
  const pointerIdRef = useRef<number | null>(null);

  const endDrag = useCallback(() => {
    draggingRef.current = false;
    setIsDragging(false);
    pointerIdRef.current = null;
    // movedRef stays true until the click handler clears it, so the
    // synthetic click that follows pointerup can be suppressed.
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    // Only react to primary-button mouse / pen / touch.
    if (e.pointerType === "mouse" && e.button !== 0) return;
    draggingRef.current = true;
    movedRef.current = false;
    setIsDragging(true);
    startX.current = e.clientX;
    startY.current = e.clientY;
    startScrollLeft.current = ref.current.scrollLeft;
    pointerIdRef.current = e.pointerId;
    try {
      ref.current.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || !ref.current) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    if (!movedRef.current && Math.hypot(dx, dy) > DRAG_THRESHOLD_PX) {
      movedRef.current = true;
    }
    if (movedRef.current) {
      e.preventDefault();
      ref.current.scrollLeft = startScrollLeft.current - dx;
    }
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (pointerIdRef.current !== null && ref.current) {
        try {
          ref.current.releasePointerCapture(pointerIdRef.current);
        } catch {
          /* ignore */
        }
      }
      endDrag();
    },
    [endDrag],
  );

  // Capture-phase click handler that swallows the click if the user was
  // mid-drag. Without this, the click fires on the child element after
  // pointerup even though we never wanted a click.
  const onClickCapture = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (movedRef.current) {
      e.stopPropagation();
      e.preventDefault();
      movedRef.current = false;
    }
  }, []);

  // Reset the moved flag on a fresh pointerdown bursting through.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onCancel = () => endDrag();
    el.addEventListener("pointercancel", onCancel);
    return () => el.removeEventListener("pointercancel", onCancel);
  }, [endDrag]);

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onClickCapture={onClickCapture}
      className={cn(
        "flex gap-4 overflow-x-auto pb-2 select-none touch-pan-y",
        "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
    >
      {children}
    </div>
  );
}
