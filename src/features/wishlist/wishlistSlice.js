import { createSlice } from "@reduxjs/toolkit";
import {
  removeFromWishlist,
  toggleWishlist,
  fetchWishlist,
} from "./wishlistThunks";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setWishlist(state, action) {
      state.wishlist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        /* state.wishlist = action.payload;*/
        state.status = "succeeded";
      })
      .addCase(toggleWishlist.rejected, (state, action) => {
        state.status = "failed";
        /* state.error = action.payload;*/
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        /*state.wishlist = action.payload;*/
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.status = "failed";
        /* state.error = action.payload;*/
      })
      // ----- fetch wishlisted products -----
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Filter out removed item from local cart state
        state.cart = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export const { setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
