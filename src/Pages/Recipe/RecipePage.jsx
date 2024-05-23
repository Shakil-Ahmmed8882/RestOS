import React, { useState } from "react";
import { Link } from "react-router-dom";
import { recipieCardData } from "../../Components/Dashboard/user/profile/favorite/data";
import RecipieCard from "../../Components/Dashboard/user/profile/favorite/Card";

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

function RecipePage() {
 
  return (
    <div className="container mx-auto p-4 pt-20">
        <article className="flex justify-between items-center py-8">
      <h1 className="text-4xl font-bold mb-4">Recipes</h1>
      <Link
        to="/recipe/new"
        className="bg-green-500 text-white py-2 px-4 rounded mb-4 inline-block"
      >
        Post New Recipe
      </Link>

        </article>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {recipieCardData.map((recipe) => (
          <div
            key={recipe.id}
            className="p-4  rounded shadow-sm hover:shadow-lg transition-all duration-500 relative"
          >
            <RecipieCard card={recipe}/>
          
            <Link
              to={`/recipe/${recipe.id}`}
              className="text-blue-500 underline mt-2 block"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipePage;
