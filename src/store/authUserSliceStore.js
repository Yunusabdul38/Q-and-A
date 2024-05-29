import { checkUserSignIn } from "./auth-checkUserSignIn";
import { createSlice } from "@reduxjs/toolkit";


const initialUserState = {
    user: null,
    loading: true,
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
        
        // this will always run regardless of the promise return state
        // it work like finally in a promise
        builder.addMatcher(checkUserSignIn.settled, (state) => {
          state.loading = false;
        });
    },
  });  

export const userReducer = authUserSlice.reducer;  
export const { logUserOut } = authUserSlice.actions;