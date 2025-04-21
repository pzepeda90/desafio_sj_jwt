const express = require('express')
const cors = require('cors')
require('dotenv').config()
const http = require('http')

const app = express()
const PORT = process.env.PORT || 3000

// Importar rutas y middlewares
const userRoutes = require('./src/routes/userRoutes')
const { logRequests } = require('./src/middlewares/authMiddleware')

// Middlewares
app.use(cors())
app.use(express.json())
app.use(logRequests)

// Rutas
app.use('/', userRoutes)

// Ruta para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.json({ message: 'API de Soft Jobs funcionando!' })
})

// Manejo de errores de sintaxis JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Error de sintaxis JSON:', err.message)
    return res.status(400).json({ error: 'JSON inválido en la solicitud' })
  }
  next(err)
})

// Manejo de errores global (debe ir después de las rutas)
app.use((err, req, res, next) => {
  console.error('Error interno del servidor:', err.stack)
  const statusCode = err.statusCode || 500
  const message = err.message || 'Error interno del servidor'
  res.status(statusCode).json({ error: message })
})

// Manejador de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

// Crear servidor HTTP
const server = http.createServer(app)

// Iniciar el servidor con manejo de errores
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
}).on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log(`Puerto ${PORT} ya está en uso. Intenta:`)
    console.log('1. Detener cualquier aplicación que use el puerto 3000')
    console.log('2. O cambiar el valor de PORT en el archivo .env')
    process.exit(1)
  } else {
    console.error(`Error al iniciar el servidor:`, e)
  }
})

module.exports = app 
