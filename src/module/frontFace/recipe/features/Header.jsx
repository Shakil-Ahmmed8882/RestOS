import React from "react";
import AddRecipe from "./AddRecipe";

const Header= () => {
  return (
    <article className=" md:flex justify-between  pt-11 pb-2 ">
      <div className="pb-11">
        <div className="flex items-start justify-between">
        <h1>Recipe</h1>
        </div>
        <article className=" sm:w-[80%] lg:w-[60%]">
        <p className="description pt-8 md:pt-4">
          This is your creativity vault. Let's let world know what's on your mind. The world needs your innovation. 
        </p>
        </article>
      </div>
        <AddRecipe/>
    </article>
  );
};

export default Header; 