import React from "react";
import HomeLayout from "../module/frontFace/home/layout/HomeLayout";
import FoodsLayout from "../module/frontFace/food/FoodsLayout";
import FAQ from "../module/frontFace/faq/features/FAQ";
import BlogDetailPage from "../module/frontFace/blog/features/BlogDetails";
import RecipePageLayout from "../module/frontFace/recipe/layout/RecipePageLayout";
import RecipeDetailPage from "../module/frontFace/recipe/features/RecipeDetailsPage";
import Private from "../shared/ui/Private";
import FoodDetails from "../module/frontFace/foodDetails/FoodsDetail";
import AllCategories from "../module/frontFace/all-categories/AllCategories";
import AllTrendings from "../module/frontFace/all-trendings/AllTrendings";
import BlogLayout from "../module/frontFace/blog/layout/BlogLayout";

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
    element: <BlogLayout />,
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
    element: <RecipeDetailPage />,
  },

  // --------------- common routes ----------------
  {
    name: "",
    path: "/all-categories",
    element: <AllCategories />,
  },
  {
    name: "",
    path: "/all-trendings",
    element: <AllTrendings />,
  },
];
