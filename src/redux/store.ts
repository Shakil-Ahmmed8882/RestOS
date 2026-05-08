import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "@/redux/featureApi/baseApi";
import authReducer from "@/redux/slices/authSlice";
import cartReducer from "@/redux/slices/cartSlice";

import "@/redux/featureApi/authApi";
import "@/redux/featureApi/userApi";
import "@/redux/featureApi/foodApi";
import "@/redux/featureApi/foodCategoryApi";
import "@/redux/featureApi/orderApi";
import "@/redux/featureApi/blogApi";
import "@/redux/featureApi/commentApi";
import "@/redux/featureApi/replyApi";
import "@/redux/featureApi/recipeApi";
import "@/redux/featureApi/voteApi";
import "@/redux/featureApi/saveApi";
import "@/redux/featureApi/searchApi";
import "@/redux/featureApi/analyticsApi";
import "@/redux/featureApi/profileApi";

export const makeStore = () =>
  configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: authReducer,
      cart: cartReducer,
    },
    middleware: (getDefault) => getDefault().concat(baseApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const setupStoreListeners = setupListeners;
