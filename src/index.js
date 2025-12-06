import { CartProvider } from "./components/cartContext";
import { AuthProvider } from "./components/authContext";
import { UiProvider } from "./components/uiContext";
import { WishlistProvider } from "./components/wishlistContext";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./components/productContext";
import { UpdateStatesProvider } from "./components/updatestatesContext";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
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
);
