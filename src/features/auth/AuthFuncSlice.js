import { createSlice } from "@reduxjs/toolkit";
import Signup from "./AuthSlice";

const AuthFuncSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🟢 fetchCart
      .addCase(Signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(Signup.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(Signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default AuthFuncSlice.reducer;
