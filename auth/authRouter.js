const bcrypt = require('bcryptjs');
const router = require('express').Router();

const users = require('../users/userModel');

router.post('/register', (req, res) => {
  const credentials = req.body;
  bcrypt.hash(credentials.password, 12, (err, hashedPassword) => {
    credentials.password = hashedPassword;
  });

  users
    .add(credentials)
    .then(user => res.status(201).json(user))
    .catch(err => {
      console.log('error adding user', err);
      res.status(500).json({ error: `error adding user` });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  users
    .findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: `Invalid Credentials` });
      }
    })
    .catch(err => {
      console.log('login error', err);
      res.status(500).json({ error: `error logging in` });
    });
});

module.exports = router;
