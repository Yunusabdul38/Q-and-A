import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const checkUserSignIn = createAsyncThunk(
    "auth/checkUserSignIn",
    async () => {
      return new Promise((resolve, reject)=> {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          unsubscribe();
          if (user) {
            resolve(user);
          } else {
            reject(false);
          }
        });
      });
    }
  );