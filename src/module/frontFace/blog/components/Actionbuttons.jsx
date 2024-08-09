import React from 'react';

function ActionButtons({ articleId }) {
  const handleSave = () => console.log('Saved article with id:', articleId);
  const handleLike = () => console.log('Liked article with id:', articleId);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
      >
        <span className="sr-only">Like</span>
        {/* Add your like icon here */}
        Like
      </button>
      <button
        onClick={handleSave}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
      >
        <span className="sr-only">Save</span>
        {/* Add your save icon here */}
        Save
      </button>
    </div>
  );
}

export default ActionButtons;
