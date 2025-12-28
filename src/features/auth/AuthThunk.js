import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUserDetail, login } from "./AuthSlice";
import { db, app } from "../../services/firebase";
import {} from "firebase/firestore";
import toast from "react-hot-toast";

export const HandleSignup = createAsyncThunk(
  "auth/signup",

  // get dispatch + navigate from thunkAPI
  async ({ name, email, phone, password, navigate }, thunkAPI) => {
    const { dispatch } = thunkAPI;

    // basic validation
    if (!name || !email || !phone || !password) {
      toast.error("All fields are required");
      return;
    }
    try {
      // Create user in Firebase Auth
      const createAccount = await app
        .auth()
        .createUserWithEmailAndPassword(email, password);

      // Extract user object
      const user = createAccount.user;
      // Firestore reference (user doc by UID)
      const userRef = db.collection("users").doc(user.uid);

      // Data to store in Firestore
      const newUserData = {
        Name: name,
        Email: email,
        Phone: phone,
      };

      // Save user in Firestore
      await userRef.set(newUserData);

      // Update local state
      dispatch(setUserDetail({ id: user.uid, ...newUserData }));

      // success message
      toast.success("User Registered Successfully");

      // set auth flag
      dispatch(login());

      // redirect to home
      navigate("/");
    } catch (err) {
      // handle Firebase errors
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
