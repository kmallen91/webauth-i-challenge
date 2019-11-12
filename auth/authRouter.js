const bcrypt = require("bcryptjs");
const router = require("express").Router();

const users = require("../users/userModel");

//endpoints at /api/auth

router.post("/register", (req, res) => {
  let credentials = req.body;
  bcrypt.hash(credentials.password, 12, (err, hashedPassword) => {
    credentials.password = hashedPassword;
    console.log("error from hash", err);
  });

  users
    .add(credentials)
    .then(user => {
      req.session.username = user.username;
      res.status(201).json(user);
    })
    .catch(err => {
      console.log("error adding user", err);
      res.status(500).json({ error: `error adding user` });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  users
    .findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username;
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: `Invalid Credentials` });
      }
    })
    .catch(err => {
      console.log("login error", err);
      res.status(500).json({ error: `error logging in` });
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.status(200).json({ message: "logged out successfully" });
  } else {
    res.status(200).json({ message: "goodbye" });
  }
});

module.exports = router;
