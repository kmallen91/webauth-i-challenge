const express = require('express');
const users = require('./users/userModel.js');
const requiresAuth = require('../auth/require-auth');

const router = express.Router();

router.get('/', requiresAuth, (req, res) => {
  users
    .find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ message: `error getting users` }));
});

router.post('/', (req, res) => {});

module.exports = router;
