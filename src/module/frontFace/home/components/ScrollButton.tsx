import React from "react";

const ScrollButton= ({handleScroll}) => {
  return (
    <div className="hidden md:flex  items-center justify-center gap-2  pt-3">
            <button
              className="bg-[white] shadow-lg  rounded-full px-4  hover:bg-gray-400 p-2 mb-2 font-bold "
              onClick={() => handleScroll("up")}
            >
              ↑
            </button>
            <button
              className="bg-[white] shadow-lg  rounded-full px-4  hover:bg-gray-400 p-2 mb-2 font-bold "
              onClick={() => handleScroll("down")}
            >
              ↓
            </button>
          </div>
  );
};

export default ScrollButton; 