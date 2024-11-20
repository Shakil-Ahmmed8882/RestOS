import React from "react";
import HomeLayout from "../module/frontFace/home/layout/HomeLayout";
import FoodsLayout from "../module/frontFace/food/FoodsLayout";
import FAQ from "../module/frontFace/faq/features/FAQ";
import BlogDetailPage from "../module/frontFace/blog/features/BlogDetails";
import RecipePageLayout from "../module/frontFace/recipe/layout/RecipePageLayout";
import RecipeDetailPage from "../module/frontFace/recipe/features/RecipeDetailsPage";
import ProtectedRoutes from "../shared/ui/PrivateRoutes";
import FoodDetails from "../module/frontFace/foodDetails/FoodsDetail";
import AllCategories from "../module/frontFace/all-categories/AllCategories";
import AllTrendings from "../module/frontFace/all-trendings/AllTrendings";
import BlogLayout from "../module/frontFace/blog/layout/BlogLayout";
import FoodCategoryLayout from "../module/dashboard/adminDashboard/food-management/food-categories/compoents/FoodCategoryLayout";
import Container from "../shared/layouts/Container";

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
      <ProtectedRoutes>
        <FoodDetails />
      </ProtectedRoutes>
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
    element: <BlogDetailPage />,
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
  {
    name: "",
    path: "/food-categories",
    element: <Container><FoodCategoryLayout/></Container>,
  },
];
