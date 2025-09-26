import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";

import { Toaster } from "./components/ui/toaster.jsx";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster/>
    </Provider>
  </BrowserRouter>
);


//the store is created in the store.js file and it is passed to the app component using the
//provider component
//the provider component is a component that wraps the app component and passes the store to it
//the store is the central location for all the data in the application


