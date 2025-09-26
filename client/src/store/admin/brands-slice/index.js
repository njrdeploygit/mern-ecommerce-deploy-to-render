//send api calls after recieve client(pages) request(dispatches) and fill brandList arry
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  brandList: [],
};

//api call url : http://localhost:5000/
//base url     : api/admin/brands
//endpoint     : /add

export const addnewbrand = createAsyncThunk(
  "/brand/addnewbrand",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/brands/add`,
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

export const fetchAllBrands = createAsyncThunk(
  "/brands/fetchAllBrands",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/brands/get`
    );

    console.log(result?.data, "admin fetchAllBrands");

    return result?.data;
  }
);

export const editBrand = createAsyncThunk(
  "/brands/editBrand",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/brands/edit/${id}`,
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

export const deleteBrand = createAsyncThunk(
  "/brands/deleteBrand",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/brands/delete/${id}`
    );
  

    return result?.data;
  }
);

//builder logic  is here
const adminBrandsSlice = createSlice({
  name: "adminBrands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brandList = action.payload.data;
      })
      .addCase(fetchAllBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.brandList = []; //make empty if case rejected is true
      });
  },
});

export default adminBrandsSlice.reducer;
