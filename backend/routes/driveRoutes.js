const express = require("express");
const router = express.Router();

const {
  getDrives,
  addDrive,
  updateDrive,
  deleteDrive,
} = require("../controllers/driveController");

// Get all drives
router.get("/", getDrives);

// Add drive
router.post("/add", addDrive);

// Update drive
router.put("/update/:id", updateDrive);

// Delete drive
router.delete("/delete/:id", deleteDrive);

module.exports = router;