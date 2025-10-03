require("dotenv").config();

const express = require("express");
// const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");

const adminCategoriesRouter = require("./routes/admin/categories-routes");
const adminBrandsRouter = require("./routes/admin/brands-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const adminTestareaRouter = require("./routes/admin/testarea-routes"); //testarea

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");

const shopReviewRouter = require("./routes/shop/review-routes"); //13:24

const commonFeatureRouter = require("./routes/common/feature-routes");

//create a database connection -> u can also
//create a separate file for this and then import/use that file here

//"mongodb+srv://nazihjr:On3wEzqFHIdIrxrF2024@cluster0.0m4ybmb.mongodb.net/"
//mongodb://nazihjr:On3wEzqFHIdIrxrF2024@ac-wg03kip-shard-00-00.0m4ybmb.mongodb.net:27017,ac-wg03kip-shard-00-01.0m4ybmb.mongodb.net:27017,ac-wg03kip-shard-00-02.0m4ybmb.mongodb.net:27017/?ssl=true&replicaSet=atlas-dhwa99-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0

//suspended
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("MongoDB connected"))
//   .catch((error) => console.log(error));

//>>>used insted of the suspended 1 above
const db = require("./config/db");
// const brand = require("./models/Brand");

const app = express();

//declare port
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
//xmpl=>   /api/auth/register  ->call registerUser  in auth-routes.js
//xmpl=>   /api/auth/login     ->call login in auth-routes.js

//create the base URLS's
app.use("/api/admin/categories", adminCategoriesRouter);
app.use("/api/admin/brands", adminBrandsRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/testarea", adminTestareaRouter); //testarea

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

//call express server
app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
