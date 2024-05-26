import toast from "react-hot-toast";
import { updatedUserData } from "../services/updateUserData";
import { checkUserSignIn } from "./auth-checkUserSignIn";
import { createSlice } from "@reduxjs/toolkit";


const initialUserState = {
    user: null,
    loading: true,
    updatedUserImage: null,
  };
//slice for checking if user has been sign in before on the browser and has not log out by him/her self
const authUserSlice = createSlice({
    name: "auth",
    initialState: initialUserState,
    reducers: {
      logUserOut: (state) => {
        state.user = null;
      },
      updatePhoto: (state, action) => {
        state.updatedUserImage = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(checkUserSignIn.pending, (state) => {
        state.loading = true;
      }),
        builder.addCase(checkUserSignIn.fulfilled, (state, action) => {
          state.user = action.payload;
          state.loading = false;
        }),
        builder.addCase(checkUserSignIn.rejected, (state) => {
          state.loading = false;
        }),
        builder.addCase(updatedUserData.pending, (state) => {
          state.loading = true;
        }),
        builder.addCase(updatedUserData.fulfilled, (state) => {
          state.loading = false;
          state.updatedUserImage =null
        }),
        builder.addCase(updatedUserData.rejected, (state) => {
          state.loading = false;
          toast.error(
            "We're having trouble finding what you're looking for. Try refreshing the page or searching with different keywords."
          );
        }),
        // this will always run regardless of the promise return state
        // it work like finally in a promise
        builder.addMatcher(checkUserSignIn.settled, (state) => {
          state.loading = false;
        });
      builder.addMatcher(updatedUserData.settled, (state) => {
        state.loading = false;
      });
    },
  });  

export const userReducer = authUserSlice.reducer;  
export const { updatePhoto, logUserOut } = authUserSlice.actions;