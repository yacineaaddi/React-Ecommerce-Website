// Import Redux Toolkit function to create a slice of state
import { createSlice } from "@reduxjs/toolkit";

// Import async thunks for authentication operations
import { HandleLogin, HandleSignup } from "./authSlice";

// Slice to track async status of login/signup operations
const AuthFuncSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ----- Handle Signup -----
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

      // ----- Handle Login -----
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

// Export reducer to include in Redux store
export default AuthFuncSlice.reducer;
