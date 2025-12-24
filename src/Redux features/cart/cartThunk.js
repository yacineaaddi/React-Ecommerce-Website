import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

import { db } from "../../services/firebase";
import {} from "firebase/firestore";
import toast from "react-hot-toast";
/*
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, thunkAPI) => {
    try {
      const cartRef = collection(db, "users", userId, "cart");
      const snapshot = await getDocs(cartRef);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
*/
export const increaseQty = createAsyncThunk(
  "cart/increaseQty",
  async ({ product, userId }, thunkAPI) => {
    if (product.Stock === 0 || product.Qty >= product.Stock) {
      toast.error("Out of stock");
      return thunkAPI.rejectWithValue("Out of stock");
    }

    try {
      const cartRef = doc(db, "users", userId, "cart", product.id);
      await updateDoc(cartRef, { Qty: product.Qty + 1 });

      /* thunkAPI.dispatch(fetchCart(userId));*/

      toast.success("Quantity added successfully!");
      return true;
    } catch (error) {
      toast.error("Error increasing quantity");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const decreaseQty = createAsyncThunk(
  "cart/decreaseQty",
  async ({ product, userId }, thunkAPI) => {
    // 🔴 out of stock
    if (product.Stock === 0) {
      toast.error("Out of stock");
      return thunkAPI.rejectWithValue("Out of stock");
    }

    // 🔴 ما ننقصوش أقل من 1
    if (product.Qty <= 1) {
      return thunkAPI.rejectWithValue("Minimum quantity reached");
    }

    try {
      const cartRef = doc(db, "users", userId, "cart", product.id);

      await updateDoc(cartRef, {
        Qty: product.Qty - 1,
      });

      toast.success("Quantity decreased successfully!");

      // 🔥 نحدّث Redux state
      /*thunkAPI.dispatch(fetchCart(userId));*/

      return true;
    } catch (error) {
      toast.error("Error decreasing quantity");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product, userId, isAuthenticated }, thunkAPI) => {
    if (!isAuthenticated) {
      toast.error("Please Log In");
      return thunkAPI.rejectWithValue("Not authenticated");
    }

    if (!userId) return thunkAPI.rejectWithValue("No user id");

    try {
      const cartRef = collection(db, "users", userId, "cart");

      // 1️⃣ fetch cart
      const snapshot = await getDocs(cartRef);
      const cart = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 2️⃣ check if product exists
      const existingItem = cart.find((item) => item.CartId === product.id);

      if (existingItem) {
        toast.success("Product already in cart");
        return thunkAPI.rejectWithValue("Already in cart");
      }

      // 3️⃣ add product
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

      // 4️⃣ refresh cart
      /*thunkAPI.dispatch(fetchCart(userId));*/

      toast.success("Product Added To Cart");

      return true;
    } catch (error) {
      toast.error("Error adding product to cart");
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, userId }, { dispatch, rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "users", userId, "cart", productId));

      /*dispatch(fetchCart(userId));*/

      toast.success("Product removed successfully!");

      return productId;
    } catch (err) {
      console.error(err);
      return rejectWithValue("Failed to remove product");
    }
  }
);
