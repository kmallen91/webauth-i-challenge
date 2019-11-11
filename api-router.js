const router = require('express').Router();

const authRouter = require('./auth/authRouter');
const userRouter = require('./users/userRouter');

router.use('/auth', authRouter);
router.use('/users', userRouter);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'USER DATABASE' });
});

module.exports = router;
