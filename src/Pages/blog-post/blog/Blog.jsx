import React, { useState } from 'react';
import { Input } from "antd";
import { Link } from 'react-router-dom';

// Sample static data
const blogData = [
  {
    id: 1,
    title: 'Creamy Garlic Shrimp Pasta',
    description: 'A delicious pasta recipe with creamy garlic sauce and shrimp.',
    image: 'https://via.placeholder.com/400x200',
    createdAt: '2023-05-23T10:00:00Z',
  },
  {
    id: 2,
    title: 'Classic Margherita Pizza',
    description: 'An easy recipe for a classic Margherita pizza with fresh ingredients.',
    image: 'https://via.placeholder.com/400x200',
    createdAt: '2023-05-22T09:00:00Z',
  },
  {
    id: 3,
    title: 'Spicy Chicken Tacos',
    description: 'A quick and simple recipe for spicy chicken tacos.',
    image: 'https://via.placeholder.com/400x200',
    createdAt: '2023-05-21T08:00:00Z',
  },
  {
    id: 4,
    title: 'Spicy Chicken Tacos',
    description: 'A quick and simple recipe for spicy chicken tacos.',
    image: 'https://via.placeholder.com/400x200',
    createdAt: '2023-05-21T08:00:00Z',
  },
  {
    id: 5,
    title: 'Spicy Chicken Tacos',
    description: 'A quick and simple recipe for spicy chicken tacos.',
    image: 'https://via.placeholder.com/400x200',
    createdAt: '2023-05-21T08:00:00Z',
  },
  {
    id: 3,
    title: 'Spicy Chicken Tacos',
    description: 'A quick and simple recipe for spicy chicken tacos.',
    image: 'https://via.placeholder.com/400x200',
    createdAt: '2023-05-21T08:00:00Z',
  },
];

function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBlogs = blogData.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search blog posts..."
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBlogs.map(blog => (
          <Link to={`/blog/${blog.id}`} key={blog.id}>
            <div className="p-4 border border-gray-200 rounded shadow-sm hover:shadow-lg">
              <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover rounded mb-2" />
              <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-600">{blog.description.substring(0, 100)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BlogPage;
