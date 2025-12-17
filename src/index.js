import { UpdateStatesProvider } from "./useContext/updatestatesContext";
import { WishlistProvider } from "./useContext/wishlistContext";
import { ProductProvider } from "./useContext/productContext";
import { CartProvider } from "./useContext/cartContext";
import { AuthProvider } from "./useContext/authContext";
import { UiProvider } from "./useContext/uiContext";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ProductProvider>
              <UiProvider>
                <UpdateStatesProvider>
                  <App />
                </UpdateStatesProvider>
              </UiProvider>
            </ProductProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
