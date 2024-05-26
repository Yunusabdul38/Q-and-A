import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import db from "./firebase";

export const checkUserSignIn = createAsyncThunk(
  "auth/checkUserSignIn",
  async (userCredential) => {
    const user = userCredential;
    // get current sign in user data
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    return new Promise((resolve, reject) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        // resolve data is been addwd to redux store 
        resolve(data);
      } else {
        reject("user data does not exist try signing up or tey again later");
      }
    });
  }
);
