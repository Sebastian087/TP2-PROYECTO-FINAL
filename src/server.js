import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import { config } from "./config/config.js";
import { reservaRouter } from "./routes/reserva.route.js";
import { requestLogger } from "./middleware/requestLogger.js";

const app = express();

// Logger HTTP (Morgan)
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);


app.use(express.json());
app.use(express.static("public"));


// Middleware custom de logs (según flag ENABLE_LOGS)
if (process.env.ENABLE_LOGS !== "false") {
  app.use(requestLogger);
}

// Rutas
app.use("/api/reserva", reservaRouter);

// Levantar servidor
app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en http://${config.HOST}:${config.PORT}`);
  console.log(`Entorno actual: ${process.env.NODE_ENV || "no definido"}`);
});
