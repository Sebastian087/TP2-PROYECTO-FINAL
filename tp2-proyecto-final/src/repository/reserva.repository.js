import { supabase } from "../db/supabase.cnx.js";

export const ReservaRepository = {
  getById: async (id) => {
    const { data, error } = await supabase
      .from("reservas")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  },

  getAll: async () => {
    const { data, error } = await supabase.from("reservas").select("*");
    if (error) {
      console.error(error);
      return null;
    }
    return data;
  },

  createOne: async (reserva) => {
    const { data, error } = await supabase
      .from("reservas")
      .insert([
        {
          nombre: reserva.nombre,
          apellido: reserva.apellido,
          dia: reserva.dia,
          sector: reserva.sector,
          motivo: reserva.motivo,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  },

  deleteById: async (id) => {
    const { data, error } = await supabase
      .from("reservas")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);
      return null;
    }

    // Si no borró nada, retorna null
    if (!data || data.length === 0) {
      return null;
    }

    return id;
  },

  updateById: async (id, newData) => {
    const { data, error } = await supabase
      .from("reservas")
      .update(newData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  },

  deleteAll: async () => {
    // Usamos Supabase para hacer un DELETE en la tabla "reservas"
    // Le decimos que borre todo lo que tenga un id que NO sea null
    // (porque Supabase necesita una condición para borrar múltiples filas)
    const { error } = await supabase
      .from("reservas")
      .delete()
      .not("id", "is", null); // Condición correcta: id IS NOT NULL
    // Si ocurre un error, lo mostramos en consola y devolvemos null
    if (error) {
      console.error("Error al borrar todas las reservas:", error);
      return null;
    }
    // Si todo salió bien, devolvemos true como confirmación
    return true;
  },
}; 