import dbg from "debug";

import { normalisePort } from "./utils";

const debug = dbg("felixarts:server:env");

export function getNodeEnv() {
  return process.env.NODE_ENV;
}

export function isDevelopment() {
  return getNodeEnv() == "development";
}

export function debugEnvironment() {
  debug("NODE_ENV=%s", getNodeEnv());
  debug("PORT=%d", getExpressPort());

  debug("DB_HOST=%s", getDBHost());
  debug("DB_PORT=%d", getDBPort());
  debug("DB_USER=%s", getDBUser());
  debug("DB_PASSWORD=%s", getDBPass());
  debug("DB_NAME=%s", getDBName());

  debug("JWT_SECRET=%s", getSecretKey());

  debug("DB_CONNECTION_STRING=%s", getDBConnectionString());
}

export function getSecretKey(): string {
  return process.env.JWT_SECRET || "keyboard cat";
}

export function getExpressPort(): number {
  return normalisePort(process.env.PORT) || 3000;
}

export function getDBHost(): string {
  return process.env.DB_HOST || "db";
}

export function getDBPort(): number {
  return normalisePort(process.env.DB_PORT) || 5432;
}

export function getDBUser(): string {
  return process.env.DB_USER || "server";
}

export function getDBPass(): string | undefined {
  return process.env.DB_PASSWORD;
}

export function getDBOwner(): string | undefined {
  return process.env.DB_OWNER_USER;
}

export function getDBOwnerPass(): string | undefined {
  return process.env.DB_OWNER_PASSWORD;
}

export function getDBName(): string {
  return process.env.DB_NAME || "atlas";
}

export function getDBConnectionString(): string {
  const user = getDBUser();
  const pass = getDBPass();
  const cred = pass ? `${user}:${pass}` : user;

  const host = getDBHost();
  const port = getDBPort();
  const name = getDBName();

  return `postgres://${cred}@${host}:${port}/${name}`;
}

export function getDBOwnerConnectionString(): string {
  const owner = getDBOwner();
  if (!owner) return getDBConnectionString();

  const pass = getDBOwnerPass();
  const cred = pass ? `${owner}:${pass}` : owner;

  const host = getDBHost();
  const port = getDBPort();
  const name = getDBName();

  return `postgres://${cred}@${host}:${port}/${name}`;
}
