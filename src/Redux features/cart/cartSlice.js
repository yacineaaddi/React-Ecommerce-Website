import { createSlice } from "@reduxjs/toolkit";

/*
const [activeCat, setActiveCat] = useState("all");
const [cart, setCart] = useState([]);*/

const initialState = {
  activeCat: "all",
  cart: [],
};

const updateCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setActiveCat(state, action) {
      state.activeCat = action.payload;
    },

    setCart(state, action) {
      state.cart = action.payload;
    },
  },
});

export const { setActiveCat, setCart } = updateCartSlice.actions;
export default updateCartSlice.reducer;
