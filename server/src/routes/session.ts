import express from "express";
import dbg from "debug";
import passport from "passport";
import {
  validateNewSession,
  validateValidateSession,
} from "../validation/session";

const debug = dbg("felixarts:server:session");

const router = express.Router();

router.post(
  "/",
  ...validateNewSession(),
  passport.authenticate("local"),
  function (req, res) {
    debug("User %o", req.user);
    res.json(req.user).send();
  }
);

router.delete("/", function (req, res) {
  debug("Processing logout request, user: %o", req.user);
  req.logout();
  res.sendStatus(200);
});

router.post(
  "/validate",
  ...validateValidateSession(),
  passport.authenticate("session"),
  function (req, res) {
    debug("Processing session validation request, user: %o", req.user);
    res.status(200).json(req.user).send();
  }
);

export default router;
