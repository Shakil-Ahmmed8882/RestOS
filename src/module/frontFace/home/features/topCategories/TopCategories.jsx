// components/TopCategories.js

import React, { useState, useRef } from 'react';
import useVisibleCategories from '../../hooks/useVisibleCategories';
import useClickOutside from '../../../../../🔗Hook/useClickOutside';
import { categories } from '../../data';
import CategoryItem from './CategoryItem';
import DropdownMenu from './DropdownMenu';
import Container from '../../../../../shared/layouts/Container';

const TopCategories = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const visibleCategories = useVisibleCategories('category-container', 160);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setDropdownOpen(false));

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    setDropdownOpen(false);
  };

  return (

    <section className="topCategory-section py-8 bg-[#f8f8f8]">
    <Container>
      <h2 className="secondaryTitle text-center">Top Categories</h2>
      <div id="category-container" className="flex md:justify-start justify-center  items-center flex-wrap">
        {categories.slice(1, visibleCategories).map((category, index) => (
          <CategoryItem
            key={index}
            category={category}
            isActive={category.name === activeCategory}
            onClick={() => handleCategoryClick(category.name)}
          />
        ))}

        
          <DropdownMenu
            categories={categories.slice(visibleCategories)}
            dropdownOpen={dropdownOpen}
            toggleDropdown={() => setDropdownOpen(!dropdownOpen)}
            dropdownRef={dropdownRef}
            onSelectCategory={handleCategoryClick}
          />
        
      </div>
    </Container>
    </section>
  );
};

export default TopCategories;
