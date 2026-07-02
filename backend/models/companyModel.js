const db = require("../db");

// Get all companies
const getAllCompanies = (callback) => {
  const sql = "SELECT * FROM companies";
  db.query(sql, callback);
};

// Add company
const addCompany = (company, callback) => {
  const sql =
    "INSERT INTO companies (company_name, hr_name, email, phone, location, package) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      company.company_name,
      company.hr_name,
      company.email,
      company.phone,
      company.location,
      company.package,
    ],
    callback
  );
};

// Update company
const updateCompany = (id, company, callback) => {
  const sql =
    "UPDATE companies SET company_name=?, hr_name=?, email=?, phone=?, location=?, package=? WHERE id=?";

  db.query(
    sql,
    [
      company.company_name,
      company.hr_name,
      company.email,
      company.phone,
      company.location,
      company.package,
      id,
    ],
    callback
  );
};

// Delete company
const deleteCompany = (id, callback) => {
  const sql = "DELETE FROM companies WHERE id=?";
  db.query(sql, [id], callback);
};

module.exports = {
  getAllCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
};