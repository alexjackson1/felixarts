import { RequestHandler } from "express";
import { body, cookie } from "express-validator";

export function validateNewSession(): RequestHandler[] {
  return [body("email").isEmail(), body("password").isLength({ min: 5 })];
}

export function validateValidateSession(): RequestHandler[] {
  return [cookie("felart_session_id").isUUID()];
}
