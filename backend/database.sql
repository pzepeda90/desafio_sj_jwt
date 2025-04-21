-- Crear la base de datos
CREATE DATABASE softjobs;

-- Conectar a la base de datos
\c softjobs;

-- Crear la tabla de usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(50) NOT NULL,
  lenguaje VARCHAR(50) NOT NULL
); 