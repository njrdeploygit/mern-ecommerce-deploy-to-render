//api controller functionality
const Category = require("../../models/Category");


//add a new category
const addCategory = async (req, res) => {
  //login ..get all properties from body
  try {
    const { title, description } = req.body;

    console.log(description, "description");

    //what we receive up we pass it here
    const newlyCreatedCategory = new Category({
      title,
      description,
    });

    await newlyCreatedCategory.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedCategory,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch all categories
const fetchAllCategories = async (req, res) => {
  try {
    const listOfCategories = await Category.find({});
    res.status(200).json({
      success: true,
      data: listOfCategories,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit a category
const editCategory = async (req, res) => {
  try {
    //get he id of the category
    const { id } = req.params;
    //passed data
    const { title, description } = req.body;
    //get the category
    let findCategory = await Category.findById(id);
    //check if category is present
    if (!findCategory)
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    //update the category information based on passed data
    findCategory.title = title || findCategory.title;
    findCategory.description = description || findCategory.description;

    await findCategory.save();
    res.status(200).json({
      success: true,
      data: findCategory,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete a category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params; //get the id from parametrs passed
    const category = await Category.findByIdAndDelete(id);

    if (!category)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  addCategory,
  fetchAllCategories,
  editCategory,
  deleteCategory,
};
