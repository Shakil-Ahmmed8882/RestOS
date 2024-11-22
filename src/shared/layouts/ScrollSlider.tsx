import React, { useState } from "react";
import { LeftArrow, RightArrow } from "../../assets/icons/Icons";


const ScrollSlider = ({ children = <></>,items, renderItem, maxVisibleItems = 4, itemWidth = 325 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < items.length - maxVisibleItems) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const isLastSlide = currentSlide >= items.length - maxVisibleItems;

  return (
    <div className=" relative max-w-6xl mx-auto">
      <div className="flex items-center justify-between pb-8">

        {children}
        <div className="flex items-center gap-3 pt-4">
          <button
            onClick={handlePrev}
            className={`bg-[black] size-6 sm:size-8 text-[white] p-1 sm:p-2 rounded-full ${
              currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentSlide === 0}
          >
            <LeftArrow />
          </button>
          <button
            onClick={handleNext}
            className={`bg-[black] size-6 sm:size-8 text-[white] p-1 sm:p-2 rounded-full ${
              isLastSlide ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLastSlide}
          >
            <RightArrow />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * itemWidth}px)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="mx-3 relative bg-[white]" style={{ minWidth: itemWidth }}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollSlider;
