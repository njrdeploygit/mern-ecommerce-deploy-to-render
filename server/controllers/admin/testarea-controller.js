//api controller functionality
const Category = require("../../models/Category");


//fetch all categories
const fetchAllTestarea = async (req, res) => {
  try {
    const listOfTestarea = await Category.find({});
    res.status(200).json({
      success: true,
      data: listOfTestarea,
    });
    console.log(listOfTestarea,"listOfTestarea");
    
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  fetchAllTestarea,
};
