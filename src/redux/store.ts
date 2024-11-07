import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import foodApi from "./features/food/food.api";
import userApi from "./features/user/userApi";
import orderApi from "./features/order/orderApi";
import menuReducer from "./features/global/menuSlice"
import commentApi from "./features/comment/comment.api";
import replyApi from "./features/reply/reply.api";
import voteApi from "./features/vote/vote.api";
import saveBlogApi from "./features/save/save.blog.api";

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
      orderApi.middleware,
      commentApi.middleware,
      replyApi.middleware,
      voteApi.middleware,
      saveBlogApi.middleware,

    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
