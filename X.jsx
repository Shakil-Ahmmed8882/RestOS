import React from 'react';

const RecipePage = () => {
  return (
    <div className="font-sans bg-white">
      {/* Header Section */}
      <header className="text-center py-8">
        <p className="text-xl font-semibold">We're the secret ingredient for home cooks.</p>
        <div className="flex justify-center space-x-8 mt-4">
          <div className="text-gray-600 text-center">
            <span className="block text-xl font-bold">26 million</span>
            <span className="text-sm">Home cooks</span>
          </div>
          <div className="text-gray-600 text-center">
            <span className="block text-xl font-bold">9000</span>
            <span className="text-sm">Trusted recipes</span>
          </div>
          <div className="text-gray-600 text-center">
            <span className="block text-xl font-bold">5.5 Million</span>
            <span className="text-sm">Social followers</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex justify-center px-4">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Recipe Section */}
          <section className="md:col-span-2">
            <img
              src="https://via.placeholder.com/500x300"
              alt="Greek Lemon Potatoes"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <h2 className="text-2xl font-bold mt-4">
              The Greek Lemon Potatoes I Want to Make Every Single Night
            </h2>
            <p className="text-gray-600 mt-2">By Kelli Foster</p>
          </section>

          {/* Trending Recipes Section */}
          <aside className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Trending Recipes</h3>
            <ul className="space-y-4">
              <li className="text-gray-800">
                These Loaded Mexican Sandwiches Are So Good, Everyone Will Want Two
              </li>
              <li className="text-gray-800">
                Puerto Rican Beans is the Easy Side Dish Everyone Devours Immediately
              </li>
              <li className="text-gray-800">
                This Classic Basil Pesto Is A Weeknight Workhorse
              </li>
              <li className="text-gray-800">
                This Caprese Chicken Is So Good, I've Made It for Dinner 3 Weeks in a Row
              </li>
            </ul>
            <button className="mt-6 w-full bg-black text-white py-2 rounded-lg">
              See More Recipes
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default RecipePage;
