import { RequestHandler } from "express";
import { body, param } from "express-validator";

export function validateListAllAuthors(): RequestHandler[] {
  return [];
}

export function validateCreateAuthor(): RequestHandler[] {
  return [
    body("name", "Author payload must contain a name").exists({
      checkFalsy: true,
      checkNull: true,
    }),
    body("user_id", "User payload must contain a valid user id").isUUID(),
    body("pseudonym").toBoolean().isBoolean().default(true),
  ];
}

export function validateUpdateAuthorById(): RequestHandler[] {
  return [
    body("id", "Author payload must contain an id to update").isUUID(),
    body("pseudonym", "Pseudonym, if provided, must be a boolean value")
      .optional()
      .toBoolean()
      .isBoolean(),
  ];
}

export function validateFindAuthorById(): RequestHandler[] {
  return [param("id", "id must be a valid uuid").isUUID()];
}

export function validateRemoveAuthorById(): RequestHandler[] {
  return [body("id", "id must a valid uuid").isUUID()];
}
