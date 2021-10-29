import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios-config";

const initialState = {
  Productlist: [],
  error: " ",
  description: " ",
  filters: [],
  loading: false
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
export const getProductWithFilter = createAsyncThunk(
  "getProductWithFilter",
  async (data, {getState}, thunkAPI) => {
    const {filters} = getState().Products
    try {
      const result = await axios.get("inventory", {
        params: {filters: JSON.stringify(filters)}
      });
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
  async ({ id }, thunkAPI) => {
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
export const updateDescription = createAsyncThunk(
  "updatedecription",
  async ({ id, value}, thunkAPI) => {
    try {
      console.log(id, value);
      const result = await axios.patch(`update-description/${id}`, {value});
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
  reducers: {
    setFilter(state, { payload: { field, value } }) {
      const filters = [...state.filters];
      const checkFilter = filters.findIndex(item => item.field === field);
      if(checkFilter !== -1) {
        filters[checkFilter] = { field, value };
      } else {
        filters.push({ field, value });
      }
      state["filters"] = filters;
    }
  },
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
    [getProductWithFilter.fulfilled]: (state, actions) => {
      state.Productlist = actions.payload;
    },
    [getProductWithFilter.pending]: (state, actions) => {
      state = "pending";
    },
    [getProductWithFilter.rejected]: (state, actions) => {
      state.error = actions.payload.error;
    },
    [updateDescription.fulfilled]: (state, actions) => {
      state.loading= false;
    },
    [updateDescription.pending]: (state, actions) => {
      state = "pending";
      state.loading= true;
    },
    [updateDescription.rejected]: (state, actions) => {
      state.error = actions.payload.error;
    },
  },
});
export const {setFilter} = showSlice.actions;

export default showSlice.reducer;
