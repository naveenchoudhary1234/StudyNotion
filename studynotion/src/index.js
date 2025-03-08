import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// for Using Router we need this
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/index";


const store = configureStore({
  // iske andar reducer store krenge
  // hmare pas multiple reduxer hinge to vo root reducer
  // to hmne root reducer
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
