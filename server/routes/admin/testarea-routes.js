//provide endponts to controller methods .../get    /add    /edit    /delete ...
const express = require("express");

const {
  fetchAllTestarea,
} = require("../../controllers/admin/testarea-controller");

const router = express.Router();

//create the endpoints
router.get("/get", fetchAllTestarea);

module.exports = router;
