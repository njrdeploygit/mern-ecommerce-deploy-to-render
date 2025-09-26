

//api controller functionality
const Brand = require("../../models/Brand");


//add a new brand
const addBrand = async (req, res) => {
  //login ..get all brands from body
  try {
    const { title, description } = req.body;

    console.log(description, "description");

    //what we receive up(body) we pass it here
    const newlyCreatedBrand = new Brand({
      title,
      description,
    });

    await newlyCreatedBrand.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedBrand,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch all brands
const fetchAllBrands = async (req, res) => {
  try {
    const listOfBrands = await Brand.find({});
    res.status(200).json({
      success: true,
      data: listOfBrands,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit a brand
const editBrand = async (req, res) => {
  try {
    //get the id of the brand
    const { id } = req.params;
    
    //from passed data -body
    const { title, description } = req.body;

    //get the brand
    let findBrand = await Brand.findById(id);
    //check if brand is present
    if (!findBrand)
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    //update the category information based on passed data
    findBrand.title = title || findBrand.title;
    findBrand.description = description || findBrand.description;

    await findBrand.save();
    res.status(200).json({
      success: true,
      data: findBrand,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete a brand
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params; //get the id from parametrs passed
    const brand = await Brand.findByIdAndDelete(id);

    if (!brand)
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
  addBrand,
  fetchAllBrands,
  editBrand,
  deleteBrand,
};
