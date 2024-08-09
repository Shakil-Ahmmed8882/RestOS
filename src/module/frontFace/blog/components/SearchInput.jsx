// src/components/SearchInput.jsx
import React from 'react';
import { Input } from 'antd';

function SearchInput() {
  return (
    <Input
      className="rounded-full p-2 px-4 hover:border-primaryColor focus-within:border-primaryColor"
      placeholder="Search here..."
      type="text"
    />
  );
}

export default SearchInput;
