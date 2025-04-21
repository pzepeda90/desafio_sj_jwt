# Soft Jobs Frontend

Interfaz de usuario para el proyecto Soft Jobs, una plataforma para desarrolladores.

## Requisitos

- Node.js (versión 16 o superior)

## Configuración

1. Instalar dependencias:
   ```
   npm install
   ```

2. Configurar variables de entorno:
   Se proporciona un archivo `.env.example` como plantilla. Copia este archivo a `.env` y ajusta los valores según tu configuración:
   ```
   cp .env.example .env
   ```
   
   Luego edita el archivo `.env` con la URL de tu backend:
   ```
   VITE_BACKEND_URL=http://localhost:3000
   ```

3. Iniciar el servidor de desarrollo:
   ```
   npm run dev
   ```

4. Generar build de producción:
   ```
   npm run build
   ```

## Características

- Registro de usuarios
- Inicio de sesión con autenticación JWT
- Visualización de perfil de usuario
- Selección de rol y lenguaje de programación

## Tecnologías

- React
- React Router
- Axios
- Bootstrap
- SweetAlert2
- Vite 