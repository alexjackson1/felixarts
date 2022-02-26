import express from "express";
import dbg from "debug";

const debug = dbg("felixarts:server:index");

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  debug("Processing GET '/' request");
  res.send("Express");
});

export default router;
