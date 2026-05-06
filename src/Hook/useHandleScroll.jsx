import { useEffect } from "react";

const useHandleScroll = (
  setShowNavbar,
  setScrollPosition,
  scrollPosition,
) => {
  const handleScroll = () => {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition > scrollPosition) {
      setShowNavbar(false); // Scrolling down
    } else {
      setShowNavbar(true); // Scrolling up
    }
    setScrollPosition(currentScrollPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);
};

export default useHandleScroll;
