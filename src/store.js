import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/product/productSlice";
import wishlistReducer from "./features/wishlist/wishlistSlice";
import uiReducer from "./features/ui/uiSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    wishlist: wishlistReducer,
    ui: uiReducer,
  },
});
