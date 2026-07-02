const express = require("express");
const router = express.Router();

const {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

// Get all companies
router.get("/", getCompanies);

// Add company
router.post("/add", addCompany);

// Update company
router.put("/update/:id", updateCompany);

// Delete company
router.delete("/delete/:id", deleteCompany);

module.exports = router;