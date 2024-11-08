// components/DropdownMenu.js

import React from 'react';
import { DownArrowIcon } from '../../../../../assets/icons/Icons';

const DropdownMenu = ({ categories, dropdownOpen, toggleDropdown, dropdownRef, onSelectCategory }) => {


  
  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="flex items-center gap-3">
        more
        <DownArrowIcon />
      </button>

      
        <div
          ref={dropdownRef}
          className={`${dropdownOpen?'opacity-100 visible':'opacity-0 invisible'} transition500 absolute -left-14 sm:-left-32 md:-left-1 top-12 mt-2 w-52 rounded-md shadow-lg bg-white overflow-auto max-h-60 z-10 bg-[white]`}
        >
          <div className="py-1">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex items-center p-4 hover:bg-[#f0f0f0] cursor-pointer"
                onClick={() => onSelectCategory(category.name)}
              >
                <img src={category.icon} alt={`${category.name} icon`} className="w-6 h-6 mr-2" />
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      
    </div>
  );
};

export default DropdownMenu;
