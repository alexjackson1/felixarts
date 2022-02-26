import express from "express";
import passport from "passport";
import dbg from "debug";

import {
  createUser,
  findUserById,
  listAllUsers,
  removeUserById,
  updateUserById,
  WithPassword,
} from "../db/users";

import {
  validateCreateUser,
  validateFindUserById,
  validateListAllUsers,
  validateRemoveUser,
  validateUpdateUserById,
} from "../validation/users";

import { adminOnly } from "../auth";
import { AuthRole, UserData, WithId } from "../types";

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

router.get(
  "/",
  ...validateListAllUsers(),
  passport.authenticate("session"),
  adminOnly,
  async function (_req, res) {
    debug("Processing request to list all users after validation");
    try {
      const users = await listAllUsers();
      debug("Successfully retrieved all users, count: %d", users.length);
      res.status(200).json(users);
    } catch (e) {
      debug("An error occurred whilst retrieving all users");
      res.status(500).json(handleError(e));
    } finally {
      res.send();
    }
  }
);

router.post("/", ...validateCreateUser(), async function (req, res) {
  debug("Processing request to create new user after validation");

  const data: Omit<WithPassword<UserData>, "id"> = {
    full_name: req.body.full_name,
    display_name: req.body.display_name,
    verified: req.body.verified,
    auth_role: req.body.auth_role,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const user = await createUser(data);
    debug("Successfully created new user: %o", user);
    res.status(200).json(user);
  } catch (e) {
    debug("An error occurred whilst creating user");
    res.status(500).json(handleError(e));
  } finally {
    res.send();
  }
});

router.get(
  "/:id",
  ...validateFindUserById(),
  passport.authenticate("session"),
  async function (req, res) {
    const { id } = req.params;
    debug("Processing request to find user by id '%s'", id);

    if (req.user?.auth_role !== AuthRole.Administrator && id !== req.user?.id) {
      return res.sendStatus(401);
    }

    try {
      const user = await findUserById(id);
      debug("Successfully found user: %o", user);
      res.status(200).json(user);
    } catch (e) {
      debug("An error occurred whilst finding user");
      res.status(500).json(handleError(e));
    } finally {
      res.send();
    }
  }
);

router.post(
  "/:id",
  ...validateUpdateUserById(),
  passport.authenticate("session"),
  async function (req, res) {
    const { id } = req.params;
    debug(
      "Processing request to update user by id '%s' with data: %o",
      id,
      req.body
    );

    if (req.user?.auth_role !== AuthRole.Administrator && id !== req.user?.id) {
      return res.sendStatus(401);
    }

    const data: WithId<Partial<UserData>> = {
      id,
      full_name: req.body.full_name || undefined,
      display_name: req.body.display_name || undefined,
      verified: req.body.verified || undefined,
      auth_role: req.body.auth_role || undefined,
      email: req.body.email || undefined,
    };

    try {
      const user = await updateUserById(data);
      debug("Successfully updated user: %o", user);
      res.status(200).json(user);
    } catch (e) {
      debug("An error occurred whilst updating user");
      res.status(500).json(handleError(e));
    } finally {
      res.send();
    }
  }
);

router.delete("/:id", ...validateRemoveUser(), async function (req, res) {
  const { id } = req.params;
  debug("Processing request to remove user by id '%s'", id);

  if (req.user?.auth_role !== AuthRole.Administrator && id !== req.user?.id) {
    return res.sendStatus(401);
  }

  try {
    await removeUserById(id);
    debug("Successfully removed user");
    res.status(200);
  } catch (e) {
    debug("An error occurred whilst removing user");
    res.status(500).json(handleError(e));
  } finally {
    res.send();
  }
});

export default router;
