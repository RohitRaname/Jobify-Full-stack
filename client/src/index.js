import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";

import { AppProvider } from "./context/AppContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
