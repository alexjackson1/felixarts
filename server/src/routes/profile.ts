import express from "express";
import passport from "passport";
import dbg from "debug";

import { validateFindProfileById } from "../validation/profile";
import { onlyEditorial } from "../middleware/auth";
import { findProfileById } from "../db/profile";

const debug = dbg("felixarts:server:users");

const router = express.Router();

interface ErrorResponse {
  code: number;
  message: string;
}

function handleError(error: unknown): ErrorResponse {
  if (error instanceof Error) {
    return { code: 500, message: error.message };
  }

  return { code: 500, message: "An unknown error occurred" };
}

// router.get(
//   "/",
//   ...validateListAllUsers(),
//   passport.authenticate("session"),
//   adminOnly,
//   async function (_req, res) {
//     debug("Processing request to list all users after validation");
//     try {
//       const users = await listAllUsers();
//       debug("Successfully retrieved all users, count: %d", users.length);
//       res.status(200).json(users);
//     } catch (e) {
//       debug("An error occurred whilst retrieving all users");
//       res.status(500).json(handleError(e));
//     } finally {
//       res.send();
//     }
//   }
// );

router.get(
  "/:id",
  ...validateFindProfileById(),
  passport.authenticate("session"),
  onlyEditorial,
  async function (req, res) {
    const { id } = req.params;
    debug("Processing request to find profile by user id '%s'", id);

    try {
      const profile = await findProfileById(id);
      debug("Successfully found profile: %o", profile);
      res.status(200).json(profile);
    } catch (e) {
      debug("An error occurred whilst finding profile");
      res.status(500).json(handleError(e));
    } finally {
      res.send();
    }
  }
);

export default router;
