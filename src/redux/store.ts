import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import foodApi from "./features/food/food.api";
import userApi from "./features/user/userApi";
import orderApi from "./features/order/orderApi";
import menuReducer from "./features/global/menuSlice"

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    menu: menuReducer, // Add the menu reducer here
  },

  // APIs Middleware connection ...
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      foodApi.middleware,
      userApi.middleware,
      orderApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
