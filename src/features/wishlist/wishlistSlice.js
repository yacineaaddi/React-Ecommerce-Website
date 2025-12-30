// Import createSlice
import { createSlice } from "@reduxjs/toolkit";

// Import async thunks for wishlist operations
import {
  removeFromWishlist,
  toggleWishlist,
  fetchWishlist,
} from "./wishlistThunks";

// Create the wishlist slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Reducer to set the wishlist directly
    setWishlist(state, action) {
      state.wishlist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ----- toggleWishlist thunk cases -----
      .addCase(toggleWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        /* state.wishlist = action.payload; */
        state.status = "succeeded";
      })
      .addCase(toggleWishlist.rejected, (state, action) => {
        state.status = "failed";
        /* state.error = action.payload; */
      })

      // ----- removeFromWishlist thunk cases -----
      .addCase(removeFromWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        /* state.wishlist = action.payload; */
        // Optionally update wishlist from response
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.status = "failed";
        /* state.error = action.payload; */
      })

      // ----- fetchWishlist thunk cases -----
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

// Export the setWishlist action to use in components
export const { setWishlist } = wishlistSlice.actions;

// Export the reducer to include in the Redux store
export default wishlistSlice.reducer;
