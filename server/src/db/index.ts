import { createConnection } from "typeorm";
import { getDBConnectionString } from "../env";
import { isSysException, SysException } from "../error";
import { Account, Author, User } from "../models/User";

function handleSysException(err: SysException): never {
  switch (err.code) {
    case "ECONNREFUSED":
      console.error("Could not connect to database");
      console.error("Database connection string:", getDBConnectionString());
      throw err;
    default:
      console.error("An unexpected system error occurred");
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
      logger: "debug",
      uuidExtension: "pgcrypto",
    });
  } catch (e: unknown) {
    if (isSysException(e)) return handleSysException(e);
    throw e;
  }
}
