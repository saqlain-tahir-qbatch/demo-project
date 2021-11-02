import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios-config";

const initialState = {
  Productlist: [],
  error: " ",
  description: " ",
  filters: [],
  loading: false,
  pagination:{
    pageNumber:0,
    rowsPerPage:5
  },
  productsCount:0
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
    const {filters} = getState().Products;
    const{pageNumber, rowsPerPage} = getState().Products.pagination;
    try {
      const result = await axios.get("inventory", {
        params: {
          filters: JSON.stringify(filters),
          limit : rowsPerPage || 5,
          skip: (pageNumber) * (rowsPerPage || 5 )
        }
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
      const result = await axios.patch(`inventory/${id}`, {value});
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.message,
      });
    }
  }
);

export const showSlice = createSlice({
  name: "inventory",
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
    },
    setPagination(state, actions) {
      return{
      ...state,
      pagination: actions.payload
      } 
    }
  },
  extraReducers: {
    [fetchProduct.fulfilled]: (state, actions) => {
      state.Productlist = actions.payload;
    },
    [fetchProduct.pending]: (state, actions) => ({
      ...state,
      loading: true
    }),
    [fetchProduct.rejected]: (state, actions) => {
      state.error = actions.payload.error;
    },
    [fetchDescription.fulfilled]: (state, actions) => {
      state.description = actions.payload[0].description;
    },
    [fetchDescription.pending]: (state, actions) => ({
      ...state,
      loading: true
    }),
    [fetchDescription.rejected]: (state, actions) => {
      state.error = actions.payload.error;
    },
    [getProductWithFilter.fulfilled]: (state, actions) => {
      const {products, total} = actions.payload;
      state.Productlist = products;
      state.productsCount = total

    },
    [getProductWithFilter.pending]: (state, actions) => ({
      ...state,
      loading: true
    }),
    [getProductWithFilter.rejected]: (state, actions) => ({
      ...state,
      error: actions.payload.error
    }),
    [updateDescription.fulfilled]: (state, actions) => ({
      ...state,
      loading: true
    }),
    [updateDescription.pending]: (state, actions) => ({
      ...state,
      loading: true
    }),
    [updateDescription.rejected]: (state, actions) => ({
      ...state,
      error: actions.payload.error
    }),
  },
});
export const {setFilter, setPagination} = showSlice.actions;

export default showSlice.reducer;
