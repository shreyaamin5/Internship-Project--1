const db = require("../db");

// Get all drives
const getAllDrives = (callback) => {
  db.query("SELECT * FROM drives", callback);
};

// Add drive
const addDrive = (data, callback) => {
  const sql = `
    INSERT INTO drives
    (company_name, drive_title, job_role, package, eligibility_cgpa, drive_date, last_date, location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.company_name,
      data.drive_title,
      data.job_role,
      data.package,
      data.eligibility_cgpa,
      data.drive_date,
      data.last_date,
      data.location,
    ],
    callback
  );
};

// Update drive
const updateDrive = (id, data, callback) => {
  const sql = `
    UPDATE drives
    SET
      company_name=?,
      drive_title=?,
      job_role=?,
      package=?,
      eligibility_cgpa=?,
      drive_date=?,
      last_date=?,
      location=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      data.company_name,
      data.drive_title,
      data.job_role,
      data.package,
      data.eligibility_cgpa,
      data.drive_date,
      data.last_date,
      data.location,
      id,
    ],
    callback
  );
};

// Delete drive
const deleteDrive = (id, callback) => {
  db.query("DELETE FROM drives WHERE id=?", [id], callback);
};

module.exports = {
  getAllDrives,
  addDrive,
  updateDrive,
  deleteDrive,
};