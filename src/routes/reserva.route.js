import { Router } from "express";
import { ReservaController } from "../controller/reserva.controller.js";
import { basicAuth } from "../middleware/basicAuth.js";
import { validateReservaData, validateId } from "../middleware/validationMiddleware.js";

const reservaRouter = Router();

reservaRouter.use(basicAuth); //Aca estoy implementando la basicAuth para todas las rutas

// Rutas específicas primero
reservaRouter.delete("/all", ReservaController.deleteAllReservas);
reservaRouter.get("/estadisticas", ReservaController.getEstadisticas);
reservaRouter.get("/exportar", ReservaController.reservaExportar);
reservaRouter.get("/logs", ReservaController.getLastLogs);

// CRUD de reservas
reservaRouter.get("/", ReservaController.reservaGetAll);
reservaRouter.get("/:id", validateId, ReservaController.reservaGetById);
reservaRouter.post("/", validateReservaData, ReservaController.reservaCreateOne);
reservaRouter.put("/:id", validateId, validateReservaData, ReservaController.reservaUpdateById);
reservaRouter.delete("/:id", validateId, ReservaController.reservaDeleteOne);

export { reservaRouter }; 