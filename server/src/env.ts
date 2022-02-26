export function getDBHost(): string {
  return process.env.DB_HOST || "db";
}

export function getDBPort(): number {
  const port = Number.parseInt(process.env.DB_PORT || "5432");
  return Number.isNaN(port) ? 5432 : port;
}

export function getDBUser(): string {
  return process.env.DB_USER || "server";
}

export function getDBPass(): string | undefined {
  return process.env.DB_PASSWORD;
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
