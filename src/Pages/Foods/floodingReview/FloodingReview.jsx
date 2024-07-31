import React from "react";
import reviews from "./FloatingContent";
import ReviewCard from "./ReviewCard";

const FloodingReview = () => {
  return (
    <>
      {reviews.map((review, idx) => (
        <div
          key={idx}
          className={`absolute  ${
            idx === 0
              ? "top-11 opacity-50 hidden md:flex left-4"
              : idx === 1
              ? "top-11 right-4 hidden lg:flex"
              : idx === 2
              ? `bottom-11 left-4  hidden lg:flex `
              : "bottom-11 hidden md:flex right-4 opacity-70 "
          }`}
        >
          <ReviewCard key={idx} review={review} />
        </div>
      ))}
    </>
  );
};

export default FloodingReview;
