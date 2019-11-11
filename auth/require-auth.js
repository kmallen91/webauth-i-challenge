const user = require('../users/userModel');
const bcrypt = require('bcryptjs');

module.exports = (req, res, next) => {
  let { username, password } = req.headers;

  if (username && password) {
    user.findBy({ username });
    first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: `Welcome ${user.username}` });
        } else {
          res.status(401).json({ message: `Invalid Credentials` });
        }
      })
      .catch(err =>
        res.status(500).json({ error: `error getting credentials` })
      );
  } else {
    res.status(400).json({ message: `please provide credentials` });
  }
};
