import { configureStore } from "@reduxjs/toolkit";

// api
import { baseApi } from "./api/baseApi";
import foodApi from "./features/food/food.api";
import userApi from "./features/user/userApi";
import orderApi from "./features/order/orderApi";
import commentApi from "./features/comment/comment.api";
import replyApi from "./features/reply/reply.api";
import voteApi from "./features/vote/vote.api";
import saveBlogApi from "./features/save/save.blog.api";
import profileApi from "./features/profile/profile.api";
import searchApi from "./features/search/search.api";
import authApi from "./features/auth/auth.api";

// Reducer
import menuReducer from "./features/global/menuSlice";
import authReducer from "./features/auth/auth.slice";
import commentReducer from "./features/comment/comment.slice";
import profileReducer from "./features/profile/profile.slice";

// redux persisi
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
};

const persistAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    menu: menuReducer,
    comment: commentReducer,
    profile: profileReducer,
    auth: persistAuthReducer,
  },

  // APIs Middleware connection ...
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      foodApi.middleware,
      userApi.middleware,
      orderApi.middleware,
      commentApi.middleware,
      replyApi.middleware,
      voteApi.middleware,
      saveBlogApi.middleware,
      profileApi.middleware,
      searchApi.middleware,
      authApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
