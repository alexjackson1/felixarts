import { RequestHandler } from "express";
import { AuthRole } from "../types";

export const adminOnly: RequestHandler = function (req, res, next) {
  if (!req.user) return res.sendStatus(401);
  if (req.user.auth_role !== AuthRole.Administrator) return res.sendStatus(401);

  next();
};
