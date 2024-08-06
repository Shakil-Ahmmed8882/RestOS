import React, { useState, useEffect } from 'react';

// Sample static data
const blogPostData = {
  id: 1,
  title: 'Creamy Garlic Shrimp Pasta',
  content: 'This creamy garlic shrimp pasta is a quick and easy dinner option that is sure to please everyone at the table. The garlic sauce is made with butter, heavy cream, and Parmesan cheese, and it perfectly complements the tender shrimp and al dente pasta.',
  image: 'https://via.placeholder.com/800x400',
  createdAt: '2023-05-23T10:00:00Z',
};

const commentsData = [
  {
    text: 'This recipe was amazing! My family loved it.',
    createdAt: '2023-05-23T12:00:00Z',
  },
  {
    text: 'Easy to make and very tasty!',
    createdAt: '2023-05-23T14:00:00Z',
  },
];

function BlogDetailPage({ match }) {
  const [blog, setBlog] = useState(blogPostData);
  const [comments, setComments] = useState(commentsData);
  const [comment, setComment] = useState('');

//   const blogId = match.params.id;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      text: comment,
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
    setComment('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="w-full h-80 object-cover rounded mb-4" />
      <div className="text-gray-600 mb-4">
        {new Date(blog.createdAt).toLocaleDateString()}
      </div>
      <div className="mb-4">
        <p className="text-lg">{blog.content}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
        </form>
        <div>
          {comments.map((comment, index) => (
            <div key={index} className="mb-2 p-2 border border-gray-200 rounded">
              <p>{comment.text}</p>
              <div className="text-gray-500 text-sm">
                {new Date(comment.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogDetailPage;
