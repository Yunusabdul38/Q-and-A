import {
  combineReducers,
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";
import { checkUserSignIn } from "./auth-checkUserSignIn";

const initialUserState = {
  user: null,
  loading: true,
};

//slice for checking if user has been sign in before on the browser and has not log out by him/her self
const authUserSlice = createSlice({
  name: "auth",
  initialState: initialUserState,
  extraReducers:(builder)=>{
    builder.addCase(checkUserSignIn.pending,(state)=>{
        state.loading = true
    }),
    builder.addCase(checkUserSignIn.fulfilled,(state,action)=>{
        state.user = action.payload
        state.loading = false
    }),
    builder.addCase(checkUserSignIn.rejected,(state)=>{
        state.loading = false
    }),
    // this will always run regardless of the promise return state
    // it work like finally in a promise
    builder.addMatcher(checkUserSignIn.settled,(state)=>{
        state.loading = false
    })  
  }
});
const userReducer = authUserSlice.reducer;
const rootReducer = combineReducers({ userReducer });
export const store = configureStore({ reducer: rootReducer,middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    //exclude serializable state check
    serializableCheck:false
}) });