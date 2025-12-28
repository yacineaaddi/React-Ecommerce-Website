// Firebase imports

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, app } from "../../services/firebase";

// Redux imports
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUserDetail, login } from "./authSlice";

// UI / utils imports
import toast from "react-hot-toast";

// Async thunk to handle user signup
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

// Async thunk to handle user login
export const HandleLogin = createAsyncThunk(
  // Action type
  "auth/login",

  // Async function receives email, password, navigate, plus thunkAPI helpers
  async ({ email, password, navigate }, thunkAPI) => {
    // Extract dispatch from thunkAPI
    const { dispatch } = thunkAPI;
    // Basic validation — make sure both fields are filled
    if (!email || !password) {
      console.log(email, password);
      toast.error("All fields are required");
      return;
    }

    try {
      // Authenticate user with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        app.auth(),
        email,
        password
      );

      // Authenticated Firebase user object
      const user = userCredential.user;

      // If login succeeded
      if (user) {
        // Reference to user document in Firestore
        const userDocRef = doc(db, "users", user.uid);

        // Fetch user data from Firestore
        const userDoc = await getDoc(userDocRef);

        // Check if document exists
        if (userDoc.exists()) {
          // Merge Firestore ID with user data
          const userData = { id: userDoc.id, ...userDoc.data() };

          // Save user data into Redux store
          dispatch(setUserDetail(userData));

          // Update auth state to "logged in"
          dispatch(login());

          // Success message
          toast.success("User Logged In Successfully");

          // Redirect to homepage
          navigate("/");
        } else {
          // If Firestore doc does not exist
          toast.error("User data not found in Firestore!");
        }
      }
    } catch (err) {
      // Show error message
      toast.error(err.message);

      // Reject with error so reducers can handle it
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
