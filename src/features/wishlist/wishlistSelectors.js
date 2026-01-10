// Selector to get the full wishlist array from the Redux state
export const selectWishlist = (state) => state.wishlist.wishlist;

// Selector to check if a specific product is in the wishlist
export const selectIsWishlisted = (state, productId) =>
  state.wishlist.wishlist.some((item) => item.CartId === productId);
