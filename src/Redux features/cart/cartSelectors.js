export const selectCart = (state) => state.cart.cart;

export const selectIsInCart = (state, productId) =>
  state.cart.cart.some((item) => item.CartId === productId);
