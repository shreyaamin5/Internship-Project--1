const db = require("../db");

// Get all students
const getAllStudents = (callback) => {
  const sql = "SELECT * FROM students";
  db.query(sql, callback);
};

// Add student
const addStudent = (student, callback) => {
  const sql =
    "INSERT INTO students (usn, name, email, phone, branch, semester, cgpa) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      student.usn,
      student.name,
      student.email,
      student.phone,
      student.branch,
      student.semester,
      student.cgpa,
    ],
    callback
  );
};

// Update student
const updateStudent = (id, student, callback) => {
  const sql =
    "UPDATE students SET usn=?, name=?, email=?, phone=?, branch=?, semester=?, cgpa=? WHERE id=?";

  db.query(
    sql,
    [
      student.usn,
      student.name,
      student.email,
      student.phone,
      student.branch,
      student.semester,
      student.cgpa,
      id,
    ],
    callback
  );
};

// Delete student
const deleteStudent = (id, callback) => {
  const sql = "DELETE FROM students WHERE id=?";
  db.query(sql, [id], callback);
};

module.exports = {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};