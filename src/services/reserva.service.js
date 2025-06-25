import { Reserva } from "../model/reserva.js";
import { ReservaRepository } from "../repository/reserva.repository.js";
import { LogRepository } from "../repository/log.repository.js";


export const ReservaService = {
  serviceReservaValidation: async (id) => {
    const codigoReserva = await ReservaRepository.getById(id);

    if (!codigoReserva) return null;

    return codigoReserva;
  },

  serviceGetAll: async () => {
    const reservas = ReservaRepository.getAll();

    if (!reservas) return null;

    return reservas;
  },

  serviceReservaCreation: async (reserva) => {
    // No generar id, lo genera Supabase
    const modelReserva = new Reserva(
      null,
      reserva.nombre,
      reserva.apellido,
      reserva.dia,
      reserva.sector,
      reserva.motivo
    );

    const created = await ReservaRepository.createOne(modelReserva);

    if (!created) return null;

    return created;
  },
  serviceReservaDelete: async (id) => {
    const idReserva = await ReservaRepository.deleteById(id);
    if (!idReserva) return null;
    return idReserva;
  },
  serviceUpdateReserva: async (id, newData) => {
    const reservaActualizado = await ReservaRepository.updateById(
      id,
      newData
    );
    if (!reservaActualizado) return null;
    return reservaActualizado;
  },
  // Este método obtiene estadísticas de las reservas
  // como el total de reservas, la cantidad por sector y la cantidad por día.
   getEstadisticas: async () => {
    const reservas = await ReservaRepository.getAll();
    const totalReservas = reservas.length;

    const cantidadPorSector = {};
    const cantidadPorDia = {};

    for (const r of reservas) {
      const sector = r.sector || "Desconocido";
      cantidadPorSector[sector] = (cantidadPorSector[sector] || 0) + 1;
      
      const dia = r.dia ? new Date(r.dia).toLocaleDateString() : "Sin fecha";
      cantidadPorDia[dia] = (cantidadPorDia[dia] || 0) + 1;
    }

    return {
      totalReservas,
      cantidadPorSector,
      cantidadPorDia,
    };
  },

  exportarReservas: async () => {
    const reservas = await ReservaRepository.getAll();

    if (!reservas || reservas.length === 0) return null;

    const fields = ["id", "nombre", "apellido", "dia", "sector", "motivo"];
    const { Parser } = await import("json2csv");
    const fs = await import("fs/promises");

    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(reservas);

    const filePath = "./src/utils/reservas_export.csv";
    await fs.writeFile(filePath, csv);

    return filePath;
  },

    deleteAll: async () => {
    return await ReservaRepository.deleteAll();
  },

  getLastLogs: async (limit = 5) => {
    const logs = await LogRepository.getLastLogs(limit);
    
    if (!logs) return null;
    
    return logs;
  },
}; 