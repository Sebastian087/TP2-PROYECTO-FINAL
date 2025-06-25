import { Router } from "express";
import { ReservaController } from "../controller/reserva.controller.js";
import { basicAuth } from "../middleware/basicAuth.js";

const reservaRouter = Router();

reservaRouter.use(basicAuth); //Aca estoy implementando la basicAuth para todas las rutas

// Rutas específicas primero
reservaRouter.delete("/all", ReservaController.deleteAllReservas);
reservaRouter.get("/estadisticas", ReservaController.getEstadisticas);
reservaRouter.get("/exportar", ReservaController.reservaExportar);
reservaRouter.get("/logs", ReservaController.getLastLogs);

// CRUD de reservas
reservaRouter.get("/", ReservaController.reservaGetAll);
reservaRouter.get("/:id", ReservaController.reservaGetById);
reservaRouter.post("/", ReservaController.reservaCreateOne);
reservaRouter.put("/:id", ReservaController.reservaUpdateById);
reservaRouter.delete("/:id", ReservaController.reservaDeleteOne);

export { reservaRouter }; 