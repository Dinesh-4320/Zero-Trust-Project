import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./reducers/store";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
// import { BackgroundGradientAnimation } from "./components/ui/BackgroundGradientAnimation.jsx";
// import { HeroHighlight } from "./components/ui/HeroHighlight.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <HeroHighlight> */}
        {/* <BackgroundGradientAnimation> */}
          <App />
        {/* </HeroHighlight> */}
        {/* </BackgroundGradientAnimation> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
