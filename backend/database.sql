-- Crear la base de datos
CREATE DATABASE softjobs;

-- Conectar a la base de datos
\c softjobs;

-- Crear la tabla de usuarios
CREATE TABLE usuarios (
  id SERIAL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(60) NOT NULL,
  rol VARCHAR(25),
  lenguage VARCHAR(20)
); 