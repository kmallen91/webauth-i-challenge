const express = require('express');
const userRouter = require('./users/router');
const server = express();

server.use(json());
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'USER DATABASE' });
});
