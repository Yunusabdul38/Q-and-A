import toast from "react-hot-toast";
import { fetchLeadBord } from "../services/fetchData";
import { updateLeadTable } from "../services/updateUserData";
import { createSlice } from "@reduxjs/toolkit";

const initialLeadboard = {
    leadbord: [],
    loadingLeads: false,
  };

// leadboard slice main purpose is to fetch table data
const leadersBoard = createSlice({
    name: "leadBorad",
    initialState: initialLeadboard,
    extraReducers: (builder) => {
      builder.addCase(fetchLeadBord.pending, (state) => {
        state.loadingLeads = true;
      }),
        builder.addCase(fetchLeadBord.fulfilled, (state, action) => {
          state.leadbord = action.payload;
          state.loadingLeads = false;
        }),
        builder.addCase(fetchLeadBord.rejected, (state) => {
          state.loadingLeads = false;
          toast.error(
            "We're having trouble finding what you're looking for. Try refreshing the page or searching with different keywords."
          );
        }),
        builder.addCase(updateLeadTable.pending, (state) => {
          state.loadingLeads = true;
        }),
        builder.addCase(updateLeadTable.fulfilled, (state) => {
          state.loadingLeads = false;
        }),
        builder.addCase(updateLeadTable.rejected, (state) => {
          state.loadingLeads = false;
          toast.error(
            "We're having trouble finding what you're looking for. Try refreshing the page or searching with different keywords."
          );
        }),
        // this will always run regardless of the promise return state
        // it work like finally in a promise
        builder.addMatcher(fetchLeadBord.settled, (state) => {
          state.loadingLeads = false;
        });
      builder.addMatcher(updateLeadTable.settled, (state) => {
        state.loadingLeads = false;
      });
    },
  });
  
export const leadsReducers = leadersBoard.reducer;