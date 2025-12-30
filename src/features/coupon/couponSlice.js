// Import createSlice from Redux Toolkit to define a Redux slice
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the coupon slice
const initialState = {
  reduction: 0,
  isValid: null,
};

// Create a Redux slice for coupon functionality
const CouponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    // Reducer to set the coupon reduction based on the coupon code
    setReduction(state, action) {
      switch (action.payload) {
        case "X7p9alq2":
          state.reduction = 20;
          break;
        case "M4zt82rw":
          state.reduction = 30;
          break;
        case "qh9lk3vj":
          state.reduction = 50;
          break;
        default:
          state.reduction = 0;
          state.isValid = false;
      }
    },
  },
});

// Export the setReduction action to be dispatched in components
export const { setReduction } = CouponSlice.actions;

// Export the reducer to be included in the Redux store
export default CouponSlice.reducer;
