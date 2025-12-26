import { createSlice } from "@reduxjs/toolkit";
import {
  increaseQty,
  decreaseQty,
  addToCart,
  removeFromCart,
} from "./cartThunk";

const updatecartSlice = createSlice({
  name: "updatecart",
  initialState: {
    cart: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder /*
      // 🟢 fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
*/
      // 🟢 addToCart
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.status = "succeeded";
        // note: cart updated inside fetchCart thunk
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 🟢 increaseQty
      .addCase(increaseQty.pending, (state) => {
        state.status = "loading";
      })
      .addCase(increaseQty.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(increaseQty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 🟢 decreaseQty
      .addCase(decreaseQty.pending, (state) => {
        state.status = "loading";
      })
      .addCase(decreaseQty.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(decreaseQty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // removefromcart
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        // اختيارياً: نحيد المنتوج مباشرة من state (قبل fetchCart)
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default updatecartSlice.reducer;
