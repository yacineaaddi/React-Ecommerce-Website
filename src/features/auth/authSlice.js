import { createSlice } from "@reduxjs/toolkit";

// Initial state for authentication
const initialState = {
  userDetail: "",
  isAuthenticated: false,
};

// Create a Redux slice for authentication
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set the user details after login
    setUserDetail(state, action) {
      state.userDetail = action.payload;
    },

    // Mark true as logged in
    login(state) {
      state.isAuthenticated = true;
    },

    // Logout user and reset state
    logout(state) {
      state.isAuthenticated = false;
      state.userDetail = "";
    },
  },
});

// Export actions to use in components
export const { setUserDetail, login, logout } = AuthSlice.actions;

// Export reducer to include in the Redux store
export default AuthSlice.reducer;
