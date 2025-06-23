import { supabase } from "../db/supabase.cnx.js";

export const LogRepository = {
  createLog: async ({
    method,
    url,
    status_code,
    response_time,
  }) => {
    const { data, error } = await supabase
      .from("request_logs")
      .insert([
        { method, url, status_code, response_time },
      ]);
    if (error) {
      console.error("Error guardando log:", error);
    }
    return data;
  },
};
