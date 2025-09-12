const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
  },
  { timestamps: true }
);

//module.exports = mongoose.model("Product", ProductSchema);

//to avoide recreate model add (mongoose.models.Product || )
module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
