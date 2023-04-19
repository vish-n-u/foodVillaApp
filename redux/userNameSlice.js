import { createSlice } from "@reduxjs/toolkit";

const usernameSlice = createSlice({
  name: "userNameSlice",
  initialState: "",
  reducers: {
    updateName: (state, action) => {
      console.log("action.payload", action.payload);
      return action.payload;
    },
    deleteName: (state, action) => {
      return "";
    },
  },
});

export const { updateName, deleteName } = usernameSlice.actions;
export default usernameSlice.reducer;
