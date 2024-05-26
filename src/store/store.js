import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { playReducer } from "./playSliceStore";
import { leadsReducers } from "./leadboardSliceStore";
import { userReducer } from "./authUserSliceStore";

const rootReducer = combineReducers({
  userReducer,
  playReducer,
  leadsReducers,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //exclude serializable state check
      serializableCheck: false,
    }),
});
