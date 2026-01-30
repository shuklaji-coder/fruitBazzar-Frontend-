import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { StoreContextProvider } from "./context/StoreContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="672029004581-xxxxxxxx.apps.googleusercontent.com">
      <BrowserRouter>
        <StoreContextProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </StoreContextProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
