import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios-config";

const initialState = {
  Productlist: [],
  error: " ",
  description: " "
};

export const fetchProduct = createAsyncThunk(
  "getProduct",
  async (data, thunkAPI) => {
    try {
      const result = await axios.get("products");
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.message,
      });
    }
  }
);
export const fetchDescription = createAsyncThunk(
  "getdecription",
  async ({id}, thunkAPI) => {
    try {
      const result = await axios.get(`products/${id}`);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.message,
      });
    }
  }
);


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
      state.error = actions.payload.error;
    },
    [fetchDescription.fulfilled]: (state, actions) => {
      state.description = actions.payload[0].description;
    },
    [fetchDescription.pending]: (state, actions) => {
      state = "pending";
    },
    [fetchDescription.rejected]: (state, actions) => {
      state.error = actions.payload.error;
    },
  },
});
export const {} = showSlice.actions;

export default showSlice.reducer;
