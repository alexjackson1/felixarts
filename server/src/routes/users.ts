import express, { RequestHandler } from "express";
import {
  createUser,
  findUserById,
  listAllUsers,
  removeUserById,
  WithPassword,
} from "../db/users";
import { UserData } from "../types";

import {
  validateCreateUser,
  validateFindUserById,
  validateListAllUsers,
  validateRemoveUser,
} from "../validation/users";

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

router.get("/", ...validateListAllUsers(), async function (_req, res) {
  try {
    const users = await listAllUsers();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json(handleError(e));
  } finally {
    res.send();
  }
});

router.post("/", ...validateCreateUser(), async function (req, res) {
  const data: Omit<WithPassword<UserData>, "id" | "authors"> = {
    full_name: req.body.full_name,
    display_name: req.body.display_name,
    verified: req.body.verified,
    auth_role: req.body.auth_role,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const user = await createUser(data);
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(handleError(e));
  } finally {
    res.send();
  }
});

router.get("/:id", ...validateFindUserById(), async function (req, res) {
  const { id } = req.params;
  try {
    const user = await findUserById(id);
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(handleError(e));
  } finally {
    res.send();
  }
});
router.delete("/:id", ...validateRemoveUser(), async function (req, res) {
  const { id } = req.params;
  try {
    await removeUserById(id);
    res.status(200);
  } catch (e) {
    res.status(500).json(handleError(e));
  } finally {
    res.send();
  }
});

export default router;
