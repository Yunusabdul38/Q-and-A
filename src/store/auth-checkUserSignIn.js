import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";

export const checkUserSignIn = createAsyncThunk(
    "auth/checkUserSignIn",
    async () => {
      return new Promise((resolve, reject)=> {
        const auth = getAuth();
        const user = auth.currentUser
        if(user){
          resolve(user)
        }
        else{
          reject(false)
        }
      });
    }
  );