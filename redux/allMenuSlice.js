import { createSlice } from "@reduxjs/toolkit";

const allMenuSlice = createSlice({
  name: "allMenu",
  initialState: JSON.parse(sessionStorage.getItem("allMenu")),
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
