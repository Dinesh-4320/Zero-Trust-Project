import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reducers/store";
import GridBackground from "./components/ui/GridBackground.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GridBackground>
          <App />
        </GridBackground>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);