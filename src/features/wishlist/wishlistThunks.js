// Import createAsyncThunk
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import Firebase Firestore functions
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Import Firebase instance
import { db } from "../../services/firebase";

// Import toast notifications
import toast from "react-hot-toast";

// ----- TOGGLE WISHLIST -----
// Adds or removes a product from the user's wishlist
export const toggleWishlist = createAsyncThunk(
  "wishlist/toggleWishlist",
  async ({ product, userId, isAuthenticated }, thunkAPI) => {
    // Reject if user is not authenticated
    if (!isAuthenticated) {
      toast.error("Please Log In");
      return thunkAPI.rejectWithValue("Not authenticated");
    }

    // Reject if no userId provided
    if (!userId) {
      return thunkAPI.rejectWithValue("No user id");
    }

    try {
      // Reference to user's wishlist collection in Firestore
      const wishlistRef = collection(db, "users", userId, "wishlist");

      // 1️ Fetch current wishlist
      const snapshot = await getDocs(wishlistRef);
      const wishlist = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 2️ Check if the product already exists in wishlist
      const existingItem = wishlist.find((item) => item.CartId === product.id);

      // 3️ Remove the product if it exists
      if (existingItem) {
        const itemRef = doc(db, "users", userId, "wishlist", existingItem.id);
        await deleteDoc(itemRef);

        toast.success("Product removed from wishlist");
      }
      // 4️ Add the product if it does not exist
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
      // Optional: re-fetch wishlist to keep a single source of truth
      const updatedSnapshot = await getDocs(wishlistRef);
      const updatedWishlist = updatedSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return updatedWishlist;
      */
    } catch (error) {
      toast.error("Wishlist error");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ----- REMOVE FROM WISHLIST -----
// Deletes a single wishlist item
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ itemId, userId }, thunkAPI) => {
    if (!userId) return thunkAPI.rejectWithValue("No user id");

    try {
      // 1️ Delete the wishlist item
      const wishlistRef = doc(db, "users", userId, "wishlist", itemId);
      await deleteDoc(wishlistRef);

      /*
      // Optional: re-fetch wishlist to update local state
      const snapshot = await getDocs(
        collection(db, "users", userId, "wishlist")
      );
      const updatedWishlist = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      */

      toast.success("Product removed successfully!");
      // return updatedWishlist;
    } catch (error) {
      toast.error("Error deleting product");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ----- FETCH WISHLISTED PRODUCTS -----
// Fetches all wishlist items for a given user
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId, thunkAPI) => {
    if (!userId) return [];

    // Get all wishlist documents from Firestore
    const wishlistSnapshot = await getDocs(
      collection(db, "users", userId, "wishlist")
    );

    // Map documents to an array with id included
    return wishlistSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
);
