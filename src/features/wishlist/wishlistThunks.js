import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import toast from "react-hot-toast";

export const toggleWishlist = createAsyncThunk(
  "wishlist/toggleWishlist",
  async ({ product, userId, isAuthenticated }, thunkAPI) => {
    if (!isAuthenticated) {
      toast.error("Please Log In");
      return thunkAPI.rejectWithValue("Not authenticated");
    }

    if (!userId) {
      return thunkAPI.rejectWithValue("No user id");
    }

    try {
      const wishlistRef = collection(db, "users", userId, "wishlist");

      // 1️⃣ fetch wishlist
      const snapshot = await getDocs(wishlistRef);
      const wishlist = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 2️⃣ check if product exists
      const existingItem = wishlist.find((item) => item.CartId === product.id);

      // 3️⃣ remove
      if (existingItem) {
        const itemRef = doc(db, "users", userId, "wishlist", existingItem.id);
        await deleteDoc(itemRef);

        toast.success("Product removed from wishlist");
      }
      // 4️⃣ add
      else {
        await addDoc(wishlistRef, {
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

        toast.success("Product added to wishlist");
      }
      /*
      // 5️⃣ re-fetch wishlist (single source of truth)
      const updatedSnapshot = await getDocs(wishlistRef);
      const updatedWishlist = updatedSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return updatedWishlist; // 👈 important*/
    } catch (error) {
      toast.error("Wishlist error");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ itemId, userId }, thunkAPI) => {
    if (!userId) return thunkAPI.rejectWithValue("No user id");

    try {
      // 1️⃣ delete item
      const wishlistRef = doc(db, "users", userId, "wishlist", itemId);
      await deleteDoc(wishlistRef);
      /*
      // 2️⃣ re-fetch wishlist
      const snapshot = await getDocs(
        collection(db, "users", userId, "wishlist")
      );
      const updatedWishlist = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
*/
      toast.success("Product removed successfully!");
      /*
      return updatedWishlist;*/
    } catch (error) {
      toast.error("Error deleting product");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// ----- FETCH WISHLISTED PRODUCTS -----
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId, thunkAPI) => {
    if (!userId) return [];
    const wishlistSnapshot = await getDocs(
      collection(db, "users", userId, "wishlist")
    );
    return wishlistSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
);
