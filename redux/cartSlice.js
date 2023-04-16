import { createSlice, current } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},
  },
  reducers: {
    addItem: (state, action) => {
      console.log(
        "---action.payload",
        action.payload,
        action.payload.id,
        state.items[action.payload.id]?.[action.payload.rs.id],
        action.payload.deleteCurrItems
      );
      if (action.payload.deleteCurrItems) state.items = {};
      if (state.items[action.payload.id]?.[action.payload.rs.id]) {
        state.items[action.payload.id][
          action.payload.rs.id
        ].itemsQuantityInCart =
          state.items[action.payload.id][action.payload.rs.id]
            .itemsQuantityInCart + 1;
      } else {
        if (!state.items[action.payload.id]) {
          state.items[action.payload.id] = {};
        }
        console.log(state.items[action.payload.id][action.payload.rs.id]);
        state.items[action.payload.id][action.payload.rs.id] = {
          ...action.payload.rs,
          itemsQuantityInCart: 1,
        };
      }
    },
    removeItem: (state, action) => {
      if (
        state.items[action.payload.id][action.payload.rs.id]
          .itemsQuantityInCart > 1
      ) {
        state.items[action.payload.id][
          action.payload.rs.id
        ].itemsQuantityInCart =
          state.items[action.payload.id][action.payload.rs.id]
            .itemsQuantityInCart - 1;
      } else {
        delete state.items[action.payload.id][action.payload.rs.id];
        if (Object.keys(state.items[action.payload.id]).length < 1)
          state.items = {};
        console.log("`````~~~~", action.payload);
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
