import { config } from "../config/config.js";

export const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({
      ok: false,
      message: "Autenticación requerida",
    });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");

  if (
    username === config.BASIC_AUTH_USER &&
    password === config.BASIC_AUTH_PASS
  ) {
    return next();
  }

  return res.status(401).json({
    ok: false,
    message: "Credenciales inválidas",
  });
};
