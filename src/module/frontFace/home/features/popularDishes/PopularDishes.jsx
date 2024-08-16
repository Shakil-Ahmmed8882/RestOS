import React, { useState } from "react";
import Container from "../../../../../shared/layouts/Container";
import { dishes } from "../../data";
import { FillStar, MarkedFavorite, UnFillStar } from "../../../../../assets/icons";
import {
  LeftArrow,
  MarkFavoriteIcon,
  RightArrow,
} from "../../../../../assets/icons/Icons";

const PopularDishes = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const cardWidth = 325; // Each card's width is 400px
  const maxVisibleCards = 4; // Number of cards visible at a time

  const handleNext = () => {
    if (currentSlide < dishes.length - maxVisibleCards) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const isLastSlide = currentSlide >= dishes.length - maxVisibleCards;

  return (
    <div className="py-8 relative max-w-6xl  mx-auto">
      <article className="sm:flex items-center justify-between pb-8">
        <div>
        <p className=" tracking-widest">RESTOS KITCHEN</p>
        <h2 className="text-3xl font-bold text-center pt-3">Popular Dishes</h2>
        </div>
        <div className="flex items-center gap-3 pt-4  justify-center">
          <button
            onClick={handlePrev}
            className={` bg-[black] size-6 sm:size-8 text-[white] transform bg-white p-1 sm:p-2 rounded-full ${
              currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentSlide === 0}
          >
            <LeftArrow />
          </button>
          <button
            onClick={handleNext}
            className={`bg-[black] size-6 sm:size-8 text-[white]  bg-white p-1 sm:p-2 rounded-full ${
              isLastSlide ? "opacity-50 cursor-not-allowed" : ""
            }`}
            //   disabled={isLastSlide}
          >
            <RightArrow />
          </button>
        </div>
      </article>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * cardWidth}px)` }}
        >
          {dishes.map((dish) => (
            <div key={dish.id} className=" mx-3 relative ">
              <div className="relative w-[200px] md:!w-[300px] pt-12  bg-white rounded-lg shadow-[#ececec] shadow-2xl overflow-hidden">
                <img
                  className="w-24 py-3 sm:w-32 mx-auto  object-cover"
                  src={dish.image}
                  alt={dish.name}
                />
                <div className="p-4 ">
                  <h3 className=" sm:text-xl text-[#5f5e5e]">{dish.name}</h3>
                  <div className="flex items-center mt-3">
                    <FillStar className="text-primaryColor" />
                    <FillStar className="text-primaryColor" />
                    <FillStar className="text-primaryColor" />
                    <FillStar className="text-primaryColor" />
                    <UnFillStar />
                  </div>
                </div>
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full text-orange-500">
                  <i className="fas fa-heart"></i>
                </button>
              </div>
              <div className="absolute top-4 right-4 rounded-full border p-2 border-secondaryColor/40">
                {/* <MarkFavoriteIcon className="text-secondaryColor size-5" /> */}
                <MarkedFavorite className="text-secondaryColor size-5" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Navigation Buttons */}
    </div>
  );
};

export default PopularDishes;
