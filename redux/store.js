import { Store, configureStore } from "@reduxjs/toolkit";
import restaurantDetailsSlice from "./restaurantDetailsSlice";
import userNameSlice from "./userNameSlice";
import cartSlice from "./cartSlice";
import menuSlice from "./menuSlice";
import allMenuSlice from "./allMenuSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    restaurantDetails: restaurantDetailsSlice,
    menuDetails: menuSlice,
    userName: userNameSlice,
    allMenu: allMenuSlice,
  },
});

export default store;
