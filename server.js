const express = require("express");
const session = require("express-session");

const apiRouter = require("./api-router");
const configureMiddleware = require("./configure-middleware");
const KnexSessionStorage = require("connect-session-knex")(session);
const knexConnection = require("./data/dbConfig");

const server = express();

const sessionConfiguration = {
  name: "database",
  secret: process.env.COOKIE_SECRET || "stored secret",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: process.env.NODE_ENV === "development" ? false : true,
    httpOnly: true
  },
  resave: false,
  saveUnitialized: true,
  store: new KnexSessionStorage({
    knex: knexConnection,
    clearInterval: 1000 * 60 * 60 * 30,
    tablename: "user_sessions",
    sidfieldname: "id",
    createtable: true
  })
};

configureMiddleware(server);
server.use(session(sessionConfiguration));
server.use("/api", apiRouter);

module.exports = server;
