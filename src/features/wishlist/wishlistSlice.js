import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist(state, action) {
      state.wishlist = action.payload;
    },
  },
});

export const { setWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;
