import { Store, configureStore } from "@reduxjs/toolkit";
import restaurantDetailsSlice from "./restaurantDetailsSlice";

import cartSlice from "./cartSlice";
import menuSlice from "./menuSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    restaurantDetails: restaurantDetailsSlice,
    menuDetails: menuSlice,
  },
});

export default store;
