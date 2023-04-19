import { Store, configureStore } from "@reduxjs/toolkit";
import restaurantDetailsSlice from "./restaurantDetailsSlice";
import userNameSlice from "./userNameSlice";
import cartSlice from "./cartSlice";
import menuSlice from "./menuSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    restaurantDetails: restaurantDetailsSlice,
    menuDetails: menuSlice,
    userName: userNameSlice,
  },
});

export default store;
