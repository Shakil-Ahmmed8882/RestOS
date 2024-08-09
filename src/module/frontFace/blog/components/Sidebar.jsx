import React from 'react';
import { Input } from 'antd';
import { Link } from 'react-router-dom';

function Sidebar({ onSearch, onSelectCategory, categories }) {
  return (
    <div className="sticky top-4 space-y-4">
      <Input
        className='rounded-full my-2  border-none p-2 px-4 hover:border-primaryColor focus-within:border-primaryColor'
        placeholder='Search here...'
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className=" rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <div className="space-y-2 ">
          {['Italian', 'Vegan', 'Dessert', 'Appetizers', 'Beverages'].map(category => (
            <Link
              key={category}
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
              to="#"
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
