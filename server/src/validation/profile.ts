import { RequestHandler } from "express";
import { param } from "express-validator";

export function validateFindProfileById(): RequestHandler[] {
  return [param("id", "id must be a valid uuid").isUUID()];
}
