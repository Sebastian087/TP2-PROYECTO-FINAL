//Esta clase ya no está siendo obligatoria/necesaria, pero la dejamos como documentación de la clase Reserva que existe en la DB.

/**
 * Clase que representa una Reserva.
 *
 * @property {number} [id] - ID único (autogenerado por Supabase).
 * @property {string} nombre - Nombre de la persona (obligatorio).
 * @property {string} apellido - Apellido de la persona (obligatorio).
 * @property {string} dia - Día de la reserva (formato ISO, obligatorio).
 * @property {string} sector - Sector de la reserva (interior o exterior, obligatorio).
 * @property {string} motivo - Motivo de la reserva (obligatorio).
 */

export class Reserva {
  constructor(id, nombre, apellido, dia, sector, motivo) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dia = dia;
    this.sector = sector;
    this.motivo = motivo;
  }
} 