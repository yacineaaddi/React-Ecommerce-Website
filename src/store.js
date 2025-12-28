import authReducer from "./features/auth/AuthSlice";
import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/product/productSlice";
import wishlistReducer from "./features/wishlist/wishlistSlice";
import couponReducer from "./features/coupon/couponSlice";
import uiReducer from "./features/ui/uiSlice";
import { configureStore } from "@reduxjs/toolkit";
import updateCartReducer from "./features/cart/updateCartSlice";
import updateWishlistReducer from "./features/wishlist/wishlistSlice";
import couponListener from "./features/coupon/couponListener";

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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(couponListener.middleware),
});
