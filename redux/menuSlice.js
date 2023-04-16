import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menuSlice",
  initialState: {
    items: {},
  },
  reducers: {
    addMenuDetails: (state, action) => {
      // console.log("-Action.Payload----", action.payload.filterData);
      state.items = {
        ...state.items,
        [action.payload.id]: action.payload.filterData,
      };
      // console.log("this is state", state.items);
    },
  },
});

export const { addMenuDetails } = menuSlice.actions;
export default menuSlice.reducer;
