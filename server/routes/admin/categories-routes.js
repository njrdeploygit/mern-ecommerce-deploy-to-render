const express = require("express");

const {
addCategory,
fetchAllCategories,
editCategory,
deleteCategory
}=require("../../controllers/admin/categories-controller")

const router = express.Router();

//create the endpoints
router.post("/add", addCategory);
router.put("/edit/:id", editCategory);
router.delete("/delete/:id", deleteCategory);
router.get("/get", fetchAllCategories);

module.exports = router;