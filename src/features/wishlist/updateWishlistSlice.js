import { createSlice } from "@reduxjs/toolkit";
import { removeFromWishlist, toggleWishlist } from "./wishlistThunks";

const updatewishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    status: "idle",
    error: null,
  },
  reducers: {},
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
      });
  },
});

export default updatewishlistSlice.reducer;
