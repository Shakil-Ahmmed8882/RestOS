import React from "react";
import demoBanner from "../../../../assets/img/home/sprinkleTomato.png";
import CommentSection from "./CommentSection";
import Container from "../../../../shared/layouts/Container";
import { Link, useParams } from "react-router-dom";
import { recipieCardData } from "../data";
import TredndingCard from "../components/TredndingCard";

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const recipe = recipieCardData?.find((item) => item.id == Number(id));

  const { name, uploaderImage, role, thumbnail, title, description, daysAgo } =
    recipe || {};

  return (
    <div className="font-sans sm:bg-[#f7f7f7]">
      <Container>
        {/* Main Content */}
        <main className="flex px-0 md:px-4  bg-[white] pb-11  mb-8   py-20">
          <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Recipe Section */}
            <section className="md:col-span-2">
              <img
                src={thumbnail}
                alt="Greek Lemon Potatoes"
                className="w-full h-80 object-cover rounded-lg "
              />
              <h2 className="text-2xl font-bold mt-4">{title}</h2>
              <p className="text-gray-600 mt-2">By {name}</p>

              {/* Recipe Description */}
              <article className="description">
                <p>{description}</p>
              </article>

              <CommentSection />
            </section>

            {/* Trending Recipes Section */}
            <aside className="bg-gray-100 hidden md:block h-screen sticky top-0 rounded-lg shadow-sm">
              <h3 className="text-2xl font-poppins font-bold mb-4 px-4">
                Trending Recipes
              </h3>
              <ul className="space-y-2">
                {recipieCardData?.map((item) => (
                  <TredndingCard key={item.id} item={item} />
                ))}
              </ul>
              <Link to={"/recipe/new"}>
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
