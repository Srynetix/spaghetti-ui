import "./index.scss";

import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./store";

const app = document.getElementById("app");
if (!app) {
  console.error("Missing app container.");
} else {
  const root = ReactDOM.createRoot(app);

  root.render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
