// Import createSlice from Redux Toolkit to define a Redux slice
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for UI-related features
const initialState = {
  sidebar: false,
  sideMenu: false,
  lightbox: null,
};

// Create a Redux slice to manage UI state
const UiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Reducer to toggle or set the sidebar visibility
    setSidebar(state, action) {
      state.sidebar = action.payload;
    },
    // Reducer to toggle or set the side menu visibility
    SetsideMenu(state, action) {
      state.sideMenu = action.payload;
    },
    // Reducer to set the currently active lightbox item
    setlightbox(state, action) {
      state.lightbox = action.payload;
    },
  },
});

// Export the actions to be dispatched from components
export const { setSidebar, SetsideMenu, setlightbox } = UiSlice.actions;

// Export the reducer to include it in the Redux store
export default UiSlice.reducer;
