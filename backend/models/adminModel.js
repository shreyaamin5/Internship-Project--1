const db = require("../db");

const loginAdmin = (email, password, callback) => {
  const sql = "SELECT * FROM admins WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = { loginAdmin };