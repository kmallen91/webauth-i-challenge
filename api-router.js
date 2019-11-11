const router = require('express').Router();
const bcrypt = require('bcryptjs');

const authRouter = require('./auth/authRouter');
const userRouter = require('./users/userRouter');

router.use('/auth', authRouter);
router.use('/users', userRouter);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'USER DATABASE' });
});

router.post('/hash', (req, res) => {
  const password = req.body.password;
  const hash = bcrypt.hashSync(password, 12);
  res.status(200).json({ password, hash });
});

module.exports = router;
