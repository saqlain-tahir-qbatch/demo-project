import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios-config";

const initialState = {
  Productlist: [],
};

export const fetchProduct = createAsyncThunk("getProduct", async () => {
  const result = await axios.get("products");
  return result.data;
});

export const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProduct.fulfilled]: (state, actions) => {
      state.Productlist = actions.payload;
    },
    [fetchProduct.pending]: (state, actions) => {
      state = "pending";
    },
    [fetchProduct.rejected]: (state, actions) => {
      state = "Try Again";
    },
  },
});
export const { show } = showSlice.actions;

export default showSlice.reducer;
