const { Pool } = require('pg')

// Configuración de la conexión a la base de datos
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  allowExitOnIdle: true
})

// Verificar la conexión
pool.on('connect', () => {
  console.log('Conexión exitosa a la base de datos')
})

pool.on('error', (err) => {
  console.error('Error en la conexión a la base de datos:', err)
})

module.exports = pool 
