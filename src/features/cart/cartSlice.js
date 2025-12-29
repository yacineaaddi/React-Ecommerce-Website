import { createSlice } from "@reduxjs/toolkit";

// Async thunks that perform cart operations
import {
  increaseQty,
  decreaseQty,
  addToCart,
  removeFromCart,
  fetchCart,
} from "./cartThunk";

// Slice responsible for tracking cart update actions and status
const updatecartSlice = createSlice({
  name: "cart",

  // Initial slice state
  initialState: { activeCat: "all", cart: [], status: "idle", error: null },

  reducers: {
    // Update the active category for filtering products
    setActiveCat(state, action) {
      state.activeCat = action.payload;
    },

    // Replace cart items
    setCart(state, action) {
      state.cart = action.payload;
    },
  },

  // Handle async thunk lifecycle actions
  extraReducers: (builder) => {
    builder

      // ----- Add to cart -----
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ----- Increase quantity -----
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

      // ----- Decrease quantity -----
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

      // ----- Remove item from cart -----
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Filter out removed item from local cart state
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // ----- FETCH CART PRODUCTS -----
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Filter out removed item from local cart state
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { setActiveCat, setCart } = updatecartSlice.actions;
// Export generated reducer for store usage
export default updatecartSlice.reducer;
