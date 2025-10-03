import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  allContent: [],
};

const dashboardContent = createSlice({
  name: "content",
  initialState,
  reducers: {
    getDashboardContent:  (state, action) => {
     state.allContent=action.payload
    }
  },
});

export const { getDashboardContent } = dashboardContent.actions;
export default dashboardContent.reducer;
