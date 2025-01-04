import { createRoot } from "react-dom";
import App from "./App";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
