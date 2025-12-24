import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reduction: 0,
  isValid: null,
};

const CouponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
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

export const { setReduction } = CouponSlice.actions;
export default CouponSlice.reducer;
