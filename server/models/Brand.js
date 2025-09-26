

//create the model

const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    title: { type: String, default: "", require },
    description: { type: String, default: "", require },
    // createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Brand", BrandSchema);
