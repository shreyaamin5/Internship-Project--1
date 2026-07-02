const dashboardModel = require("../models/dashboardModel");

const getDashboardCounts = (req, res) => {
  dashboardModel.getCounts((err, data) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching dashboard counts",
      });
    }

    res.json({
      success: true,
      counts: data,
    });
  });
};

module.exports = {
  getDashboardCounts,
};