import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios-config";

const initialState = {
  userList: [],
  isLoggedIn: false,
  isRegister: false,
  error: " ",
};

export const addUser = createAsyncThunk(
  "AddUserToDb",
  async (body, thunkApi) => {
    try {
      const response = await axios.post("register", body);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue({
          error: error.response.data,
        });
      } else {
        return thunkApi.rejectWithValue({
          error: error.message,
        });
      }
    }
  }
);
export const loginUser = createAsyncThunk(
  "loginUser",
  async (body, thunkApi) => {
    try {
      const response = await axios.post("login", body);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue({
          error: error.response.data,
        });
      } else {
        return thunkApi.rejectWithValue({
          error: error.message,
        });
      }
    }
  }
);

export const userSlice = createSlice({
  name: "addUser",
  initialState,
  reducers: {},
  extraReducers: {
    [addUser.fulfilled]: (state, actions) => {
      state.isRegister = true;
    },
    [addUser.pending]: (state, actions) => {
      console.log("pending");
    },
    [addUser.rejected]: (state, actions) => {
      state.error = actions.payload.error;
    },
    [loginUser.fulfilled]: (state, actions) => {
      state.userList = actions.payload;
      console.log("fulfilled");
      state.isLoggedIn = true;
    },
    [loginUser.pending]: (state, actions) => {
      console.log("pending");
    },
    [loginUser.rejected]: (state, actions) => {
      state.error = actions.payload.error;
    },
  },
});

export default userSlice.reducer;
