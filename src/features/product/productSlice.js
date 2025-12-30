// Import createSlice
import { createSlice } from "@reduxjs/toolkit";

// Import the initial product data
import { Product } from "../../data/data";

// Define the initial state for the product slice
const initialState = {
  products: Product,
};

// Create a Redux slice to manage products
const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Reducer to set products dynamically
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

// Export the setProducts action to dispatch from components
export const { setProducts } = ProductSlice.actions;

// Export the reducer to include it in the Redux store
export default ProductSlice.reducer;
