import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { IEPProvider } from "./context/IEPContext";

// Wrap the App in the IEPProvider to share form data across pages
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <IEPProvider>
    <App />
  </IEPProvider>
);
