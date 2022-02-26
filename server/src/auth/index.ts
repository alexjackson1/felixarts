import { RequestHandler } from "express";
import passport, { PassportStatic } from "passport";
import { Strategy } from "passport-local";

import { getConnection } from "typeorm";

import argon from "argon2";
import dbg from "debug";

import { findUserById } from "../db/users";
import { Account } from "../models/User";
import { AuthRole } from "../types";

const debug = dbg("felixarts:server:auth");

export const adminOnly: RequestHandler = function (req, res, next) {
  if (!req.user) return res.sendStatus(401);
  if (req.user.auth_role !== AuthRole.Administrator) return res.sendStatus(401);

  next();
};

export const LocalStrategy = new Strategy(
  { usernameField: "email" },
  async function verify(email, password, done) {
    const INVALID_CREDS = "Invalid email/password combination";

    try {
      // Try and find account with provided email address
      const accountRepository = getConnection().getRepository(Account);
      const account = await accountRepository.findOne({
        relations: ["user"],
        where: { email },
      });

      // If no account found return no error and not logged in
      if (!account) {
        return done(null, false, { message: INVALID_CREDS });
      }

      // Compare hashed password with cleartext password
      const authenticated = await argon.verify(account.hash, password);
      if (!authenticated) {
        return done(null, false, { message: INVALID_CREDS });
      }

      // Construct user instance and return successfully
      const user: Express.User = {
        id: account.user.id,
        full_name: account.user.full_name,
        display_name: account.user.display_name,
        verified: account.user.verified,
        auth_role: account.user.auth_role,
        email: account.email,
      };
      return done(null, user);
    } catch (e) {
      return done(e);
    }
  }
);

export interface SerializedUser {
  id: string;
  email: string;
}

export function initialisePassport(): PassportStatic {
  passport.use("local", LocalStrategy);

  passport.serializeUser(function (user, done) {
    const payload = { id: user.id, email: user.email };
    debug("Serializing user %o -> %o", user, payload);

    process.nextTick(function () {
      done(null, payload);
    });
  });

  passport.deserializeUser(function (user: SerializedUser, done) {
    process.nextTick(async function () {
      const userData = await findUserById(user.id);
      debug("Deserializing user %o -> %o", user, userData);
      return done(null, userData);
    });
  });

  return passport;
}
