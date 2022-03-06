import express from "express";
import passport from "passport";
import dbg from "debug";

import {
  createAuthor,
  findAuthorById,
  listAllAuthors,
  removeAuthorById,
  updateAuthorById,
} from "../db/authors";

import { Author } from "../models/User";
import { adminOnly } from "../middleware/auth";

import {
  validateCreateAuthor,
  validateFindAuthorById,
  validateListAllAuthors,
  validateRemoveAuthorById,
  validateUpdateAuthorById,
} from "../validation/authors";

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
  ...validateListAllAuthors(),
  passport.authenticate("session"),
  adminOnly,
  async function (_req, res) {
    debug("Processing request to list all authors after validation");
    try {
      const authors = await listAllAuthors();
      debug("Successfully retrieved all authors, count: %d", authors.length);
      res.status(200).json(authors);
    } catch (e) {
      debug("An error occurred whilst retrieving all authors");
      res.status(500).json(handleError(e));
    } finally {
      res.send();
    }
  }
);

router.post(
  "/",
  ...validateCreateAuthor(),
  adminOnly,
  async function (req, res) {
    const user_id = req.body.user_id;
    debug("Processing request to create new author for '%s'", user_id);

    const data: Omit<Author, "id"> & { user_id: string } = {
      user_id,
      name: req.body.name,
      title: req.body.title,
      bio: req.body.bio,
      pseudonym: req.body.pseudonym,
    };

    try {
      const author = await createAuthor(data);
      debug("Successfully created new author: %o", author);
      res.status(200).json(author);
    } catch (e) {
      debug("An error occurred whilst creating author");
      res.status(500).json(handleError(e));
    } finally {
      res.send();
    }
  }
);

router.get(
  "/:id",
  ...validateFindAuthorById(),
  passport.authenticate("session"),
  adminOnly,
  async function (req, res) {
    const { id } = req.params;
    debug("Processing request to find author by id '%s'", id);

    try {
      const author = await findAuthorById(id);
      debug("Successfully found author: %o", author);
      res.status(200).json(author);
    } catch (e) {
      debug("An error occurred whilst finding author");
      res.status(500).json(handleError(e));
    } finally {
      res.send();
    }
  }
);

router.post(
  "/:id",
  ...validateUpdateAuthorById(),
  passport.authenticate("session"),
  adminOnly,
  async function (req, res) {
    const { id } = req.params;
    debug(
      "Processing request to update author by id '%s' with data: %o",
      id,
      req.body
    );

    const data: Author = {
      id,
      name: req.body.name || undefined,
      title: req.body.title || undefined,
      bio: req.body.bio || undefined,
      pseudonym: req.body.pseudonym || undefined,
    };

    try {
      const author = await updateAuthorById(data);
      debug("Successfully updated author: %o", author);
      res.status(200).json(author);
    } catch (e) {
      debug("An error occurred whilst updating user");
      res.status(500).json(handleError(e));
    } finally {
      res.send();
    }
  }
);

router.delete(
  "/:id",
  ...validateRemoveAuthorById(),
  adminOnly,
  async function (req, res) {
    const { id } = req.params;
    debug("Processing request to remove author by id '%s'", id);

    try {
      await removeAuthorById(id);
      debug("Successfully removed author");
      res.status(200).json(id);
    } catch (e) {
      debug("An error occurred whilst removing author");
      res.status(500).json(handleError(e));
    } finally {
      res.send();
    }
  }
);

export default router;
