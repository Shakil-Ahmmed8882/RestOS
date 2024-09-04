// @ts-nocheck
import { useRef } from "react";
import { animate } from "framer-motion";

const useScroll = (scrollAmount = 80) => {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
      const maxScrollTop = scrollHeight - clientHeight;

      let targetScrollTop = scrollTop;

      if (direction === "up") {
        targetScrollTop = Math.max(scrollTop - scrollAmount, 0);
      } else if (direction === "down") {
        targetScrollTop = Math.min(scrollTop + scrollAmount, maxScrollTop);
      }

      animate(scrollRef.current, { scrollTop: targetScrollTop }, { type: "spring", damping: 25, stiffness: 120 });
    }
  };

  return { scrollRef, handleScroll };
};

export default useScroll;
