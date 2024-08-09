import React from "react";
import HomeLayout from "../module/frontFace/home/layout/HomeLayout";
import FoodsLayout from "../module/frontFace/food/FoodsLayout";
import BlogPage from "../module/frontFace/blog/layout/Blog";
import FAQ from "../module/frontFace/faq/features/FAQ";
import BlogDetailPage from "../module/frontFace/blog/features/BlogDetails";
import RecipePageLayout from "../module/frontFace/recipe/layout/RecipePageLayout";
import RecipeDetailPage from "../module/frontFace/recipe/features/RecipeDetailsPage";
import Private from "../shared/ui/Private";
import FoodDetails from "../module/frontFace/foodDetails/FoodsDetail";


export const homePagePaths = [
  {
    name: "Home",
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "/all-menu",
    element: <h1>Menu</h1>,
  },
  //   food
  {
    name: "Food",
    path: "food",
    element: <FoodsLayout />,
  },
  {
    path: "/food-details/:id",
    element: (
      <Private>
        <FoodDetails />
      </Private>
    ),
  },
  //   faq
  {
    name: "FAQ",
    path: "faq",
    element: <FAQ />,
  },
  // blog
  {
    name: "Blog",
    path: "blog",
    element: <BlogPage />,
  },
  {
    path: "blog/:id",
    element: <BlogDetailPage match={undefined} />,
  },
  // recipes
  {
    name: "Recipes",
    path: "recipe/new",
    element: <RecipePageLayout />,
  },
  {
    path: "recipe/:id",
    element: <RecipeDetailPage />
  },
];
