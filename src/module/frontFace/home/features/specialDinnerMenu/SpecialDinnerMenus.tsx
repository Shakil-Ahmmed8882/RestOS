import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import pizza from "../../../../../assets/img/home/top-categories/Pizza.png";
import burgers from "../../../../../assets/img/home/top-categories/Burgers.png";
import lemonade from "../../../../../assets/img/home/section3/lemonade.png";
import drink2 from "../../../../../assets/img/home/section3/drink2.png";
import pizza from "../../../../../assets/img/home/section3/pizza.png";
import chicken from "../../../../../assets/img/home/section3/chicken.png";
import soup from "../../../../../assets/img/home/section3/soup.png";
import sweet from "../../../../../assets/img/home/section3/sweet.png";
import wine from "../../../../../assets/img/home/section3/wine.png";
import Vegetarian from "../../../../../assets/img/home/top-categories/Vegetarian.png";
import Container from "../../../../../shared/layouts/Container";
import useScroll from "../../../../../🔗Hook/useScroll";
import AnimatedText from "../../../../../shared/animations/AnimateText";
import ScrollButton from "../../components/ScrollButton";
const dishes = [
  
  {
    name: "Soup",
    description: "Warm and hearty soup with rich flavors.",
    image: soup,
    thumb: soup,
  },
  {
    name: "Drink Mix",
    description: "A delightful mix of fruity and fizzy drinks.",
    image: "https://i.pinimg.com/236x/e1/0d/b1/e10db1ba1627730a89d327ec5960ae55.jpg",
    thumb: "https://i.pinimg.com/236x/e1/0d/b1/e10db1ba1627730a89d327ec5960ae55.jpg",
  },
  {
    name: "Pizza",
    description: "Classic cheesy pizza with delicious toppings.",
    image: pizza,
    thumb: pizza,
  },
  {
    name: "Drink Mix",
    description: "A delightful mix of fruity and fizzy drinks.",
    image: drink2,
    thumb: drink2,
  },
  {
    name: "Fried Chicken",
    description: "Crispy and tender fried chicken pieces.",
    image: chicken,
    thumb: chicken,
  },
  {
    name: "Sweet Desserts",
    description: "Assortment of sweet treats to satisfy your cravings.",
    image: sweet,
    thumb: sweet,
  },
  {
    name: "Wine",
    description: "Fine wine to complement your meals.",
    image: wine,
    thumb: wine,
  },
  {
    name: "Burgers",
    description: "Juicy burgers stacked with fresh ingredients.",
    image: burgers,
    thumb: burgers,
  },
  {
    name: "Lemonade",
    description: "Refreshing citrus drink to quench your thirst.",
    image: lemonade,
    thumb: lemonade,
  },
];


const Menu = () => {
  const [selectedDish, setSelectedDish] = useState(dishes[0]);
  const { scrollRef, handleScroll } = useScroll(150); // Increased scrollAmount for smoother scrolling

  return (
    <div className="bg-[#fff]">
      <Container className="md:flex flex-col-reverse overflow-hidden md:flex-row !py-11">
        <div className="w-full  md:flex relative">
          <AnimatePresence>
            <motion.img
              key={selectedDish.name}
              src={selectedDish.image}
              alt={selectedDish.name}
              className="mx-auto sm:w-[50%] md:w-[80%] md:h-full pb-4 md:absolute  -bottom-60 -left-11"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>

          <div className="mt-6 ml-auto md:w-[50%]">
            <AnimatedText
              key={`title-${selectedDish.name}`}
              className="text-2xl md:text-3xl font-bold"
            >
              {selectedDish.name}
            </AnimatedText>
            <AnimatedText
              key={`description-${selectedDish.name}`}
              className="md:description mt-3 md:mt-2 text-gray-600"
            >
              {selectedDish.description}
              <button className="block bg-primaryColor w-1/2 sm:w-1/3 mt-5 p-2 text-sm px-8 rounded-full z-40 relative text-[white]">
                Details
              </button>
            </AnimatedText>
          </div>
        </div>

        <div className="md:w-1/3 flex flex-col justify-center md:p-10 ">
          <div
            ref={scrollRef}
            className="md:overflow-y-auto max-h-[400px] rounded-lg shadow-2xl shadow-[#f5f5f5] scrollbar-hide flex md:block bg-[white] py-8 px-4"
          >
            {dishes.map((dish, index) => (
              <div
                key={index}
                className={`flex items-center flex-col mb-4 p-4 rounded-lg cursor-pointer ${
                  selectedDish.name === dish.name
                    ? "bg-gray-200"
                    : "bg-white hover:bg-gray-200"
                }`}
                onClick={() => setSelectedDish(dish)}
              >
                <img
                  src={dish.thumb}
                  alt={dish.name}
                  className="size-6 sm:size-20 md:size-16  object-cover shadow-lg rounded-full mr-4"
                />
              <div>
                  <p className="hidden md:block text-sm  leading-6 description text-center mt-2">
                    {dish.description.substring(0, 50)}...
                  </p>
                </div>
              </div>
            ))}
          </div>

          <ScrollButton handleScroll={handleScroll} />
        </div>
      </Container>
    </div>
  );
};

export default Menu;
