import React, { useState } from "react";
import { Link } from "react-router-dom";


import { recipieCardData } from "../data";
import RecipieCard from "../components/RecipeCard";
import Container from "../../../../shared/layouts/Container";
import AddBlog from "../../blog/features/AddBlog";
import Header from "../features/Header";


// Sample static data

function RecipePageLayout() {
 
  return (
    
    <Container>
    <div className=" py-20">
    <Header/>
      <div className="grid md:grid-cols-2  justify-center gap-8 lg:gap-16 pt-9">
        {recipieCardData.map((recipe) => (
          <div
            key={recipe.id}
            className="pt-4 bg-[white]  md:p-5 shadow-sm  rounded cursor-pointer duration-500 relative"
          >
            <RecipieCard card={recipe}/>
          
            <Link
              to={`/recipe/${recipe.id}`}
              className="text-primaryColor underline mt-2 block"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>

    </Container>

    
  );
}

export default RecipePageLayout;
