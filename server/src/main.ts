import dotenv from "dotenv";
import dbg from "debug";
import http from "http";

import app from "./app";
import { initDB } from "./db";

import { normalisePort } from "./utils";

dotenv.config();

const debug = dbg("felixarts:server");

function handleError(port: unknown) {
  return (error: Error & { syscall?: string; code?: string }) => {
    if (error.syscall !== "listen") {
      throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
}

function handleListening(server: http.Server) {
  var addr = server.address();
  return () => {
    const bind =
      typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
    debug("Listening on " + bind);
  };
}

async function main() {
  // Perform database model construction and initialisation.
  try {
    await initDB();
  } catch (e) {
    process.exit(-1);
  }

  // Determine and set port of Express app
  const port = normalisePort(process.env.PORT || 3000);
  app.set("port", port);

  // Construct and start HTTP server using Express app
  const server = http.createServer(app);
  server.listen(port);

  // Add event handlers
  server.on("error", handleError(port));
  server.on("listening", handleListening(server));
}

main().catch(console.error);
