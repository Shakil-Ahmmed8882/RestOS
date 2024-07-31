import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import foodApi from "./features/food/food.api";


export const store = configureStore({
  reducer: {
    [baseApi.reducerPath] : baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(foodApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
