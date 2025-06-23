import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || "localhost",
  DB_PATH: process.env.DB_PATH || "./src/db/pelicula.db.json",
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_KEY: process.env.SUPABASE_KEY,
  BASIC_AUTH_USER: process.env.BASIC_AUTH_USER,
  BASIC_AUTH_PASS: process.env.BASIC_AUTH_PASS,
};

//se modificó el archivo para que use dotenv y cargue las variables de entorno desde un archivo .env para cumplir con el enunciado y las buenas prácticas de desarrollo.
