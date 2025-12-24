import authReducer from "./Redux features/auth/authSlice";
import cartReducer from "./Redux features/cart/cartSlice";
import productReducer from "./Redux features/product/productSlice";
import wishlistReducer from "./Redux features/wishlist/wishlistSlice";
import couponReducer from "./Redux features/coupon/couponSlice";
import uiReducer from "./Redux features/ui/uiSlice";
import { configureStore } from "@reduxjs/toolkit";
import updateCartReducer from "./Redux features/cart/updateCartSlice";
import updateWishlistReducer from "./Redux features/wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    wishlist: wishlistReducer,
    ui: uiReducer,
    coupon: couponReducer,
    updateCart: updateCartReducer,
    updateWishlist: updateWishlistReducer,
  },
});
