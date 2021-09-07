import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios-config";
const initialState = {
  count: 0,
  id: 0,
  cartItem: [],
};

export const postProductToCart = createAsyncThunk(
  "postToCart",
  async (body) => {
    try {
      const response = await axios.post("cart", body);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductFromCart = createAsyncThunk("getfromCart", async () => {
  try {
    const response = await axios.get("cart");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteProductFromCart = createAsyncThunk(
  "deletefromCart",
  async (id) => {
    try {
      const response = await axios.delete(`cart/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const add_remove_quantity = createAsyncThunk(
  "add_remove_quantity",
  async (body) => {
    try {
      const response = await axios.patch(`cart/${body.id}`, {
        count: body.count,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const cartSlice = createSlice({
  name: "show",
  initialState,
  reducers: {},
  extraReducers: {
    [postProductToCart.fulfilled]: (state, actions) => {
      console.log("data added successfully");
    },
    [postProductToCart.pending]: (state, actions) => {
      console.log("pending");
    },
    [postProductToCart.rejected]: (state, actions) => {
      console.log("rejected");
    },
    [getProductFromCart.fulfilled]: (state, actions) => {
      let currentcount = 0;
      let cart = [];
      actions.payload.forEach((element) => {
        currentcount = currentcount + element.count;
        cart.push(element);
      });
      state.count = currentcount;
      state.cartItem = cart;
    },
    [getProductFromCart.pending]: (state, actions) => {
      console.log("pending");
    },
    [getProductFromCart.rejected]: (state, actions) => {
      console.log("rejected");
    },
    [deleteProductFromCart.fulfilled]: (state, actions) => {
      const newList = state.cartItem.filter(
        (elem) => elem.id !== actions.payload.id
      );
      state.cartItem = newList;
      state.count = state.count - actions.payload.count;
      console.log("data deleted successfully");
    },
    [deleteProductFromCart.pending]: (state, actions) => {
      console.log("pending");
    },
    [deleteProductFromCart.rejected]: (state, actions) => {
      console.log("rejected");
    },
    [add_remove_quantity.fulfilled]: (state, actions) => {
      console.log("data updated successfully");
    },
    [add_remove_quantity.pending]: (state, actions) => {
      console.log("pending");
    },
    [add_remove_quantity.rejected]: (state, actions) => {
      console.log("rejected");
    },
  },
});
export const {} = cartSlice.actions;

export default cartSlice.reducer;
