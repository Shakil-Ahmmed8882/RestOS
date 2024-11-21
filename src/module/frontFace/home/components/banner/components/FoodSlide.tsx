import React, { useState } from "react";

import StrawberryCheesecake from "../../../../../../assets/img/demo-image/StrawberryCheesecake.jpg";
import food1 from "../../../../../../assets/img/demo-image/food1.jpg";
import ChickenBiryani from "../../../../../../assets/img/demo-image/ChickenBiryani.jpg";
import arinaraPastaWithPoachedEggs from "../../../../../../assets/img/demo-image/arinaraPastaWithPoachedEggs.jpg";
import { Link } from "react-router-dom";
const FoodSlide = () => {
  const foodItems = [
    {
      name: "Strawberry Cheesecake",
      image: StrawberryCheesecake,
    },
    {
      name: "arinara Pasta With Poached Eggs",
      image: food1,
    },
    {
      name: "Chicken Biryani",
      image: ChickenBiryani,
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % foodItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + foodItems.length) % foodItems.length);
  };

  return (
    <section>
      <div className="flex gap-3 justify-end items-center mt-8">
        <button
          onClick={prevSlide}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Prev
        </button>

        <button
          onClick={nextSlide}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          next →
        </button>
      </div>

      <div className="flex justify-between mt-8">
        {foodItems.map((item, index) => (
        <Link key={index} to={'/food'}>
          <div
            className={`text-center transition-opacity duration-300 ${
              index === currentSlide ? "opacity-100" : "opacity-50"
            }`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-full mx-auto mb-2"
            />
            <p className="text-sm text-gray-600">{item.name}</p>
          </div>
        
        </Link>
        ))}
      </div>
    </section>
  );
};

export default FoodSlide;
