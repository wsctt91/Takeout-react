import { createRoot } from "react-dom/client";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
