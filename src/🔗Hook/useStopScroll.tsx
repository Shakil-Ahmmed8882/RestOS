import { useEffect } from "react";

const useStopScroll = ( open ) => {
  // Effect to control body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll
    }

    // Cleanup when the component is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);
};

export default useStopScroll;
