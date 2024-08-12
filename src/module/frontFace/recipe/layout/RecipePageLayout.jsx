import React, { useState } from "react";
import { Link } from "react-router-dom";


import { recipieCardData } from "../data";
import RecipieCard from "../components/RecipeCard";
import Container from "../../../../shared/layouts/Container";
import AddBlog from "../../blog/features/AddBlog";
import Header from "../features/Header";


// Sample static data
const recipeData = [
  {
    id: 1,
    title: "Creamy Garlic Shrimp Pasta",
    description:
      "A delicious pasta recipe with creamy garlic sauce and shrimp.",
    image: "https://via.placeholder.com/400x200",
    createdAt: "2023-05-23T10:00:00Z",
    isFavorite: false,
  },
  {
    id: 2,
    title: "Classic Margherita Pizza",
    description:
      "An easy recipe for a classic Margherita pizza with fresh ingredients.",
    image: "https://via.placeholder.com/400x200",
    createdAt: "2023-05-22T09:00:00Z",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Spicy Chicken Tacos",
    description: "A quick and simple recipe for spicy chicken tacos.",
    image: "https://via.placeholder.com/400x200",
    createdAt: "2023-05-21T08:00:00Z",
    isFavorite: false,
  },
];

function RecipePageLayout() {
 
  return (
    
    <Container>
    <div className=" py-20">
    <Header/>
      <div className="grid md:grid-cols-2  justify-center gap-8 lg:gap-16">
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
