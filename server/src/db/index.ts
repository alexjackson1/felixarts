import { createConnection } from "typeorm";
import { getDBConnectionString } from "../env";
import { Account, Author, User } from "../models/User";

export async function initDB() {
  await createConnection({
    type: "postgres",
    url: getDBConnectionString(),
    entities: [User, Account, Author],
    synchronize: true,
    logging: true,
    uuidExtension: "pgcrypto",
  });
}
