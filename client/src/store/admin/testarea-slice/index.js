//create slice for api calls urls add-edit-delete-fetch

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  categoryList: [],
};

//api call url : http://localhost:5000/
//base url     : api/admin/categories
//endpoint     : /add

export const fetchAllCategories = createAsyncThunk(
  "/testarea/fetchAllTestarea",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/testarea/get`
    );

    console.log(result?.data, "admin fetchAllTestarea");

    return result?.data;
  }
);

//builder logic  is here
const AdminTestareaSlice = createSlice({
  name: "adminTestarea",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload.data;
        //  console.log(categoryList,"categoryList SLICE")
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.categoryList = []; //make empty if case rejected is true
      });
  },
});

export default AdminTestareaSlice.reducer;
