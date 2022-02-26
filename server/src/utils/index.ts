export function normalisePort(port?: string | number): number | undefined {
  if (!port) return undefined;

  if (typeof port !== "number") {
    port = Number.parseInt(port, 10);
  }

  if (!Number.isNaN(port) && port > 0) {
    return port;
  }

  return undefined;
}
