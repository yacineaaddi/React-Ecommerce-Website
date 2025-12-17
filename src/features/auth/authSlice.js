import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetail: "",
  isAuthenticated: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetail(state, action) {
      state.userDetail = action.payload;
    },

    login(state) {
      state.isAuthenticated = true;
    },

    logout(state) {
      state.isAuthenticated = false;
      state.userDetail = "";
    },
  },
});

export const { setUserDetail, login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
