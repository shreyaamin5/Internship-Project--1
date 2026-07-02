const Drive = require("../models/driveModel");

// Get all drives
const getDrives = (req, res) => {
  Drive.getAllDrives((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.json({
      success: true,
      drives: results,
    });
  });
};

// Add drive
const addDrive = (req, res) => {
  Drive.addDrive(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.json({
      success: true,
      message: "Drive added successfully",
    });
  });
};

// Update drive
const updateDrive = (req, res) => {
  Drive.updateDrive(req.params.id, req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.json({
      success: true,
      message: "Drive updated successfully",
    });
  });
};

// Delete drive
const deleteDrive = (req, res) => {
  Drive.deleteDrive(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.json({
      success: true,
      message: "Drive deleted successfully",
    });
  });
};

module.exports = {
  getDrives,
  addDrive,
  updateDrive,
  deleteDrive,
};