//send api calls after recieve client(pages) request(dispatches) and fill categoryList arry
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  categoryList: [],
};

//api call url : http://localhost:5000/
//base url     : api/admin/categories
//endpoint     : /add

export const addnewcategory = createAsyncThunk(
  "/category/addnewcategory",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/categories/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const fetchAllCategories = createAsyncThunk(
  "/categories/fetchAllCategories",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/Categories/get`
    );

    console.log(result?.data, "admin fetchAllCategories");

    return result?.data;
  }
);

export const editCategory = createAsyncThunk(
  "/categories/editCategory",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/categories/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "/categories/deleteCategory",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/categories/delete/${id}`
    );
  

    return result?.data;
  }
);

//builder logic  is here
const adminCategoriesSlice = createSlice({
  name: "adminCategories",
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
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.categoryList = []; //make empty if case rejected is true
      });
  },
});

export default adminCategoriesSlice.reducer;
