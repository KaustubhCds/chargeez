import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
