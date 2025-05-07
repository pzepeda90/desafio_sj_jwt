# Soft Jobs - Proyecto Fullstack

Este proyecto consta de un backend y un frontend para una aplicación de gestión de desarrolladores.

## Estructura del Proyecto

```
soft-jobs/
├── backend/          # API REST con Node.js, Express y PostgreSQL
│   ├── config/       # Configuración de la base de datos
│   ├── src/          # Código fuente del backend
│   │   ├── controllers/  # Controladores de rutas
│   │   ├── middlewares/  # Middlewares personalizados
│   │   ├── models/       # Modelos de datos
│   │   └── routes/       # Definición de rutas
│   ├── server.js     # Punto de entrada del servidor
│   ├── node_modules/ # Dependencias del backend
│   └── package.json  # Dependencias del backend
├── frontend/         # Aplicación React con Vite
│   ├── public/       # Archivos estáticos
│   ├── src/          # Código fuente del frontend
│   │   ├── components/   # Componentes React
│   │   ├── contexts/     # Contextos para manejo de estado
│   │   ├── config/       # Configuración de la API
│   │   ├── hooks/        # Hooks personalizados
│   │   └── views/        # Vistas/páginas principales
│   ├── index.html    # Archivo HTML principal
│   ├── node_modules/ # Dependencias del frontend
│   └── package.json  # Dependencias del frontend
└── package.json      # Scripts para ejecutar el proyecto completo
```

## Acerca de la estructura de carpetas

Este proyecto utiliza una estructura simple donde:

1. Cada subproyecto (frontend y backend) tiene su propio `package.json` y `node_modules`.
2. Existe un `package.json` principal en la raíz que solo contiene scripts para ejecutar ambos proyectos.
3. No hay dependencias en la raíz, solo en cada proyecto específico.

## Requisitos

- Node.js (v16 o superior)
- PostgreSQL

## Configuración

1. **Instalación limpia (si tienes problemas con las dependencias):**
   ```
   npm run reinstall
   ```
   
   Este comando limpiará todas las carpetas node_modules y los archivos package-lock.json, y luego reinstalará todas las dependencias.

2. **Configuración de la base de datos:**
   - Asegúrate de tener PostgreSQL instalado y funcionando
   - Crea una base de datos llamada `softjobs` usando el script en `backend/database.sql`
   - Configura las credenciales de conexión:
     ```
     cd backend
     cp .env.example .env
     ```
   - Edita el archivo `.env` con tus datos de conexión

3. **Configuración del frontend:**
   ```
   cd frontend
   cp .env.example .env
   ```
   
   El archivo `.env` del frontend ya contiene la URL correcta para conectarse al backend.

4. **Iniciar la aplicación completa:**
   ```
   npm start
   ```
   
   Esto iniciará tanto el backend como el frontend simultáneamente.

5. **Iniciar solo el backend:**
   ```
   npm run start:backend
   ```

6. **Iniciar solo el frontend:**
   ```
   npm run start:frontend
   ```

## Nota sobre puertos

- El backend se ejecuta en el puerto 3000 por defecto
- El frontend se ejecuta en el puerto proporcionado por Vite (normalmente 5173)
- Si el puerto 3000 ya está en uso, la aplicación mostrará un mensaje de error sugiriendo cambiar el puerto en el archivo `.env`

## Funcionalidades

- Registro de usuarios (desarrolladores) con nombre, email, rol y lenguaje de programación
- Login con autenticación JWT
- Visualización de perfil de usuario
- Protección de rutas mediante tokens JWT
# desafio_jwt
# desafio_sj_jwt
# desafio_jwt_corregido
# desafio_jwt_corregido
