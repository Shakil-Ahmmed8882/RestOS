import React from "react";
import AddRecipe from "./AddRecipe";

const Header = () => {
  return (
    <article className="pt-11 pb-8 ">
      <div className="flex justify-between w-full">
        <h1>Recipe</h1>
        <AddRecipe />
      </div>
      <article className=" sm:w-[80%] lg:w-[60%]">
        <p className="description pt-10 md:pt-6">
          This is your creativity vault. Let's let world know what's on your
          mind. The world needs your innovation.
        </p>
      </article>
    </article>
  );
};

export default Header;
