import { UpdateStatesProvider } from "./useContext/updatestatesContext";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <UpdateStatesProvider>
        <App />
      </UpdateStatesProvider>
    </BrowserRouter>
  </Provider>
);
