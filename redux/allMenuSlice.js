import { createSlice } from "@reduxjs/toolkit";
import allMenu from "../swiggyMenusApi";

const allMenuSlice = createSlice({
  name: "allMenu",
  initialState: allMenu,
  reducers: {
    addMenuData: (state, action) => {
      console.log("JsonDatasMessage", action.payload);
      Object.keys(action.payload).map((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { addMenuData } = allMenuSlice.actions;

export default allMenuSlice.reducer;
