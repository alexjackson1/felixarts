import { createConnection } from "typeorm";
import { getDBConnectionString } from "../env";
import { Account, Author, User } from "../models/User";

export interface SysException extends Error {
  errno: number;
  code: string;
  stack?: string;
}

function isSysException(err: unknown | SysException): err is SysException {
  if (!(err instanceof Error)) return false;
  if (!("errno" in (err as SysException))) return false;
  if (!("code" in (err as SysException))) return false;
  return true;
}

function handleSysException(err: SysException): never {
  switch (err.code) {
    case "ECONNREFUSED":
      console.error("Could not connect to database host");
      console.error("Database connection string:", getDBConnectionString());
      console.error("Full Details:", err);
      throw err;
    default:
      console.error("An unexpected error occurred");
      console.error("Full Details:", err);
      throw err;
  }
}

export async function initDB() {
  try {
    await createConnection({
      type: "postgres",
      url: getDBConnectionString(),
      entities: [User, Account, Author],
      synchronize: true,
      logging: true,
      uuidExtension: "pgcrypto",
    });
  } catch (e: unknown) {
    if (isSysException(e)) return handleSysException(e);
    throw e;
  }
}
