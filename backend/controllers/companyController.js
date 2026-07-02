const Company = require("../models/companyModel");

// Get all companies
exports.getCompanies = (req, res) => {
  Company.getAllCompanies((err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Error fetching companies",
      });
    }

    res.json({
      success: true,
      companies: result,
    });
  });
};

// Add company
exports.addCompany = (req, res) => {
  Company.addCompany(req.body, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Error adding company",
      });
    }

    res.json({
      success: true,
      message: "Company added successfully",
    });
  });
};

// Update company
exports.updateCompany = (req, res) => {
  Company.updateCompany(req.params.id, req.body, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Error updating company",
      });
    }

    res.json({
      success: true,
      message: "Company updated successfully",
    });
  });
};

// Delete company
exports.deleteCompany = (req, res) => {
  Company.deleteCompany(req.params.id, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Error deleting company",
      });
    }

    res.json({
      success: true,
      message: "Company deleted successfully",
    });
  });
};