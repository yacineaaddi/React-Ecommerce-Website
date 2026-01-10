// Utility to create async Redux actions
import { createAsyncThunk } from "@reduxjs/toolkit";

// Firestore functions for CRUD operations
import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

// Firestore database instance
import { db } from "../../services/firebase";

// Toast notifications for user feedback
import toast from "react-hot-toast";

/*
  (Disabled) — thunk for fetching the cart for a user.
  You can re-enable later if you want to sync cart state on demand.
*/
// export const fetchCart = createAsyncThunk( ... )

// ----- INCREASE QUANTITY -----
export const increaseQty = createAsyncThunk(
  "cart/increaseQty",
  async ({ product, userId }, thunkAPI) => {
    // Prevent increasing beyond available stock
    if (product.Stock === 0 || product.Qty >= product.Stock) {
      toast.error("Out of stock");
      return thunkAPI.rejectWithValue("Out of stock");
    }

    try {
      const cartRef = doc(db, "users", userId, "cart", product.id);

      // Increment Qty by 1
      await updateDoc(cartRef, { Qty: product.Qty + 1 });

      toast.success("Quantity added successfully!");
      return true;
    } catch (error) {
      toast.error("Error increasing quantity");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ----- DECREASE QUANTITY -----
export const decreaseQty = createAsyncThunk(
  "cart/decreaseQty",
  async ({ product, userId }, thunkAPI) => {
    // Item must exist in stock
    if (product.Stock === 0) {
      toast.error("Out of stock");
      return thunkAPI.rejectWithValue("Out of stock");
    }

    // Do not allow going below 1
    if (product.Qty <= 1) {
      return thunkAPI.rejectWithValue("Minimum quantity reached");
    }

    try {
      const cartRef = doc(db, "users", userId, "cart", product.id);

      // Decrease Qty by 1
      await updateDoc(cartRef, {
        Qty: product.Qty - 1,
      });

      toast.success("Quantity decreased successfully!");
      return true;
    } catch (error) {
      toast.error("Error decreasing quantity");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ----- ADD TO CART -----
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product, userId, isAuthenticated }, thunkAPI) => {
    // User must be logged in
    if (!isAuthenticated) {
      toast.error("Please Log In");
      return thunkAPI.rejectWithValue("Not authenticated");
    }

    if (!userId) return thunkAPI.rejectWithValue("No user id");

    try {
      const cartRef = collection(db, "users", userId, "cart");

      // 1️ Get existing cart
      const snapshot = await getDocs(cartRef);
      const cart = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 2️ Check if product already exists in cart
      const existingItem = cart.find((item) => item.CartId === product.id);

      if (existingItem) {
        toast.success("Product already in cart");
        return thunkAPI.rejectWithValue("Already in cart");
      }

      // 3️ Add new item
      await addDoc(cartRef, {
        CartId: product.id,
        Title: product.Title,
        Cat: product.Cat,
        Price: product.Price,
        Img: product.Img,
        SubCat: product.SubCat,
        Brand: product.Brand,
        Model: product.Model,
        WebCode: product.WebCode,
        Rating: product.Rating,
        NumRev: product.NumRev,
        State: product.State,
        Stock: product.Stock,
        Qty: 1,
      });

      toast.success("Product Added To Cart");

      return true;
    } catch (error) {
      toast.error("Error adding product to cart");
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ----- REMOVE FROM CART -----
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, userId }, { dispatch, rejectWithValue }) => {
    try {
      // Delete document from Firestore
      await deleteDoc(doc(db, "users", userId, "cart", productId));

      toast.success("Product removed successfully!");

      // Return deleted product id so reducer can update UI
      return productId;
    } catch (err) {
      console.error(err);
      return rejectWithValue("Failed to remove product");
    }
  }
);
// ----- FETCH CART PRODUCTS -----
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, thunkAPI) => {
    if (!userId) return [];
    const cartSnapshot = await getDocs(collection(db, "users", userId, "cart"));
    return cartSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
);

