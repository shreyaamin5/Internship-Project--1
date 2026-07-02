const db = require("../db");

const getCounts = (callback) => {
  const query = `
    SELECT
      (SELECT COUNT(*) FROM students) AS students,
      (SELECT COUNT(*) FROM companies) AS companies,
      (SELECT COUNT(*) FROM drives) AS drives
  `;

  db.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result[0]);
    }
  });
};

module.exports = {
  getCounts,
};