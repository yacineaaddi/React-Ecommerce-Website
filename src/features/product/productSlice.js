import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../data/data";

const initialState = {
  products: Product,
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = ProductSlice.actions;
export default ProductSlice.reducer;
