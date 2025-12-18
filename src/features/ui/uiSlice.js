import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: false,
  sideMenu: false,
  lightbox: null,
};

const UiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebar(state, action) {
      state.sidebar = action.payload;
    },
    SetsideMenu(state, action) {
      state.sideMenu = action.payload;
    },
    setlightbox(state, action) {
      state.lightbox = action.payload;
    },
  },
});

export const { setSidebar, SetsideMenu, setlightbox } = UiSlice.actions;
export default UiSlice.reducer;
