import { useState, useEffect } from 'react';

const useVisibleCategories = (containerId, itemWidth) => {
  const [visibleCategories, setVisibleCategories] = useState(0);

  useEffect(() => {
    const updateVisibleCategories = () => {
      const containerWidth = document.getElementById(containerId)?.offsetWidth || 0;
      const maxVisible = Math.floor(containerWidth / itemWidth);

      setVisibleCategories(maxVisible);
    };

    // Initial check
    updateVisibleCategories();

    // Update on window resize
    window.addEventListener('resize', updateVisibleCategories);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', updateVisibleCategories);
    };
  }, [containerId, itemWidth]);

  return visibleCategories;
};

export default useVisibleCategories;
