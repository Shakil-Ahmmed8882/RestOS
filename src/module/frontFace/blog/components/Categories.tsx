// src/components/Categories.jsx
import React from 'react';

const categories = [
  'Appetizers',
  'Main Courses',
  'Desserts',
  'Beverages',
  'Healthy Eating',
];

function Categories() {
  return (
    <div className="bg-background rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-2">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <a
            key={category}
            className="block text-sm font-medium text-muted-foreground hover:text-foreground"
            href={`#${category}`}
          >
            {category}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Categories;
