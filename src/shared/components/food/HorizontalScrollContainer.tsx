// components/HorizontalScrollContainer.tsx
import React, { useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

interface HorizontalScrollContainerProps {
  children: React.ReactNode;
  scrollSpeed?: number;
}

export const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({ children, scrollSpeed = 2 }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (ref.current) ref.current.style.scrollBehavior = "smooth";
  }, []);

  const handleDrag = (event: MouseEvent | TouchEvent, info: { delta: { x: number } }) => {
    if (ref.current) ref.current.scrollLeft -= info.delta.x * scrollSpeed;
  };

  return (
    <motion.div
      ref={ref}
      className="flex gap-4 w-full overflow-x-auto cursor-grab hide-scrollbar"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDrag={handleDrag}
      style={{ padding: "10px 0" }}
    >
      {children}
    </motion.div>
  );
};
