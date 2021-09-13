import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/addToCart";
import showProduct from "./reducer/showProduct";
import userReducer from "./reducer/addUser";

const store = configureStore({
  reducer: {
    Products: showProduct,
    Cart: cartReducer,
    User: userReducer,
  },
});
export default store;
