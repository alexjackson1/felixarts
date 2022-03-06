import { RequestHandler } from "express";
import dbg from "debug";
import { AuthRole } from "../types";

const debug = dbg("felixarts:server:auth");

export const adminOnly: RequestHandler = function (req, res, next) {
  if (!req.user) {
    debug("Admin Only: User does not appear to be authenticated");
    return res.sendStatus(401);
  }

  if (req.user.auth_role !== AuthRole.Administrator) {
    debug("Admin Only: User is not an administrator (%s)", req.user.auth_role);
    return res.sendStatus(401);
  }

  next();
};

export const onlyEditorial: RequestHandler = function (req, res, next) {
  const editorial: string[] = [AuthRole.Administrator, AuthRole.Editor];

  if (!req.user) {
    debug("Editorial User Only: User does not appear to be authenticated");
    return res.sendStatus(401);
  }

  if (!editorial.includes(req.user.auth_role)) {
    debug(
      "Editorial Only: User is not in the editorial group (%s)",
      req.user.auth_role
    );
    return res.sendStatus(401);
  }

  next();
};
