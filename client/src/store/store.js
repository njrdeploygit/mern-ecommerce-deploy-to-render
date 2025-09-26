import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-slice"; // from index.js

import adminProductsSlice from "./admin/products-slice";
import adminOrderSlice from "./admin/order-slice";
import adminCategoriesSlice from "./admin/categories-slice";
import adminBrandsSlice from "./admin/brands-slice/index.js";
//  import adminUsersSlice from "./admin/users-slice";
import adminTestareaSlice from "./admin/testarea-slice";

import shopProductsSlice from "./shop/products-slice";
import shopCartSlice from "./shop/cart-slice";
import shopAddressSlice from "./shop/address-slice.js";
import shopOrderSlice from "./shop/order-slice";
import shopSearchSlice from "./shop/search-slice";
import shopReviewSlice from "./shop/review-slice";
import commonFeatureSlice from "./common-slice";

//connect forms with slices reducers with pages through reducer properies

const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts: adminProductsSlice,
    adminOrder: adminOrderSlice,
    adminCategories: adminCategoriesSlice,
    adminBrands: adminBrandsSlice,
    // adminUsers: adminUsersSlice,
    adminTestarea: adminTestareaSlice,

    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,
    commonFeature: commonFeatureSlice,
  },
});

export default store;
