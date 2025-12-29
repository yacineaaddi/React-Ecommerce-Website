// Import reducers for different features of the application
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/product/productSlice";
import wishlistReducer from "./features/wishlist/wishListSlice";
import couponReducer from "./features/coupon/couponSlice";
import uiReducer from "./features/ui/uiSlice";

// Redux Toolkit helper to create the store
import { configureStore } from "@reduxjs/toolkit";

// Additional reducers for updating cart and wishlist
import updateCartReducer from "./features/cart/cartSlice";
import updateWishlistReducer from "./features/wishlist/wishListSlice";

// Listener middleware for coupon-related side effects
import couponListener from "./features/coupon/couponListener";

// Create and export the Redux store
export const store = configureStore({
  reducer: {
    // Authentication state
    auth: authReducer,

    // Shopping cart state
    cart: cartReducer,

    // Product listing / details state
    product: productReducer,

    // Wishlist state
    wishlist: wishlistReducer,

    // UI state (e.g., modals, loading states)
    ui: uiReducer,

    // Coupon state
    coupon: couponReducer,

    // Tracks updates to the cart separately
    updateCart: updateCartReducer,

    // Tracks updates to the wishlist separately
    updateWishlist: updateWishlistReducer,
  },

  // Extend default middleware by prepending the coupon listener
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(couponListener.middleware),
});
