import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./Routes/Root-Routes";

// Tanstack query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./Providers/🛡️AuthProvider";

import Providers from "./Providers/Provider";
import  { Toaster } from 'react-hot-toast';

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div>
      <Providers>
        <QueryClientProvider client={client}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </Providers>
      <Toaster/>
    </div>
  </React.StrictMode>
);
