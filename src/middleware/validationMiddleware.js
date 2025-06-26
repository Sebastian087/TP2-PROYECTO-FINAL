/**
 * Middleware para validar datos de reservas
 */

export const validateReservaData = (req, res, next) => {
  const reserva = req.body;
  const errors = [];

  // Validar campos requeridos
  if (!reserva.nombre || reserva.nombre.trim() === '') {
    errors.push('El nombre es obligatorio');
  }
  if (!reserva.apellido || reserva.apellido.trim() === '') {
    errors.push('El apellido es obligatorio');
  }
  if (!reserva.dia || reserva.dia.trim() === '') {
    errors.push('El día es obligatorio');
  }
  if (!reserva.sector || reserva.sector.trim() === '') {
    errors.push('El sector es obligatorio');
  }
  if (!reserva.motivo || reserva.motivo.trim() === '') {
    errors.push('El motivo es obligatorio');
  }

  // Validar formato de fecha
  if (reserva.dia) {
    const fecha = new Date(reserva.dia);
    if (isNaN(fecha.getTime())) {
      errors.push('El formato de fecha es inválido. Use YYYY-MM-DD');
    } else {
      // Validar que la fecha no sea en el pasado
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0); // Resetear a inicio del día
      if (fecha < hoy) {
        errors.push('No se pueden crear reservas para fechas pasadas');
      }
    }
  }

  // Validar sector
  if (reserva.sector && !['interior', 'exterior'].includes(reserva.sector.toLowerCase())) {
    errors.push('El sector debe ser "interior" o "exterior"');
  }

  // Si hay errores, devolver respuesta de error
  if (errors.length > 0) {
    return res.status(400).json({
      payload: null,
      message: `Datos inválidos: ${errors.join(', ')}`,
      ok: false,
    });
  }

  // Si no hay errores, continuar al siguiente middleware/controlador
  next();
};

/**
 * Middleware para validar que el ID sea un número válido
 */
export const validateId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id || isNaN(parseInt(id)) || parseInt(id) <= 0) {
    return res.status(400).json({
      payload: null,
      message: 'ID inválido. Debe ser un número positivo',
      ok: false,
    });
  }

  next();
}; 