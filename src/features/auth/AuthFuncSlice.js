import { createSlice } from "@reduxjs/toolkit";
import { HandleLogin, HandleSignup } from "./authSlice";

const AuthFuncSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // HandleSignup
      .addCase(HandleSignup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(HandleSignup.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(HandleSignup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // HandleLogin
      .addCase(HandleLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(HandleLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(HandleLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default AuthFuncSlice.reducer;
