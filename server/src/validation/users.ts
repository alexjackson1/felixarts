import { RequestHandler } from "express";
import { body, param } from "express-validator";
import { AuthRole } from "../types";

export function validateListAllUsers(): RequestHandler[] {
  return [];
}

export function validateCreateUser(): RequestHandler[] {
  return [
    body("full_name", "User payload must contain a full name").exists({
      checkFalsy: true,
      checkNull: true,
    }),
    body("display_name", "User payload must contain a display name").exists({
      checkFalsy: true,
      checkNull: true,
    }),
    body("email", "User payload must contain a valid email address")
      .isEmail()
      .normalizeEmail(),
    body("verified").toBoolean().isBoolean().default(false),
    body("auth_role")
      .isIn([
        AuthRole.Administrator,
        AuthRole.Anonymous,
        AuthRole.Editor,
        AuthRole.Writer,
      ])
      .default(AuthRole.Anonymous),
    body("password").isStrongPassword({ minLength: 6 }),
  ];
}

export function validateUpdateUserById(): RequestHandler[] {
  return [
    body("email", "User payload must contain a valid email address")
      .optional()
      .isEmail()
      .normalizeEmail(),
    body("verified", "Verified status must be a boolean value")
      .optional()
      .toBoolean()
      .isBoolean(),
    body("auth_role")
      .optional()
      .isIn([
        AuthRole.Administrator,
        AuthRole.Anonymous,
        AuthRole.Editor,
        AuthRole.Writer,
      ]),
  ];
}

export function validateFindUserById(): RequestHandler[] {
  return [param("id", "id must be a valid uuid").isUUID()];
}

export function validateRemoveUser(): RequestHandler[] {
  return [body("id", "id must be provided and a valid uuid").isUUID()];
}
