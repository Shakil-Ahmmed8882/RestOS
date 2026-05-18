"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
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
 *
 * The scrollbar is visually hidden but accessible via keyboard / wheel.
 */
export function DragScrollRow({ children, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    setIsDragging(true);
    startX.current = e.pageX - ref.current.offsetLeft;
    startScrollLeft.current = ref.current.scrollLeft;
  }, []);

  const onMouseLeave = useCallback(() => setIsDragging(false), []);
  const onMouseUp = useCallback(() => setIsDragging(false), []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !ref.current) return;
      e.preventDefault();
      const x = e.pageX - ref.current.offsetLeft;
      const walk = x - startX.current;
      ref.current.scrollLeft = startScrollLeft.current - walk;
    },
    [isDragging],
  );

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      className={cn(
        "flex gap-4 overflow-x-auto pb-2 select-none",
        // hide scrollbar across browsers
        "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
    >
      {children}
    </div>
  );
}
