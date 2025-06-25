import { ReservaService } from "../services/reserva.service.js";
import path from "path";
import { fileURLToPath } from "url"; 

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);



export const ReservaController = {
  reservaCreateOne: async (req, res) => {
    const reserva = req.body;
    try {
      const response = await ReservaService.serviceReservaCreation(reserva);

      if (!response) {
        res.status(400).json({
          payload: null,
          message: "Datos inválidos o error al crear la reserva",
          ok: false,
        });
        return;
      }

      res.status(201).json({
        message: "Creado correctamente",
        payload: { ...response, id: response.id },
        ok: true,
      });
      return;
    } catch (e) {
      console.error(e);
      res.status(500).json({
        payload: null,
        message: "Error inesperado al crear la reserva",
        ok: false,
      });
    }
  },

  reservaGetAll: async (req, res) => {
    const reservas = await ReservaService.serviceGetAll();

    if (!reservas) {
      res.status(404).json({
        message: "Error al leer las reservas",
        payload: null,
        ok: false,
      });
      return;
    }

    res.status(200).json({
      message: "Estas son todas las reservas",
      payload: reservas,
      ok: true,
    });
    return;
  },

  reservaGetById: async (req, res) => {
    const { id } = req.params;
    const reserva = await ReservaService.serviceReservaValidation(id);

    if (!reserva) {
      res.status(404).json({
        message: "Error, no existe la reserva",
        payload: null,
        ok: false,
      });
      return;
    }

    res.status(200).json({
      message: "Reserva encontrada",
      payload: reserva,
      ok: true,
    });
    return;
  },

  reservaDeleteOne: async (req, res) => {
    const { id } = req.params;
    const reserva = await ReservaService.serviceReservaValidation(id);
    const idReserva = await ReservaService.serviceReservaDelete(id);

    if (!idReserva) {
      res.status(404).json({
        payload: null,
        message: "No se encontro la reserva a borrar",
        ok: false,
      });
      return;
    }

    res.status(200).json({
      message: `Reserva borrada satisfactoriamente`,
      payload: reserva,
      ok: true,
    });
    return;
  },

  reservaUpdateById: async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    const reservaUpdated = await ReservaService.serviceUpdateReserva(
      id,
      newData
    );

    if (!reservaUpdated) {
      res.status(404).json({
        ok: false,
        payload: null,
        message: "Fallo al actualizar la reserva",
      });
      return;
    }

    res.status(200).json({
      message: `Reserva modificada`,
      payload: reservaUpdated,
      ok: true,
    });
    return;
  },

  getEstadisticas: async (req, res) => {
    try {
      const estadisticas = await ReservaService.getEstadisticas();
      res.status(200).json(estadisticas);
    } catch (error) {
      console.error("Error al obtener estadísticas:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  reservaExportar: async (req, res) => {
    try {
      const filePath = await ReservaService.exportarReservas();

      if (!filePath) {
        res.status(404).json({
          message: "No hay reservas para exportar",
          payload: null,
          ok: false,
        });
        return;
      }

      const absolutePath = path.resolve(__dirname, "..", filePath.replace("./src/", ""));
      res.download(absolutePath, "reservas.csv");
      return;
    } catch (error) {
      console.error("Error al exportar reservas:", error);
      res.status(500).json({
        message: "Error inesperado al exportar reservas",
        payload: null,
        ok: false,
      });
      return;
    }
  },

  deleteAllReservas: async (req, res) => {
    if (process.env.NODE_ENV !== "test") {
      return res.status(403).json({
        ok: false,
        message: "No autorizado fuera de entorno de testing",
        payload: null,
      });
    }

    try {
      const reservas = await ReservaService.serviceGetAll();
      await ReservaService.deleteAll();
      res.status(200).json({
        ok: true,
        message: "Reservas eliminadas exitosamente",
        payload: reservas,
      });
    } catch (error) {
      console.error("Error al borrar todas las reservas:", error);
      res.status(500).json({
        ok: false,
        message: "Error interno al borrar reservas",
        payload: null,
      });
    }
  },

  getLastLogs: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 5;
      const logs = await ReservaService.getLastLogs(limit);

      if (!logs) {
        res.status(404).json({
          message: "No se encontraron logs",
          payload: null,
          ok: false,
        });
        return;
      }

      res.status(200).json({
        message: `Últimos ${logs.length} logs obtenidos exitosamente`,
        payload: logs,
        ok: true,
      });
    } catch (error) {
      console.error("Error al obtener logs:", error);
      res.status(500).json({
        message: "Error interno al obtener logs",
        payload: null,
        ok: false,
      });
    }
  },
}; 