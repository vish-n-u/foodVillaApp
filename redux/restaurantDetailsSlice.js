import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
  name: "restaurantSlice",
  initialState: {},
  reducers: {
    addData: (state, action) => {
      // console.log("addData--", action.payload?.data?.id);
      if (!state?.[action.payload?.data?.id])
        state[action.payload.data.id] = action.payload.data;
    },
  },
});

export const { addData } = restaurantSlice.actions;
export default restaurantSlice.reducer;
