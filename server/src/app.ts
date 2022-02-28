import "reflect-metadata";

import express from "express";

import cookieParser from "cookie-parser";
import session, { SessionOptions } from "express-session";
import logger from "morgan";

import createStore from "connect-pg-simple";
import dbg from "debug";
import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";

import { initialisePassport } from "./auth";
import { getSecretKey } from "./env";

import postgraphile from "./middleware/graphile";

import usersRouter from "./routes/users";
import sessionRouter from "./routes/session";

const debug = dbg("felixarts:server");

// Define pool of database connections for session store to choose from
const sessionPool = new Pool({
  host: "localhost",
  port: 5432,
  database: "atlas",
  user: "server",
  password: "6F&8YIuJCVRM",
  max: 2,
});

// Create session storage using `connect-pg-simple`
const SessionStore = createStore(session);
const sessionStore = new SessionStore({
  pool: sessionPool,
  schemaName: "private",
  tableName: "user_sessions",
  createTableIfMissing: true,
});

// Configure `express-session` with session store
const sessionConfig: SessionOptions = {
  store: sessionStore,
  secret: getSecretKey(),
  resave: false,
  saveUninitialized: true,
  name: "felixarts.sid",
  cookie: {
    path: "/",
    httpOnly: true,
    secure: false,
  },
  genid: () => uuidv4(),
};

// Initialise express app
const app = express();

app.use(logger("dev")); // `morgan` logging middleware
app.use(express.json()); // parse json body content
app.use(express.urlencoded({ extended: false })); // parse url encoded parameters and queries
app.use(cookieParser()); // parse cookies sent with request
app.use(session(sessionConfig)); // use `express-session` server-side session storage middleware
app.use(postgraphile());

const passport = initialisePassport();
app.use(passport.initialize());
app.use(passport.authenticate("session"));

app.use("/users", usersRouter);
app.use("/session", sessionRouter);

export default app;
