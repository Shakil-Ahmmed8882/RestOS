import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
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

// Obfuscation transform — tokens are base64-encoded at rest in localStorage.
// For production apps that require stronger guarantees, replace with AES encryption.
const authEncryptTransform = createTransform(
  (inboundState) => btoa(unescape(encodeURIComponent(JSON.stringify(inboundState)))),
  (outboundState: unknown) => {
    try {
      return JSON.parse(decodeURIComponent(escape(atob(outboundState as string))));
    } catch {
      return null;
    }
  },
  { whitelist: ["auth"] },
);

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "refreshToken"],
  transforms: [authEncryptTransform],
};

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: persistReducer(authPersistConfig, authReducer),
  cart: cartReducer,
});

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefault) =>
      getDefault({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware),
  });
  return store;
};

export const makePersistor = (store: ReturnType<typeof makeStore>) => persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const setupStoreListeners = setupListeners;

/**
 * App-wide singleton store.
 *
 * Created once on module load so helpers outside the React tree
 * (e.g. optimistic cache patches) can import `store` directly without
 * threading dispatch/getState through every call site.
 *
 * The ReduxProvider mounts THIS instance, not a fresh one — so component
 * dispatches and singleton-helper dispatches operate on the same store.
 */
export const store: AppStore = makeStore();
export const persistor = makePersistor(store);
