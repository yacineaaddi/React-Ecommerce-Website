// Enables client-side routing via React Router
import { BrowserRouter } from "react-router-dom";

// React DOM entry point for rendering the app
import ReactDOM from "react-dom/client";

// Main application component
import App from "./app";

// Provides Redux store access to the entire app
import { Provider } from "react-redux";

// The configured Redux store
import { store } from "./store";

// Get the root DOM element where the React app will be mounted
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application
root.render(
  // Makes Redux store available to all components
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
