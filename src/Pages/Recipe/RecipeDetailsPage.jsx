import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Sample static data
const recipePostData = {
  id: 1,
  title: 'Creamy Garlic Shrimp Pasta',
  content: 'This creamy garlic shrimp pasta is a quick and easy dinner option that is sure to please everyone at the table. The garlic sauce is made with butter, heavy cream, and Parmesan cheese, and it perfectly complements the tender shrimp and al dente pasta.',
  image: 'https://via.placeholder.com/800x400',
  createdAt: '2023-05-23T10:00:00Z',
  isFavorite: false,
};

function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(recipePostData);

  const toggleFavorite = () => {
    setRecipe({ ...recipe, isFavorite: !recipe.isFavorite });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full h-80 object-cover rounded mb-4" />
      <div className="text-gray-600 mb-4">
        {new Date(recipe.createdAt).toLocaleDateString()}
      </div>
      <div className="mb-4">
        <p className="text-lg">{recipe.content}</p>
      </div>
      <button
        onClick={toggleFavorite}
        className={`bg-${recipe.isFavorite ? 'red' : 'gray'}-500 text-white py-2 px-4 rounded`}
      >
        {recipe.isFavorite ? 'Unmark Favorite' : 'Mark as Favorite'}
      </button>
    </div>
  );
}

export default RecipeDetailPage;
