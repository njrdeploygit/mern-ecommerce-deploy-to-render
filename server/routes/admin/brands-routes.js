const express = require("express");

const {
addBrand,
fetchAllBrands,
editBrand,
deleteBrand
}=require("../../controllers/admin/brands-controller")

const router = express.Router();

//create the endpoints for each controller methods- routes
router.post("/add", addBrand);
router.put("/edit/:id", editBrand);
router.delete("/delete/:id", deleteBrand);
router.get("/get", fetchAllBrands);

module.exports = router;