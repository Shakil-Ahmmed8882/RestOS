import React from "react";
import { url1, url2 } from "../../../shared/charts/data";
import { FaRegComments } from "react-icons/fa6";
import demoBanner from "../../../../../assets/img/fishdemo.png";
import { BiTime } from "react-icons/bi";
import { IoIceCream } from "react-icons/io5";
import Title from "../../../../../Components/Shared/ui/Title";
import { Link } from "react-router-dom";
import { LiaApplePay } from "react-icons/lia";
const FeaturedRecipes = () => {
  return (
    <section className="px-4 pt-5">
      <h1 className="text-3xl pb-4">Featured Recipes</h1>
      <div className="flex gap-8 pb-16">
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
      </div>
      <Title title={"Know All About Spices"} />

      <div className="mt-5 grid grid-cols-2 gap-16 ">
        <KnowAll/>
        <KnowAll/>
        <KnowAll/>
        <KnowAll/>
      </div>
    </section>
  );
};

export default FeaturedRecipes;

const FeaturedCard = () => {
  return (
    <div className="w-[300px]">
      <img src={demoBanner} className=" bg-[#f0f0f0]" />
      <h2 className="font-bold text-[22px]  leading-5 my-4 pb-1">
        Geo slow cooker leg
      </h2>
      <div className="flex justify-between">
        <p className="text-[gray] text-[17px] flex items-center gap-3">
          <BiTime /> 1 hour 20 minutes
        </p>
        <p className="text-[#a6a5a5] text-[17px] flex items-center gap-3">
          <IoIceCream />
          Easy
        </p>
      </div>
    </div>
  );
};



const KnowAll = () => {
  return (
    <div className="flex gap-6">
    <img src={demoBanner} className="w-32" alt="" />
    <article>
      <h2 className="text-[20px] font-bold">Garlic and Basil</h2>
      <p className="text-[gray] text-[18px] flex pb-3 pt-1 items-center gap-3">recusandae ut cusamus nulla. Placeat </p>
      <Link to={'/'} className="text-primaryColor flex items-center"><LiaApplePay className="text-3xl"/>Taste good with</Link>
    </article>
  </div>
  )
}