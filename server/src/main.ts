import dotenv from "dotenv";
dotenv.config();

import dbg from "debug";
import http from "http";

import app from "./app";
import { initDB } from "./db";

import { isSysException } from "./error";
import { debugEnvironment, getExpressPort } from "./env";

const debug = dbg("felixarts:server");

async function main() {
  // Debug environment variables
  debugEnvironment();

  // Perform database model construction and initialisation.
  await initDB();

  // Determine and set port of Express app
  const port = getExpressPort();
  app.set("port", port);

  // HTTP Server error handler
  const handleError = (error: Error) => {
    // Filter unexpected/unknown errors that may have occurred and rethrow
    if (!isSysException(error) || error.syscall !== "listen") {
      throw error;
    }

    // Report more information when we know what the error is in advance
    switch (error.code) {
      case "EACCES":
        debug(port + " requires elevated privileges");
        process.exit(1);

      case "EADDRINUSE":
        debug(port + " is already in use");
        process.exit(1);

      default:
        throw error;
    }
  };

  // Construct and start HTTP server using Express app
  const server = http.createServer(app);

  // Add event handlers
  server.on("error", handleError);
  server.on("listening", () => {
    debug("Listening on " + port);
  });

  server.listen(port);
}

main().catch((e) => {
  throw e;
});
