const users = require("../users/userModel");
const bcrypt = require("bcryptjs");

module.exports = (req, res, next) => {
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(400).json({ error: "please allow cookies to retrieve users" });
  }
};
