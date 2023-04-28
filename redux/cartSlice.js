import { createSlice, current } from "@reduxjs/toolkit";
import allMenu from "../swiggyMenusApi";
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
      if (action.payload.deleteCurrItems) {
        state.items = {};
        localStorage.removeItem("cartItems");
      }
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
      let obj = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : {};
      obj[action.payload.rs.id] = {
        itemsQuantityInCart:
          state.items[action.payload.id][action.payload.rs.id]
            .itemsQuantityInCart,
      };
      if (!obj.restaurantId) obj.restaurantId = action.payload.id;
      localStorage.setItem("cartItems", JSON.stringify(obj));
    },
    addDataFromLocalStorage: (state, action) => {
      state[action.payload.restaurantId] = {};
      for (let x = 0; x < Object.keys(action.payload).length; x++) {}
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
        let obj = JSON.parse(localStorage.getItem("cartItems"));
        obj[action.payload.rs.id] = {
          itemsQuantityInCart:
            state.items[action.payload.id][action.payload.rs.id]
              .itemsQuantityInCart,
        };
        localStorage.setItem("cartItems", JSON.stringify(obj));
      } else {
        delete state.items[action.payload.id][action.payload.rs.id];
        let obj = JSON.parse(localStorage.getItem("cartItems"));
        delete obj[action.payload.rs.id];
        localStorage.setItem("cartItems", JSON.stringify(obj));
        if (Object.keys(state.items[action.payload.id]).length < 1) {
          state.items = {};
          localStorage.removeItem("cartItems");
          console.log("`````~~~~", action.payload);
        }
      }
    },
    reOrder: (state, action) => {
      state.items = action.payload;
    },
    clearCart: (state) => {
      state.items = {};
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addItem, removeItem, clearCart, reOrder } = cartSlice.actions;
export default cartSlice.reducer;
