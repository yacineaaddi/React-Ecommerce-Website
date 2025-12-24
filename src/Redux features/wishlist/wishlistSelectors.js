export const selectWishlist = (state) => state.wishlist.wishlist;

export const selectIsWishlisted = (state, productId) =>
  state.wishlist.wishlist.some((item) => item.CartId === productId);
