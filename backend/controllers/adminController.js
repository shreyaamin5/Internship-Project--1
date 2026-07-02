const { loginAdmin } = require("../models/adminModel");

const login = (req, res) => {
  const { email, password } = req.body;

  loginAdmin(email, password, (err, result) => {
    console.log("email",email);
    console.log("password",password);
    console.log("result",result);

    if (err) {
      return res.status(500).json({ message: "Server Error" });
    }

    if (result.length > 0) {
      res.json({
        success: true,
        user: result[0]
      });
    } else {
      res.json({
        success: false,
        message: "Invalid Email or Password"
      });
    }
  });
};

module.exports = { login };