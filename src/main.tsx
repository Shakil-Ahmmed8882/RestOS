// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

import { RouterProvider } from "react-router-dom";
import router from "./Routes/Root-Routes";

// Tanstack query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./Providers/🛡️AuthProvider";

import Providers from "./Providers/Provider";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";

// redux persisit
import { PersistGate } from "redux-persist/integration/react";


const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div>
      <Provider store={store}>
        <Providers>
          <QueryClientProvider client={client}>
            <HelmetProvider>
              <AuthProvider>
                {/*  */}
                <PersistGate loading={null} persistor={persistor}>
                  <RouterProvider router={router} />
                </PersistGate>
              </AuthProvider>
            </HelmetProvider>
          </QueryClientProvider>
        </Providers>
      </Provider>
      <Toaster />
    </div>
  </React.StrictMode>
);
