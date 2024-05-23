import React, { useState } from 'react';

function RecipePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      id: Date.now(),
      title,
      content,
      image,
      createdAt: new Date().toISOString(),
      isFavorite: false,
    };
    // Here, you would typically send newRecipe to the backend
    console.log('New Recipe:', newRecipe);
    setTitle('');
    setContent('');
    setImage('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Post New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Post Recipe</button>
      </form>
    </div>
  );
}

export default RecipePostPage;
