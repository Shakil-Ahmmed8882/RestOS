// @ts-nocheck
import { useRef } from "react";

const useScroll = (scrollAmount = 80) => {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
      const maxScrollTop = scrollHeight - clientHeight;

      if (direction === "up") {
        scrollRef.current.scrollTo({
          top: Math.max(scrollTop - scrollAmount, 0),
          behavior: "smooth",
        });
      } else if (direction === "down") {
        scrollRef.current.scrollTo({
          top: Math.min(scrollTop + scrollAmount, maxScrollTop),
          behavior: "smooth",
        });
      }
    }
  };

  return { scrollRef, handleScroll };
};

export default useScroll;
