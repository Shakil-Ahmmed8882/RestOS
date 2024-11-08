import React from "react";

import { dishes } from "../../data";
import { FillStar, UnFillStar, MarkedFavorite } from "../../../../../assets/icons";
import ScrollSlider from "../../../../../shared/layouts/ScrollSlider";
import Container from "../../../../../shared/layouts/Container";

const PopularDishes = () => {
  const renderDish = (dish) => (
    
    <div className="w-[300px] relative md:w-[300px] pt-12 bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        className="w-24 py-3 sm:w-32 mx-auto object-cover"
        src={dish.image}
        alt={dish.name}
      />
      <div className="p-4">
        <h3 className="sm:text-xl text-[#5f5e5e]">{dish.name}</h3>
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
      <div className="absolute top-4 right-4 rounded-full border p-2 border-secondaryColor/40">
        <MarkedFavorite className="text-secondaryColor size-5" />
      </div>
    </div>
  );

  return (
    <Container>
      <ScrollSlider
        items={dishes}
        renderItem={renderDish}
        maxVisibleItems={5}
        itemWidth={300}
      ><h2 className="">Popular Dishes</h2>
      </ScrollSlider>

    </Container>
  );
};

export default PopularDishes;
