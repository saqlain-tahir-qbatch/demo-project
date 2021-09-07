import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/addToCart";
import showProduct from "./reducer/showProduct";

const store = configureStore({
  reducer: {
    Products: showProduct,
    Cart: cartReducer,
  },
});
export default store;
