import { useState } from "react";
import { GrFavorite } from "react-icons/gr";
import { MdOutlineFavorite } from "react-icons/md";
import { FaRegComments } from "react-icons/fa6";
import React from "react";

const RecipieCard = ({ card }) => {
  const [isFavourite, setIsFavourite] = useState(true);

  return (
    <div>
      <section className=" group">
        <div className="flex gap-3 pb-4 ">
          <img
            className="size-8 rounded-full"
            src={card?.uploaderImage}
            alt=""
          />
          <article>
            <h2 className=" flex items-center gap-2 text-[18px]">
              {card.name}{" "}
              <div className="h-3 w-3 p-1  bg-[#7777ff] rounded-full "></div>
            </h2>
            <p className="text-[#a1a1a1] mt-1 text-[14px]">{card?.role}</p>
          </article>
        </div>
        <div className="group relative  rounded-lg ">
          <div className="container w-full h-40 overflow-hidden">
            <img
              src={card?.thumbnail}
              alt="Recipe Thumbnail"
              className="   object-cover w-full "
            />
            {/* <div className="absolute top-0 h-40 w-full   bg-gradient-to-t  from-[#ffffff] to-[#ffffff00] transition-all duration-1000"></div> */}
          </div>

          <div className="py-4 bg-white dark:bg-gray-950">
            <div className="flex justify-between">
              <h3 className="text-lg tracking-tight w-[80%] sm:w-auto">
                {card?.title}
              </h3>
              <div className="flex gap-1 items-center  hover:text-[black] transition-all duration-300 cursor-pointer text-[#828282]">
                <FaRegComments className="text-2xl" />
              </div>
              <div
                onClick={() => setIsFavourite(!isFavourite)}
                className={`
                        ${!isFavourite && "text-[black]"}
                        hover:text-[black] transition-all duration-300 text-[#828282] items-center justify-center cursor-pointer sm:flex gap-1`}
              >
                {isFavourite ? (
                  <GrFavorite />
                ) : (
                  <MdOutlineFavorite className="text-deepPink" />
                )}
                <span className="text-sm hidden sm:block">{card.daysAgo}</span>
              </div>
            </div>
            <p className="mt-2 text-[#828282] text-gray-500 dark:text-gray-400 text-md">
              {card?.description}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipieCard;
