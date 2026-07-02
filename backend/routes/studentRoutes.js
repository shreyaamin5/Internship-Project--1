const express = require("express");
const router = express.Router();

const {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// Get all students
router.get("/", getStudents);

// Add student
router.post("/add", addStudent);

// Update student
router.put("/update/:id", updateStudent);

// Delete student
router.delete("/delete/:id", deleteStudent);

module.exports = router;