import { supabase } from "../db/supabase.cnx.js";

export const LogRepository = {
  createLog: async ({
    method,
    url,
    status_code,
    response_time,
  }) => {
    try {
      console.log("📝 Intentando guardar log:", { method, url, status_code, response_time });
      
      const { data, error } = await supabase
        .from("request_logs")
        .insert([
          { method, url, status_code, response_time },
        ]);
      
      if (error) {
        console.error("❌ Error guardando log:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        return null;
      }
      
      console.log("✅ Log guardado exitosamente:", data);
      return data;
    } catch (err) {
      console.error("💥 Error inesperado guardando log:", err);
      return null;
    }
  },
};
