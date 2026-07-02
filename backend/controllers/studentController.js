const Student = require("../models/studentModel");

// Get all students
exports.getStudents = (req, res) => {
  Student.getAllStudents((err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Error fetching students",
      });
    }

    res.json({
      success: true,
      students: result,
    });
  });
};

// Add student
exports.addStudent = (req, res) => {
  Student.addStudent(req.body, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Error adding student",
      });
    }

    res.json({
      success: true,
      message: "Student added successfully",
    });
  });
};

// Update student
exports.updateStudent = (req, res) => {
  Student.updateStudent(req.params.id, req.body, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Error updating student",
      });
    }

    res.json({
      success: true,
      message: "Student updated successfully",
    });
  });
};

// Delete student
exports.deleteStudent = (req, res) => {
  Student.deleteStudent(req.params.id, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Error deleting student",
      });
    }

    res.json({
      success: true,
      message: "Student deleted successfully",
    });
  });
};