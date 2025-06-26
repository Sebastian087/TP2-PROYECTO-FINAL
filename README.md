# API de Reservas con Express y Supabase

## 🌍 Resumen

Este proyecto es una API RESTful construida con **Node.js + Express**, con persistencia de datos en **Supabase**. Permite gestionar un listado de reservas mediante operaciones CRUD, obtener estadísticas, exportar datos en CSV y está protegida por autenticación básica. Incluye middleware de logging y estructura modular siguiendo el patrón MVC.

---

## 🗂️ Estructura del Proyecto

```
📁 tp2-proyecto-final
├── 📂 src
│   ├── 📂 controllers      # Controladores (lógica de negocio)
│   ├── 📂 routes           # Definición de endpoints
│   ├── 📂 models           # Modelo Reserva
│   ├── 📂 services         # Lógica intermedia entre controller y repositorio
│   ├── 📂 repositories     # Acceso a Supabase (CRUD + logs)
│   ├── 📂 middleware       # Middlewares: logger, auth y validaciones.
│   ├── 📂 config           # Configuraciones globales y variables de entorno
│   ├── 📂 utils            # Exportador CSV
│   ├── server.js          # Punto de entrada del servidor
├── 📂 tests               # Requests .http y pruebas manuales
├── .env                  # Variables de entorno
├── package.json          # Dependencias y scripts
├── render.yaml           # Configuración para Render
├── README.md             # Documentación
```

---

## 🔧 Configuraciones Generales (`src/config/config.js`)

- Puerto y host de escucha (`PORT`, `HOST`)
- Credenciales para autenticación básica (`BASIC_AUTH_USER`, `BASIC_AUTH_PASS`)
- `SUPABASE_URL` y `SUPABASE_KEY` para conectarse a la base de datos

---

## 🚀 Endpoints Disponibles (prefijo `/api/reserva`)

### CRUD principal

- `GET /` — Lista todas las reservas
- `GET /:id` — Obtiene una reserva por ID
- `POST /` — Crea una nueva reserva
- `PUT /:id` — Actualiza una reserva existente
- `DELETE /:id` — Elimina una reserva

### Funcionalidades adicionales

- `GET /estadisticas` — Devuelve:

  - Total de reservas
  - Cantidad de reservas por sector (interior/exterior)
  - Cantidad de reservas por día

- `GET /exportar` — Exporta todas las reservas como un archivo CSV descargable

- `DELETE /all` — Elimina **todas** las reservas (solo habilitado en `NODE_ENV=test`)

---

## 📋 Estructura de Datos de Reserva

Cada reserva contiene los siguientes campos:

- `id` (number): ID único autogenerado por Supabase
- `nombre` (string): Nombre de la persona (obligatorio)
- `apellido` (string): Apellido de la persona (obligatorio)
- `dia` (string): Día de la reserva en formato ISO (obligatorio)
- `sector` (string): Sector de la reserva - "interior" o "exterior" (obligatorio)
- `motivo` (string): Motivo de la reserva (obligatorio)

### Ejemplo de creación de reserva:

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "dia": "2024-01-15",
  "sector": "interior",
  "motivo": "Cena de cumpleaños"
}
```

---

##  Middleware

### Autenticación Básica (`basicAuth`)

Valida las credenciales enviadas por header `Authorization`. En caso incorrecto, responde con 401.

### Logger de Requests (`requestLogger`)

Mide la duración de cada request y guarda un log en Supabase (tabla `logs`).

---

## Testing Manual (`tests/reservas.http`) Tambien posee Despliegue en Render !!

Se provee un archivo `.http` para realizar peticiones de prueba:

- CRUD completo
- Exportación CSV
- Estadísticas
- Casos no felices (datos faltantes o ID inexistente)
- Eliminación masiva para limpiar el estado

> Puede usarse con la extensión REST Client de VSCode o herramientas como Insomnia/Postman.

---

### Testing en Producción

Usa `test/production_test.http` para probar el despliegue

## 🔹 Consideraciones Finales

- Se recomienda levantar el server con:

```bash
npm install
dotenv -e .env -- node src/server.js
```

- Si se desea probar `DELETE /all`, levantar con:

```bash
NODE_ENV=test npm run dev
```

- Para descargar el archivo CSV vía interfaz, abrir en navegador:
  http://localhost:3003/exportar.html

## Modo de Pruebas y Endpoint de Borrado Masivo

- Para poder usar el endpoint de borrado masivo de reservas (DELETE /api/reserva/all), es necesario ejecutar el servidor con la variable NODE_ENV seteada en test:

NODE_ENV=test npm run dev

## Esto protege el uso de este endpoint para que no se ejecute por accidente en entornos productivos y no nos Rajen!

## 📁 Datos de Supabase (Proyecto del equipo)

- **Organization:** Trabajo Práctico THP 2
- **Project Name:** Proyecto THP 2
- **Region:** East US (Ohio)


## Integrantes

- **Reinoso Sebastian Elias**