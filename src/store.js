import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/auth/cartSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});
