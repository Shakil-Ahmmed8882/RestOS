// components/CategoryItem.js

import React from 'react';

const CategoryItem = ({ category, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center px-6 py-4 m-2 tranistion500 rounded-full bg-[white] cursor-pointer ${
        isActive ? ' shadow-lg' : ' '
      }`}
    >
      <img src={category.icon} alt={`${category.name} icon`} className="w-8 h-8 mr-2" />
      <span>{category.name}</span>
    </div>
  );
};

export default CategoryItem;
