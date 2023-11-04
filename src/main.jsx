import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./Routes/Root-Routes";

// Tanstack query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./Providers/🛡️AuthProvider";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
