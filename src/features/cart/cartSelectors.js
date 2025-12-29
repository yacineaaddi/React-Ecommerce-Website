// Selector to get the entire cart array from Redux state
export const selectCart = (state) => state.cart.cart;

// Selector to check if a specific product is already in the cart
export const selectIsInCart = (state, productId) =>
  state.cart.cart.some((item) => item.CartId === productId);
