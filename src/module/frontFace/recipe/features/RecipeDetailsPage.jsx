import React from "react";
import demoBanner from "../../../../assets/img/home/sprinkleTomato.png";
import CommentSection from "./CommentSection";
import Container from "../../../../shared/layouts/Container";
import { Link } from "react-router-dom";

const RecipeDetailsPage = () => {
  return (
    <div className="font-sans sm:bg-[#f7f7f7]">
      <Container>

        {/* Main Content */}
        <main className="flex px-4 md:px-4  bg-[white] pb-11  mb-8   py-20">
          <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Recipe Section */}
            <section className="md:col-span-2">
              <img
                src={demoBanner}
                alt="Greek Lemon Potatoes"
                className="w-full h-auto rounded-lg "
              />
              <h2 className="text-2xl font-bold mt-4">
                The Greek Lemon Potatoes I Want to Make Every Single Night
              </h2>
              <p className="text-gray-600 mt-2">By Kelli Foster</p>

              {/* Recipe Description */}
              <article className="description">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro officiis repellat odit quae tenetur beatae ullam iste reiciendis distinctio consequuntur? Assumenda repellat pariatur nulla qui perferendis quaerat, quidem exercitationem! Dolores?</p>
                
              </article>



              <CommentSection />
            </section>

            {/* Trending Recipes Section */}
            <aside className="bg-gray-100 hidden md:block h-screen sticky top-0 rounded-lg shadow-sm">
              <h3 className="text-2xl font-poppins font-bold mb-4 px-4">
                Trending Recipes
              </h3>
              <ul className="space-y-4">
                <article className="flex items-center gap-2 justify-center group cursor-pointer py-5 px-4 transition500 border-b pb-3 border-[#d3d3d3eb]">
                  <li className="text-gray-800 fill-base-2 flex-2">
                    These Loaded Mexican Sandwiches Are So Good,
                  </li>
                  <img
                    src={demoBanner}
                    className="w-20 h-20 object-cover group-hover:scale-105 transition500"
                    alt=""
                  />
                </article>

                {/* 2 */}
                <article className="flex items-center gap-2 justify-center group cursor-pointer py-5 px-4 transition500 border-b pb-3 border-[#d3d3d3eb]">
                  <li className="text-gray-800 fill-base-2 flex-2 ">
                    This Caprese Chicken Is So Good, I've Made It for Dinner 3
                    Weeks in a Row
                  </li>
                  <img
                    src={demoBanner}
                    className="w-20 h-20 object-cover group-hover:scale-105 transition500"
                    alt=""
                  />
                </article>

                {/* 3 */}
                <article className="flex items-center gap-2 justify-center group cursor-pointer py-5 px-4 transition500 border-b pb-3 border-[#d3d3d3eb]">
                  <li className="text-gray-800 fill-base-2 flex-2 ">
                    This Classic Basil Pesto Is A Weeknight Workhorse
                  </li>
                  <img
                    src={demoBanner}
                    className="w-20 h-20 object-cover group-hover:scale-105 transition500"
                    alt=""
                  />
                </article>

                {/* 4 */}
                <article className="flex items-center gap-2 justify-center group cursor-pointer py-5 px-4 transition500 border-b pb-3 border-[#d3d3d3eb]">
                  <li className="text-gray-800 fill-base-2 flex-2 ">
                    Puerto Rican Beans is the Easy Side Dish Everyone Devours
                    Immediately
                  </li>
                  <img
                    src={demoBanner}
                    className="w-20 h-20 object-cover group-hover:scale-105 transition500"
                    alt=""
                  />
                </article>

                {/* 2 */}
              </ul>
              <Link to={'/recipe/new'}>
              <button className="mt-6 w-full bg-[#F3F4F5] py-2 rounded-lg">
                See More Recipes
              </button>
              </Link>
            </aside>
          </div>
        </main>
      </Container>
    </div>
  );
};

export default RecipeDetailsPage;
