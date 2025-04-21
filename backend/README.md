# Soft Jobs API

API para el desafío Soft Jobs con autenticación JWT.

## Requisitos

- Node.js
- PostgreSQL

## Configuración

1. La base de datos ya está creada con el nombre 'softjobs' y la tabla 'usuarios'.
   Si necesitas crearla manualmente, usa el siguiente script:
   ```sql
   CREATE DATABASE softjobs;
   \c softjobs;
   CREATE TABLE usuarios (
     id SERIAL PRIMARY KEY,
     email VARCHAR(100) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     rol VARCHAR(50) NOT NULL,
     lenguaje VARCHAR(50) NOT NULL
   );
   ```

2. Instalar dependencias:
   ```
   npm install
   ```

3. Configurar variables de entorno:
   Se proporciona un archivo `.env.example` como plantilla. Copia este archivo a `.env` y ajusta los valores según tu configuración:
   ```
   cp .env.example .env
   ```
   
   Luego edita el archivo `.env` con tus datos:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=softjobs
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   JWT_SECRET=tu_clave_secreta
   PORT=3000
   ```

4. Iniciar el servidor:
   ```
   npm run dev
   ```

## Implementación

Esta API utiliza una base de datos PostgreSQL para almacenar usuarios y gestionar sus credenciales de forma segura.

## Endpoints

### Registro de usuarios
```
POST /usuarios
```
Body:
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "rol": "Full Stack Developer",
  "lenguaje": "JavaScript"
}
```

### Login
```
POST /login
```
Body:
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```
Respuesta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Obtener datos del usuario
```
GET /usuarios
```
Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```# desafio_jwt
