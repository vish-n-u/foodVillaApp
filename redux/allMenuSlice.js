import { createSlice } from "@reduxjs/toolkit";
let allMenu = null
import("../swiggyMenusApi").then((module) => {
   allMenu = module.default;
  console.log(allMenu); // Now you can use it
})

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
